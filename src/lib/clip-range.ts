// Wires up ClipRange.astro: keeps sliders, time fields and the media element in sync.
export const fmtTime = (s: number) => { const m = Math.floor(s / 60), r = s - m * 60; return `${m}:${r.toFixed(1).padStart(4, '0')}`; };
/** Accepts "75", "1:15", "1:15.5", "0:01:15" */
export function parseTime(v: string): number {
  const s = v.trim().replace(',', '.'); if (!s) return NaN;
  if (!/^\d+(:\d{1,2})*(\.\d+)?$/.test(s)) return NaN;
  return s.split(':').reduce((acc, part) => acc * 60 + Number(part), 0);
}
export function clipRange(root: HTMLElement, opts: { maxLength?: number; minLength?: number; initialLength?: number; onChange?: (a: number, b: number) => void } = {}) {
  const q = <T extends HTMLElement>(s: string) => root.querySelector(s) as T;
  const media = q<HTMLMediaElement>('[data-media]'), ra = q<HTMLInputElement>('[data-r=a]'), rb = q<HTMLInputElement>('[data-r=b]');
  const ta = q<HTMLInputElement>('[data-t=a]'), tb = q<HTMLInputElement>('[data-t=b]'), sel = q('[data-sel]'), err = q('[data-terr]');
  const min = opts.minLength ?? 0.1;
  const initial = (d: number) => Math.min(d, opts.initialLength ?? Infinity, opts.maxLength ?? Infinity);
  let dur = 0, a = 0, b = 0, url = '', stopAt = -1;
  function render(fromField?: 'a' | 'b') {
    ra.value = String(Math.round((a / dur) * 1000)); rb.value = String(Math.round((b / dur) * 1000));
    if (fromField !== 'a') ta.value = fmtTime(a); if (fromField !== 'b') tb.value = fmtTime(b);
    sel.style.left = `${(a / dur) * 100}%`; sel.style.width = `${((b - a) / dur) * 100}%`;
    q('[data-len]').textContent = `Selected: ${fmtTime(b - a)} of ${fmtTime(dur)}`;
    ta.removeAttribute('aria-invalid'); tb.removeAttribute('aria-invalid'); err.hidden = true;
    opts.onChange?.(a, b);
  }
  function set(na: number, nb: number, moved: 'a' | 'b', fromField?: 'a' | 'b') {
    na = Math.max(0, Math.min(na, dur)); nb = Math.max(0, Math.min(nb, dur));
    if (nb - na < min) { if (moved === 'a') na = Math.max(0, nb - min); else nb = Math.min(dur, na + min); }
    if (opts.maxLength && nb - na > opts.maxLength) { if (moved === 'a') nb = na + opts.maxLength; else na = nb - opts.maxLength; }
    a = na; b = nb; render(fromField);
  }
  ra.addEventListener('input', () => { set((+ra.value / 1000) * dur, b, 'a'); media.currentTime = a; });
  rb.addEventListener('input', () => { set(a, (+rb.value / 1000) * dur, 'b'); media.currentTime = b; });
  for (const [el, k] of [[ta, 'a'], [tb, 'b']] as const) el.addEventListener('change', () => {
    const v = parseTime(el.value);
    if (!Number.isFinite(v) || v > dur + 0.05) { el.setAttribute('aria-invalid', 'true'); err.hidden = false; err.textContent = `Enter a time between 0:00 and ${fmtTime(dur)}, like 1:05 or 65.`; return; }
    k === 'a' ? set(v, b, 'a', 'a') : set(a, v, 'b', 'b'); el.value = fmtTime(k === 'a' ? a : b);
  });
  root.querySelectorAll<HTMLButtonElement>('[data-set]').forEach((btn) => btn.addEventListener('click', () => { const t = media.currentTime; btn.dataset.set === 'a' ? set(t, b, 'a') : set(a, t, 'b'); }));
  q('[data-preview]').addEventListener('click', () => { media.currentTime = a; stopAt = b; void media.play(); });
  media.addEventListener('timeupdate', () => { if (stopAt >= 0 && media.currentTime >= stopAt) { media.pause(); stopAt = -1; } });
  media.addEventListener('seeking', () => { if (media.paused) stopAt = -1; });
  return {
    /** Load a file; resolves with its duration, or rejects if the browser can't preview it */
    load(file: File, fallbackDuration?: number): Promise<number> {
      URL.revokeObjectURL(url); url = URL.createObjectURL(file); media.src = url;
      return new Promise((res) => {
        const done = (d: number) => { dur = d; set(0, initial(d), 'b'); res(d); };
        media.onloadedmetadata = () => done(Number.isFinite(media.duration) && media.duration > 0 ? media.duration : fallbackDuration ?? 0);
        media.onerror = () => done(fallbackDuration ?? 0);
      });
    },
    setDuration(d: number) { if (!dur && d) { dur = d; set(0, initial(d), 'b'); } },
    get start() { return a; }, get end() { return b; }, get duration() { return dur; },
    previewable: () => media.error === null && media.readyState > 0,
    clear() { media.removeAttribute('src'); media.load(); URL.revokeObjectURL(url); },
  };
}
