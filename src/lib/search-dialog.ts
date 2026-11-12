import { searchIndex, type IndexEntry } from './search';

let index: IndexEntry[] | null = null;
async function loadIndex() {
  if (!index) index = await fetch('/search-index.json').then((r) => r.json());
  return index!;
}

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);

export function initSearchDialog() {
  const dialog = document.getElementById('search-dialog') as HTMLDialogElement | null;
  if (!dialog) return;
  const input = document.getElementById('search-dialog-input') as HTMLInputElement;
  const list = document.getElementById('search-dialog-results')!;
  let active = 0;

  const render = async () => {
    const idx = await loadIndex();
    const q = input.value.trim();
    const results = q ? searchIndex(idx, q, 30) : idx.filter((e) => e.l).slice(0, 8);
    active = 0;
    if (!results.length) {
      list.innerHTML = `<li class="px-3 py-8 text-center text-muted">No tools match “${esc(q)}”. Try a simpler word like “pdf” or “photo”.</li>`;
      return;
    }
    list.innerHTML =
      (q ? '' : '<li class="px-3 pb-1 pt-2 text-xs font-semibold uppercase tracking-wide text-subtle">Popular</li>') +
      results
        .map(
          (e, i) => `<li role="option" aria-selected="${i === 0}">
        <a href="/${e.s}" class="cat-${e.c} flex min-h-12 items-center gap-3 rounded-lg px-3 py-2 text-ink no-underline aria-selected:bg-surface-2 hover:bg-surface-2" data-idx="${i}">
          <span class="icon-tile h-9 w-9"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e.i}</svg></span>
          <span class="min-w-0 flex-1"><span class="block font-semibold">${esc(e.n)}</span><span class="block truncate text-sm text-subtle">${esc(e.d)}</span></span>
          ${e.l ? '' : '<span class="badge">Soon</span>'}
        </a></li>`,
        )
        .join('');
    highlight();
  };

  const options = () => Array.from(list.querySelectorAll<HTMLElement>('[role=option]'));
  const highlight = () => {
    options().forEach((o, i) => {
      o.setAttribute('aria-selected', String(i === active));
      o.querySelector('a')!.classList.toggle('bg-surface-2', i === active);
    });
    options()[active]?.scrollIntoView({ block: 'nearest' });
  };

  const open = () => {
    if (!dialog.open) dialog.showModal();
    input.focus();
    input.select();
    render();
  };

  document.querySelectorAll('[data-search-open]').forEach((b) => b.addEventListener('click', open));
  dialog.querySelector('[data-search-close]')!.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); });
  input.addEventListener('input', render);
  input.addEventListener('keydown', (e) => {
    const opts = options();
    if (e.key === 'ArrowDown') { e.preventDefault(); active = Math.min(active + 1, opts.length - 1); highlight(); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); active = Math.max(active - 1, 0); highlight(); }
    else if (e.key === 'Enter') { const a = opts[active]?.querySelector('a'); if (a) { e.preventDefault(); a.click(); } }
  });
  document.addEventListener('keydown', (e) => {
    const t = e.target as HTMLElement;
    const typing = t.closest('input, textarea, select, [contenteditable="true"]');
    if (e.key === '/' && !typing && !e.metaKey && !e.ctrlKey) {
      // On the homepage the big search box is right there, so use it.
      const home = document.getElementById('tool-search') as HTMLInputElement | null;
      e.preventDefault();
      if (home) { home.focus(); home.scrollIntoView({ block: 'center' }); } else open();
    }
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); open(); }
  });
}
