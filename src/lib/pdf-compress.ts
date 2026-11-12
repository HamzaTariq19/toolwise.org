// Compress a PDF by re-encoding the images inside it. Text, fonts and vector graphics are untouched,
// so the document stays sharp and searchable.
import { PDFDocument, PDFName, PDFRawStream, PDFNumber, PDFArray, PDFDict, PDFRef, type PDFObject } from 'pdf-lib';
import { unzlibSync } from 'fflate';

export interface CompressLevel { maxPx: number; quality: number }
export const LEVELS: Record<string, CompressLevel> = {
  low: { maxPx: 2400, quality: 0.78 },
  recommended: { maxPx: 1800, quality: 0.62 },
  extreme: { maxPx: 1100, quality: 0.42 },
};

const name = (d: PDFDict, key: string) => {
  const v = d.get(PDFName.of(key));
  return v instanceof PDFName ? v.asString() : undefined;
};
const numOf = (d: PDFDict | undefined, key: string, fallback?: number) => {
  const v = d?.get(PDFName.of(key));
  return v instanceof PDFNumber ? v.asNumber() : fallback;
};

/** Number of colour components, or 0 if we should not touch this colour space. */
function components(doc: PDFDocument, dict: PDFDict): number {
  let cs: PDFObject | undefined = dict.get(PDFName.of('ColorSpace'));
  if (cs instanceof PDFRef) cs = doc.context.lookup(cs);
  if (cs instanceof PDFName) return cs.asString() === '/DeviceRGB' ? 3 : cs.asString() === '/DeviceGray' ? 1 : 0;
  if (cs instanceof PDFArray && cs.size() === 2 && cs.get(0) instanceof PDFName && (cs.get(0) as PDFName).asString() === '/ICCBased') {
    let s: PDFObject | undefined = cs.get(1);
    if (s instanceof PDFRef) s = doc.context.lookup(s);
    const n = s && 'dict' in (s as object) ? numOf((s as PDFRawStream).dict, 'N') : undefined;
    return n === 3 || n === 1 ? n : 0;
  }
  return 0;
}

/** Undo PNG predictors (PDF /Predictor >= 10) */
function unpredict(data: Uint8Array, width: number, colors: number): Uint8Array {
  const bpp = colors;
  const row = width * colors;
  const rows = Math.floor(data.length / (row + 1));
  const out = new Uint8Array(rows * row);
  for (let y = 0; y < rows; y++) {
    const ft = data[y * (row + 1)];
    const src = y * (row + 1) + 1;
    const dst = y * row;
    for (let x = 0; x < row; x++) {
      const raw = data[src + x];
      const a = x >= bpp ? out[dst + x - bpp] : 0;
      const b = y > 0 ? out[dst - row + x] : 0;
      const c = x >= bpp && y > 0 ? out[dst - row + x - bpp] : 0;
      let v: number;
      switch (ft) {
        case 1: v = raw + a; break;
        case 2: v = raw + b; break;
        case 3: v = raw + ((a + b) >> 1); break;
        case 4: { const p = a + b - c, pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c); v = raw + (pa <= pb && pa <= pc ? a : pb <= pc ? b : c); break; }
        default: v = raw;
      }
      out[dst + x] = v & 255;
    }
  }
  return out;
}

async function sourceToCanvas(doc: PDFDocument, stream: PDFRawStream): Promise<HTMLCanvasElement | null> {
  const d = stream.dict;
  const filterObj = d.get(PDFName.of('Filter'));
  const filter = filterObj instanceof PDFName ? filterObj.asString() : filterObj instanceof PDFArray && filterObj.size() === 1 ? (filterObj.get(0) as PDFName).asString?.() : undefined;
  const w = numOf(d, 'Width'), h = numOf(d, 'Height');
  if (!w || !h || d.get(PDFName.of('ImageMask')) || d.get(PDFName.of('Decode')) || numOf(d, 'BitsPerComponent', 8) !== 8) return null;
  const comps = components(doc, d);
  if (!comps) return null;
  const bytes = stream.getContents();

  if (filter === '/DCTDecode') {
    const bmp = await createImageBitmap(new Blob([bytes as BlobPart], { type: 'image/jpeg' })).catch(() => null);
    if (!bmp) return null;
    const c = document.createElement('canvas');
    c.width = bmp.width; c.height = bmp.height;
    c.getContext('2d')!.drawImage(bmp, 0, 0);
    bmp.close();
    return c;
  }
  if (filter === '/FlateDecode') {
    let raw: Uint8Array;
    try { raw = unzlibSync(bytes); } catch { return null; }
    let parms = d.get(PDFName.of('DecodeParms'));
    if (parms instanceof PDFArray) parms = parms.get(0);
    const pred = parms instanceof PDFDict ? numOf(parms, 'Predictor', 1)! : 1;
    if (pred >= 10) raw = unpredict(raw, w, comps);
    else if (pred !== 1) return null;
    if (raw.length < w * h * comps) return null;
    const c = document.createElement('canvas');
    c.width = w; c.height = h;
    const ctx = c.getContext('2d')!;
    const img = ctx.createImageData(w, h);
    const px = img.data;
    for (let i = 0, j = 0; i < w * h; i++, j += comps) {
      px[i * 4] = raw[j];
      px[i * 4 + 1] = comps === 3 ? raw[j + 1] : raw[j];
      px[i * 4 + 2] = comps === 3 ? raw[j + 2] : raw[j];
      px[i * 4 + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);
    return c;
  }
  return null;
}

export async function compressPdf(
  input: ArrayBuffer,
  level: CompressLevel,
  onProgress: (done: number, total: number) => void,
): Promise<{ bytes: Uint8Array; images: number; changed: number }> {
  const doc = await PDFDocument.load(input, { updateMetadata: false });
  const images: [PDFRef, PDFRawStream][] = [];
  for (const [ref, obj] of doc.context.enumerateIndirectObjects()) {
    if (obj instanceof PDFRawStream && name(obj.dict, 'Subtype') === '/Image') images.push([ref, obj]);
  }
  const maskRefs = new Set<string>();
  for (const [, s] of images) { const m = s.dict.get(PDFName.of('SMask')); if (m instanceof PDFRef) maskRefs.add(m.toString()); }
  let changed = 0;
  for (let i = 0; i < images.length; i++) {
    onProgress(i, images.length);
    const [ref, stream] = images[i];
    // Leave soft masks (transparency) alone: they belong to other images
    if (maskRefs.has(ref.toString())) continue;
    const canvas = await sourceToCanvas(doc, stream).catch(() => null);
    if (!canvas) continue;
    let { width, height } = canvas;
    const scale = Math.min(1, level.maxPx / Math.max(width, height));
    let target = canvas;
    if (scale < 1) {
      width = Math.max(1, Math.round(width * scale)); height = Math.max(1, Math.round(height * scale));
      target = document.createElement('canvas');
      target.width = width; target.height = height;
      const t = target.getContext('2d')!;
      t.imageSmoothingQuality = 'high';
      t.drawImage(canvas, 0, 0, width, height);
    }
    const blob: Blob | null = await new Promise((r) => target.toBlob(r, 'image/jpeg', level.quality));
    if (!blob) continue;
    const jpg = new Uint8Array(await blob.arrayBuffer());
    if (jpg.length >= stream.getContents().length * 0.95) continue;
    const dict = stream.dict.clone(doc.context);
    dict.set(PDFName.of('Filter'), PDFName.of('DCTDecode'));
    dict.set(PDFName.of('Width'), PDFNumber.of(width));
    dict.set(PDFName.of('Height'), PDFNumber.of(height));
    dict.set(PDFName.of('ColorSpace'), PDFName.of('DeviceRGB'));
    dict.set(PDFName.of('BitsPerComponent'), PDFNumber.of(8));
    dict.delete(PDFName.of('DecodeParms'));
    dict.delete(PDFName.of('Length'));
    doc.context.assign(ref, PDFRawStream.of(dict, jpg));
    changed++;
  }
  onProgress(images.length, images.length);
  const bytes = await doc.save({ useObjectStreams: true });
  return { bytes, images: images.length, changed };
}
