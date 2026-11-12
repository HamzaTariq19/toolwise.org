// In-browser background removal: ISNet (Apache-2.0) quantized to 8 bits, run by ONNX Runtime Web.
import vendor from '../data/vendor.json';
import { fetchLarge, isCached } from './fetch-parts';

const MODEL = '/models/isnet-general-use-q8/model.onnx', WASM = `/vendor/ort/${vendor.ort.version}/ort-wasm-simd-threaded.wasm`;
export const MODEL_BYTES = 46_360_717 + vendor.ort.size;
const SIZE = 1024;
let worker: Worker | null = null, ready: Promise<Worker> | null = null;

export const bgSupported = () => typeof WebAssembly === 'object' && typeof Worker === 'function';
export async function modelCached() { return (await isCached(MODEL)) && (await isCached(WASM)); }

export function loadModel(onProgress: (loaded: number, total: number, cached: boolean) => void, signal?: AbortSignal): Promise<Worker> {
  if (ready) return ready;
  ready = (async () => {
    let doneModel = 0, doneWasm = 0, cachedAll = true;
    const report = () => onProgress(doneModel + doneWasm, MODEL_BYTES, cachedAll);
    const [wasm, model] = await Promise.all([
      fetchLarge(WASM, (l, _t, c) => { doneWasm = l; cachedAll &&= c; report(); }, signal, 'application/wasm', false),
      fetchLarge(MODEL, (l, _t, c) => { doneModel = l; cachedAll &&= c; report(); }, signal),
    ]);
    const w = new Worker(new URL('../workers/bg-remove.ts', import.meta.url), { type: 'module' });
    const [wb, mb] = await Promise.all([wasm.arrayBuffer(), model.arrayBuffer()]);
    await new Promise<void>((res, rej) => {
      w.onmessage = (e) => (e.data.type === 'ready' ? res() : rej(new Error(e.data.message)));
      w.onerror = () => rej(new Error('The AI model could not start in this browser.'));
      w.postMessage({ type: 'init', wasm: wb, model: mb }, [wb, mb]);
    });
    worker = w; return w;
  })();
  ready.catch(() => { ready = null; });
  return ready;
}
export function stopModel() { worker?.terminate(); worker = null; ready = null; }

/** Returns a mask canvas (SIZE × SIZE, alpha in the red channel scaled 0–255) */
export async function predict(img: CanvasImageSource & { width: number; height: number }): Promise<HTMLCanvasElement> {
  const w = await (ready ?? Promise.reject(new Error('Model not loaded')));
  const c = document.createElement('canvas'); c.width = c.height = SIZE;
  const ctx = c.getContext('2d', { willReadFrequently: true })!; ctx.drawImage(img, 0, 0, SIZE, SIZE);
  const px = ctx.getImageData(0, 0, SIZE, SIZE).data, n = SIZE * SIZE, input = new Float32Array(3 * n);
  let max = 1; for (let i = 0; i < px.length; i += 4) { if (px[i] > max) max = px[i]; if (px[i + 1] > max) max = px[i + 1]; if (px[i + 2] > max) max = px[i + 2]; }
  for (let i = 0; i < n; i++) { input[i] = px[i * 4] / max - 0.5; input[n + i] = px[i * 4 + 1] / max - 0.5; input[2 * n + i] = px[i * 4 + 2] / max - 0.5; }
  const mask: Float32Array = await new Promise((res, rej) => {
    w.onmessage = (e) => (e.data.type === 'mask' ? res(e.data.mask) : rej(new Error('The AI model failed on this image. Try a smaller or different photo.')));
    w.postMessage({ type: 'run', input, size: SIZE }, [input.buffer]);
  });
  const out = ctx.createImageData(SIZE, SIZE);
  for (let i = 0; i < n; i++) { const v = Math.round(mask[i] * 255); out.data[i * 4] = out.data[i * 4 + 1] = out.data[i * 4 + 2] = 255; out.data[i * 4 + 3] = v; }
  ctx.putImageData(out, 0, 0);
  return c;
}

/** Apply the mask to the full-size image */
export function cutout(img: CanvasImageSource, w: number, h: number, mask: HTMLCanvasElement, bg: string | null): HTMLCanvasElement {
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  const ctx = c.getContext('2d')!;
  ctx.imageSmoothingQuality = 'high'; ctx.drawImage(mask, 0, 0, w, h); // scaled alpha mask
  ctx.globalCompositeOperation = 'source-in'; ctx.drawImage(img, 0, 0, w, h);
  if (bg) { ctx.globalCompositeOperation = 'destination-over'; ctx.fillStyle = bg; ctx.fillRect(0, 0, w, h); }
  ctx.globalCompositeOperation = 'source-over';
  return c;
}
