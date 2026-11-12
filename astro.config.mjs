
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { noindexPaths } from './src/data/noindex.mjs';

export default defineConfig({
  site: 'https://toolwise.org',
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [
    sitemap({
      // "Coming soon" tool pages are noindex, so keep them out of the sitemap.
      filter: (page) => !noindexPaths.has(new URL(page).pathname.replace(/\/$/, '') || '/'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    // Heavy libraries (HEIC decoder, PDF.js) are lazy-loaded only on the page that needs them.
    build: { chunkSizeWarningLimit: 1600 },
  },
});
