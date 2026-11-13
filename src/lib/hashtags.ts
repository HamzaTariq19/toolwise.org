// Hashtag generator: shared by the build-time default and the browser script.
export const STOP = new Set('a an and the of to in on at for with by from is are was were be my your our this that these those it its me we you they i just very really so some any into out up about over after before new get got make made how what why when where who which'.split(' '));
export const LIMIT: Record<string, number> = { ig: 10, tt: 6, x: 2, li: 5, yt: 15 };
export const DEFAULT_TEXT = 'homemade sourdough bread, weekend baking in London';
export function makeTags(text: string, camel: boolean, plat: string) {
  const fmt = (ws: string[]) => (camel ? ws.map((w) => w[0].toUpperCase() + w.slice(1)).join('') : ws.join(''));
  const raw = text.toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '');
  const phrases = raw.split(/[,;\n.]+/).map((p) => p.split(/[^\p{L}\p{N}]+/u).filter((w) => w && !STOP.has(w))).filter((p) => p.length);
  const words = [...new Set(phrases.flat().filter((w) => w.length > 2))];
  const out: string[] = [];
  phrases.forEach((p) => { if (p.length >= 2 && p.length <= 3) out.push(fmt(p)); for (let i = 0; i + 1 < p.length; i++) out.push(fmt([p[i], p[i + 1]])); });
  words.forEach((w) => out.push(fmt([w])));
  const tags = [...new Map(out.filter((t) => t.length >= 3 && t.length <= 30).map((t) => [t.toLowerCase(), t])).values()];
  return { tags, off: new Set(tags.slice(LIMIT[plat])) };
}
export const tagsHtml = (tags: string[], off: Set<string>) => tags.length ? tags.map((t) => `<button type="button" class="chip ${off.has(t) ? 'opacity-60 line-through' : ''}" aria-pressed="${!off.has(t)}" data-t="${t}">#${t}</button>`).join('') : '<p class="text-muted">Type a few words about your post.</p>';
export const selText = (tags: string[], off: Set<string>, plat: string) => { const n = tags.filter((t) => !off.has(t)).length, lim = LIMIT[plat]; return `${n} selected${n > lim ? ` · more than the ${lim} usually recommended` : ''}`; };
