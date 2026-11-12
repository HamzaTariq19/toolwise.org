import { copyText, downloadBlob, showError, fmt, store } from './ui';

export interface TransformResult { out: string; note?: string; error?: string }

/** Live text transformation tool. transform() runs on every change (debounced for large input). */
export function initTextTransform(id: string, opts: { transform: (text: string) => TransformResult; fileName: string; storageKey?: string }) {
  const root = document.getElementById(id)!;
  const q = <T extends HTMLElement = HTMLElement>(s: string) => root.querySelector<T>(s)!;
  const input = q<HTMLTextAreaElement>('[data-in]'), output = q<HTMLTextAreaElement>('[data-out]');
  const copy = q<HTMLButtonElement>('[data-copy]'), dl = q<HTMLButtonElement>('[data-download]');
  const stats = (t: string) => { const lines = t ? t.split('\n').length : 0; return `${fmt([...t].length)} characters · ${fmt(lines)} line${lines === 1 ? '' : 's'}`; };
  let t: number | undefined;
  function run() {
    const text = input.value;
    if (opts.storageKey) store.set(opts.storageKey, text.length < 200_000 ? text : '');
    q('[data-in-stats]').textContent = text ? stats(text) : '';
    if (!text) { output.value = ''; q('[data-out-stats]').textContent = ''; copy.disabled = dl.disabled = true; showError(q('[data-error]'), null); return; }
    const r = opts.transform(text);
    showError(q('[data-error]'), r.error ?? null);
    output.value = r.error ? '' : r.out;
    q('[data-out-stats]').textContent = r.error ? '' : r.note ?? stats(r.out);
    copy.disabled = dl.disabled = !!r.error || !r.out;
  }
  const schedule = () => { clearTimeout(t); t = window.setTimeout(run, input.value.length > 100_000 ? 250 : 40); };
  input.addEventListener('input', schedule);
  q('[data-options]').addEventListener('input', run);
  q('[data-options]').addEventListener('change', run);
  copy.addEventListener('click', () => copyText(output.value, copy));
  dl.addEventListener('click', () => downloadBlob(new Blob([output.value], { type: 'text/plain;charset=utf-8' }), opts.fileName));
  q('[data-clear]').addEventListener('click', () => { input.value = ''; run(); input.focus(); });
  root.querySelector('[data-sample]')?.addEventListener('click', () => { input.value = input.dataset.sampleText ?? ''; run(); });
  if (opts.storageKey) input.value = store.get(opts.storageKey, '');
  run();
  return { run, input, output };
}
