import { zipSync } from 'fflate';

/** Build a ZIP from blobs, renaming duplicates. Images and PDFs are already compressed, so store them. */
export async function zipBlobs(files: { name: string; blob: Blob }[]): Promise<Blob> {
  const used = new Map<string, number>();
  const entries: Record<string, [Uint8Array, { level: 0 }]> = {};
  for (const f of files) {
    let name = f.name;
    const n = used.get(name) ?? 0;
    used.set(name, n + 1);
    if (n) name = name.replace(/(\.[^.]+)?$/, ` (${n})$1`);
    entries[name] = [new Uint8Array(await f.blob.arrayBuffer()), { level: 0 }];
  }
  const data = zipSync(entries);
  return new Blob([data as BlobPart], { type: 'application/zip' });
}
