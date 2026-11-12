import { formatBytes } from './ui';

export interface DropzoneOptions {
  /** e.g. ['image/jpeg','image/png'] or ['.heic'] */
  accept: string[];
  multiple?: boolean;
  maxBytes?: number;
  onFiles: (files: File[]) => void;
  onError: (msg: string) => void;
}

const matches = (file: File, accept: string[]) => {
  const name = file.name.toLowerCase();
  return accept.some((a) => {
    a = a.toLowerCase();
    if (a.startsWith('.')) return name.endsWith(a);
    if (a.endsWith('/*')) return file.type.startsWith(a.slice(0, -1));
    return file.type === a;
  });
};

/** Wires up a Dropzone.astro element: click/tap, keyboard, drag and drop, paste. */
export function initDropzone(root: HTMLElement, opts: DropzoneOptions) {
  const input = root.querySelector('input[type=file]') as HTMLInputElement;
  const zone = root.querySelector('[data-zone]') as HTMLElement;

  const handle = (list: FileList | File[] | null) => {
    const files = Array.from(list ?? []);
    if (!files.length) return;
    const ok: File[] = [];
    const bad: string[] = [];
    for (const f of files) {
      if (!matches(f, opts.accept)) bad.push(`“${f.name}” is not a supported file type.`);
      else if (opts.maxBytes && f.size > opts.maxBytes) bad.push(`“${f.name}” is ${formatBytes(f.size)}. The limit is ${formatBytes(opts.maxBytes)}.`);
      else if (f.size === 0) bad.push(`“${f.name}” is empty.`);
      else ok.push(f);
    }
    if (bad.length) opts.onError(bad.slice(0, 3).join(' ') + (bad.length > 3 ? ` And ${bad.length - 3} more.` : ''));
    else opts.onError('');
    if (ok.length) opts.onFiles(opts.multiple ? ok : ok.slice(0, 1));
    input.value = '';
  };

  input.addEventListener('change', () => handle(input.files));
  let depth = 0;
  zone.addEventListener('dragenter', (e) => { e.preventDefault(); depth++; zone.dataset.over = ''; });
  zone.addEventListener('dragover', (e) => { e.preventDefault(); if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy'; });
  zone.addEventListener('dragleave', () => { if (--depth <= 0) { depth = 0; delete zone.dataset.over; } });
  zone.addEventListener('drop', (e) => { e.preventDefault(); depth = 0; delete zone.dataset.over; handle(e.dataTransfer?.files ?? null); });
  // Paste an image or file from the clipboard while the zone is visible
  document.addEventListener('paste', (e) => {
    if (root.hidden || !root.offsetParent) return;
    const files = Array.from(e.clipboardData?.files ?? []);
    if (files.length) handle(files);
  });
  return { open: () => input.click() };
}
