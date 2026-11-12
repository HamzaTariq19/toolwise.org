import { initDropzone } from './dropzone';
import { decodeAny, toBlob, encode, canEncodeWebP, hasTransparency, MAX_PIXELS, MIME_EXT, type Decoded } from './image';
import { baseName, downloadBlob, showError, setBusy, formatBytes } from './ui';

export const IMAGE_ACCEPT = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/bmp', '.jpg', '.jpeg', '.png', '.webp', '.gif', '.bmp', '.heic', '.heif'];

export interface EditorConfig {
  suffix: string;
  /**
   * Draw the result. `scale` is 1 for the downloaded file and smaller for the live preview,
   * so measure sizes relative to the image (e.g. a percentage of its width).
   */
  render: (img: Decoded, scale: number) => HTMLCanvasElement;
  /** Optional different drawing for the on-screen preview (e.g. crop shows the whole image) */
  preview?: (img: Decoded, scale: number) => HTMLCanvasElement;
  /** Optional text under the preview, e.g. the output size */
  describe?: (img: Decoded) => string;
  onLoad?: (img: Decoded, file: File) => void;
  /** Return an error message to block downloading */
  validate?: () => string | null;
}

export function initImageEditor(id: string, c: EditorConfig) {
  const root = document.getElementById(id)!;
  const q = <T extends HTMLElement = HTMLElement>(s: string) => root.querySelector<T>(s)!;
  const preview = q<HTMLCanvasElement>('[data-preview]'), fmt = q<HTMLSelectElement>('[data-format]');
  const err = q('[data-error]'), optErr = q('[data-opt-error]');
  if (!canEncodeWebP()) fmt.querySelector('option[value="image/webp"]')?.remove();
  fmt.value = root.dataset.defaultFormat || 'auto';
  let img: Decoded | null = null, file: File | null = null, raf = 0, previewScale = 1;

  function draw() {
    if (!img) return;
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      const out = (c.preview ?? c.render)(img!, previewScale);
      preview.width = out.width; preview.height = out.height;
      preview.getContext('2d')!.drawImage(out, 0, 0);
      q('[data-dims]').textContent = c.describe ? c.describe(img!) : `${Math.round(out.width / previewScale)} × ${Math.round(out.height / previewScale)} px`;
    });
  }

  function reset() { img?.close?.(); img = null; file = null; q('[data-step=edit]').hidden = true; q('[data-step=pick]').hidden = false; showError(err, null); }
  q('[data-reset]').addEventListener('click', reset);
  root.addEventListener('input', (e) => { if (!(e.target as HTMLElement).closest('[data-step=pick]')) { showError(optErr, null); draw(); } });
  root.addEventListener('change', (e) => { if (!(e.target as HTMLElement).closest('[data-step=pick]') && e.target !== fmt) draw(); });

  q('[data-download]').addEventListener('click', async (e) => {
    if (!img || !file) return;
    const problem = c.validate?.();
    if (problem) return showError(optErr, problem);
    const btn = e.currentTarget as HTMLButtonElement;
    setBusy(btn, true, 'Preparing…');
    try {
      await new Promise((r) => setTimeout(r, 30));
      const out = c.render(img, 1);
      let type = fmt.value === 'auto' ? (['image/jpeg', 'image/png', 'image/webp'].includes(file.type) ? file.type : 'image/png') : fmt.value;
      let canvas = out;
      if (type === 'image/jpeg' && hasTransparency(out)) {
        // JPG cannot store transparency: put it on white
        canvas = document.createElement('canvas'); canvas.width = out.width; canvas.height = out.height;
        const g = canvas.getContext('2d')!; g.fillStyle = '#fff'; g.fillRect(0, 0, out.width, out.height); g.drawImage(out, 0, 0);
      }
      if (type === 'image/webp' && !canEncodeWebP()) type = 'image/png';
      const blob = await (type === 'image/png' ? toBlob(canvas, 'image/png') : encode(canvas, type, 0.92));
      downloadBlob(blob, `${baseName(file.name)}-${c.suffix}.${MIME_EXT[type]}`);
      q('[data-dims]').textContent = `${out.width} × ${out.height} px · ${formatBytes(blob.size)} downloaded`;
    } catch (er) { showError(optErr, (er as Error).message); }
    finally { setBusy(btn, false); }
  });

  initDropzone(document.getElementById(`${id}-drop`)!, {
    accept: IMAGE_ACCEPT, maxBytes: 50 * 1024 * 1024,
    onFiles: async ([f]) => {
      showError(err, null);
      try {
        const d = await decodeAny(f);
        if (d.width * d.height > MAX_PIXELS * 1.5) throw new Error(`This image is ${d.width} × ${d.height} pixels, which is too large to edit in a browser. Resize it to under 16 megapixels first.`);
        img = d; file = f;
        previewScale = Math.min(1, 1400 / Math.max(d.width, d.height));
        c.onLoad?.(d, f);
        q('[data-step=pick]').hidden = true; q('[data-step=edit]').hidden = false;
        draw();
      } catch (e) { showError(err, (e as Error).message); }
    },
    onError: (m) => showError(err, m || null),
  });

  return {
    redraw: draw,
    get img() { return img; },
    get file() { return file; },
    get previewScale() { return previewScale; },
    preview,
    /** Convert a pointer position to coordinates in the ORIGINAL image */
    toImage(clientX: number, clientY: number, outW?: number, outH?: number) {
      const r = preview.getBoundingClientRect();
      const w = outW ?? img!.width, h = outH ?? img!.height;
      return { x: ((clientX - r.left) / r.width) * w, y: ((clientY - r.top) / r.height) * h };
    },
  };
}

/** Make a canvas of the given size and return it with its 2D context */
export function makeCanvas(w: number, h: number) {
  const c = document.createElement('canvas');
  c.width = Math.max(1, Math.round(w)); c.height = Math.max(1, Math.round(h));
  const g = c.getContext('2d')!;
  g.imageSmoothingQuality = 'high';
  return { c, g };
}
