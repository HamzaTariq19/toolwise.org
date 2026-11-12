// Safe math expression evaluator (no eval). Supports + - × ÷ ^, parentheses, unary minus, postfix ! and %,
// implicit multiplication (2π, 3(4)), constants π and e, Ans, and functions.
export type Angle = 'deg' | 'rad';
const FUNCS = ['sin', 'cos', 'tan', 'asin', 'acos', 'atan', 'sinh', 'cosh', 'tanh', 'ln', 'log', 'sqrt', 'cbrt', 'abs', 'exp'];

function factorial(n: number) {
  if (n < 0 || !Number.isInteger(n)) throw new Error('Factorial needs a whole number of 0 or more.');
  if (n > 170) return Infinity;
  let r = 1; for (let i = 2; i <= n; i++) r *= i; return r;
}

export function evaluate(src: string, angle: Angle = 'deg', ans = 0): number {
  const s = src.replace(/\s+/g, '').replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-').replace(/π/g, 'pi').replace(/√/g, 'sqrt');
  type Tok = { t: 'n'; v: number } | { t: 'op' | 'id' | '(' | ')'; v: string };
  const toks: Tok[] = [];
  for (let i = 0; i < s.length; ) {
    const c = s[i];
    const num = s.slice(i).match(/^(\d+\.?\d*|\.\d+)(e[+-]?\d+)?/i);
    if (num) { toks.push({ t: 'n', v: Number(num[0]) }); i += num[0].length; continue; }
    const id = s.slice(i).match(/^[a-z]+/i);
    if (id) { toks.push({ t: 'id', v: id[0].toLowerCase() }); i += id[0].length; continue; }
    if ('+-*/^!%'.includes(c)) { toks.push({ t: 'op', v: c }); i++; continue; }
    if (c === '(' || c === ')') { toks.push({ t: c, v: c }); i++; continue; }
    throw new Error(`I don't understand “${c}”.`);
  }
  // Insert implicit multiplication: 2pi, 2(…), )(…), )2, pi pi
  const out: Tok[] = [];
  const endsValue = (t?: Tok) => !!t && (t.t === 'n' || t.t === ')' || (t.t === 'id' && !FUNCS.includes(t.v)) || (t.t === 'op' && (t.v === '!' || t.v === '%')));
  const startsValue = (t: Tok) => t.t === 'n' || t.t === '(' || t.t === 'id';
  for (const t of toks) { if (endsValue(out[out.length - 1]) && startsValue(t)) out.push({ t: 'op', v: '*' }); out.push(t); }
  let p = 0;
  const peek = () => out[p];
  const toRad = (x: number) => (angle === 'deg' ? (x * Math.PI) / 180 : x);
  const fromRad = (x: number) => (angle === 'deg' ? (x * 180) / Math.PI : x);
  const trig = (f: (x: number) => number, x: number) => { const v = f(toRad(x)); return Math.abs(v) < 1e-12 ? 0 : v; };
  function primary(): number {
    const t = out[p++];
    if (!t) throw new Error('The expression is incomplete.');
    if (t.t === 'n') return t.v;
    if (t.t === '(') { const v = expr(0); if (out[p]?.t !== ')') throw new Error('A closing bracket “)” is missing.'); p++; return v; }
    if (t.t === 'op' && (t.v === '-' || t.v === '+')) { const v = expr(3); return t.v === '-' ? -v : v; }
    if (t.t === 'id') {
      if (t.v === 'pi') return Math.PI; if (t.v === 'e') return Math.E; if (t.v === 'ans') return ans;
      if (!FUNCS.includes(t.v)) throw new Error(`“${t.v}” is not a function I know.`);
      const x = out[p]?.t === '(' ? primary() : expr(4);
      switch (t.v) {
        case 'sin': return trig(Math.sin, x); case 'cos': return trig(Math.cos, x);
        case 'tan': { if (angle === 'deg' && Math.abs(((x % 180) + 180) % 180 - 90) < 1e-12) throw new Error('tan is undefined at 90° (and 270°).'); return trig(Math.tan, x); }
        case 'asin': if (Math.abs(x) > 1) throw new Error('asin only works for numbers from −1 to 1.'); return fromRad(Math.asin(x));
        case 'acos': if (Math.abs(x) > 1) throw new Error('acos only works for numbers from −1 to 1.'); return fromRad(Math.acos(x));
        case 'atan': return fromRad(Math.atan(x));
        case 'sinh': return Math.sinh(x); case 'cosh': return Math.cosh(x); case 'tanh': return Math.tanh(x);
        case 'ln': if (x <= 0) throw new Error('ln only works for numbers greater than 0.'); return Math.log(x);
        case 'log': if (x <= 0) throw new Error('log only works for numbers greater than 0.'); return Math.log10(x);
        case 'sqrt': if (x < 0) throw new Error('The square root of a negative number is not a real number.'); return Math.sqrt(x);
        case 'cbrt': return Math.cbrt(x); case 'abs': return Math.abs(x); case 'exp': return Math.exp(x);
      }
    }
    throw new Error('The expression has a mistake. Check the operators and brackets.');
  }
  function postfix(v: number): number {
    while (peek()?.t === 'op' && (peek()!.v === '!' || peek()!.v === '%')) { const o = out[p++].v; v = o === '!' ? factorial(v) : v / 100; }
    return v;
  }
  const PREC: Record<string, number> = { '+': 1, '-': 1, '*': 2, '/': 2, '^': 4 };
  function expr(min: number): number {
    let left = postfix(primary());
    for (;;) {
      const t = peek();
      if (!t || t.t !== 'op' || !(t.v in PREC) || PREC[t.v] < min) break;
      p++;
      const right = expr(t.v === '^' ? PREC[t.v] : PREC[t.v] + 1);
      if (t.v === '+') left += right; else if (t.v === '-') left -= right; else if (t.v === '*') left *= right;
      else if (t.v === '/') { if (right === 0) throw new Error('You cannot divide by zero.'); left /= right; }
      else left = Math.pow(left, right);
    }
    return left;
  }
  if (!out.length) throw new Error('Type a calculation.');
  const v = expr(0);
  if (p < out.length) throw new Error(out[p].t === ')' ? 'There is an extra closing bracket “)”.' : 'The expression has a mistake.');
  if (Number.isNaN(v)) throw new Error('The result is not a real number.');
  return v;
}

export function formatNumber(v: number): string {
  if (!Number.isFinite(v)) return v > 0 ? '∞' : '−∞';
  if (v === 0) return '0';
  const a = Math.abs(v);
  if (a >= 1e15 || a < 1e-9) return v.toExponential(10).replace(/\.?0+e/, 'e');
  return String(Number(v.toPrecision(14)));
}
