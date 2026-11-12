import { store } from './ui';

/** Monthly payment for a fully amortizing loan */
export function payment(principal: number, annualRatePct: number, months: number): number {
  if (months <= 0) return NaN;
  const r = annualRatePct / 100 / 12;
  if (r === 0) return principal / months;
  return (principal * r) / (1 - Math.pow(1 + r, -months));
}

export interface YearRow { year: number; principal: number; interest: number; balance: number }

export function amortizeYearly(principal: number, annualRatePct: number, months: number, extraMonthly = 0): { rows: YearRow[]; totalInterest: number; months: number } {
  const r = annualRatePct / 100 / 12;
  const pay = payment(principal, annualRatePct, months) + extraMonthly;
  let bal = principal, totalInterest = 0, m = 0;
  const rows: YearRow[] = [];
  let yP = 0, yI = 0;
  while (bal > 0.005 && m < 1200) {
    const interest = bal * r;
    let princ = pay - interest;
    if (princ > bal) princ = bal;
    bal -= princ;
    totalInterest += interest;
    yP += princ; yI += interest; m++;
    if (m % 12 === 0 || bal <= 0.005) { rows.push({ year: Math.ceil(m / 12), principal: yP, interest: yI, balance: Math.max(0, bal) }); yP = 0; yI = 0; }
  }
  return { rows, totalInterest, months: m };
}

/** Shared currency preference across finance calculators */
export function bindCurrency(select: HTMLSelectElement, onChange: () => void) {
  select.value = store.get('tw-currency', '$');
  select.addEventListener('change', () => { store.set('tw-currency', select.value); onChange(); });
  return () => select.value;
}

/** Wire every input in a form to recompute live */
export function live(form: HTMLElement, fn: () => void) {
  form.addEventListener('input', fn);
  form.addEventListener('change', fn);
  fn();
}

export function addMonths(d: Date, n: number) { const x = new Date(d); x.setMonth(x.getMonth() + n); return x; }
export const monthYear = (d: Date) => d.toLocaleDateString(undefined, { month: 'long', year: 'numeric' });

/**
 * Small helper for calculator result panels. Expects inside root:
 * [data-ok] (results), optional [data-empty] (placeholder) and [data-msg] (error message).
 */
export function resultsUi(root: HTMLElement) {
  const ok = root.querySelector<HTMLElement>('[data-ok]'), empty = root.querySelector<HTMLElement>('[data-empty]'), msg = root.querySelector<HTMLElement>('[data-msg]');
  return {
    set(key: string, value: string) { const el = root.querySelector(`[data-r="${key}"]`); if (el) el.textContent = value; },
    html(key: string, value: string) { const el = root.querySelector(`[data-r="${key}"]`); if (el) el.innerHTML = value; },
    show() { if (ok) ok.hidden = false; if (empty) empty.hidden = true; if (msg) msg.hidden = true; },
    empty() { if (ok) ok.hidden = true; if (empty) empty.hidden = false; if (msg) msg.hidden = true; },
    fail(text: string) { if (ok) ok.hidden = true; if (empty) empty.hidden = true; if (msg) { msg.hidden = false; msg.textContent = text; } },
  };
}
export const val = (id: string) => (document.getElementById(id) as HTMLInputElement).value;

/** Read BodyInputs: returns height in cm, weight in kg, age, sex and unit system */
export function body(id: string) {
  const r = (n: string) => (document.querySelector(`input[name="${id}-${n}"]:checked`) as HTMLInputElement).value;
  const v = (k: string) => { const el = document.getElementById(`${id}-${k}`) as HTMLInputElement | null; return el ? Number(el.value.replace(/,/g, '.').trim() || NaN) : NaN; };
  const us = r('u') === 'us';
  document.querySelectorAll<HTMLElement>(`#${id} [data-u]`).forEach((e) => (e.hidden = e.dataset.u !== r('u')));
  return { us, sex: r('sex') as 'f' | 'm', age: v('age'), cm: us ? ((v('ft') || 0) * 12 + (v('in') || 0)) * 2.54 : v('cm'), kg: us ? v('lb') * 0.45359237 : v('kg') };
}
