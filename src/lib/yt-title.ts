// YouTube title checks: shared by the build-time default and the browser script.
export const DEFAULT_TITLE = 'How I Saved $10,000 in One Year (Simple Budget That Actually Works)';
export function titleView(raw: string, keyword: string) {
  const s = raw.replace(/\s+/g, ' ').trim(), n = [...s].length;
    const words = s.split(' ').filter(Boolean), caps = words.filter((w) => w.length > 3 && /^[^a-z]*[A-Z][^a-z]*$/.test(w)).length;
    const emoji = (s.match(/\p{Extended_Pictographic}/gu) ?? []).length, k = keyword.trim().toLowerCase();
    const c: [boolean, string][] = [
      [n > 0 && n <= 100, n > 100 ? `Too long: YouTube will not accept more than 100 characters (${n - 100} over).` : n === 0 ? 'Add a title.' : 'Within YouTube\'s 100-character limit.'],
      [n <= 70, n > 70 ? 'Likely to be cut off in search after about 60 to 70 characters. Put the most important words first.' : 'Short enough to show in full in most places.'],
      [n >= 20, n < 20 ? 'Very short. Add detail that tells viewers what they will get.' : 'Descriptive length.'],
      [caps <= 2, caps > 2 ? `${caps} words in ALL CAPS. Use capitals for one or two words at most so the title doesn't look like clickbait.` : 'Capital letters used sparingly.'],
      [emoji <= 2, emoji > 2 ? 'Lots of emoji. One or two can help; more looks spammy.' : 'Emoji use is fine.'],
      [!k || s.toLowerCase().includes(k), !k ? 'Add a main keyword to check its position.' : s.toLowerCase().includes(k) ? (s.toLowerCase().indexOf(k) < 40 ? 'Keyword appears early. Great.' : 'Keyword appears, but late; try moving it nearer the start.') : 'Your keyword is not in the title.'],
      [!/(.)\1{3,}|[!?]{3,}/.test(s), /(.)\1{3,}|[!?]{3,}/.test(s) ? 'Avoid repeated characters like !!! or ????.' : 'No excessive punctuation.'],
    ];
  return { s, n, count: `${n} / 100`, width: `${Math.min(100, n)}%`, color: n > 100 ? '#dc2626' : n > 70 ? '#f59e0b' : '#16a34a', checks: c.map(([ok, m]) => `<li class="flex gap-2 ${ok ? '' : 'text-[#b45309] dark:text-[#fbbf24]'}"><span class="${ok ? 'text-success' : ''}">${ok ? '✓' : '!'}</span>${m}</li>`).join('') };
}
