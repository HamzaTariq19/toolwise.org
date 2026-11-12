// Tool pages whose status in tools.json is not "built" show "Coming soon".
// Those pages get <meta name="robots" content="noindex"> and are excluded from the sitemap.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const tools = JSON.parse(fs.readFileSync(path.join(here, 'tools.json'), 'utf8'));

export const noindexPaths = new Set(tools.filter((t) => t.status !== 'built').map((t) => `/${t.slug}`));
