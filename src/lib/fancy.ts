// Unicode "font" styles. These are real Unicode characters, so they paste anywhere that supports Unicode.
type Map = (c: string) => string;
const cp = (n: number) => String.fromCodePoint(n);

function alpha(upper: number, lower: number, digits?: number, ex: Record<string, number> = {}): Map {
  return (c) => {
    if (ex[c]) return cp(ex[c]);
    const o = c.charCodeAt(0);
    if (o >= 65 && o <= 90) return cp(upper + o - 65);
    if (o >= 97 && o <= 122) return cp(lower + o - 97);
    if (digits && o >= 48 && o <= 57) return cp(digits + o - 48);
    return c;
  };
}
const SC = 'ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘǫʀꜱᴛᴜᴠᴡxʏᴢ';
const FLIP: Record<string, string> = { a: 'ɐ', b: 'q', c: 'ɔ', d: 'p', e: 'ǝ', f: 'ɟ', g: 'ƃ', h: 'ɥ', i: 'ᴉ', j: 'ɾ', k: 'ʞ', l: 'l', m: 'ɯ', n: 'u', o: 'o', p: 'd', q: 'b', r: 'ɹ', s: 's', t: 'ʇ', u: 'n', v: 'ʌ', w: 'ʍ', x: 'x', y: 'ʎ', z: 'z', '.': '˙', ',': "'", '?': '¿', '!': '¡', "'": ',', '(': ')', ')': '(', '1': 'Ɩ', '2': 'ᄅ', '3': 'Ɛ', '4': 'ㄣ', '5': 'ϛ', '6': '9', '7': 'ㄥ', '8': '8', '9': '6', '0': '0' };

export const STYLES: { name: string; fn: (s: string) => string }[] = [
  ['Bold', alpha(0x1d400, 0x1d41a, 0x1d7ce)],
  ['Italic', alpha(0x1d434, 0x1d44e, undefined, { h: 0x210e })],
  ['Bold italic', alpha(0x1d468, 0x1d482)],
  ['Script', alpha(0x1d49c, 0x1d4b6, undefined, { B: 0x212c, E: 0x2130, F: 0x2131, H: 0x210b, I: 0x2110, L: 0x2112, M: 0x2133, R: 0x211b, e: 0x212f, g: 0x210a, o: 0x2134 })],
  ['Bold script', alpha(0x1d4d0, 0x1d4ea)],
  ['Gothic', alpha(0x1d504, 0x1d51e, undefined, { C: 0x212d, H: 0x210c, I: 0x2111, R: 0x211c, Z: 0x2128 })],
  ['Bold gothic', alpha(0x1d56c, 0x1d586)],
  ['Double-struck', alpha(0x1d538, 0x1d552, 0x1d7d8, { C: 0x2102, H: 0x210d, N: 0x2115, P: 0x2119, Q: 0x211a, R: 0x211d, Z: 0x2124 })],
  ['Sans bold', alpha(0x1d5d4, 0x1d5ee, 0x1d7ec)],
  ['Sans italic', alpha(0x1d608, 0x1d622)],
  ['Sans bold italic', alpha(0x1d63c, 0x1d656)],
  ['Monospace', alpha(0x1d670, 0x1d68a, 0x1d7f6)],
  ['Circled', (c: string) => { const o = c.charCodeAt(0); if (o >= 65 && o <= 90) return cp(0x24b6 + o - 65); if (o >= 97 && o <= 122) return cp(0x24d0 + o - 97); if (o >= 49 && o <= 57) return cp(0x2460 + o - 49); if (c === '0') return cp(0x24ea); return c; }],
  ['Squared', (c: string) => { const o = c.toUpperCase().charCodeAt(0); return o >= 65 && o <= 90 ? cp(0x1f130 + o - 65) : c; }],
  ['Wide', (c: string) => { const o = c.charCodeAt(0); return o >= 0x21 && o <= 0x7e ? cp(0xff01 + o - 0x21) : c === ' ' ? '　' : c; }],
  ['Small caps', (c: string) => { const o = c.toLowerCase().charCodeAt(0); return o >= 97 && o <= 122 ? SC[o - 97] : c; }],
  ['Strikethrough', (c: string) => (c === ' ' || c === '\n' ? c : c + '̶')],
  ['Underline', (c: string) => (c === '\n' ? c : c + '̲')],
].map(([name, map]) => ({ name: name as string, fn: (s: string) => Array.from(s).map(map as Map).join('') }));

STYLES.push({ name: 'Upside down', fn: (s) => Array.from(s.toLowerCase()).map((c) => FLIP[c] ?? c).reverse().join('') });
STYLES.push({ name: 'Bubble spaced', fn: (s) => Array.from(s).join(' ') });
