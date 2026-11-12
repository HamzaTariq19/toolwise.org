
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { noindexPaths } from './src/data/noindex.mjs';

export default defineConfig({
  site: 'https://toolwise.org',
  trailingSlash: 'never',
  build: { format: 'file' },
  // Code blocks in guides: light and dark themes that match the site (dark colors switch on with the .dark class)
  markdown: { shikiConfig: { themes: { light: 'github-light', dark: 'github-dark' }, defaultColor: 'light' } },
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
    // ffmpeg.wasm runs in a module worker; keep it out of dev pre-bundling.
    worker: { format: 'es' },
    optimizeDeps: { exclude: ['@ffmpeg/ffmpeg', '@ffmpeg/util'] },
  },
});
