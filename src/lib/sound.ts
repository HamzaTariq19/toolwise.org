// Alarm tones made with the Web Audio API (no audio files to download).
export type Tone = 'beep' | 'chime' | 'digital' | 'gentle';
export const TONES: Record<Tone, string> = { beep: 'Classic beep', chime: 'Chime', digital: 'Digital', gentle: 'Gentle rise' };

let ctx: AudioContext | null = null;
/** Create or resume the audio context. Call from a click so browsers allow sound later. */
export function unlockAudio() {
  try {
    const AC = window.AudioContext || (window as any).webkitAudioContext;
    if (!AC) return false;
    ctx ??= new AC();
    if (ctx.state === 'suspended') void ctx.resume();
    return true;
  } catch { return false; }
}
export const audioSupported = () => !!(window.AudioContext || (window as any).webkitAudioContext);

function note(freq: number, start: number, dur: number, vol = 0.25, type: OscillatorType = 'sine') {
  if (!ctx) return;
  const o = ctx.createOscillator(), g = ctx.createGain();
  o.type = type; o.frequency.value = freq; o.connect(g); g.connect(ctx.destination);
  const t = ctx.currentTime + start;
  g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + 0.015); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.start(t); o.stop(t + dur + 0.02);
}
/** Plays one round of the tone; returns its length in seconds */
export function playOnce(tone: Tone, round = 0): number {
  if (!unlockAudio()) return 1;
  switch (tone) {
    case 'chime': [784, 988, 1175].forEach((f, i) => note(f, i * 0.22, 0.9, 0.22)); return 1.6;
    case 'digital': for (let i = 0; i < 4; i++) note(2093, i * 0.13, 0.08, 0.12, 'square'); return 1;
    case 'gentle': { const v = Math.min(0.06 + round * 0.03, 0.3); [523, 659, 784].forEach((f, i) => note(f, i * 0.3, 1.1, v)); return 1.8; }
    default: [0, 0.25, 0.5].forEach((t) => note(880, t, 0.18, 0.25, 'triangle')); return 1.2;
  }
}

let loopT = 0, round = 0;
/** Repeat the tone until stopAlarm() (with a safety stop after 10 minutes) */
export function startAlarm(tone: Tone) {
  stopAlarm(); round = 0;
  const started = Date.now();
  const tick = () => {
    if (Date.now() - started > 600_000) return stopAlarm();
    const len = playOnce(tone, round++);
    if ('vibrate' in navigator && (navigator as any).userActivation?.hasBeenActive) try { navigator.vibrate([300, 150, 300]); } catch {}
    loopT = window.setTimeout(tick, (len + 0.6) * 1000);
  };
  tick();
}
export function stopAlarm() { clearTimeout(loopT); loopT = 0; if ('vibrate' in navigator && (navigator as any).userActivation?.hasBeenActive) try { navigator.vibrate(0); } catch {} }
export const alarmRinging = () => loopT !== 0;

/** Keep the screen awake where the Screen Wake Lock API exists */
let lock: any = null;
export const wakeLockSupported = () => 'wakeLock' in navigator;
export async function keepAwake(on: boolean) {
  try {
    if (on && !lock) { lock = await (navigator as any).wakeLock.request('screen'); lock.addEventListener?.('release', () => (lock = null)); }
    else if (!on && lock) { await lock.release(); lock = null; }
  } catch { lock = null; }
  return !!lock;
}
// The browser drops the lock when the tab is hidden; take it back when the tab returns
let wanted = false;
export function setWakeWanted(on: boolean) { wanted = on; return keepAwake(on); }
if (typeof document !== 'undefined') document.addEventListener('visibilitychange', () => { if (wanted && document.visibilityState === 'visible') void keepAwake(true); });
