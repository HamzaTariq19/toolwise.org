// World clock city cards: build-time placeholders and live cards share one template so the layout never jumps.
import { esc } from './ui';
export type Card = { name: string; i: number; night: boolean; work: boolean; sub: string; diff: string; time: string };
export const DEFAULT_CITIES = [['London', 'Europe/London'], ['New York', 'America/New_York'], ['Dubai', 'Asia/Dubai'], ['Tokyo', 'Asia/Tokyo']];
export const cardHtml = (c: Card) => `<li class="card flex items-center gap-3 p-4">
        <span class="flex h-10 w-10 flex-none items-center justify-center rounded-full text-lg ${c.night ? 'bg-[#1e293b] text-[#fde68a]' : 'bg-[#fef3c7] text-[#b45309]'}" aria-hidden="true">${c.night ? '☾' : '☀'}</span>
        <div class="min-w-0 flex-1"><p class="truncate font-semibold">${esc(c.name)}</p><p class="text-sm text-subtle">${c.sub}<br class="sm:hidden" /><span class="hidden sm:inline"> · </span>${c.diff}</p><p class="text-xs font-medium ${c.work ? 'text-success' : 'text-subtle'}">${c.work ? 'Working hours' : 'Outside working hours'}</p></div>
        <p class="text-2xl font-bold tabular">${c.time}</p>
        <button type="button" class="btn btn-ghost btn-sm !px-2 text-subtle" data-rm="${c.i}" aria-label="Remove ${esc(c.name)}">✕</button></li>`;
/** Placeholder cards for the default cities, shown until the script fills in the real times. */
export const placeholderCards = () => DEFAULT_CITIES.map(([name], i) => cardHtml({ name, i, night: false, work: false, sub: 'Today · UTC', diff: '–', time: '--:--' })).join('');
