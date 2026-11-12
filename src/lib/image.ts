// Image decode/encode helpers built on <canvas>. Everything stays in the browser.

export type Decoded = { source: CanvasImageSource; width: number; height: number; close?: () => void };

// iOS Safari caps canvas area at ~16.7 megapixels; stay safely under it everywhere.
export const MAX_PIXELS = 16_000_000;

export async function decodeImage(blob: Blob): Promise<Decoded> {
  if ('createImageBitmap' in window) {
    try {
      const bmp = await createImageBitmap(blob, { imageOrientation: 'from-image' } as ImageBitmapOptions);
      return { source: bmp, width: bmp.width, height: bmp.height, close: () => bmp.close() };
    } catch { /* fall through to <img> */ }
  }
  const url = URL.createObjectURL(blob);
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const i = new Image();
      i.onload = () => resolve(i);
      i.onerror = () => reject(new Error('decode'));
      i.src = url;
    });
    await img.decode().catch(() => {});
    return { source: img, width: img.naturalWidth, height: img.naturalHeight, close: () => URL.revokeObjectURL(url) };
  } catch {
    URL.revokeObjectURL(url);
    throw new Error('This image could not be opened. It may be damaged or in a format your browser cannot read.');
  }
}

export function fitWithin(w: number, h: number, maxW?: number, maxH?: number) {
  let scale = 1;
  if (maxW && w > maxW) scale = Math.min(scale, maxW / w);
  if (maxH && h > maxH) scale = Math.min(scale, maxH / h);
  if (w * h * scale * scale > MAX_PIXELS) scale = Math.sqrt(MAX_PIXELS / (w * h));
  return { width: Math.max(1, Math.round(w * scale)), height: Math.max(1, Math.round(h * scale)) };
}

export function drawToCanvas(img: Decoded, width: number, height: number, background?: string) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;
  if (background) { ctx.fillStyle = background; ctx.fillRect(0, 0, width, height); }
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  // Step down in halves for big reductions: much sharper than one large jump.
  let src: CanvasImageSource = img.source, sw = img.width, sh = img.height;
  while (sw / 2 > width && sh / 2 > height) {
    const tmp = document.createElement('canvas');
    tmp.width = Math.round(sw / 2); tmp.height = Math.round(sh / 2);
    const t = tmp.getContext('2d')!;
    t.imageSmoothingQuality = 'high';
    t.drawImage(src, 0, 0, tmp.width, tmp.height);
    src = tmp; sw = tmp.width; sh = tmp.height;
  }
  ctx.drawImage(src, 0, 0, width, height);
  return canvas;
}

export function hasTransparency(canvas: HTMLCanvasElement): boolean {
  const ctx = canvas.getContext('2d')!;
  // Sample a downscaled copy for speed
  const s = document.createElement('canvas');
  const scale = Math.min(1, 256 / Math.max(canvas.width, canvas.height));
  s.width = Math.max(1, Math.round(canvas.width * scale));
  s.height = Math.max(1, Math.round(canvas.height * scale));
  const sc = s.getContext('2d', { willReadFrequently: true })!;
  sc.drawImage(canvas, 0, 0, s.width, s.height);
  const d = sc.getImageData(0, 0, s.width, s.height).data;
  for (let i = 3; i < d.length; i += 4) if (d[i] < 250) return true;
  void ctx;
  return false;
}

export function toBlob(canvas: HTMLCanvasElement, type: string, quality?: number): Promise<Blob> {
  return new Promise((resolve, reject) =>
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error('Your browser could not create the image. Try a smaller image.'))),
      type,
      quality,
    ),
  );
}

export const MIME_EXT: Record<string, string> = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp' };

let webpOk: boolean | null = null;
export function canEncodeWebP() {
  if (webpOk === null) {
    const c = document.createElement('canvas');
    c.width = c.height = 1;
    webpOk = c.toDataURL('image/webp').startsWith('data:image/webp');
  }
  return webpOk;
}

export const isHeic = (f: File) => /\.(heic|heif)$/i.test(f.name) || /image\/hei[cf]/i.test(f.type);

/** Decode anything we support, including iPhone HEIC photos (via heic2any when the browser can't). */
export async function decodeAny(file: File): Promise<Decoded> {
  if (isHeic(file)) {
    try { return await decodeImage(file); } catch { /* most browsers: need a converter */ }
    const { default: heic2any } = await import('heic2any');
    let out: Blob | Blob[];
    try {
      out = await heic2any({ blob: file, toType: 'image/png' });
    } catch {
      throw new Error(`“${file.name}” could not be read as a HEIC photo. It may be damaged.`);
    }
    return decodeImage(Array.isArray(out) ? out[0] : out);
  }
  return decodeImage(file);
}

/**
 * PNG output with real compression: reduce to a colour palette (like TinyPNG) using UPNG.
 * quality 0..1 -> palette size; >= 0.95 stays lossless.
 */
export async function encodePng(canvas: HTMLCanvasElement, quality = 0.75): Promise<Blob> {
  const colors = quality >= 0.95 ? 0 : quality >= 0.7 ? 256 : quality >= 0.45 ? 128 : 64;
  if (colors === 0) return toBlob(canvas, 'image/png');
  // @ts-ignore - upng-js has no types
  const { default: UPNG } = await import('upng-js');
  const ctx = canvas.getContext('2d', { willReadFrequently: true })!;
  const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  const out: ArrayBuffer = UPNG.encode([data.buffer], canvas.width, canvas.height, colors);
  const quantized = new Blob([out], { type: 'image/png' });
  // Fall back to the browser's lossless encoder if that happens to be smaller
  const lossless = await toBlob(canvas, 'image/png');
  return quantized.size < lossless.size ? quantized : lossless;
}

/** Encode a canvas in the requested format and quality */
export function encode(canvas: HTMLCanvasElement, type: string, quality: number): Promise<Blob> {
  return type === 'image/png' ? encodePng(canvas, quality) : toBlob(canvas, type, quality);
}
