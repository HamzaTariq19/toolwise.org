// ffmpeg.wasm (single-thread build: no SharedArrayBuffer, so no special COOP/COEP headers are needed).
// Loaded only on the audio and video pages that import this module.
import { FFmpeg } from '@ffmpeg/ffmpeg';
import vendor from '../data/vendor.json';
import { fetchLarge, isCached, type Progress } from './fetch-parts';

const BASE = `/vendor/ffmpeg/${vendor.ffmpeg.version}`;
export const FFMPEG_SIZE = vendor.ffmpeg.size;
let ff: FFmpeg | null = null, loading: Promise<FFmpeg> | null = null;
let logs: string[] = [];

export const ffmpegCached = () => isCached(`${BASE}/ffmpeg-core.wasm`);
export function ffmpegSupported() { return typeof WebAssembly === 'object' && typeof Worker === 'function' && 'arrayBuffer' in Blob.prototype; }

export async function loadFFmpeg(onProgress?: Progress, signal?: AbortSignal): Promise<FFmpeg> {
  if (ff) return ff;
  if (loading) return loading;
  loading = (async () => {
    const wasm = await fetchLarge(`${BASE}/ffmpeg-core.wasm`, onProgress, signal, 'application/wasm');
    const inst = new FFmpeg();
    inst.on('log', ({ message }) => { logs.push(message); if (logs.length > 400) logs = logs.slice(-200); });
    const wasmURL = URL.createObjectURL(wasm);
    await inst.load({ coreURL: new URL(`${BASE}/ffmpeg-core.js`, location.href).href, wasmURL });
    ff = inst; return inst;
  })();
  try { return await loading; } finally { loading = null; }
}

/** Stop whatever ffmpeg is doing. The next job reloads it (from the cache, so it's quick). */
export function cancelFFmpeg() { try { ff?.terminate(); } catch {} ff = null; }

export type Probe = { duration: number; video?: { codec: string; w: number; h: number; fps: number }; audio?: { codec: string; rate: number; channels: string } };
const IN_DIR = '/in';

/** Make a File readable by ffmpeg without copying it into memory */
async function mount(f: FFmpeg, file: File) {
  try { await f.unmount(IN_DIR); } catch {}
  try { await f.createDir(IN_DIR); } catch {}
  await f.mount('WORKERFS' as never, { files: [file] }, IN_DIR);
  return `${IN_DIR}/${file.name}`;
}

export async function probe(file: File, onProgress?: Progress): Promise<Probe> {
  const f = await loadFFmpeg(onProgress);
  const path = await mount(f, file); logs = [];
  await f.exec(['-hide_banner', '-i', path]).catch(() => {});
  const text = logs.join('\n'); const p: Probe = { duration: 0 };
  const d = text.match(/Duration: (\d+):(\d+):([\d.]+)/); if (d) p.duration = +d[1] * 3600 + +d[2] * 60 + +d[3];
  const v = text.match(/Stream #\d+:\d+[^:]*: Video: (\w+)[^\n]*?, (\d{2,5})x(\d{2,5})[^\n]*?(?:, ([\d.]+) fps)?/);
  if (v) p.video = { codec: v[1], w: +v[2], h: +v[3], fps: v[4] ? +v[4] : 0 };
  const a = text.match(/Stream #\d+:\d+[^:]*: Audio: (\w+)[^\n]*?, (\d+) Hz, ([^,\n]+)/);
  if (a) p.audio = { codec: a[1], rate: +a[2], channels: a[3].trim() };
  if (!p.duration && !p.video && !p.audio) throw new Error('This file could not be read. It may be damaged, or use a format that isn\'t supported.');
  return p;
}

/**
 * Run ffmpeg on one input file. `args` may use {in} for the input path.
 * `expected` is the length of the output in seconds, used for the progress bar.
 */
export async function run(file: File, args: string[], out: string, expected: number, onProgress?: (fraction: number) => void): Promise<Uint8Array> {
  const f = await loadFFmpeg();
  const path = await mount(f, file); logs = [];
  const handler = ({ time }: { time: number }) => { if (expected > 0 && time > 0) onProgress?.(Math.min(1, time / 1e6 / expected)); };
  f.on('progress', handler);
  try {
    const code = await f.exec(args.map((a) => (a === '{in}' ? path : a)));
    if (code !== 0) throw new Error(friendly(logs.join('\n')));
    const data = (await f.readFile(out)) as Uint8Array;
    await f.deleteFile(out).catch(() => {});
    if (!data.length) throw new Error('The result was empty. Try a different start and end time.');
    return data;
  } finally { f.off('progress', handler); try { await f.unmount(IN_DIR); } catch {} }
}

function friendly(log: string) {
  if (/memory|OOM|Cannot enlarge memory/i.test(log)) return 'Your device ran out of memory. Try a shorter clip, a lower resolution, or a computer with more memory.';
  if (/Invalid data found|could not find codec|Unknown decoder/i.test(log)) return 'This file uses a format or codec that can\'t be processed here. Try converting it to MP4 first.';
  if (/does not contain any stream|Output file is empty|matches no streams/i.test(log)) return 'The file has no matching audio or video track for this tool.';
  return 'Processing failed. The file may be damaged or in an unusual format.';
}

export const toBlob = (data: Uint8Array, type: string) => new Blob([data as BlobPart], { type });
export const hms = (s: number) => { const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), r = s - h * 3600 - m * 60; return `${h ? `${h}:` : ''}${h ? String(m).padStart(2, '0') : m}:${r.toFixed(1).padStart(4, '0')}`; };
export const sec = (s: number) => s.toFixed(3);
