// Exact linear and quadratic equation solver with readable steps. No eval.

const gcdB = (a: bigint, b: bigint): bigint => { a = a < 0n ? -a : a; b = b < 0n ? -b : b; while (b) [a, b] = [b, a % b]; return a; };
const absB = (a: bigint) => (a < 0n ? -a : a);

export class F {
  n: bigint; d: bigint;
  constructor(n: bigint, d: bigint = 1n) {
    if (d === 0n) throw new EqError('Division by zero.');
    if (d < 0n) { n = -n; d = -d; }
    const g = gcdB(n, d) || 1n; this.n = n / g; this.d = d / g;
  }
  static of(v: number | bigint) { return new F(BigInt(v)); }
  static parse(s: string) { const [i, f = ''] = s.split('.'); return new F(BigInt((i || '0') + f), 10n ** BigInt(f.length)); }
  add(o: F) { return new F(this.n * o.d + o.n * this.d, this.d * o.d); }
  sub(o: F) { return this.add(o.neg()); }
  mul(o: F) { return new F(this.n * o.n, this.d * o.d); }
  div(o: F) { if (o.n === 0n) throw new EqError('The equation divides by zero.'); return new F(this.n * o.d, this.d * o.n); }
  neg() { return new F(-this.n, this.d); }
  get zero() { return this.n === 0n; }
  get int() { return this.d === 1n; }
  sign() { return this.n < 0n ? -1 : this.n > 0n ? 1 : 0; }
  num() { return Number(this.n) / Number(this.d); }
  toString() { return (this.n < 0n ? '−' : '') + (this.int ? absB(this.n).toString() : `${absB(this.n)}/${this.d}`); }
}

export class EqError extends Error {}
type Poly = F[]; // index = power of the variable

const trim = (p: Poly) => { const r = [...p]; while (r.length > 1 && r[r.length - 1].zero) r.pop(); return r.length ? r : [F.of(0)]; };
const deg = (p: Poly) => trim(p).length - 1;
const at = (p: Poly, i: number) => p[i] ?? F.of(0);
const padd = (a: Poly, b: Poly) => trim(Array.from({ length: Math.max(a.length, b.length) }, (_, i) => at(a, i).add(at(b, i))));
const pneg = (a: Poly) => a.map((c) => c.neg());
const pmul = (a: Poly, b: Poly) => { const r: Poly = Array.from({ length: a.length + b.length - 1 }, () => F.of(0)); a.forEach((x, i) => b.forEach((y, j) => (r[i + j] = r[i + j].add(x.mul(y))))); return trim(r); };

/** Parser: + - * / ^ ( ), implicit multiplication, one single-letter variable */
function parseSide(src: string, ctx: { v: string | null }): Poly {
  const toks = src.match(/\d+\.?\d*|\.\d+|[a-zA-Z]|[-+*/^()]|\S/g) ?? [];
  let k = 0;
  const peek = () => toks[k], next = () => toks[k++];
  const isStart = (t?: string) => !!t && (/^[\d.a-zA-Z(]/.test(t));
  function expr(): Poly {
    let r = term();
    while (peek() === '+' || peek() === '-') { const op = next(); const t = term(); r = op === '+' ? padd(r, t) : padd(r, pneg(t)); }
    return r;
  }
  function term(): Poly {
    let r = unary();
    for (;;) {
      const t = peek();
      if (t === '*') { next(); r = pmul(r, unary()); }
      else if (t === '/') { next(); const d = unary(); if (deg(d) > 0) throw new EqError(`Dividing by an expression containing ${ctx.v} isn't supported. Multiply both sides by it first.`); r = r.map((c) => c.div(d[0])); }
      else if (isStart(t)) r = pmul(r, power());
      else return r;
      if (deg(r) > 8) throw new EqError('That equation is too large to solve here.');
    }
  }
  function unary(): Poly { if (peek() === '-') { next(); return pneg(unary()); } if (peek() === '+') { next(); return unary(); } return power(); }
  function power(): Poly {
    const base = primary();
    if (peek() !== '^') return base;
    next(); const e = unary();
    if (deg(e) > 0 || !e[0].int || e[0].n < 0n || e[0].n > 8n) throw new EqError('Powers must be whole numbers from 0 to 8, like x^2.');
    let r: Poly = [F.of(1)]; for (let i = 0n; i < e[0].n; i++) r = pmul(r, base);
    return r;
  }
  function primary(): Poly {
    const t = next();
    if (t === undefined) throw new EqError('The equation ends too early. Check for a missing number.');
    if (/^\d|^\./.test(t)) { if ((t.match(/\./g) ?? []).length > 1) throw new EqError(`“${t}” is not a valid number.`); return [F.parse(t)]; }
    if (/^[a-zA-Z]$/.test(t)) {
      if (ctx.v && ctx.v !== t) throw new EqError(`Use only one variable. Found both ${ctx.v} and ${t}.`);
      ctx.v = t; return [F.of(0), F.of(1)];
    }
    if (t === '(') { const r = expr(); if (next() !== ')') throw new EqError('A bracket is not closed. Check that every “(” has a matching “)”.'); return r; }
    if (t === ')') throw new EqError('There is a “)” without a matching “(”.');
    throw new EqError(`“${t}” isn't something this solver understands. Use numbers, one letter, + − × ÷ ^ and brackets.`);
  }
  const r = expr();
  if (k < toks.length) throw new EqError(toks[k] === ')' ? 'There is a “)” without a matching “(”.' : `Unexpected “${toks[k]}”. Check the equation for a typo.`);
  return r;
}

export function normalize(s: string) {
  return s.replace(/[−–—]/g, '-').replace(/[×·]/g, '*').replace(/÷/g, '/').replace(/²/g, '^2').replace(/³/g, '^3').replace(/,(?=\d{3}\b)/g, '').replace(/\s+/g, ' ').trim();
}

/** Pretty polynomial in descending powers */
export function show(p: Poly, v: string): string {
  const t = trim(p); const parts: string[] = [];
  for (let i = t.length - 1; i >= 0; i--) {
    const c = t[i]; if (c.zero) continue;
    const a = c.sign() < 0 ? c.neg() : c;
    const coef = i === 0 ? a.toString() : a.n === 1n && a.d === 1n ? '' : a.int ? a.toString() : `(${a})`;
    const body = coef + (i === 0 ? '' : i === 1 ? v : `${v}<sup>${i}</sup>`);
    parts.push(parts.length ? (c.sign() < 0 ? ' − ' : ' + ') + body : (c.sign() < 0 ? '−' : '') + body);
  }
  return parts.join('') || '0';
}

export type Step = { title: string; math?: string; note?: string };
export type Solution = { v: string; steps: Step[]; answer: string; values: number[]; kind: 'linear' | 'quadratic' | 'identity' | 'none' | 'complex' };

const lcmB = (a: bigint, b: bigint) => (a / gcdB(a, b)) * b;
/** n = k² · m with m square-free (trial division, fine for classroom numbers) */
function splitSquare(n: bigint): [bigint, bigint] {
  let k = 1n, m = n;
  for (let p = 2n; p * p <= m && p < 100000n; p++) while (m % (p * p) === 0n) { m /= p * p; k *= p; }
  return [k, m];
}
const dec = (x: number) => (Number.isInteger(x) ? String(x) : (Math.round(x * 1e6) / 1e6).toString()).replace('-', '−');

export function solve(input: string): Solution {
  const raw = normalize(input);
  if (!raw) throw new EqError('Type an equation, like 2x + 3 = 11.');
  const sides = raw.split('=');
  if (sides.length > 2) throw new EqError('Use only one “=” sign.');
  if (sides.some((s) => !s.trim())) throw new EqError('Both sides of the “=” need something on them.');
  const ctx = { v: null as string | null };
  const L = parseSide(sides[0], ctx), R = sides.length === 2 ? parseSide(sides[1], ctx) : [F.of(0)];
  const v = ctx.v ?? 'x';
  if (!ctx.v) throw new EqError('There is no variable to solve for. Include a letter, like x.');
  const steps: Step[] = [{ title: 'Start with the equation', math: `${pretty(sides[0])} = ${sides.length === 2 ? pretty(sides[1]) : '0'}`, note: sides.length === 1 ? 'No “=” was given, so the expression is set equal to 0.' : undefined }];
  const simple = `${show(L, v)} = ${show(R, v)}`;
  const flat = (t: string) => t.replace(/<\/?sup>/g, '').replace(/[\s^*]/g, '').replace(/−/g, '-');
  if (flat(simple) !== flat(sides.length === 2 ? raw : `${raw}=0`)) steps.push({ title: 'Expand brackets and combine like terms', math: simple });
  const P = padd(L, pneg(R)); const d = deg(P);
  if (d > 2) throw new EqError(`This is a degree ${d} equation. The solver handles linear (x) and quadratic (x²) equations.`);

  if (d <= 1) {
    const a = at(P, 1), c = at(P, 0); // a·v + c = 0  →  a·v = −c
    const aR = at(R, 1), cL = at(L, 0);
    const moves: string[] = [];
    if (!aR.zero) moves.push(`${aR.sign() > 0 ? 'subtract' : 'add'} ${show([F.of(0), aR.sign() < 0 ? aR.neg() : aR], v)} ${aR.sign() > 0 ? 'from' : 'to'} both sides`);
    if (!cL.zero) moves.push(`${cL.sign() > 0 ? 'subtract' : 'add'} ${(cL.sign() < 0 ? cL.neg() : cL)} ${cL.sign() > 0 ? 'from' : 'to'} both sides`);
    if (a.zero) {
      steps.push({ title: `Collect the ${v} terms`, math: `0 = ${c.neg()}`, note: `The ${v} terms cancel out.` });
      return c.zero
        ? { v, steps: [...steps, { title: 'Every value works', note: `0 = 0 is always true, so any value of ${v} solves the equation.` }], answer: `Every number is a solution`, values: [], kind: 'identity' }
        : { v, steps: [...steps, { title: 'No solution', note: `0 = ${c.neg()} is never true, so no value of ${v} works.` }], answer: 'No solution', values: [], kind: 'none' };
    }
    if (moves.length) steps.push({ title: `Get ${v} terms on one side and numbers on the other`, math: `${show([F.of(0), a], v)} = ${c.neg()}`, note: cap(moves.join(', and ')) + '.' });
    const x = c.neg().div(a);
    if (!(a.n === 1n && a.d === 1n)) steps.push({ title: `Divide both sides by ${a}`, math: `${v} = ${c.neg()} ÷ ${a.sign() < 0 ? `(${a})` : a} = ${x}`, note: x.int ? undefined : `As a decimal, ${v} ≈ ${dec(x.num())}.` });
    const lv = evalP(L, x), rv = evalP(R, x);
    steps.push({ title: 'Check the answer', math: `Left side = ${lv}, right side = ${rv} ✓`, note: `Put ${v} = ${x} back into the original equation. Both sides match.` });
    return { v, steps, answer: `${v} = ${x}${x.int ? '' : ` ≈ ${dec(x.num())}`}`, values: [x.num()], kind: 'linear' };
  }

  // Quadratic
  if (!trim(R).every((c) => c.zero)) steps.push({ title: 'Move everything to one side', math: `${show(P, v)} = 0`, note: 'Subtract the right side from both sides so the equation equals zero.' });
  else if (steps.length === 1 && flat(steps[0].math!) !== flat(`${show(P, v)} = 0`)) steps.push({ title: 'Write in standard order', math: `${show(P, v)} = 0` });
  let Q = P;
  const den = Q.reduce((m, c) => lcmB(m, c.d), 1n);
  if (den !== 1n) { Q = Q.map((c) => c.mul(new F(den))); steps.push({ title: `Multiply both sides by ${den} to clear fractions`, math: `${show(Q, v)} = 0` }); }
  let g = Q.reduce((m, c) => gcdB(m, c.n), 0n); if (at(Q, 2).sign() < 0) g = -g;
  if (g !== 1n && g !== 0n) { Q = Q.map((c) => c.div(new F(g))); steps.push({ title: g < 0n ? (g === -1n ? 'Multiply both sides by −1' : `Divide both sides by ${new F(g)}`) : `Divide both sides by ${g}`, math: `${show(Q, v)} = 0`, note: g < 0n ? `A positive ${v}² term makes the next steps easier.` : 'Every term shares this factor.' }); }
  const a = at(Q, 2).n, b = at(Q, 1).n, c = at(Q, 0).n;
  steps.push({ title: 'Identify a, b and c', math: `a = ${F.of(a)}, b = ${F.of(b)}, c = ${F.of(c)}`, note: `The equation has the form a${v}² + b${v} + c = 0.` });

  if (c === 0n) {
    const r = new F(-b, a);
    steps.push({ title: `Factor out ${v}`, math: `${v}(${show([F.of(b), F.of(a)], v)}) = 0`, note: 'There is no number term, so every term contains ' + v + '.' });
    steps.push({ title: 'Set each factor to zero', math: `${v} = 0 or ${show([F.of(b), F.of(a)], v)} = 0`, note: r.zero ? undefined : `Solving the second gives ${v} = ${r}.` });
    const vals = r.zero ? [0] : [0, r.num()].sort((p, q) => p - q);
    return { v, steps, answer: r.zero ? `${v} = 0 (a repeated root)` : `${v} = 0 or ${v} = ${r}${r.int ? '' : ` ≈ ${dec(r.num())}`}`, values: vals, kind: 'quadratic' };
  }

  const D = b * b - 4n * a * c;
  steps.push({ title: 'Work out the discriminant', math: `D = b² − 4ac = (${F.of(b)})² − 4 × ${F.of(a)} × ${c < 0n ? `(${F.of(c)})` : F.of(c)} = ${F.of(b * b)} ${4n * a * c < 0n ? '+' : '−'} ${F.of(absB(4n * a * c))} = ${F.of(D)}`,
    note: D > 0n ? 'D is positive, so there are two different real solutions.' : D === 0n ? 'D is zero, so there is exactly one (repeated) solution.' : 'D is negative, so there are no real solutions, only two complex ones.' });
  steps.push({ title: 'Use the quadratic formula', math: `${v} = (−b ± √D) / 2a = (${F.of(-b)} ± √${D < 0n ? `(${F.of(D)})` : F.of(D)}) / ${F.of(2n * a)}` });
  const [k, m] = splitSquare(absB(D));
  const twoA = 2n * a;
  if (D === 0n) {
    const r = new F(-b, twoA);
    return { v, steps: [...steps, { title: 'Simplify', math: `${v} = ${F.of(-b)} / ${F.of(twoA)} = ${r}` }], answer: `${v} = ${r}${r.int ? '' : ` ≈ ${dec(r.num())}`} (a repeated root)`, values: [r.num()], kind: 'quadratic' };
  }
  if (D > 0n && m === 1n) {
    const r1 = new F(-b - k, twoA), r2 = new F(-b + k, twoA);
    steps.push({ title: 'Simplify the square root', math: `√${D} = ${k}`, note: `${D} is a perfect square, so the answers are exact fractions or whole numbers.` });
    steps.push({ title: 'Work out both answers', math: `${v} = (${F.of(-b)} − ${k}) / ${F.of(twoA)} = ${r1}&nbsp;&nbsp;or&nbsp;&nbsp;${v} = (${F.of(-b)} + ${k}) / ${F.of(twoA)} = ${r2}` });
    const fmtR = (r: F) => `${r}${r.int ? '' : ` ≈ ${dec(r.num())}`}`;
    return { v, steps, answer: `${v} = ${fmtR(r1)} or ${v} = ${fmtR(r2)}`, values: [r1.num(), r2.num()].sort((p, q) => p - q), kind: 'quadratic' };
  }
  // Irrational or complex: (−b ± k√m [i]) / 2a, reduced by the common factor
  const i = D < 0n ? 'i' : '';
  const rootTxt = i ? `${k === 1n ? '' : k}i${m === 1n ? '' : `√${m}`}` : `${k === 1n ? '' : k}√${m}`;
  if (k !== 1n || m !== absB(D)) steps.push({ title: 'Simplify the square root', math: `√${D < 0n ? `(${F.of(D)})` : D} = ${rootTxt}`, note: D < 0n ? 'The square root of −1 is written i.' : `${absB(D)} = ${k * k} × ${m}, and √${k * k} = ${k}.` });
  let p = -b, kk = k, r = twoA; const gg = gcdB(gcdB(p, kk), r);
  p /= gg; kk /= gg; r /= gg; if (r < 0n) { p = -p; r = -r; }
  const surd = i ? `${kk === 1n ? '' : kk}i${m === 1n ? '' : `√${m}`}` : `${kk === 1n ? '' : kk}√${m}`;
  const exact = `${p === 0n ? '±' : `${F.of(p)} ± `}${surd}`;
  const exactAll = r === 1n ? exact : `(${exact}) / ${r}`;
  if (gg !== 1n) steps.push({ title: `Divide top and bottom by ${gg}`, math: `${v} = (${F.of(-b)} ± ${rootTxt}) / ${F.of(twoA)} = ${exactAll}` });
  const re = Number(-b) / Number(twoA), im = (Number(k) * Math.sqrt(Number(m))) / Number(twoA);
  if (D < 0n) {
    const imA = Math.abs(im);
    steps.push({ title: 'Write the complex solutions', math: `${v} = ${dec(re)} + ${dec(imA)}i&nbsp;&nbsp;or&nbsp;&nbsp;${v} = ${dec(re)} − ${dec(imA)}i` });
    return { v, steps, answer: `No real solutions. Complex: ${v} = ${exactAll}`, values: [], kind: 'complex' };
  }
  const x1 = re - Math.abs(im), x2 = re + Math.abs(im);
  steps.push({ title: 'Work out the decimal values', math: `${v} ≈ ${dec(x1)}&nbsp;&nbsp;or&nbsp;&nbsp;${v} ≈ ${dec(x2)}` });
  return { v, steps, answer: `${v} = ${exactAll} (≈ ${dec(x1)} or ${dec(x2)})`, values: [x1, x2], kind: 'quadratic' };
}

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const evalP = (p: Poly, x: F) => p.reduceRight((acc, c) => acc.mul(x).add(c), F.of(0));
const pretty = (s: string) => s.trim().replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\*/g, ' × ').replace(/\//g, ' ÷ ').replace(/\^(\d+)/g, '<sup>$1</sup>').replace(/-/g, '−').replace(/\s+/g, ' ');

/** Step list markup, shared by the build-time default and the browser. */
export const stepsHtml = (steps: Step[]) => steps.map((s, i) => `<li class="flex gap-3"><span class="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-[var(--cat-soft)] text-sm font-bold text-[var(--cat)]">${i + 1}</span><div class="min-w-0 pt-0.5"><p class="font-semibold">${s.title}</p>${s.math ? `<p class="mono mt-1 rounded-lg bg-surface-2 px-3 py-2">${s.math}</p>` : ''}${s.note ? `<p class="mt-1 text-sm text-muted">${s.note}</p>` : ''}</div></li>`).join('');
export const answerHtml = (a: string) => a.replace(/&(?!nbsp;)/g, '&amp;');
