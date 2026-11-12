// Helpers shared by the voice and screen recorders.
export function pickMime(kind: 'audio' | 'video'): string {
  const list = kind === 'audio'
    ? ['audio/webm;codecs=opus', 'audio/mp4', 'audio/ogg;codecs=opus', 'audio/webm']
    : ['video/webm;codecs=vp9,opus', 'video/webm;codecs=vp8,opus', 'video/mp4', 'video/webm'];
  return typeof MediaRecorder !== 'undefined' ? list.find((m) => MediaRecorder.isTypeSupported?.(m)) ?? '' : '';
}
export const extFor = (mime: string) => (mime.includes('mp4') ? (mime.startsWith('audio') ? 'm4a' : 'mp4') : mime.includes('ogg') ? 'ogg' : 'webm');
export const clock = (ms: number) => { const s = Math.floor(ms / 1000); return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`; };
export function stamp() { const d = new Date(), p = (n: number) => String(n).padStart(2, '0'); return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}-${p(d.getHours())}${p(d.getMinutes())}${p(d.getSeconds())}`; }
export function mediaError(e: unknown, what: string) {
  const n = (e as DOMException)?.name;
  if (n === 'NotAllowedError' || n === 'SecurityError') return `Permission to use the ${what} was not given. Click the icon in your browser's address bar to allow it, then try again.`;
  if (n === 'NotFoundError') return `No ${what} was found. Check that it is connected.`;
  if (n === 'NotReadableError') return `The ${what} is being used by another app. Close that app and try again.`;
  return `Recording could not start. Please try again in the latest version of Chrome, Edge, Firefox or Safari.`;
}
