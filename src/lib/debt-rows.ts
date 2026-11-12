// Debt rows for the debt snowball calculator: rendered at build time (default debts) and in the browser.
export type Debt = { name: string; bal: string; apr: string; min: string };
export const DEFAULT_DEBTS: Debt[] = [{ name: 'Credit card', bal: '4,500', apr: '22.9', min: '135' }, { name: 'Car loan', bal: '9,800', apr: '6.5', min: '290' }, { name: 'Store card', bal: '850', apr: '27', min: '35' }];
const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);
export const debtRowsHtml = (debts: Debt[]) => debts.map((d, i) => `<li class="grid grid-cols-2 items-end gap-2 rounded-[10px] border border-line p-2 md:grid-cols-[1fr_7rem_5rem_7rem_2.75rem] md:border-0 md:p-0" data-i="${i}">
      <input class="input col-span-2 md:col-span-1" aria-label="Debt ${i + 1} name" placeholder="Name" data-f="name" value="${esc(d.name)}" />
      <label class="block"><span class="mb-1 block text-xs font-semibold text-muted md:sr-only">Balance</span><input class="input tabular" inputmode="decimal" aria-label="Debt ${i + 1} balance" placeholder="Balance" data-f="bal" value="${esc(d.bal)}" /></label>
      <label class="block"><span class="mb-1 block text-xs font-semibold text-muted md:sr-only">APR %</span><input class="input tabular" inputmode="decimal" aria-label="Debt ${i + 1} interest rate" placeholder="APR %" data-f="apr" value="${esc(d.apr)}" /></label>
      <label class="block"><span class="mb-1 block text-xs font-semibold text-muted md:sr-only">Minimum / month</span><input class="input tabular" inputmode="decimal" aria-label="Debt ${i + 1} minimum payment" placeholder="Minimum" data-f="min" value="${esc(d.min)}" /></label>
      <button type="button" class="btn btn-ghost h-11 w-11 !p-0" data-del aria-label="Remove debt ${i + 1}"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg></button></li>`).join('');;
