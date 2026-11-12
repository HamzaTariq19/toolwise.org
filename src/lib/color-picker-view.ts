// HTML for the color picker's result panels. Used at build time (initial color, so nothing shifts) and in the browser.
import { toHex, rgbToHsl, hslToRgb, contrast, type RGB } from './color';

const sw = (c: RGB) => `<button type="button" class="aspect-square min-h-10" style="background:${toHex(c)}" data-use="${toHex(c)}" title="${toHex(c)}" aria-label="Use ${toHex(c)}"></button>`;
const grade = (r: number) => (r >= 7 ? 'AAA' : r >= 4.5 ? 'AA' : r >= 3 ? 'AA for large text only' : 'Not readable');

export function colorViews(cur: RGB) {
  const hex = toHex(cur), hsl = rgbToHsl(cur), solid = toHex({ ...cur, a: 1 });
  const a = cur.a < 1 ? cur.a.toFixed(2).replace(/0+$/, '').replace(/\.$/, '') : '';
  const codes = [['HEX', hex], ['RGB', a ? `rgb(${cur.r} ${cur.g} ${cur.b} / ${a})` : `rgb(${cur.r}, ${cur.g}, ${cur.b})`], ['HSL', a ? `hsl(${hsl.h} ${hsl.s}% ${hsl.l}% / ${a})` : `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`], ['CSS variable', `--color-brand: ${hex};`]];
  const H = (d: number) => ({ ...hslToRgb(hsl.h + d, hsl.s, hsl.l), a: 1 });
  const white = { r: 255, g: 255, b: 255, a: 1 }, black = { r: 0, g: 0, b: 0, a: 1 }, base = { ...cur, a: 1 };
  return {
    codes: codes.map(([k, v]) => `<li class="flex items-center justify-between gap-2 rounded-lg bg-surface-2 px-3 py-1.5"><span class="w-24 flex-none text-sm text-muted">${k}</span><code class="mono min-w-0 flex-1 truncate text-sm">${v}</code><button type="button" class="btn btn-ghost btn-sm" data-copy="${v}"><span data-label>Copy</span></button></li>`).join(''),
    shades: [95, 85, 72, 60, hsl.l, 40, 30, 20, 10].map((l) => sw({ ...hslToRgb(hsl.h, hsl.s, l), a: 1 })).join(''),
    harmony: ([['Complementary', [0, 180]], ['Analogous', [-30, 0, 30]], ['Triadic', [0, 120, 240]], ['Split complementary', [0, 150, 210]]] as [string, number[]][]).map(([n, ds]) => `<div><p class="mb-1 text-sm text-muted">${n}</p><div class="grid overflow-hidden rounded-lg" style="grid-template-columns:repeat(${ds.length},1fr)">${ds.map((d) => sw(H(d))).join('')}</div></div>`).join(''),
    // The sample is drawn as an image (it may be deliberately unreadable); the ratio below it is normal text
    contrast: ([['White text', white], ['Black text', black]] as [string, RGB][]).map(([n, t]) => { const r = contrast(base, t), fill = toHex(t); return `<div><svg viewBox="0 0 240 56" class="block h-14 w-full rounded-lg" role="img" aria-label="${n} on this color, contrast ${r.toFixed(2)} to 1"><rect width="240" height="56" fill="${solid}"/><text x="14" y="34" fill="${fill}" font-size="17" font-weight="600" font-family="Inter Variable, system-ui, sans-serif">${n} on this color</text></svg><p class="mt-1 text-sm"><span class="font-semibold">${r.toFixed(2)}:1</span> · ${grade(r)}</p></div>`; }).join(''),
  };
}
