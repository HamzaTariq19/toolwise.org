import { initDropzone } from './dropzone';
import { createResults } from './file-results';
import { pdfBlob, PdfPasswordError } from './pdf';
import { baseName, formatBytes, showError, setBusy } from './ui';

export interface Loaded { file: File; bytes: ArrayBuffer; pages: number }
export interface OptionsToolConfig {
  outSuffix: string;
  /** Read the PDF, return page count or throw a friendly error. allowLocked lets unlock-pdf accept encrypted files. */
  load?: (bytes: ArrayBuffer) => Promise<number>;
  onLoaded?: (l: Loaded) => void | Promise<void>;
  /** Return output bytes plus a short note, or throw Error(message) to show it under the form */
  process: (l: Loaded) => Promise<{ bytes: Uint8Array; note: string; name?: string; type?: string }>;
}

export function initOptionsTool(id: string, c: OptionsToolConfig) {
  const root = document.getElementById(id)!;
  const q = <T extends HTMLElement = HTMLElement>(s: string) => root.querySelector<T>(s)!;
  const pick = q('[data-step=pick]'), form = q<HTMLFormElement>('[data-step=options]'), err = q('[data-error]'), optErr = q('[data-opt-error]');
  let loaded: Loaded | null = null;
  const results = createResults(document.getElementById(`${id}-results`)!, {
    zipName: 'files.zip', showSavings: false,
    summary: (items) => `Your file is ready · ${items[0]?.note ?? ''}`,
    onReset: () => { loaded = null; pick.hidden = false; form.hidden = true; showError(err, null); },
  });
  form.addEventListener('input', () => showError(optErr, null));
  q('[data-cancel]').addEventListener('click', () => { loaded = null; form.hidden = true; pick.hidden = false; });
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!loaded) return;
    const btn = form.querySelector<HTMLButtonElement>('button[type=submit]')!;
    setBusy(btn, true, 'Working…');
    try {
      const r = await c.process(loaded);
      form.hidden = true;
      const name = r.name ?? `${baseName(loaded.file.name)}-${c.outSuffix}.pdf`;
      const blob = r.type ? new Blob([r.bytes as BlobPart], { type: r.type }) : pdfBlob(r.bytes);
      results.render([{ name, outName: name, originalSize: loaded.file.size, blob, note: r.note }]);
    } catch (er) {
      showError(optErr, (er as Error).message);
    } finally { setBusy(btn, false); }
  });
  initDropzone(document.getElementById(`${id}-drop`)!, {
    accept: ['application/pdf', '.pdf'], maxBytes: 200 * 1024 * 1024,
    onFiles: async ([f]) => {
      showError(err, null);
      try {
        const bytes = await f.arrayBuffer();
        let pages: number;
        if (c.load) pages = await c.load(bytes);
        else { const { loadPdfLibDoc } = await import('./pdf'); pages = (await loadPdfLibDoc(bytes)).getPageCount(); }
        loaded = { file: f, bytes, pages };
        q('[data-fname]').textContent = f.name;
        q('[data-fmeta]').textContent = `${pages ? `${pages} page${pages === 1 ? '' : 's'} · ` : ''}${formatBytes(f.size)}`;
        await c.onLoaded?.(loaded);
        pick.hidden = true; form.hidden = false; showError(optErr, null);
      } catch (e) { showError(err, e instanceof PdfPasswordError || e instanceof Error ? e.message : 'This file could not be opened.'); }
    },
    onError: (m) => showError(err, m || null),
  });
  return { get loaded() { return loaded; }, form };
}
