// Small, careful minifiers for CSS and HTML that never touch the inside of strings, <pre>, <textarea>, <script> or <style>.

export function minifyCss(css: string, keepLicense = true): string {
  let out = '', i = 0;
  const n = css.length;
  while (i < n) {
    const c = css[i];
    if (c === '"' || c === "'") { // copy strings untouched
      let j = i + 1; while (j < n && css[j] !== c) { if (css[j] === '\\') j++; j++; }
      out += css.slice(i, j + 1); i = j + 1; continue;
    }
    if (c === '/' && css[i + 1] === '*') {
      const end = css.indexOf('*/', i + 2), stop = end < 0 ? n : end + 2;
      if (keepLicense && css[i + 2] === '!') out += css.slice(i, stop);
      i = stop; continue;
    }
    if (/\s/.test(c)) { while (i < n && /\s/.test(css[i])) i++; out += ' '; continue; }
    out += c; i++;
  }
  // Remove spaces around punctuation, outside strings (strings contain no unescaped quotes boundaries we cross here)
  return out
    .replace(/("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|\s*([{};,>~])\s*/g, (_m, str, p) => (str ? str : p))
    .replace(/("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|:\s+/g, (_m, str) => (str ? str : ":"))
    .replace(/;}/g, '}')
    .replace(/\s*!important/g, '!important')
    .replace(/(:|\s)0\.(\d)/g, '$1.$2')
    .replace(/#([0-9a-f])\1([0-9a-f])\2([0-9a-f])\3\b/gi, '#$1$2$3')
    .trim();
}

export function minifyHtml(html: string, opts: { comments: boolean; css: boolean }) {
  const keep: string[] = [];
  const stash = (s: string) => `\u0000${keep.push(s) - 1}\u0000`;
  let s = html.replace(/<(pre|textarea|script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, (block, tag: string) => {
    if (tag.toLowerCase() === 'style' && opts.css) return stash(block.replace(/(<style\b[^>]*>)([\s\S]*?)(<\/style>)/i, (_m, a, b, c) => a + minifyCss(b) + c));
    return stash(block);
  });
  if (opts.comments) s = s.replace(/<!--(?!\[if|<!|>)[\s\S]*?-->/g, '');
  s = s.replace(/\s+/g, ' ')                           // collapse whitespace
    .replace(/>\s+</g, (m) => (/\n/.test(m) || m.length > 2 ? '> <' : m))
    .replace(/\s*(<\/?(?:html|head|body|meta|link|title|div|p|ul|ol|li|section|article|header|footer|nav|main|aside|table|thead|tbody|tr|td|th|h[1-6]|br|hr|form|fieldset|legend|option|select|figure|figcaption|!doctype)\b[^>]*>)\s*/gi, '$1')
    .trim();
  return s.replace(/\u0000(\d+)\u0000/g, (_m, i) => keep[Number(i)]);
}
