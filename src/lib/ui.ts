// Small shared helpers for tool islands (client-side only).

export const $ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => root.querySelector(sel) as T;
export const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => Array.from(root.querySelectorAll(sel)) as T[];

export function formatBytes(bytes: number, digits = 1): string {
  if (!Number.isFinite(bytes)) return '–';
  if (bytes < 1024) return `${bytes} B`;
  const units = ['KB', 'MB', 'GB'];
  let v = bytes / 1024, i = 0;
  while (v >= 1024 && i < units.length - 1) { v /= 1024; i++; }
  return `${v.toFixed(v >= 100 ? 0 : digits)} ${units[i]}`;
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 30_000);
}

export const baseName = (name: string) => name.replace(/\.[^.]+$/, '') || 'file';

/** Copy text and give the button brief "Copied" feedback */
export async function copyText(text: string, button?: HTMLElement) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const ta = document.createElement('textarea');
    ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove();
  }
  if (button) {
    const label = button.querySelector('[data-label]') ?? button;
    const prev = label.textContent;
    label.textContent = 'Copied';
    button.setAttribute('data-copied', '');
    setTimeout(() => { label.textContent = prev; button.removeAttribute('data-copied'); }, 1400);
  }
}

/** Number formatting */
export const fmt = (n: number, max = 2, min = 0) =>
  Number.isFinite(n) ? n.toLocaleString(undefined, { maximumFractionDigits: max, minimumFractionDigits: min }) : '–';

export const money = (n: number, currency = '$', decimals = 2) =>
  Number.isFinite(n) ? `${n < 0 ? '-' : ''}${currency}${Math.abs(n).toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}` : '–';

/** Parse a number typed by a person: accepts "1,200", " 3.5 ", "" -> NaN */
export function num(v: string | null | undefined): number {
  if (v == null) return NaN;
  const s = String(v).trim().replace(/[,\s]/g, '').replace(/[$€£%]/g, '');
  if (s === '' || s === '-' || s === '.') return NaN;
  const n = Number(s);
  return Number.isFinite(n) ? n : NaN;
}

export function showError(el: HTMLElement | null, message: string | null) {
  if (!el) return;
  el.hidden = !message;
  const text = el.querySelector('[data-msg]') ?? el;
  text.textContent = message ?? '';
}

export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.decoding = 'async';
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('This image could not be opened. It may be damaged or in a format your browser does not support.'));
    img.src = src;
  });
}

export function canvasToBlob(canvas: HTMLCanvasElement, type: string, quality?: number): Promise<Blob> {
  return new Promise((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('Could not create the image. Try a smaller image.'))), type, quality),
  );
}

/** Stores a value in localStorage safely */
export const store = {
  get<T>(key: string, fallback: T): T {
    try { const v = localStorage.getItem(key); return v ? (JSON.parse(v) as T) : fallback; } catch { return fallback; }
  },
  set(key: string, value: unknown) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
  },
};

export function setBusy(button: HTMLButtonElement, busy: boolean, busyLabel?: string) {
  const label = button.querySelector('[data-label]') ?? button;
  if (busy) {
    button.dataset.prev = label.textContent ?? '';
    if (busyLabel) label.textContent = busyLabel;
    button.disabled = true;
  } else {
    if (button.dataset.prev) label.textContent = button.dataset.prev;
    button.disabled = false;
  }
}
