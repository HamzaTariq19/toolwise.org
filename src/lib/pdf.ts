// Lazy loaders for PDF libraries so they only download on PDF tool pages, and only when needed.
import type { PDFDocumentProxy, PDFPageProxy } from 'pdfjs-dist/types/src/display/api';

let pdfjsPromise: Promise<typeof import('pdfjs-dist')> | null = null;

export function getPdfjs() {
  if (!pdfjsPromise) {
    pdfjsPromise = (async () => {
      // The legacy build supports older Safari/Chrome versions still common on phones
      const pdfjs = (await import('pdfjs-dist/legacy/build/pdf.mjs')) as unknown as typeof import('pdfjs-dist');
      const { default: workerUrl } = await import('pdfjs-dist/legacy/build/pdf.worker.min.mjs?url');
      pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;
      return pdfjs;
    })();
  }
  return pdfjsPromise;
}

export const getPdfLib = () => import('pdf-lib');

export class PdfPasswordError extends Error {}

/** Open a PDF for rendering. Throws friendly errors. */
export async function openPdf(data: ArrayBuffer | Uint8Array, password?: string): Promise<PDFDocumentProxy> {
  const pdfjs = await getPdfjs();
  try {
    // pdf.js transfers the buffer to its worker, so give it a copy
    const bytes = data instanceof Uint8Array ? data.slice() : new Uint8Array(data.slice(0));
    return await pdfjs.getDocument({ data: bytes, password }).promise;
  } catch (e) {
    const name = (e as { name?: string }).name;
    if (name === 'PasswordException') throw new PdfPasswordError('This PDF is protected with a password. Unlock it first, then try again.');
    throw new Error('This file could not be read as a PDF. It may be damaged or not a real PDF file.');
  }
}

export async function renderPage(page: PDFPageProxy, scale: number, background = '#ffffff'): Promise<HTMLCanvasElement> {
  const viewport = page.getViewport({ scale });
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.floor(viewport.width));
  canvas.height = Math.max(1, Math.floor(viewport.height));
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = background;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  await page.render({ canvasContext: ctx, canvas, viewport }).promise;
  return canvas;
}

/** Load with pdf-lib, with friendly errors for encrypted/damaged files */
export async function loadPdfLibDoc(bytes: ArrayBuffer) {
  const { PDFDocument } = await getPdfLib();
  let doc;
  try {
    doc = await PDFDocument.load(bytes, { ignoreEncryption: true, updateMetadata: false });
  } catch {
    throw new Error('This file could not be read as a PDF. It may be damaged or not a real PDF file.');
  }
  if (doc.isEncrypted) throw new PdfPasswordError('This PDF is protected with a password. Unlock it first, then try again.');
  return doc;
}

export const pdfBlob = (bytes: Uint8Array) => new Blob([bytes as BlobPart], { type: 'application/pdf' });

/** Parse "1-3, 5, 8-10" into zero-based page indexes. Returns error string on bad input. */
export function parseRanges(input: string, pageCount: number): { groups: number[][] } | { error: string } {
  const parts = input.split(/[,;]+/).map((s) => s.trim()).filter(Boolean);
  if (!parts.length) return { error: 'Please enter at least one page number, for example 1-3, 5.' };
  const groups: number[][] = [];
  for (const part of parts) {
    const m = part.match(/^(\d+)\s*(?:[-–to]+\s*(\d+|end))?$/i);
    if (!m) return { error: `“${part}” is not a valid page range. Use numbers like 2 or 4-7.` };
    const a = Number(m[1]);
    const b = m[2] ? (m[2].toLowerCase() === 'end' ? pageCount : Number(m[2])) : a;
    if (a < 1 || b < 1 || a > pageCount || b > pageCount)
      return { error: `Page ${Math.max(a, b)} does not exist. This PDF has ${pageCount} page${pageCount === 1 ? '' : 's'}.` };
    const lo = Math.min(a, b), hi = Math.max(a, b);
    groups.push(Array.from({ length: hi - lo + 1 }, (_, i) => lo - 1 + i));
  }
  return { groups };
}
