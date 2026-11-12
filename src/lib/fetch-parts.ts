// Downloads a large file that may be split into parts (Cloudflare Pages limits files to 25 MiB),
// reports progress, and keeps a copy in the Cache API so the next visit loads instantly.

export type Progress = (loaded: number, total: number, cached: boolean) => void;
const CACHE = 'toolwise-heavy-v1';

async function cacheGet(url: string) { try { return (await (await caches.open(CACHE)).match(url)) ?? null; } catch { return null; } }
async function cachePut(url: string, blob: Blob) { try { await (await caches.open(CACHE)).put(url, new Response(blob, { headers: { 'Content-Type': 'application/octet-stream' } })); } catch { /* storage full or unavailable */ } }

/** Is the full file already stored on this device? */
export async function isCached(url: string) { return !!(await cacheGet(new URL(url, location.href).href)); }

async function readStream(res: Response, onChunk: (n: number) => void, signal?: AbortSignal) {
  if (!res.body) { const b = await res.arrayBuffer(); onChunk(b.byteLength); return [new Uint8Array(b)]; }
  const reader = res.body.getReader(), chunks: Uint8Array[] = [];
  for (;;) {
    if (signal?.aborted) { reader.cancel().catch(() => {}); throw new DOMException('Cancelled', 'AbortError'); }
    const { done, value } = await reader.read(); if (done) break;
    chunks.push(value); onChunk(value.byteLength);
  }
  return chunks;
}

/** Fetch `url` (or `url.part1…N` described by `url.parts.json`) as one Blob */
export async function fetchLarge(url: string, onProgress?: Progress, signal?: AbortSignal, type = 'application/octet-stream', split = true): Promise<Blob> {
  const abs = new URL(url, location.href).href;
  const hit = await cacheGet(abs);
  if (hit) { const b = await hit.blob(); onProgress?.(b.size, b.size, true); return new Blob([b], { type }); }
  let parts = 0, total = 0;
  const meta = split ? await fetch(`${abs}.parts.json`, { signal }).catch(() => null) : null;
  if (meta?.ok) { const j = await meta.json(); parts = j.parts; total = j.size; }
  const urls = parts ? Array.from({ length: parts }, (_, i) => `${abs}.part${i + 1}`) : [abs];
  let loaded = 0; const chunks: Uint8Array[] = [];
  for (const u of urls) {
    const res = await fetch(u, { signal });
    if (!res.ok) throw new Error(`Download failed (${res.status}). Check your connection and try again.`);
    if (!parts) total = Number(res.headers.get('Content-Length')) || 0;
    chunks.push(...(await readStream(res, (n) => { loaded += n; onProgress?.(loaded, total || loaded, false); }, signal)));
  }
  const blob = new Blob(chunks as BlobPart[], { type });
  void cachePut(abs, blob);
  return blob;
}
