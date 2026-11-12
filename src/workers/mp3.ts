// MP3 encoding off the main thread (lamejs, LGPL-3.0: https://github.com/zhuker/lamejs)
import { Mp3Encoder } from '@breezystack/lamejs';

type Job = { channels: Float32Array[]; rate: number; kbps: number };
const toInt16 = (f: Float32Array, from: number, to: number) => {
  const out = new Int16Array(to - from);
  for (let i = from; i < to; i++) { const s = Math.max(-1, Math.min(1, f[i])); out[i - from] = s < 0 ? s * 0x8000 : s * 0x7fff; }
  return out;
};
self.onmessage = (e: MessageEvent<Job>) => {
  try {
    const { channels, rate, kbps } = e.data, n = channels[0].length, stereo = channels.length > 1;
    const enc = new Mp3Encoder(stereo ? 2 : 1, rate, kbps), parts: Uint8Array[] = [], BLOCK = 1152 * 20;
    let last = 0;
    for (let i = 0; i < n; i += BLOCK) {
      const j = Math.min(n, i + BLOCK);
      const buf = stereo ? enc.encodeBuffer(toInt16(channels[0], i, j), toInt16(channels[1], i, j)) : enc.encodeBuffer(toInt16(channels[0], i, j));
      if (buf.length) parts.push(new Uint8Array(buf));
      const p = j / n; if (p - last > 0.01) { last = p; (self as unknown as Worker).postMessage({ progress: p }); }
    }
    const end = enc.flush(); if (end.length) parts.push(new Uint8Array(end));
    (self as unknown as Worker).postMessage({ done: new Blob(parts as BlobPart[], { type: 'audio/mpeg' }) });
  } catch (err) { (self as unknown as Worker).postMessage({ error: String(err) }); }
};
