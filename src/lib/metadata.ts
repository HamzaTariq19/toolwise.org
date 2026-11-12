// Read and remove photo metadata (EXIF, GPS, XMP, IPTC) entirely in the browser.

export async function readMetadata(file: Blob): Promise<Record<string, unknown> | null> {
  const exifr = (await import('exifr')).default;
  try {
    return (await exifr.parse(file, { tiff: true, exif: true, gps: true, xmp: true, iptc: true, icc: false, interop: false, ifd1: false, mergeOutput: true, translateValues: true, reviveValues: true })) ?? null;
  } catch { return null; }
}

/** Lossless removal for JPEG: drop APP1 (EXIF/XMP), APP12/13 (IPTC/Photoshop) and comments. Keeps orientation and colour profile. */
export function stripJpeg(bytes: Uint8Array, orientation = 1): Uint8Array | null {
  if (bytes[0] !== 0xff || bytes[1] !== 0xd8) return null;
  const parts: Uint8Array[] = [bytes.subarray(0, 2)];
  if (orientation > 1 && orientation <= 8) {
    // Minimal EXIF block containing only the orientation, so the photo is not shown sideways
    const app1 = new Uint8Array([0xff, 0xe1, 0x00, 0x22, 0x45, 0x78, 0x69, 0x66, 0x00, 0x00, 0x4d, 0x4d, 0x00, 0x2a, 0x00, 0x00, 0x00, 0x08, 0x00, 0x01, 0x01, 0x12, 0x00, 0x03, 0x00, 0x00, 0x00, 0x01, 0x00, orientation, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]);
    parts.push(app1);
  }
  let i = 2;
  while (i < bytes.length) {
    if (bytes[i] !== 0xff) return null;
    const marker = bytes[i + 1];
    if (marker === 0xda) { parts.push(bytes.subarray(i)); break; } // start of scan: rest is image data
    if (marker === 0xd8 || (marker >= 0xd0 && marker <= 0xd7) || marker === 0x01) { parts.push(bytes.subarray(i, i + 2)); i += 2; continue; }
    const len = (bytes[i + 2] << 8) | bytes[i + 3];
    if (len < 2 || i + 2 + len > bytes.length) return null;
    const drop = marker === 0xe1 || marker === 0xec || marker === 0xed || marker === 0xfe;
    if (!drop) parts.push(bytes.subarray(i, i + 2 + len));
    i += 2 + len;
  }
  const out = new Uint8Array(parts.reduce((s, p) => s + p.length, 0));
  let o = 0; for (const p of parts) { out.set(p, o); o += p.length; }
  return out;
}

/** Lossless removal for PNG: drop text, time and EXIF chunks */
export function stripPng(bytes: Uint8Array): Uint8Array | null {
  const sig = [137, 80, 78, 71, 13, 10, 26, 10];
  if (!sig.every((b, i) => bytes[i] === b)) return null;
  const parts: Uint8Array[] = [bytes.subarray(0, 8)];
  let i = 8;
  const dv = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  while (i + 8 <= bytes.length) {
    const len = dv.getUint32(i), type = String.fromCharCode(...bytes.subarray(i + 4, i + 8));
    const end = i + 12 + len;
    if (end > bytes.length) return null;
    if (!['tEXt', 'iTXt', 'zTXt', 'eXIf', 'tIME'].includes(type)) parts.push(bytes.subarray(i, end));
    i = end;
    if (type === 'IEND') break;
  }
  const out = new Uint8Array(parts.reduce((s, p) => s + p.length, 0));
  let o = 0; for (const p of parts) { out.set(p, o); o += p.length; }
  return out;
}
