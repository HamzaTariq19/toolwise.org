// Page thumbnail grid used by the page-level PDF tools (rotate, delete, extract, reorder).
import type { PDFDocumentProxy } from 'pdfjs-dist/types/src/display/api';
import { renderPage } from './pdf';

export type ThumbMode = 'select' | 'rotate' | 'reorder';
export interface ThumbState { index: number; rotation: number; selected: boolean }

const svg = (d: string, s = 18) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
const ICON = {
  rotL: svg('<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>'),
  rotR: svg('<path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/>'),
  check: svg('<path d="M20 6 9 17l-5-5"/>', 16),
  x: svg('<path d="M18 6 6 18M6 6l12 12"/>', 16),
  grip: svg('<circle cx="9" cy="6" r="1"/><circle cx="15" cy="6" r="1"/><circle cx="9" cy="12" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="9" cy="18" r="1"/><circle cx="15" cy="18" r="1"/>'),
  left: svg('<path d="m15 18-6-6 6-6"/>'),
  right: svg('<path d="m9 18 6-6-6-6"/>'),
};

/**
 * @param selectStyle 'keep' shows a check on selected pages (extract), 'remove' shows a red cross (delete)
 */
export function createThumbGrid(
  grid: HTMLElement,
  doc: PDFDocumentProxy,
  opts: { mode: ThumbMode; selectStyle?: 'keep' | 'remove'; onChange: (pages: ThumbState[]) => void },
) {
  let pages: ThumbState[] = Array.from({ length: doc.numPages }, (_, i) => ({ index: i, rotation: 0, selected: false }));
  const canvases = new Map<number, HTMLCanvasElement>();
  grid.setAttribute('role', 'list');

  const io = new IntersectionObserver((entries) => entries.forEach(async (e) => {
    if (!e.isIntersecting) return;
    const el = e.target as HTMLElement;
    io.unobserve(el);
    const i = Number(el.dataset.index);
    if (canvases.has(i)) return;
    try {
      const page = await doc.getPage(i + 1);
      const vp = page.getViewport({ scale: 1 });
      const c = await renderPage(page, Math.min(2, 280 / Math.max(vp.width, vp.height)));
      c.className = 'max-h-full max-w-full rounded-sm bg-white shadow-sm transition-transform duration-200';
      c.setAttribute('aria-hidden', 'true');
      canvases.set(i, c);
      el.replaceChildren(c);
      applyRotation(i);
      page.cleanup();
    } catch { el.textContent = 'Preview unavailable'; }
  }), { rootMargin: '400px' });

  function applyRotation(i: number) {
    const c = canvases.get(i);
    const p = pages.find((x) => x.index === i)!;
    if (c) c.style.transform = `rotate(${p.rotation}deg) scale(${p.rotation % 180 ? 0.75 : 1})`;
  }

  function card(p: ThumbState, pos: number) {
    const n = p.index + 1;
    const remove = opts.selectStyle === 'remove';
    const sel = p.selected;
    const ring = sel ? (remove ? 'ring-2 ring-[#dc2626] opacity-60' : 'ring-2 ring-[var(--ring)]') : '';
    const badge = sel ? `<span class="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full ${remove ? 'bg-[#dc2626]' : 'bg-brand'} text-white">${remove ? ICON.x : ICON.check}</span>` : '';
    let controls = '';
    if (opts.mode === 'rotate') controls = `<div class="mt-1.5 flex justify-center gap-1">
      <button type="button" class="btn btn-ghost h-10 w-10 !p-0" data-act="rotL" aria-label="Rotate page ${n} left">${ICON.rotL}</button>
      <button type="button" class="btn btn-ghost h-10 w-10 !p-0" data-act="rotR" aria-label="Rotate page ${n} right">${ICON.rotR}</button></div>`;
    if (opts.mode === 'reorder') controls = `<div class="mt-1.5 flex items-center justify-center gap-1">
      <button type="button" class="btn btn-ghost h-10 w-9 !p-0" data-act="left" aria-label="Move page ${n} earlier" ${pos === 0 ? 'disabled' : ''}>${ICON.left}</button>
      <span class="flex h-10 w-9 cursor-grab touch-none items-center justify-center text-subtle active:cursor-grabbing" data-grip aria-hidden="true">${ICON.grip}</span>
      <button type="button" class="btn btn-ghost h-10 w-9 !p-0" data-act="right" aria-label="Move page ${n} later" ${pos === pages.length - 1 ? 'disabled' : ''}>${ICON.right}</button></div>`;
    const clickable = opts.mode === 'select';
    const label = clickable ? `${remove ? (sel ? 'Keep' : 'Delete') : sel ? 'Unselect' : 'Select'} page ${n}` : `Page ${n}`;
    return `<div role="listitem" class="flex flex-col items-center" data-card="${p.index}">
      <${clickable ? 'button type="button" data-act="toggle" aria-pressed="' + sel + '"' : 'div'} aria-label="${label}" class="relative flex aspect-[3/4] w-full items-center justify-center rounded-lg border border-line bg-surface-2 p-2 ${ring} ${clickable ? 'cursor-pointer hover:border-line-strong' : ''}">
        <span class="flex h-full w-full items-center justify-center text-xs text-subtle" data-thumb data-index="${p.index}">Page ${n}</span>
        ${badge}
      </${clickable ? 'button' : 'div'}>
      <span class="mt-1 text-sm font-medium tabular ${p.rotation ? 'text-link' : 'text-muted'}">${opts.mode === 'reorder' ? `${pos + 1} <span class="text-subtle">(page ${n})</span>` : `Page ${n}`}${p.rotation ? ` · ${p.rotation}°` : ''}</span>
      ${controls}
    </div>`;
  }

  function render(focus?: { index: number; act: string }) {
    grid.innerHTML = pages.map(card).join('');
    grid.querySelectorAll<HTMLElement>('[data-thumb]').forEach((el) => {
      const c = canvases.get(Number(el.dataset.index));
      if (c) { el.replaceChildren(c); applyRotation(Number(el.dataset.index)); } else io.observe(el);
    });
    if (focus) grid.querySelector<HTMLButtonElement>(`[data-card="${focus.index}"] [data-act="${focus.act}"]:not([disabled])`)?.focus();
    opts.onChange(pages);
  }

  grid.addEventListener('click', (e) => {
    const b = (e.target as HTMLElement).closest<HTMLElement>('[data-act]');
    if (!b) return;
    const idx = Number(b.closest<HTMLElement>('[data-card]')!.dataset.card);
    const pos = pages.findIndex((p) => p.index === idx);
    const act = b.dataset.act!;
    if (act === 'toggle') pages[pos].selected = !pages[pos].selected;
    if (act === 'rotL') pages[pos].rotation = (pages[pos].rotation + 270) % 360;
    if (act === 'rotR') pages[pos].rotation = (pages[pos].rotation + 90) % 360;
    if (act === 'left' || act === 'right') {
      const to = act === 'left' ? pos - 1 : pos + 1;
      if (to < 0 || to >= pages.length) return;
      const [p] = pages.splice(pos, 1); pages.splice(to, 0, p);
    }
    render({ index: idx, act });
  });

  // Drag to reorder with mouse, pen or finger (grab the dotted handle)
  if (opts.mode === 'reorder') {
    let dragIdx: number | null = null;
    grid.addEventListener('pointerdown', (e) => {
      const g = (e.target as HTMLElement).closest('[data-grip]');
      if (!g) return;
      e.preventDefault();
      dragIdx = Number(g.closest<HTMLElement>('[data-card]')!.dataset.card);
      g.closest<HTMLElement>('[data-card]')!.classList.add('opacity-50');
      grid.setPointerCapture(e.pointerId);
    });
    grid.addEventListener('pointermove', (e) => {
      if (dragIdx === null) return;
      const over = document.elementFromPoint(e.clientX, e.clientY)?.closest<HTMLElement>('[data-card]');
      if (!over) return;
      const overIdx = Number(over.dataset.card);
      if (overIdx === dragIdx) return;
      const from = pages.findIndex((p) => p.index === dragIdx), to = pages.findIndex((p) => p.index === overIdx);
      const [p] = pages.splice(from, 1); pages.splice(to, 0, p);
      render();
      grid.querySelector<HTMLElement>(`[data-card="${dragIdx}"]`)?.classList.add('opacity-50');
    });
    const end = () => { if (dragIdx === null) return; dragIdx = null; grid.querySelectorAll('[data-card]').forEach((c) => c.classList.remove('opacity-50')); };
    grid.addEventListener('pointerup', end);
    grid.addEventListener('pointercancel', end);
  }

  render();
  return {
    get pages() { return pages; },
    setAll(fn: (p: ThumbState) => void) { pages.forEach(fn); render(); },
    destroy() { io.disconnect(); grid.innerHTML = ''; },
  };
}
