// Decode audio with the browser's own decoders and write WAV or MP3 (MP3 is encoded in a worker).
export const audioSupported = () => typeof window !== 'undefined' && !!(window.OfflineAudioContext || (window as any).webkitOfflineAudioContext);

/** Decode any format the browser can play into PCM at 44.1 kHz */
export async function decodeFile(file: File, rate = 44100): Promise<AudioBuffer> {
  const OAC = window.OfflineAudioContext || (window as any).webkitOfflineAudioContext;
  const data = await file.arrayBuffer();
  const ctx = new OAC(2, 1, rate);
  try { return await ctx.decodeAudioData(data); }
  catch { throw new Error(`“${file.name}” couldn't be decoded. Your browser may not support this format: try MP3, WAV, M4A, OGG or FLAC, or use Chrome or Firefox.`); }
}

/** Take a section of the decoded audio, with optional fade in/out in seconds */
export function slice(buf: AudioBuffer, start: number, end: number, fadeIn = 0, fadeOut = 0, mono = false): Float32Array[] {
  const r = buf.sampleRate, a = Math.max(0, Math.floor(start * r)), b = Math.min(buf.length, Math.ceil(end * r)), n = Math.max(0, b - a);
  let chans = Array.from({ length: Math.min(buf.numberOfChannels, 2) }, (_, c) => buf.getChannelData(c).slice(a, b));
  if (mono && chans.length > 1) { const m = new Float32Array(n); for (let i = 0; i < n; i++) m[i] = (chans[0][i] + chans[1][i]) / 2; chans = [m]; }
  const fi = Math.min(n, Math.round(fadeIn * r)), fo = Math.min(n, Math.round(fadeOut * r));
  for (const ch of chans) { for (let i = 0; i < fi; i++) ch[i] *= i / fi; for (let i = 0; i < fo; i++) ch[n - 1 - i] *= i / fo; }
  return chans;
}

export function encodeWav(chans: Float32Array[], rate: number): Blob {
  const n = chans[0].length, c = chans.length, bytes = n * c * 2, view = new DataView(new ArrayBuffer(44 + bytes));
  const w = (o: number, s: string) => { for (let i = 0; i < s.length; i++) view.setUint8(o + i, s.charCodeAt(i)); };
  w(0, 'RIFF'); view.setUint32(4, 36 + bytes, true); w(8, 'WAVE'); w(12, 'fmt '); view.setUint32(16, 16, true); view.setUint16(20, 1, true);
  view.setUint16(22, c, true); view.setUint32(24, rate, true); view.setUint32(28, rate * c * 2, true); view.setUint16(32, c * 2, true); view.setUint16(34, 16, true);
  w(36, 'data'); view.setUint32(40, bytes, true);
  let o = 44; for (let i = 0; i < n; i++) for (let k = 0; k < c; k++) { const s = Math.max(-1, Math.min(1, chans[k][i])); view.setInt16(o, s < 0 ? s * 0x8000 : s * 0x7fff, true); o += 2; }
  return new Blob([view], { type: 'audio/wav' });
}

let worker: Worker | null = null;
export function cancelMp3() { worker?.terminate(); worker = null; }
export function encodeMp3(chans: Float32Array[], rate: number, kbps: number, onProgress?: (p: number) => void): Promise<Blob> {
  cancelMp3();
  const w = (worker = new Worker(new URL('../workers/mp3.ts', import.meta.url), { type: 'module' }));
  return new Promise((res, rej) => {
    w.onmessage = (e) => { if (e.data.progress !== undefined) onProgress?.(e.data.progress); else if (e.data.done) { res(e.data.done); w.terminate(); worker = null; } else if (e.data.error) { rej(new Error('MP3 encoding failed. Try WAV instead.')); w.terminate(); worker = null; } };
    w.onerror = () => rej(new Error('MP3 encoding failed. Try WAV instead.'));
    w.postMessage({ channels: chans, rate, kbps }, chans.map((c) => c.buffer));
  });
}

/** Min/max peaks for drawing a waveform */
export function peaks(buf: AudioBuffer, width: number): Float32Array {
  const out = new Float32Array(width * 2), d0 = buf.getChannelData(0), d1 = buf.numberOfChannels > 1 ? buf.getChannelData(1) : d0, step = buf.length / width;
  for (let x = 0; x < width; x++) {
    let mn = 1, mx = -1; const a = Math.floor(x * step), b = Math.min(buf.length, Math.floor((x + 1) * step)), skip = Math.max(1, Math.floor((b - a) / 400));
    for (let i = a; i < b; i += skip) { const v = (d0[i] + d1[i]) / 2; if (v < mn) mn = v; if (v > mx) mx = v; }
    out[x * 2] = mn; out[x * 2 + 1] = mx;
  }
  // Scale for display so quiet recordings are still visible
  let top = 0; for (const v of out) top = Math.max(top, Math.abs(v));
  if (top > 0.001) for (let i = 0; i < out.length; i++) out[i] = (out[i] / top) * 0.92;
  return out;
}
