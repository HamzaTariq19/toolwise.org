// A simple, accessible reorderable file list: drag on desktop, arrow buttons everywhere.
export interface ListItem { id: string; name: string; meta: string; thumb?: string; error?: string }

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);
const svg = (d: string) => `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
const UP = svg('<path d="m18 15-6-6-6 6"/>');
const DOWN = svg('<path d="m6 9 6 6 6-6"/>');
const X = svg('<path d="M18 6 6 18"/><path d="m6 6 12 12"/>');
const GRIP = svg('<circle cx="9" cy="6" r="1"/><circle cx="15" cy="6" r="1"/><circle cx="9" cy="12" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="9" cy="18" r="1"/><circle cx="15" cy="18" r="1"/>');
const FILE = svg('<path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8l6 6v12a2 2 0 0 1-2 2z"/><path d="M14 2v6h6"/>');

export function createSortableList<T extends ListItem>(ul: HTMLElement, onChange: (items: T[]) => void) {
  let items: T[] = [];
  let dragId: string | null = null;

  const move = (from: number, to: number) => {
    if (to < 0 || to >= items.length || from === to) return;
    const [it] = items.splice(from, 1);
    items.splice(to, 0, it);
    render();
    onChange(items);
  };

  function render(focusId?: string, focusAction?: string) {
    ul.innerHTML = items
      .map(
        (it, i) => `<li class="flex items-center gap-2.5 py-2.5 pl-3 pr-1.5 sm:gap-3 sm:px-4" draggable="true" data-id="${it.id}">
        <span class="hidden cursor-grab text-subtle sm:block" aria-hidden="true">${GRIP}</span>
        <span class="w-5 flex-none text-center text-sm font-semibold text-subtle tabular">${i + 1}</span>
        ${it.thumb ? `<img src="${it.thumb}" alt="" class="hidden h-12 w-12 flex-none rounded-md border border-line bg-white object-contain min-[420px]:block" />` : `<span class="icon-tile hidden h-11 w-11 flex-none min-[420px]:inline-flex">${FILE}</span>`}
        <div class="min-w-0 flex-1"><p class="truncate font-medium">${esc(it.name)}</p><p class="text-sm ${it.error ? 'text-danger' : 'text-muted'}">${esc(it.error ?? it.meta)}</p></div>
        <div class="flex flex-none items-center">
          <button type="button" class="btn btn-ghost h-11 w-10 !p-0" data-act="up" ${i === 0 ? 'disabled' : ''} aria-label="Move ${esc(it.name)} up">${UP}</button>
          <button type="button" class="btn btn-ghost h-11 w-10 !p-0" data-act="down" ${i === items.length - 1 ? 'disabled' : ''} aria-label="Move ${esc(it.name)} down">${DOWN}</button>
          <button type="button" class="btn btn-ghost h-11 w-10 !p-0 hover:!text-danger" data-act="remove" aria-label="Remove ${esc(it.name)}">${X}</button>
        </div></li>`,
      )
      .join('');
    if (focusId) {
      const btn = ul.querySelector<HTMLButtonElement>(`[data-id="${focusId}"] [data-act="${focusAction}"]`);
      (btn && !btn.disabled ? btn : ul.querySelector<HTMLButtonElement>(`[data-id="${focusId}"] button:not([disabled])`))?.focus();
    }
  }

  ul.addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('[data-act]');
    if (!btn) return;
    const id = btn.closest('li')!.dataset.id!;
    const i = items.findIndex((x) => x.id === id);
    const act = btn.dataset.act!;
    if (act === 'remove') { items.splice(i, 1); render(); onChange(items); return; }
    const to = act === 'up' ? i - 1 : i + 1;
    if (to < 0 || to >= items.length) return;
    const [it] = items.splice(i, 1);
    items.splice(to, 0, it);
    render(id, act);
    onChange(items);
  });
  ul.addEventListener('dragstart', (e) => {
    const li = (e.target as HTMLElement).closest('li');
    if (!li) return;
    dragId = li.dataset.id!;
    e.dataTransfer!.effectAllowed = 'move';
    e.dataTransfer!.setData('text/plain', dragId);
    li.classList.add('opacity-50');
  });
  ul.addEventListener('dragover', (e) => { if (dragId) e.preventDefault(); });
  ul.addEventListener('drop', (e) => {
    if (!dragId) return;
    e.preventDefault();
    const li = (e.target as HTMLElement).closest('li');
    const from = items.findIndex((x) => x.id === dragId);
    const to = li ? items.findIndex((x) => x.id === li.dataset.id) : items.length - 1;
    dragId = null;
    move(from, to);
  });
  ul.addEventListener('dragend', () => { dragId = null; ul.querySelectorAll('li').forEach((l) => l.classList.remove('opacity-50')); });

  return {
    get items() { return items; },
    set(next: T[]) { items = next; render(); onChange(items); },
    add(more: T[]) { items = [...items, ...more]; render(); onChange(items); },
    update(id: string, patch: Partial<T>) { const it = items.find((x) => x.id === id); if (it) { Object.assign(it, patch); render(); onChange(items); } },
  };
}
