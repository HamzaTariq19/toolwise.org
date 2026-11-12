// Sleep cycle suggestions: used at build time (default 7:00 wake-up) and in the browser.
export const CYCLE = 90;
export const fmtT = (min: number, locale?: string) => { const d = new Date(2000, 0, 1, 0, 0); d.setMinutes(((min % 1440) + 1440) % 1440); return d.toLocaleTimeString(locale, { hour: 'numeric', minute: '2-digit' }); };
const hrs = (c: number) => `${(c * CYCLE) / 60} hours`;
const rec = (c: number) => (c === 6 || c === 5 ? '<span class="badge !bg-success-soft !text-success">Recommended</span>' : '');
const li = (time: string, c: number) => `<li class="stat flex items-center justify-between gap-2"><span><span class="text-2xl font-bold tabular">${time}</span><span class="ml-2 text-sm text-muted">${c} cycles · ${hrs(c)} sleep</span></span>${rec(c)}</li>`;
/** mode "wake": bedtimes for a wake-up time; otherwise wake-up times for a bedtime (base = minutes after midnight) */
export function sleepPlan(mode: 'wake' | 'bed' | 'now', base: number, fall: number, locale?: string) {
  if (mode === 'wake') return { head: `To wake up refreshed at ${fmtT(base, locale)}, go to bed at one of these times:`, list: [6, 5, 4, 3].map((c) => li(fmtT(base - c * CYCLE - fall, locale), c)).join('') };
  return { head: mode === 'now' ? `If you go to bed now (${fmtT(base, locale)}), try to wake up at:` : `If you go to bed at ${fmtT(base, locale)}, try to wake up at:`, list: [3, 4, 5, 6].map((c) => li(fmtT(base + fall + c * CYCLE, locale), c)).join('') };
}
