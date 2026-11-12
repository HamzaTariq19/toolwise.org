import { downloadBlob, formatBytes } from './ui';

export interface ResultItem {
  name: string; // original file name
  originalSize: number;
  blob?: Blob;
  outName?: string;
  error?: string;
  note?: string; // e.g. "1920 × 1080"
  thumb?: boolean; // show image preview from blob
}

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);

const dlIcon = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 15V3"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/></svg>';

export function createResults(
  root: HTMLElement,
  opts: { zipName: string; onReset: () => void; showSavings?: boolean; summary?: (items: ResultItem[]) => string },
) {
  const progress = root.querySelector<HTMLElement>('[data-progress]')!;
  const label = root.querySelector<HTMLElement>('[data-progress-label]')!;
  const bar = root.querySelector<HTMLElement>('[data-progress-bar]')!;
  const fill = root.querySelector<HTMLElement>('[data-progress-fill]')!;
  const done = root.querySelector<HTMLElement>('[data-done]')!;
  const list = root.querySelector<HTMLElement>('[data-list]')!;
  const summary = root.querySelector<HTMLElement>('[data-summary]')!;
  const dl = root.querySelector<HTMLButtonElement>('[data-download]')!;
  const dlLabel = dl.querySelector<HTMLElement>('[data-label]')!;
  const defaultLabel = dlLabel.textContent;
  let urls: string[] = [];
  let current: ResultItem[] = [];

  const revoke = () => { urls.forEach(URL.revokeObjectURL); urls = []; };

  dl.addEventListener('click', async () => {
    const ok = current.filter((i) => i.blob);
    if (ok.length === 1) return downloadBlob(ok[0].blob!, ok[0].outName!);
    dl.disabled = true;
    dlLabel.textContent = 'Preparing ZIP…';
    const { zipBlobs } = await import('./zip');
    const zip = await zipBlobs(ok.map((i) => ({ name: i.outName!, blob: i.blob! })));
    downloadBlob(zip, opts.zipName);
    dl.disabled = false;
    dlLabel.textContent = `Download all (ZIP)`;
  });
  root.querySelector('[data-reset]')!.addEventListener('click', () => { reset(); opts.onReset(); });

  list.addEventListener('click', (e) => {
    const b = (e.target as HTMLElement).closest<HTMLButtonElement>('[data-row-dl]');
    if (!b) return;
    const item = current[Number(b.dataset.rowDl)];
    if (item?.blob) downloadBlob(item.blob, item.outName!);
  });

  function setProgress(doneCount: number, total: number, text: string) {
    done.hidden = true;
    progress.hidden = false;
    label.textContent = text;
    const pct = total ? Math.round((doneCount / total) * 100) : 0;
    fill.style.width = `${Math.max(4, pct)}%`;
    bar.setAttribute('aria-valuenow', String(pct));
  }

  function render(items: ResultItem[]) {
    revoke();
    current = items;
    progress.hidden = true;
    done.hidden = false;
    const ok = items.filter((i) => i.blob);
    const before = ok.reduce((s, i) => s + i.originalSize, 0);
    const after = ok.reduce((s, i) => s + i.blob!.size, 0);
    const multi = items.length > 1;

    list.innerHTML = items
      .map((it, idx) => {
        let thumb = '';
        if (it.thumb && it.blob) {
          const u = URL.createObjectURL(it.blob);
          urls.push(u);
          thumb = `<img src="${u}" alt="" class="h-14 w-14 flex-none rounded-lg border border-line bg-surface-2 object-contain" loading="lazy" />`;
        }
        let sizes = '';
        if (it.error) sizes = `<span class="text-danger">${esc(it.error)}</span>`;
        else if (it.blob) {
          const pct = Math.round((1 - it.blob.size / it.originalSize) * 100);
          const badge =
            opts.showSavings !== false
              ? pct > 0
                ? `<span class="badge !bg-success-soft !text-success">${pct}% smaller</span>`
                : pct < 0
                  ? `<span class="badge">${-pct}% larger</span>`
                  : ''
              : '';
          sizes =
            opts.showSavings === false
              ? `<span class="tabular">${formatBytes(it.blob.size)}</span>`
              : `<span class="tabular">${formatBytes(it.originalSize)} → <strong class="text-ink">${formatBytes(it.blob.size)}</strong></span> ${badge}`;
        }
        return `<li class="flex items-center gap-3 px-5 py-3.5">
          ${thumb}
          <div class="min-w-0 flex-1">
            <p class="truncate font-medium">${esc(it.outName ?? it.name)}</p>
            <p class="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted">${sizes}${it.note ? `<span>· ${esc(it.note)}</span>` : ''}</p>
          </div>
          ${multi && it.blob ? `<button type="button" class="btn btn-ghost h-11 w-11 !p-0" data-row-dl="${idx}" aria-label="Download ${esc(it.outName!)}">${dlIcon}</button>` : ''}
        </li>`;
      })
      .join('');

    if (opts.summary) summary.textContent = opts.summary(items);
    else if (!ok.length) summary.textContent = 'Nothing could be processed.';
    else {
      const pct = Math.round((1 - after / before) * 100);
      summary.textContent =
        opts.showSavings === false
          ? `${ok.length} file${ok.length > 1 ? 's' : ''} ready`
          : `${ok.length} file${ok.length > 1 ? 's' : ''} ready · ${formatBytes(before)} → ${formatBytes(after)}` + (pct > 0 ? ` (${pct}% smaller)` : '');
    }
    root.querySelector<HTMLElement>('[data-summary-wrap]')!.classList.toggle('!bg-danger-soft', !ok.length);
    dl.hidden = !ok.length;
    dlLabel.textContent = ok.length > 1 ? 'Download all (ZIP)' : defaultLabel;
  }

  function reset() {
    revoke();
    current = [];
    progress.hidden = true;
    done.hidden = true;
  }

  return { setProgress, render, reset };
}
