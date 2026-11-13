// Instagram caption formatter: shared by the build-time default and the browser script.
export const BLANK = '⠀'; // Braille blank: shows as empty but is not removed by Instagram
export const DEFAULT_CAPTION = "Sunday reset ☀️\n\nThree things that made this week better:\n1. Morning walks\n2. Cooking at home\n3. Phones off after 9pm\n\nWhat's your favorite small habit? Tell me below 👇\n\n#sundayreset #slowliving #habits";
const esc = (s: string) => s.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c]!);
export function formatCaption(text: string, moveTags: boolean, keepBlank: boolean) {
  let lines = text.replace(/\r/g, '').split('\n').map((l) => l.replace(/\s+$/, ''));
  if (moveTags) {
    const tags: string[] = [];
    lines = lines.map((l) => l.replace(/(^|\s)(#[\p{L}\p{N}_]+)/gu, (_m, s, tag) => { tags.push(tag); return s; }).replace(/\s+$/, ''));
    while (lines.length && !lines[lines.length - 1].trim()) lines.pop();
    if (tags.length) lines.push('', [...new Set(tags)].join(' '));
  }
  while (lines.length && !lines[0].trim()) lines.shift();
  if (keepBlank) lines = lines.map((l) => (l.trim() ? l : BLANK));
  const result = lines.join('\n');
  const chars = [...result].length, tags = (result.match(/#[\p{L}\p{N}_]+/gu) ?? []).length, mentions = (result.match(/@[\w.]+/g) ?? []).length;
  const c: [boolean, string][] = [[chars <= 2200, chars > 2200 ? `${chars - 2200} characters over Instagram's 2,200 limit.` : 'Within the 2,200-character limit.'], [tags <= 30, tags > 30 ? 'More than 30 hashtags: Instagram will not post the caption.' : tags > 10 ? 'Many hashtags. 3 to 5 relevant ones often work better than dozens.' : 'Hashtag count is fine.'], [mentions <= 20, mentions > 20 ? 'More than 20 mentions are not allowed.' : 'Mentions are fine.']];
  const checks = c.map(([ok, m]) => `<li class="${ok ? 'text-success' : 'text-[#b45309] dark:text-[#fbbf24]'}">${ok ? '✓' : '!'} ${m}</li>`).join('');
  const shown = result.replace(new RegExp(BLANK, 'g'), ' '), cut = 125;
  const preview = `<strong>yourname</strong> ${esc(shown.length > cut ? shown.slice(0, cut).split('\n').slice(0, 2).join('\n') : shown)}${shown.length > cut ? '<span class="text-[#737373]">… more</span>' : ''}`;
  return { result, stats: { chars: `${chars} / 2,200`, tags: `${tags} / 30`, mentions: `${mentions} / 20` }, checks, preview };
}
