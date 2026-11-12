/** Cryptographically secure, unbiased random integer in [0, n) */
export function randInt(n: number): number {
  if (n <= 1) return 0;
  const buf = new Uint32Array(1), limit = Math.floor(0x100000000 / n) * n;
  do crypto.getRandomValues(buf); while (buf[0] >= limit);
  return buf[0] % n;
}
/** One item per line; a single line may be comma separated instead */
export const parseList = (s: string) => (/\n/.test(s.trim()) ? s.split(/\r?\n/) : s.split(',')).map((x) => x.trim()).filter(Boolean);
export const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
/** Fisher-Yates shuffle (returns a new array) */
export function shuffle<T>(a: readonly T[]): T[] {
  const r = [...a];
  for (let i = r.length - 1; i > 0; i--) { const j = randInt(i + 1); [r[i], r[j]] = [r[j], r[i]]; }
  return r;
}
