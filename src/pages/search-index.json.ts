import type { APIRoute } from 'astro';
import { icons } from 'lucide';
import { tools, searchText, isLive } from '../lib/tools';
import { categoryBySlug } from '../data/categories';

const svgInner = (name: string) =>
  ((icons as Record<string, [string, Record<string, string>][]>)[name] ?? icons.Wrench)
    .map(([tag, attrs]) => `<${tag} ${Object.entries(attrs).map(([k, v]) => `${k}="${v}"`).join(' ')}/>`)
    .join('');

export const GET: APIRoute = () => {
  const data = [...tools]
    .sort((a, b) => a.priority - b.priority)
    .map((t) => ({
      n: t.name, s: t.slug, c: t.category, cn: categoryBySlug[t.category].short,
      i: svgInner(t.icon), d: t.shortDescription, k: searchText(t), l: isLive(t),
    }));
  return new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });
};
