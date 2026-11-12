// 118 elements: symbol, name, standard atomic weight (IUPAC abridged; [n] = mass number of the most stable isotope),
// Pauling electronegativity ('' = no value). Category, position, state and electron configuration are derived below.
export const RAW = `H Hydrogen 1.008 2.20|He Helium 4.0026 |Li Lithium 6.94 0.98|Be Beryllium 9.0122 1.57|B Boron 10.81 2.04|C Carbon 12.011 2.55|N Nitrogen 14.007 3.04|O Oxygen 15.999 3.44|F Fluorine 18.998 3.98|Ne Neon 20.180 |Na Sodium 22.990 0.93|Mg Magnesium 24.305 1.31|Al Aluminium 26.982 1.61|Si Silicon 28.085 1.90|P Phosphorus 30.974 2.19|S Sulfur 32.06 2.58|Cl Chlorine 35.45 3.16|Ar Argon 39.95 |K Potassium 39.098 0.82|Ca Calcium 40.078 1.00|Sc Scandium 44.956 1.36|Ti Titanium 47.867 1.54|V Vanadium 50.942 1.63|Cr Chromium 51.996 1.66|Mn Manganese 54.938 1.55|Fe Iron 55.845 1.83|Co Cobalt 58.933 1.88|Ni Nickel 58.693 1.91|Cu Copper 63.546 1.90|Zn Zinc 65.38 1.65|Ga Gallium 69.723 1.81|Ge Germanium 72.630 2.01|As Arsenic 74.922 2.18|Se Selenium 78.971 2.55|Br Bromine 79.904 2.96|Kr Krypton 83.798 3.00|Rb Rubidium 85.468 0.82|Sr Strontium 87.62 0.95|Y Yttrium 88.906 1.22|Zr Zirconium 91.224 1.33|Nb Niobium 92.906 1.6|Mo Molybdenum 95.95 2.16|Tc Technetium [98] 1.9|Ru Ruthenium 101.07 2.2|Rh Rhodium 102.91 2.28|Pd Palladium 106.42 2.20|Ag Silver 107.87 1.93|Cd Cadmium 112.41 1.69|In Indium 114.82 1.78|Sn Tin 118.71 1.96|Sb Antimony 121.76 2.05|Te Tellurium 127.60 2.1|I Iodine 126.90 2.66|Xe Xenon 131.29 2.6|Cs Caesium 132.91 0.79|Ba Barium 137.33 0.89|La Lanthanum 138.91 1.10|Ce Cerium 140.12 1.12|Pr Praseodymium 140.91 1.13|Nd Neodymium 144.24 1.14|Pm Promethium [145] 1.13|Sm Samarium 150.36 1.17|Eu Europium 151.96 1.2|Gd Gadolinium 157.25 1.20|Tb Terbium 158.93 1.1|Dy Dysprosium 162.50 1.22|Ho Holmium 164.93 1.23|Er Erbium 167.26 1.24|Tm Thulium 168.93 1.25|Yb Ytterbium 173.05 1.1|Lu Lutetium 174.97 1.27|Hf Hafnium 178.49 1.3|Ta Tantalum 180.95 1.5|W Tungsten 183.84 2.36|Re Rhenium 186.21 1.9|Os Osmium 190.23 2.2|Ir Iridium 192.22 2.20|Pt Platinum 195.08 2.28|Au Gold 196.97 2.54|Hg Mercury 200.59 2.00|Tl Thallium 204.38 1.62|Pb Lead 207.2 2.33|Bi Bismuth 208.98 2.02|Po Polonium [209] 2.0|At Astatine [210] 2.2|Rn Radon [222] 2.2|Fr Francium [223] 0.7|Ra Radium [226] 0.9|Ac Actinium [227] 1.1|Th Thorium 232.04 1.3|Pa Protactinium 231.04 1.5|U Uranium 238.03 1.38|Np Neptunium [237] 1.36|Pu Plutonium [244] 1.28|Am Americium [243] 1.13|Cm Curium [247] 1.28|Bk Berkelium [247] 1.3|Cf Californium [251] 1.3|Es Einsteinium [252] 1.3|Fm Fermium [257] 1.3|Md Mendelevium [258] 1.3|No Nobelium [259] 1.3|Lr Lawrencium [266] |Rf Rutherfordium [267] |Db Dubnium [268] |Sg Seaborgium [269] |Bh Bohrium [270] |Hs Hassium [269] |Mt Meitnerium [278] |Ds Darmstadtium [281] |Rg Roentgenium [282] |Cn Copernicium [285] |Nh Nihonium [286] |Fl Flerovium [289] |Mc Moscovium [290] |Lv Livermorium [293] |Ts Tennessine [294] |Og Oganesson [294] `;

export type Element = { z: number; sym: string; name: string; mass: string; en: string; cat: string; group: number | null; period: number; row: number; col: number; state: string; config: string; block: string };

export const CATS: Record<string, string> = {
  alkali: 'Alkali metal', alkaline: 'Alkaline earth metal', transition: 'Transition metal', post: 'Post-transition metal', metalloid: 'Metalloid',
  nonmetal: 'Reactive nonmetal', halogen: 'Halogen', noble: 'Noble gas', lanthanide: 'Lanthanide', actinide: 'Actinide', unknown: 'Unknown properties',
};

const ORB = ['1s', '2s', '2p', '3s', '3p', '4s', '3d', '4p', '5s', '4d', '5p', '6s', '4f', '5d', '6p', '7s', '5f', '6d', '7p'];
const CAP: Record<string, number> = { s: 2, p: 6, d: 10, f: 14 };
const NOBLE: [number, string][] = [[86, 'Rn'], [54, 'Xe'], [36, 'Kr'], [18, 'Ar'], [10, 'Ne'], [2, 'He']];
// Ground-state exceptions to the Madelung rule (valence part after the noble-gas core)
const EXC: Record<number, string> = {
  24: '3d5 4s1', 29: '3d10 4s1', 41: '4d4 5s1', 42: '4d5 5s1', 44: '4d7 5s1', 45: '4d8 5s1', 46: '4d10', 47: '4d10 5s1',
  57: '5d1 6s2', 58: '4f1 5d1 6s2', 64: '4f7 5d1 6s2', 78: '4f14 5d9 6s1', 79: '4f14 5d10 6s1',
  89: '6d1 7s2', 90: '6d2 7s2', 91: '5f2 6d1 7s2', 92: '5f3 6d1 7s2', 93: '5f4 6d1 7s2', 96: '5f7 6d1 7s2', 103: '5f14 7s2 7p1',
};
function config(z: number) {
  const core = NOBLE.find(([n]) => n < z);
  if (EXC[z]) return `${core ? `[${core[1]}] ` : ''}${EXC[z]}`;
  const fill: [string, number][] = []; let left = z;
  for (const o of ORB) { if (left <= 0) break; const n = Math.min(CAP[o[1]], left); fill.push([o, n]); left -= n; }
  let skip = core ? core[0] : 0;
  const val = fill.filter(([, n]) => { if (skip >= n) { skip -= n; return false; } return true; });
  val.sort((a, b) => +a[0][0] - +b[0][0] || 'spdf'.indexOf(a[0][1]) - 'spdf'.indexOf(b[0][1]));
  return `${core ? `[${core[1]}] ` : ''}${val.map(([o, n]) => o + n).join(' ')}`;
}
const STARTS = [1, 3, 11, 19, 37, 55, 87, 119];
function place(z: number) {
  const p = STARTS.findIndex((s, i) => z >= s && z < STARTS[i + 1]) + 1, idx = z - STARTS[p - 1];
  if (p === 1) return { period: 1, group: z === 1 ? 1 : 18 };
  if (p <= 3) return { period: p, group: idx < 2 ? idx + 1 : idx + 11 };
  if (p <= 5) return { period: p, group: idx + 1 };
  if (idx < 2) return { period: p, group: idx + 1 };
  if (idx <= 16) return { period: p, group: null, f: idx - 2 };
  return { period: p, group: idx - 13 };
}
const METALLOID = [5, 14, 32, 33, 51, 52], HALOGEN = [9, 17, 35, 53, 85], NONMETAL = [1, 6, 7, 8, 15, 16, 34], POST = [13, 31, 49, 50, 81, 82, 83, 84];
function category(z: number, group: number | null, period: number) {
  if (z >= 57 && z <= 71) return 'lanthanide';
  if (z >= 89 && z <= 103) return 'actinide';
  if (z >= 109) return 'unknown';
  if (group === 18) return 'noble';
  if (z === 1 || NONMETAL.includes(z)) return 'nonmetal';
  if (HALOGEN.includes(z)) return 'halogen';
  if (METALLOID.includes(z)) return 'metalloid';
  if (POST.includes(z)) return 'post';
  if (group === 1) return 'alkali';
  if (group === 2) return 'alkaline';
  return period >= 4 || (group! >= 3 && group! <= 12) ? 'transition' : 'post';
}
const GAS = [1, 2, 7, 8, 9, 10, 17, 18, 36, 54, 86];
export const ELEMENTS: Element[] = RAW.split('|').map((line, i) => {
  const [sym, name, mass, en = ''] = line.trim().split(' ');
  const z = i + 1, pos = place(z) as { period: number; group: number | null; f?: number };
  const f = pos.f !== undefined;
  return {
    z, sym, name, mass, en: en.trim(), group: pos.group, period: pos.period,
    row: f ? pos.period + 3 : pos.period, col: f ? pos.f! + 3 : pos.group!,
    cat: category(z, pos.group, pos.period),
    state: GAS.includes(z) ? 'Gas' : z === 35 || z === 80 ? 'Liquid' : z >= 104 ? 'Unknown (synthetic)' : 'Solid',
    config: z >= 104 ? `${config(z)} (predicted)` : config(z),
    block: f ? 'f' : pos.group! <= 2 || z === 2 ? 's' : pos.group! >= 13 ? 'p' : 'd',
  };
});
