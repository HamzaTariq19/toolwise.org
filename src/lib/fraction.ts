// Exact fraction arithmetic with readable steps. Used at build time (default example) and in the browser.
type F = [number, number];
const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : Math.abs(a));
const simp = ([n, d]: F): F => { if (d < 0) { n = -n; d = -d; } const g = gcd(n, d) || 1; return [n / g, d / g]; };
const show = ([n, d]: F) => (d === 1 ? `${n}` : `${n}/${d}`);
/** "3/4", "1 1/2", "-2/5", "0.5" */
export function parseFraction(s: string): F | null {
  s = s.trim().replace(/\s+/g, ' ').replace('−', '-');
  let m = s.match(/^(-)?(\d+) (\d+)\/(\d+)$/);
  if (m) { const d = +m[4]; if (!d) return null; return [(m[1] ? -1 : 1) * (+m[2] * d + +m[3]), d]; }
  m = s.match(/^(-?\d+)\/(-?\d+)$/);
  if (m) return +m[2] ? [+m[1], +m[2]] : null;
  m = s.match(/^-?\d*\.?\d+$/);
  if (m) { const dec = (s.split('.')[1] ?? '').length, d = 10 ** dec; return [Math.round(Number(s) * d), d]; }
  return null;
}
export type FractionResult = { error: string } | { main: string; mixed: string; dec: string; steps: string[] };
export function fractionCalc(A: string, B: string, op: string): FractionResult {
  const a = parseFraction(A), b = parseFraction(B);
  if (!a) return { error: `“${A}” is not a fraction I can read. Try 3/4, 1 1/2 or 0.5. The bottom number cannot be 0.` };
  if (!b) return { error: `“${B}” is not a fraction I can read. Try 3/4, 1 1/2 or 0.5. The bottom number cannot be 0.` };
  const steps: string[] = [`Write as fractions: ${show(a)} and ${show(b)}`];
  let r: F;
  if (op === '+' || op === '-') {
    const l = (a[1] * b[1]) / gcd(a[1], b[1]), an = a[0] * (l / a[1]), bn = b[0] * (l / b[1]);
    if (a[1] !== b[1]) steps.push(`Common denominator ${l}: ${an}/${l} ${op === '+' ? '+' : '−'} ${bn}/${l}`);
    r = [op === '+' ? an + bn : an - bn, l]; steps.push(`${op === '+' ? 'Add' : 'Subtract'} the tops: ${r[0]}/${l}`);
  } else if (op === '*') { r = [a[0] * b[0], a[1] * b[1]]; steps.push(`Multiply tops and bottoms: (${a[0]} × ${b[0]}) / (${a[1]} × ${b[1]}) = ${r[0]}/${r[1]}`); }
  else { if (b[0] === 0) return { error: 'You cannot divide by zero.' }; r = [a[0] * b[1], a[1] * b[0]]; steps.push(`Flip the second fraction and multiply: ${show(a)} × ${b[1]}/${b[0]} = ${r[0]}/${r[1]}`); }
  const s = simp(r);
  if (s[0] !== r[0] || s[1] !== r[1]) steps.push(`Simplify by dividing by ${Math.abs(r[0] / s[0]) || 1}: ${show(s)}`);
  if (!Number.isSafeInteger(s[0]) || !Number.isSafeInteger(s[1])) return { error: 'These numbers are too large to calculate exactly.' };
  const whole = Math.trunc(s[0] / s[1]), rem = Math.abs(s[0] % s[1]);
  return { main: show(s), mixed: s[1] === 1 ? `${s[0]}` : whole ? `${whole} ${rem}/${s[1]}` : `${s[0] < 0 ? '-' : ''}${rem}/${s[1]}`, dec: String(Math.round((s[0] / s[1]) * 1e10) / 1e10), steps };
}
export const stepsHtml = (steps: string[]) => steps.map((x) => `<li>${x.replace(/</g, '&lt;')}</li>`).join('');
