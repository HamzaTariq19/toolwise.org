import toolsData from '../data/tools.json';
import { categories } from '../data/categories';

export interface Tool {
  id: number;
  name: string;
  slug: string;
  category: string;
  shortDescription: string;
  icon: string;
  priority: number;
  keywords: string[];
  /** "built" when the tool is finished (needs src/tools/<slug>.astro + src/content/tools/<slug>.md) */
  status: 'planned' | 'later' | 'built';
}

const implementations = import.meta.glob('../tools/*.astro');
const builtSlugs = new Set(Object.keys(implementations).map((p) => p.split('/').pop()!.replace('.astro', '')));

export const tools: Tool[] = toolsData as Tool[];

for (const t of tools) {
  if (t.status === 'built' && !builtSlugs.has(t.slug)) throw new Error(`${t.slug} is marked "built" but src/tools/${t.slug}.astro is missing`);
}

export const toolBySlug = Object.fromEntries(tools.map((t) => [t.slug, t])) as Record<string, Tool>;

export const isLive = (t: Tool) => t.status === 'built';

export function toolsInCategory(slug: string): Tool[] {
  // Live tools first, then by priority, so the useful ones are always at the top.
  return tools
    .filter((t) => t.category === slug)
    .sort((a, b) => Number(isLive(b)) - Number(isLive(a)) || a.priority - b.priority);
}

export const popularTools = (n = 12) => [...tools].sort((a, b) => a.priority - b.priority).slice(0, n);

export function relatedTools(tool: Tool, n = 6): Tool[] {
  const same = toolsInCategory(tool.category).filter((t) => t.slug !== tool.slug);
  return same.slice(0, n);
}

export const groupedTools = () => categories.map((c) => ({ category: c, tools: toolsInCategory(c.slug) }));

/** Lower-case search text for client-side matching */
export const searchText = (t: Tool) =>
  [t.name, t.shortDescription, ...t.keywords].join(' ').toLowerCase();
