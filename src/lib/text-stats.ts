// Shared text measurements (Unicode aware)
const seg = typeof Intl !== 'undefined' && 'Segmenter' in Intl ? new (Intl as any).Segmenter(undefined, { granularity: 'grapheme' }) : null;
export const graphemes = (s: string) => (seg ? Array.from(seg.segment(s) as Iterable<unknown>).length : Array.from(s).length);
export const words = (s: string) => s.match(/[\p{L}\p{N}\p{M}]+(?:['’.-][\p{L}\p{N}\p{M}]+)*/gu) ?? [];
export const sentences = (s: string) => (s.trim() ? (s.match(/[^.!?…]+[.!?…]+(\s|$)|[^.!?…]+$/g) ?? []).filter((x) => /[\p{L}\p{N}]/u.test(x)) : []);

/** Approximate English syllables (dictionary-free heuristic used by most readability tools) */
export function syllables(word: string): number {
  let w = word.toLowerCase().replace(/[^a-z]/g, '');
  if (!w) return 0;
  if (w.length <= 3) return 1;
  w = w.replace(/(?:[^laeiouy]es|[^td]ed|[^laeiouy]e)$/, '').replace(/^y/, '');
  const m = w.match(/[aeiouy]{1,2}/g);
  return Math.max(1, m ? m.length : 1);
}
