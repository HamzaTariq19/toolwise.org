// Offline password strength estimate. Finds predictable parts (common passwords, words, sequences,
// repeats, keyboard runs, years and dates) and estimates how many guesses an attacker needs.
// Runs entirely in the browser; the password is never stored or sent anywhere.

const COMMON = `123456 password 123456789 12345678 12345 qwerty 1234567 111111 1234567890 123123 abc123 1234 password1 iloveyou 1q2w3e4r 000000 qwerty123 zaq12wsx dragon sunshine princess letmein 654321 monkey 27653 1qaz2wsx 123321 qwertyuiop superman asdfghjkl football baseball welcome admin login master hello freedom whatever qazwsx trustno1 shadow michael jennifer jordan hunter buster soccer harley batman andrew tigger charlie robert thomas hockey ranger daniel starwars 112233 george computer michelle jessica pepper 1111 zxcvbnm 555555 11111111 131313 7777777 121212 666666 987654321 maggie cheese summer ashley nicole chelsea biteme matthew access yankees dallas austin thunder taylor matrix mustang killer love secret test passw0rd password123 qwe123 abcdef abcd1234 google flower lovely angel baby hello123 696969 liverpool arsenal chocolate samsung pokemon minecraft naruto blink182 purple orange banana cookie ginger silver golden internet family forever junior peanut snoopy iloveu babygirl lovers jesus blessed qwerty1 123qwe 1qazxsw2 asdf1234 aa123456 1234qwer qweasd q1w2e3r4 123abc a123456 abcabc 147258369 159753 789456 asdfgh azerty 123456a password12 welcome1 admin123 root toor guest changeme default letmein1 monkey1 dragon1 iloveyou1 sunshine1 princess1 football1 baseball1 superman1 charlie1 michael1 shadow1 master1 hunter2 jordan23 lakers cowboys eagles steelers yellow diamond butterfly hannah jasmine amanda samantha sophie daniel1 joshua hannah1 madison tiffany heather melissa justin william james123 qwertyu zxcvbn zxcvb asdfg qazwsxedc 1q2w3e 1q2w3e4r5t 12qwaszx 123654 112233445566 7654321 87654321 0987654321 999999 888888 222222 333333 444444 101010 202020 123123123 1234512345`.split(' ');
const WORDS = `love life time year people world house home family friend money music happy smile heart dream angel baby girl boy king queen prince star moon sun sky sea ocean river fire water earth wind storm snow rain winter summer spring autumn fall monday friday sunday january february march april may june july august september october november december red blue green black white yellow purple orange pink gold silver dog cat horse tiger lion bear wolf eagle dragon monkey bird fish snake shark rabbit apple banana cherry lemon mango coffee pizza chocolate cookie candy sugar honey flower rose lily daisy tree forest mountain island city london paris berlin tokyo texas florida america canada england china india school college teacher doctor music guitar piano rock metal jazz dance game player soccer football hockey tennis golf ninja pirate magic power super hero batman spider iron captain hello welcome secret private letmein freedom peace hope faith grace glory jesus god lord shadow ghost dark light night day morning evening computer internet google apple samsung windows linux code hacker admin user login pass word password master guest test demo sample business office work job car truck bike train plane ship boat beach summer party birthday wedding christmas easter holiday love you forever always never only lucky happy funny crazy cool nice sweet pretty beauty secret mother father sister brother daughter son wife husband john james robert michael william david richard joseph thomas charles mary patricia jennifer linda elizabeth barbara susan jessica sarah karen nancy lisa emma olivia ava sophia mia noah liam ethan mason lucas alex sam max ben jack harry oliver charlie george emily grace chloe lily zoe anna maria jose juan carlos luis ahmed ali mohammed fatima omar hassan mike john dave tom chris matt nick josh ryan kevin jason brian eric adam mark paul steve scott kate amy jen lucy jake luke tony anna sara laura jane alice bob peter mark rose kim lee chan wang singh khan`.split(' ');
const RANK = new Map<string, number>();
COMMON.forEach((w, i) => RANK.set(w, i + 1));
WORDS.forEach((w, i) => { if (!RANK.has(w)) RANK.set(w, COMMON.length + (i + 1) * 4); });
const LEET: Record<string, string[]> = { '4': ['a'], '@': ['a'], '3': ['e'], '1': ['i', 'l'], '!': ['i'], '|': ['i', 'l'], '0': ['o'], '$': ['s'], '5': ['s'], '7': ['t'], '+': ['t'], '8': ['b'], '9': ['g'], '2': ['z'] };
const ROWS = ['`1234567890-=', 'qwertyuiop[]\\', "asdfghjkl;'", 'zxcvbnm,./', 'qwertzuiop', 'yxcvbnm', 'azertyuiop', 'qsdfghjklm', 'wxcvbn'];

export type Kind = 'common' | 'word' | 'sequence' | 'repeat' | 'keyboard' | 'year' | 'date' | 'random';
export type Part = { i: number; j: number; kind: Kind; log: number; token: string; note?: string };

const card = (c: string) => (/[0-9]/.test(c) ? 10 : /[a-z]/.test(c) ? 26 : /[A-Z]/.test(c) ? 26 : /[\x20-\x7e]/.test(c) ? 33 : 100);
const log10 = Math.log10;
function caseVariations(tok: string) {
  if (tok === tok.toLowerCase()) return 1;
  const up = [...tok].filter((c) => c !== c.toLowerCase()).length, low = [...tok].filter((c) => c !== c.toUpperCase()).length;
  if (tok === tok.toUpperCase() || (/^[A-Z][^A-Z]*$/.test(tok)) || /^[^A-Z]*[A-Z]$/.test(tok)) return 2;
  let v = 0; const n = up + low; for (let k = 1; k <= Math.min(up, low); k++) v += choose(n, k); return Math.max(2, v);
}
function choose(n: number, k: number) { let r = 1; for (let i = 1; i <= k; i++) r = (r * (n - k + i)) / i; return r; }
function unleet(s: string): string[] {
  let out = [''];
  for (const c of s) { const opts = LEET[c] ?? [c]; out = out.flatMap((o) => opts.map((x) => o + x)); if (out.length > 16) out = out.slice(0, 16); }
  return out;
}

function findParts(pw: string): Part[] {
  const parts: Part[] = [], low = pw.toLowerCase(), n = pw.length;
  // dictionary and common passwords (with letter swaps)
  for (let i = 0; i < n; i++) for (let j = i + 3; j <= Math.min(n, i + 24); j++) {
    const tok = pw.slice(i, j), l = low.slice(i, j);
    const direct = RANK.get(l);
    if (direct) { parts.push({ i, j, kind: direct <= COMMON.length ? 'common' : 'word', log: log10(direct * caseVariations(tok)), token: tok }); continue; }
    if (/[^a-z]/.test(l)) for (const u of unleet(l)) { const r = RANK.get(u); if (r && u !== l && /[a-z]/.test(l)) { parts.push({ i, j, kind: r <= COMMON.length ? 'common' : 'word', log: log10(r * caseVariations(tok) * 4), token: tok, note: 'swap' }); break; } }
    const rev = [...l].reverse().join(''), rr = RANK.get(rev); if (rr && rev.length >= 4) parts.push({ i, j, kind: 'word', log: log10(rr * 2 * caseVariations(tok)), token: tok, note: 'reversed' });
  }
  // sequences such as abc, 4567, zyx
  for (let i = 0; i < n - 2;) {
    const d = low.charCodeAt(i + 1) - low.charCodeAt(i); let j = i + 1;
    if (Math.abs(d) === 1) { while (j < n && low.charCodeAt(j) - low.charCodeAt(j - 1) === d) j++; }
    if (j - i >= 3 && /^[a-z]+$|^[0-9]+$/.test(low.slice(i, j))) { const base = /[0-9]/.test(low[i]) ? 10 : 26; parts.push({ i, j, kind: 'sequence', log: log10(base * (j - i) * (d < 0 ? 2 : 1)), token: pw.slice(i, j) }); i = j - 1; } else i++;
  }
  // repeats: aaaa or abcabc
  for (const m of pw.matchAll(/(.+?)\1+/g)) {
    if (m[0].length < 3) continue;
    const base = m[1], times = m[0].length / base.length, i = m.index!;
    const baseLog = base.length === 1 ? log10(card(base)) : estimate(base).log;
    parts.push({ i, j: i + m[0].length, kind: 'repeat', log: baseLog + log10(times), token: m[0] });
  }
  // keyboard runs along a row (4+ keys), either direction
  for (let i = 0; i < n - 3; i++) for (const row of ROWS) for (const r of [row, [...row].reverse().join('')]) {
    let j = i; const at = r.indexOf(low[i]); if (at < 0) continue;
    while (j < n && r[at + (j - i)] === low[j]) j++;
    if (j - i >= 4) parts.push({ i, j, kind: 'keyboard', log: log10(40 * (j - i) * caseVariations(pw.slice(i, j))), token: pw.slice(i, j) });
  }
  // years and dates
  for (const m of pw.matchAll(/(19|20)\d\d/g)) parts.push({ i: m.index!, j: m.index! + 4, kind: 'year', log: log10(120), token: m[0] });
  for (const m of pw.matchAll(/\d{1,2}[-/._]?\d{1,2}[-/._]?(?:19|20)?\d{2}/g)) if (m[0].length >= 4 && plausibleDate(m[0])) parts.push({ i: m.index!, j: m.index! + m[0].length, kind: 'date', log: log10(365 * 100 * (/[-/._]/.test(m[0]) ? 4 : 1)), token: m[0] });
  return parts;
}
function plausibleDate(s: string) { const d = s.replace(/[-/._]/g, ''); if (d.length < 4 || d.length > 8) return false; const a = +d.slice(0, 2), b = +d.slice(2, 4); return (a >= 1 && a <= 31 && b >= 1 && b <= 31 && (a <= 12 || b <= 12)); }

/** log10 of guesses for the best (lowest) way to build the password from parts and random characters */
export function estimate(pw: string): { log: number; parts: Part[] } {
  const n = pw.length; if (!n) return { log: 0, parts: [] };
  const all = findParts(pw), byEnd: Part[][] = Array.from({ length: n + 1 }, () => []);
  all.forEach((p) => byEnd[p.j].push(p));
  const best: { log: number; k: number; path: Part[] }[] = [{ log: 0, k: 0, path: [] }];
  for (let j = 1; j <= n; j++) {
    const c = pw[j - 1], prev = best[j - 1];
    // random character: extend the previous random run if there is one
    const last = prev.path[prev.path.length - 1];
    let cand = { log: prev.log + log10(card(c)), k: last?.kind === 'random' ? prev.k : prev.k + 1, path: last?.kind === 'random' ? [...prev.path.slice(0, -1), { ...last, j, token: last.token + c, log: last.log + log10(card(c)) }] : [...prev.path, { i: j - 1, j, kind: 'random' as Kind, log: log10(card(c)), token: c }] };
    for (const p of byEnd[j]) { const b = best[p.i]; const lg = b.log + p.log; if (lg + log10(fact(b.k + 1)) < cand.log + log10(fact(cand.k))) cand = { log: lg, k: b.k + 1, path: [...b.path, p] }; }
    best[j] = cand;
  }
  const r = best[n];
  return { log: Math.max(r.log + log10(fact(r.k)), 0), parts: r.path };
}
const fact = (k: number) => { let r = 1; for (let i = 2; i <= k; i++) r *= i; return r; };

export const RATES = { online: 10 / 3600 * 100, onlineFast: 10, offlineSlow: 1e4, offlineFast: 1e10 }; // guesses per second
export function crackTime(log: number, rate: number) {
  const s = Math.pow(10, log) / 2 / rate; // on average half the guesses are needed
  return humanize(s);
}
function humanize(s: number) {
  const steps: [number, string][] = [[1, 'second'], [60, 'minute'], [3600, 'hour'], [86400, 'day'], [2629746, 'month'], [31556952, 'year'], [3155695200, 'century']];
  if (s < 1) return 'instantly';
  if (s >= 3155695200 * 1000) return 'more than 100,000 years';
  let pick = steps[0]; for (const st of steps) if (s >= st[0]) pick = st;
  const v = Math.round(s / pick[0]), name = pick[1] === 'century' ? (v === 1 ? 'century' : 'centuries') : pick[1] + (v === 1 ? '' : 's');
  return `about ${v.toLocaleString()} ${name}`;
}
/** 0–4. Short passwords are capped because any short password falls quickly to an offline attack. */
export function score(log: number, length = 99) {
  const s = log < 5 ? 0 : log < 8 ? 1 : log < 11 ? 2 : log < 14 ? 3 : 4;
  return Math.min(s, length < 8 ? 1 : length < 10 ? 2 : length < 12 ? 3 : 4);
}
export const LABELS = ['Very weak', 'Weak', 'Fair', 'Strong', 'Very strong'];

export function feedback(pw: string, parts: Part[], sc: number) {
  const warn: string[] = [], tips: string[] = [];
  const kinds = new Set(parts.map((p) => p.kind));
  if (parts.some((p) => p.kind === 'common' && p.j - p.i === pw.length)) warn.push('This is one of the most common passwords. Attackers try these first.');
  else if (kinds.has('common')) warn.push('It contains a very common password.');
  if (kinds.has('word')) warn.push('Single dictionary words and names are easy to guess, even with capitals or symbols swapped in.');
  if (parts.some((p) => p.note === 'swap')) tips.push('Swapping letters for look-alike symbols (like @ for a) barely helps; attackers try those swaps automatically.');
  if (kinds.has('sequence')) warn.push('Sequences like abc or 1234 are easy to guess.');
  if (kinds.has('repeat')) warn.push('Repeated characters or patterns add very little strength.');
  if (kinds.has('keyboard')) warn.push('Keyboard patterns such as qwerty or asdf are well known.');
  if (kinds.has('year') || kinds.has('date')) warn.push('Years and dates, like birthdays, are easy to guess.');
  if (pw.length < 8) warn.push('It is shorter than 8 characters.');
  if (sc < 3) { tips.push('Make it longer. Length adds more strength than anything else.'); tips.push('Try a passphrase of four or more random, unrelated words, like “cactus orbit pillow lantern”.'); }
  if (sc >= 3 && pw.length < 14) tips.push('Good. For important accounts, 14 or more characters is even better.');
  tips.push('Use a different password for every account, and turn on two-step verification where you can.');
  return { warn, tips };
}
