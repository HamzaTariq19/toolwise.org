// Client-side tool search shared by the homepage grid, category pages and the header dialog.

const SYNONYMS: Record<string, string[]> = {
  photo: ['image', 'picture', 'jpg', 'png'],
  photos: ['image', 'picture'],
  picture: ['image', 'photo'],
  pic: ['image', 'photo'],
  pics: ['image', 'photo'],
  img: ['image'],
  shrink: ['compress', 'reduce', 'smaller'],
  reduce: ['compress', 'shrink'],
  smaller: ['compress', 'reduce'],
  small: ['compress', 'small'],
  size: ['resize', 'compress'],
  combine: ['merge', 'join'],
  join: ['merge', 'combine'],
  separate: ['split'],
  convert: ['to', 'converter'],
  calc: ['calculator'],
  calculate: ['calculator'],
  count: ['counter'],
  jpeg: ['jpg'],
  iphone: ['heic'],
  kilo: ['kg'],
  pounds: ['lbs', 'weight'],
  money: ['finance', 'loan', 'savings'],
  timer: ['stopwatch', 'countdown'],
  random: ['picker', 'generator'],
};

export const normalize = (s: string) =>
  s.toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9%+#.\s/-]/g, ' ').replace(/\s+/g, ' ').trim();

const stem = (w: string) => (w.length > 3 && w.endsWith('s') ? w.slice(0, -1) : w);

/**
 * Returns a score (> 0 = match). Every query word must match something:
 * the word itself, its singular form or a synonym.
 */
export function scoreMatch(query: string, name: string, haystack: string): number {
  const q = normalize(query);
  if (!q) return 1;
  const n = name.toLowerCase();
  const words = q.split(' ').filter((w) => w && !['a', 'an', 'the', 'my', 'online', 'free', 'tool', 'for', 'of'].includes(w));
  if (!words.length) return 1;
  let score = 0;
  for (const w of words) {
    const variants = [w, stem(w), ...(SYNONYMS[w] ?? [])];
    let best = 0;
    for (const v of variants) {
      if (!v) continue;
      if (n.includes(v)) best = Math.max(best, v === w ? 6 : 4);
      else if (haystack.includes(v)) best = Math.max(best, v === w ? 3 : 2);
    }
    if (!best) return 0;
    score += best;
  }
  if (n.startsWith(q)) score += 10;
  else if (n.includes(q)) score += 6;
  return score;
}

export interface IndexEntry {
  n: string; // name
  s: string; // slug
  c: string; // category slug
  cn: string; // category short name
  i: string; // icon svg inner markup
  d: string; // short description
  k: string; // haystack
  l: boolean; // live
}

export function searchIndex(index: IndexEntry[], query: string, limit = 30) {
  return index
    .map((e) => ({ e, score: scoreMatch(query, e.n, e.k) + (e.l ? 0.5 : 0) }))
    .filter((r) => r.score > 0.5)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.e);
}
