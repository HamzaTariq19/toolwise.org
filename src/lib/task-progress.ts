import { formatBytes } from './ui';
/** Controls a TaskProgress.astro panel */
export function taskProgress(el: HTMLElement, onCancel: () => void) {
  const q = (s: string) => el.querySelector(s) as HTMLElement;
  const fill = q('[data-task-fill]'), bar = q('[data-task-bar]');
  q('[data-task-cancel]').addEventListener('click', onCancel);
  let started = 0;
  const api = {
    show(label: string, note = '') { el.hidden = false; started = Date.now(); api.set(label, null, note); },
    hide() { el.hidden = true; },
    /** fraction 0..1, or null for "busy" without a known amount */
    set(label: string, fraction: number | null, note?: string) {
      q('[data-task-label]').textContent = label;
      fill.classList.toggle('indeterminate', fraction === null);
      const pct = fraction === null ? 0 : Math.round(Math.max(0, Math.min(1, fraction)) * 100);
      fill.style.width = `${fraction === null ? 30 : Math.max(2, pct)}%`;
      bar.setAttribute('aria-valuenow', String(pct));
      q('[data-task-pct]').textContent = fraction === null ? '' : `${pct}%`;
      if (note !== undefined) q('[data-task-note]').textContent = note;
      else if (fraction && fraction > 0.03 && fraction < 1) { const el2 = (Date.now() - started) / 1000, left = (el2 / fraction) * (1 - fraction); q('[data-task-note]').textContent = left > 5 ? `About ${left < 90 ? `${Math.round(left)} seconds` : `${Math.round(left / 60)} minutes`} left` : 'Almost done…'; }
    },
    /** Progress callback for downloads */
    download(what: string) {
      return (loaded: number, total: number, cached: boolean) => api.set(cached ? `Loading ${what}…` : `Downloading ${what} (one time only)…`, total ? loaded / total : null, cached ? 'Stored on this device from an earlier visit.' : `${formatBytes(loaded)} of ${formatBytes(total)}. It is saved on your device for next time.`);
    },
  };
  return api;
}
