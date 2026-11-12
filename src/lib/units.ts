// Unit tables for the converters. Linear units use a factor to the base unit;
// others (temperature, fuel economy) use to/from functions.
export interface Unit { k: string; name: string; short: string; f?: number; to?: (x: number) => number; from?: (b: number) => number; group?: string }
export interface Kind { units: Unit[]; from: string; to: string; value: string; precisionNote?: string }

export const KINDS: Record<string, Kind> = {
  length: { from: 'cm', to: 'in', value: '100', units: [
    { k: 'mm', name: 'Millimeters', short: 'mm', f: 0.001 }, { k: 'cm', name: 'Centimeters', short: 'cm', f: 0.01 }, { k: 'm', name: 'Meters', short: 'm', f: 1 }, { k: 'km', name: 'Kilometers', short: 'km', f: 1000 },
    { k: 'in', name: 'Inches', short: 'in', f: 0.0254 }, { k: 'ft', name: 'Feet', short: 'ft', f: 0.3048 }, { k: 'yd', name: 'Yards', short: 'yd', f: 0.9144 }, { k: 'mi', name: 'Miles', short: 'mi', f: 1609.344 },
    { k: 'nmi', name: 'Nautical miles', short: 'nmi', f: 1852 }, { k: 'um', name: 'Micrometers', short: 'µm', f: 1e-6 },
  ] },
  weight: { from: 'kg', to: 'lb', value: '70', units: [
    { k: 'mg', name: 'Milligrams', short: 'mg', f: 1e-6 }, { k: 'g', name: 'Grams', short: 'g', f: 0.001 }, { k: 'kg', name: 'Kilograms', short: 'kg', f: 1 }, { k: 't', name: 'Metric tonnes', short: 't', f: 1000 },
    { k: 'oz', name: 'Ounces', short: 'oz', f: 0.028349523125 }, { k: 'lb', name: 'Pounds', short: 'lb', f: 0.45359237 }, { k: 'st', name: 'Stones', short: 'st', f: 6.35029318 },
    { k: 'ston', name: 'US tons (short)', short: 'US ton', f: 907.18474 }, { k: 'lton', name: 'UK tons (long)', short: 'UK ton', f: 1016.0469088 }, { k: 'ct', name: 'Carats', short: 'ct', f: 0.0002 },
  ] },
  temperature: { from: 'c', to: 'f', value: '20', units: [
    { k: 'c', name: 'Celsius', short: '°C', to: (x) => x, from: (b) => b },
    { k: 'f', name: 'Fahrenheit', short: '°F', to: (x) => ((x - 32) * 5) / 9, from: (b) => (b * 9) / 5 + 32 },
    { k: 'k', name: 'Kelvin', short: 'K', to: (x) => x - 273.15, from: (b) => b + 273.15 },
    { k: 'r', name: 'Rankine', short: '°R', to: (x) => ((x - 491.67) * 5) / 9, from: (b) => ((b + 273.15) * 9) / 5 },
  ] },
  area: { from: 'm2', to: 'ft2', value: '50', units: [
    { k: 'mm2', name: 'Square millimeters', short: 'mm²', f: 1e-6 }, { k: 'cm2', name: 'Square centimeters', short: 'cm²', f: 1e-4 }, { k: 'm2', name: 'Square meters', short: 'm²', f: 1 },
    { k: 'ha', name: 'Hectares', short: 'ha', f: 1e4 }, { k: 'km2', name: 'Square kilometers', short: 'km²', f: 1e6 }, { k: 'in2', name: 'Square inches', short: 'in²', f: 0.00064516 },
    { k: 'ft2', name: 'Square feet', short: 'ft²', f: 0.09290304 }, { k: 'yd2', name: 'Square yards', short: 'yd²', f: 0.83612736 }, { k: 'ac', name: 'Acres', short: 'ac', f: 4046.8564224 }, { k: 'mi2', name: 'Square miles', short: 'mi²', f: 2589988.110336 },
  ] },
  volume: { from: 'l', to: 'galus', value: '10', units: [
    { k: 'ml', name: 'Milliliters', short: 'ml', f: 0.001 }, { k: 'l', name: 'Liters', short: 'L', f: 1 }, { k: 'm3', name: 'Cubic meters', short: 'm³', f: 1000 },
    { k: 'tsp', name: 'Teaspoons (US)', short: 'tsp', f: 0.00492892159375, group: 'US' }, { k: 'tbsp', name: 'Tablespoons (US)', short: 'tbsp', f: 0.01478676478125, group: 'US' },
    { k: 'flozus', name: 'Fluid ounces (US)', short: 'US fl oz', f: 0.0295735295625, group: 'US' }, { k: 'cupus', name: 'Cups (US)', short: 'US cup', f: 0.2365882365, group: 'US' },
    { k: 'ptus', name: 'Pints (US)', short: 'US pt', f: 0.473176473, group: 'US' }, { k: 'qtus', name: 'Quarts (US)', short: 'US qt', f: 0.946352946, group: 'US' }, { k: 'galus', name: 'Gallons (US)', short: 'US gal', f: 3.785411784, group: 'US' },
    { k: 'flozuk', name: 'Fluid ounces (UK)', short: 'UK fl oz', f: 0.0284130625, group: 'UK' }, { k: 'ptuk', name: 'Pints (UK)', short: 'UK pt', f: 0.56826125, group: 'UK' }, { k: 'galuk', name: 'Gallons (UK)', short: 'UK gal', f: 4.54609, group: 'UK' },
    { k: 'in3', name: 'Cubic inches', short: 'in³', f: 0.016387064 }, { k: 'ft3', name: 'Cubic feet', short: 'ft³', f: 28.316846592 },
  ] },
  speed: { from: 'kmh', to: 'mph', value: '100', units: [
    { k: 'kmh', name: 'Kilometers per hour', short: 'km/h', f: 1 / 3.6 }, { k: 'mph', name: 'Miles per hour', short: 'mph', f: 0.44704 }, { k: 'ms', name: 'Meters per second', short: 'm/s', f: 1 },
    { k: 'kn', name: 'Knots', short: 'kn', f: 1852 / 3600 }, { k: 'fts', name: 'Feet per second', short: 'ft/s', f: 0.3048 }, { k: 'mach', name: 'Mach (at sea level, 15 °C)', short: 'Mach', f: 340.29 },
  ] },
  time: { from: 'h', to: 'min', value: '2.5', units: [
    { k: 'ms', name: 'Milliseconds', short: 'ms', f: 0.001 }, { k: 's', name: 'Seconds', short: 's', f: 1 }, { k: 'min', name: 'Minutes', short: 'min', f: 60 }, { k: 'h', name: 'Hours', short: 'h', f: 3600 },
    { k: 'd', name: 'Days', short: 'd', f: 86400 }, { k: 'wk', name: 'Weeks', short: 'wk', f: 604800 }, { k: 'mo', name: 'Months (average)', short: 'mo', f: 2629746 }, { k: 'yr', name: 'Years (average)', short: 'yr', f: 31556952 },
    { k: 'dec', name: 'Decades', short: 'decades', f: 315569520 }, { k: 'cen', name: 'Centuries', short: 'centuries', f: 3155695200 },
  ] },
  data: { from: 'gb', to: 'gib', value: '500', units: [
    { k: 'bit', name: 'Bits', short: 'bit', f: 1 / 8 }, { k: 'b', name: 'Bytes', short: 'B', f: 1 },
    { k: 'kb', name: 'Kilobytes', short: 'KB', f: 1e3, group: 'Decimal (1 KB = 1,000 bytes)' }, { k: 'mb', name: 'Megabytes', short: 'MB', f: 1e6, group: 'Decimal (1 KB = 1,000 bytes)' }, { k: 'gb', name: 'Gigabytes', short: 'GB', f: 1e9, group: 'Decimal (1 KB = 1,000 bytes)' }, { k: 'tb', name: 'Terabytes', short: 'TB', f: 1e12, group: 'Decimal (1 KB = 1,000 bytes)' }, { k: 'pb', name: 'Petabytes', short: 'PB', f: 1e15, group: 'Decimal (1 KB = 1,000 bytes)' },
    { k: 'kib', name: 'Kibibytes', short: 'KiB', f: 1024, group: 'Binary (1 KiB = 1,024 bytes)' }, { k: 'mib', name: 'Mebibytes', short: 'MiB', f: 1024 ** 2, group: 'Binary (1 KiB = 1,024 bytes)' }, { k: 'gib', name: 'Gibibytes', short: 'GiB', f: 1024 ** 3, group: 'Binary (1 KiB = 1,024 bytes)' }, { k: 'tib', name: 'Tebibytes', short: 'TiB', f: 1024 ** 4, group: 'Binary (1 KiB = 1,024 bytes)' }, { k: 'pib', name: 'Pebibytes', short: 'PiB', f: 1024 ** 5, group: 'Binary (1 KiB = 1,024 bytes)' },
  ] },
  fuel: { from: 'mpgus', to: 'l100', value: '30', units: [
    { k: 'mpgus', name: 'Miles per gallon (US)', short: 'mpg (US)', to: (x) => x * 0.425143707, from: (b) => b / 0.425143707 },
    { k: 'mpguk', name: 'Miles per gallon (UK)', short: 'mpg (UK)', to: (x) => x * 0.354006189, from: (b) => b / 0.354006189 },
    { k: 'l100', name: 'Liters per 100 km', short: 'L/100 km', to: (x) => 100 / x, from: (b) => 100 / b },
    { k: 'kml', name: 'Kilometers per liter', short: 'km/L', to: (x) => x, from: (b) => b },
    { k: 'mpl', name: 'Miles per liter', short: 'mi/L', to: (x) => x * 1.609344, from: (b) => b / 1.609344 },
  ] },
};

export function convert(kind: Kind, value: number, fromK: string, toK: string): number {
  const a = kind.units.find((u) => u.k === fromK)!, b = kind.units.find((u) => u.k === toK)!;
  const base = a.f !== undefined ? value * a.f : a.to!(value);
  return b.f !== undefined ? base / b.f : b.from!(base);
}

/** Readable number: up to 10 significant digits, scientific notation for extremes */
export function nice(v: number): string {
  if (!Number.isFinite(v)) return '–';
  if (v === 0) return '0';
  const a = Math.abs(v);
  if (a >= 1e15 || a < 1e-6) return v.toExponential(6).replace(/\.?0+e/, 'e').replace('e+', ' × 10^').replace('e-', ' × 10^-');
  return Number(v.toPrecision(10)).toLocaleString(undefined, { maximumFractionDigits: 10 });
}
