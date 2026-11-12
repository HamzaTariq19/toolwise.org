# toolwise

Free, private, browser-based tools at toolwise.org. Astro (static) + TypeScript + Tailwind CSS 4.
All processing happens in the browser; nothing is uploaded.

## Commands

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # static site in dist/
npm run check     # TypeScript / Astro diagnostics
npm run preview   # serve dist/
```

## Deploy (Cloudflare Pages)

Build command `npm run build`, output directory `dist`. `public/_headers` sets caching and security headers.
URLs are clean (`/compress-image`) because the build uses `build.format: 'file'`.

## How it fits together

| Path | Purpose |
| --- | --- |
| `src/data/tools.json` | All 170 tools (id, name, slug, category, shortDescription, icon, priority, keywords, status). Homepage, category pages, search, related tools and sitemap are generated from it. |
| `src/data/categories.ts` | 12 categories: name, icon, intro, meta description. Accent colors live in `src/styles/global.css` (`.cat-<slug>`). |
| `src/tools/<slug>.astro` | The interactive UI for a tool. Set `"status": "built"` in tools.json when the tool is finished; until then its page shows "Coming soon", gets `noindex`, and is left out of the sitemap. |
| `src/content/tools/<slug>.md` | Required for every live tool: SEO title/description, 3–6 FAQs (also output as FAQPage JSON-LD) and the 400–600 word guide. |
| `src/pages/[slug].astro` | Tool page template: breadcrumb, H1, tool, 3 ad slots, content, FAQ, related tools. |
| `src/lib/*` | Shared client helpers: dropzone, results/download list, image encode/decode, PDF loaders, PDF image compression, search, calculators. |
| `src/config.ts` | Site name, contact email, AdSense client id. |

### Adding a tool

1. Make sure it is in `tools.json` (icon = any [Lucide](https://lucide.dev/icons) name in PascalCase).
2. Create `src/tools/<slug>.astro`.
3. Create `src/content/tools/<slug>.md` with frontmatter `seoTitle`, `metaDescription`, `faqs`.
4. Set `"status": "built"` in `tools.json` and run `npm run build`. The tool becomes indexable, appears in the sitemap and loses its "Soon" badge.

### Ads

Set `ads.client` in `src/config.ts` to your `ca-pub-…` id once AdSense is approved, and put the real slot ids in the
`AdSlot` components in `src/pages/[slug].astro`. Slot heights are reserved, so ads cause no layout shift.
Before launch in the EEA/UK, enable a Google-certified consent message (CMP) in AdSense.
