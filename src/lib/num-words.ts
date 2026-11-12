// English number to words (short scale), supporting very large integers via BigInt and decimals.
const ONES = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
const SCALES = ['', 'thousand', 'million', 'billion', 'trillion', 'quadrillion', 'quintillion', 'sextillion', 'septillion', 'octillion', 'nonillion', 'decillion'];

function under1000(n: number, and: boolean): string {
  const h = Math.floor(n / 100), r = n % 100, parts: string[] = [];
  if (h) parts.push(`${ONES[h]} hundred`);
  if (r) {
    const t = r < 20 ? ONES[r] : TENS[Math.floor(r / 10)] + (r % 10 ? `-${ONES[r % 10]}` : '');
    parts.push(h && and ? `and ${t}` : t);
  }
  return parts.join(' ');
}

export function intToWords(n: bigint, and = false): string {
  if (n === 0n) return 'zero';
  if (n < 0n) return `minus ${intToWords(-n, and)}`;
  const groups: number[] = [];
  while (n > 0n) { groups.push(Number(n % 1000n)); n /= 1000n; }
  if (groups.length > SCALES.length) throw new Error('too large');
  const words: string[] = [];
  for (let i = groups.length - 1; i >= 0; i--) {
    if (!groups[i]) continue;
    // British style "and": one thousand and five
    const w = under1000(groups[i], and);
    words.push(i === 0 && and && groups.length > 1 && groups[0] < 100 ? `and ${w}` : w);
    if (SCALES[i]) words.push(SCALES[i]);
  }
  return words.join(' ');
}

const ORD: Record<string, string> = { one: 'first', two: 'second', three: 'third', five: 'fifth', eight: 'eighth', nine: 'ninth', twelve: 'twelfth' };
export function ordinal(words: string): string {
  return words.replace(/(\w+)$/, (w) => ORD[w] ?? (w.endsWith('y') ? w.slice(0, -1) + 'ieth' : w + 'th'));
}
