// Computes which tool pages are not built yet ("Coming soon").
// Those pages get <meta name="robots" content="noindex"> and are excluded from the sitemap.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const tools = JSON.parse(fs.readFileSync(path.join(here, 'tools.json'), 'utf8'));
const toolDir = path.join(here, '..', 'tools');
const built = new Set(
  fs.existsSync(toolDir)
    ? fs.readdirSync(toolDir).filter((f) => f.endsWith('.astro')).map((f) => f.replace(/\.astro$/, ''))
    : [],
);

export const noindexPaths = new Set(tools.filter((t) => !built.has(t.slug)).map((t) => `/${t.slug}`));
