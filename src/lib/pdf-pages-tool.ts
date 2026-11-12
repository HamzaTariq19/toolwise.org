import type { PDFDocument } from 'pdf-lib';
import type { PDFDocumentProxy } from 'pdfjs-dist/types/src/display/api';
import { initDropzone } from './dropzone';
import { createResults } from './file-results';
import { createThumbGrid, type ThumbMode, type ThumbState } from './pdf-thumbs';
import { openPdf, loadPdfLibDoc, pdfBlob, parseRanges } from './pdf';
import { baseName, formatBytes, showError, setBusy } from './ui';

export interface PagesToolOptions {
  mode: ThumbMode;
  selectStyle?: 'keep' | 'remove';
  outSuffix: string;
  /** Return an error message to block, or null */
  validate?: (pages: ThumbState[]) => string | null;
  /** Label for the run button given current state */
  label?: (pages: ThumbState[]) => string;
  process: (doc: PDFDocument, pages: ThumbState[]) => Promise<PDFDocument>;
  note?: (out: PDFDocument) => string;
}

export function initPagesTool(id: string, o: PagesToolOptions) {
  const root = document.getElementById(id)!;
  const q = <T extends HTMLElement = HTMLElement>(s: string) => root.querySelector<T>(s)!;
  const pick = q('[data-step=pick]'), step = q('[data-step=pages]'), err = q('[data-error]'), optErr = q('[data-opt-error]');
  const run = q<HTMLButtonElement>('[data-run]');
  let file: File | null = null, bytes: ArrayBuffer | null = null, view: PDFDocumentProxy | null = null;
  let grid: ReturnType<typeof createThumbGrid> | null = null;

  const results = createResults(document.getElementById(`${id}-results`)!, {
    zipName: 'pdf.zip', showSavings: false,
    summary: (items) => `Your PDF is ready · ${items[0]?.note ?? ''}`,
    onReset: () => reset(),
  });

  function reset() { grid?.destroy(); grid = null; view?.loadingTask.destroy(); view = null; file = null; bytes = null; step.hidden = true; pick.hidden = false; showError(err, null); results.reset(); }

  const onChange = (pages: ThumbState[]) => {
    showError(optErr, null);
    if (o.label) run.querySelector('[data-label]')!.textContent = o.label(pages);
    run.disabled = !!o.validate?.(pages);
  };

  q('[data-cancel]').addEventListener('click', reset);
  const rangeIn = root.querySelector<HTMLInputElement>('[data-range]');
  const applyRange = () => {
    if (!rangeIn || !grid) return;
    const r = parseRanges(rangeIn.value, grid.pages.length);
    if ('error' in r) { rangeIn.setAttribute('aria-invalid', 'true'); return showError(optErr, r.error); }
    rangeIn.removeAttribute('aria-invalid');
    const set = new Set(r.groups.flat());
    grid.setAll((p) => (p.selected = set.has(p.index)));
  };
  root.querySelector('[data-apply-range]')?.addEventListener('click', applyRange);
  rangeIn?.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); applyRange(); } });

  run.addEventListener('click', async () => {
    if (!grid || !bytes || !file) return;
    const problem = o.validate?.(grid.pages);
    if (problem) return showError(optErr, problem);
    setBusy(run, true, 'Working…');
    try {
      const doc = await loadPdfLibDoc(bytes);
      const out = await o.process(doc, grid.pages);
      const saved = await out.save({ useObjectStreams: true });
      step.hidden = true;
      const name = `${baseName(file.name)}-${o.outSuffix}.pdf`;
      results.render([{ name, outName: name, originalSize: file.size, blob: pdfBlob(saved), note: o.note ? o.note(out) : `${out.getPageCount()} page${out.getPageCount() === 1 ? '' : 's'}` }]);
    } catch (e) {
      showError(optErr, `Something went wrong: ${(e as Error).message}`);
    } finally { setBusy(run, false); }
  });

  initDropzone(document.getElementById(`${id}-drop`)!, {
    accept: ['application/pdf', '.pdf'], maxBytes: 200 * 1024 * 1024,
    onFiles: async ([f]) => {
      showError(err, null);
      try {
        const buf = await f.arrayBuffer();
        await loadPdfLibDoc(buf); // friendly errors for damaged or locked files
        view = await openPdf(buf);
        file = f; bytes = buf;
        q('[data-fname]').textContent = f.name;
        q('[data-fmeta]').textContent = `${view.numPages} page${view.numPages === 1 ? '' : 's'} · ${formatBytes(f.size)}`;
        pick.hidden = true; step.hidden = false;
        grid = createThumbGrid(q('[data-grid]'), view, { mode: o.mode, selectStyle: o.selectStyle, onChange });
      } catch (e) { showError(err, (e as Error).message); }
    },
    onError: (m) => showError(err, m || null),
  });

  return { get grid() { return grid; } };
}
