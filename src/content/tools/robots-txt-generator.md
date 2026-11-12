---
seoTitle: "Robots.txt Generator: Create a robots.txt File Free | toolwise"
metaDescription: "Generate a correct robots.txt file: block folders, add exceptions, block AI crawlers, set crawl delay and add your sitemap. Free."
faqs:
  - q: Where does the robots.txt file go?
    a: In the root of your website, so it opens at https://yourdomain.com/robots.txt. It does not work in a subfolder.
  - q: Does robots.txt keep pages private?
    a: No. It only asks well-behaved crawlers not to visit pages. The file itself is public, and blocked pages can still appear in search results if other sites link to them. Use passwords or a noindex tag for pages that must stay out of search.
  - q: Should I block AI crawlers?
    a: It's your choice. Blocking crawlers such as GPTBot, ClaudeBot and Google-Extended asks AI companies not to use your content for training or AI answers. It doesn't affect normal Google Search rankings.
  - q: What does "Disallow:" with nothing after it mean?
    a: It means nothing is disallowed, so crawlers may visit the whole site. This is the most common robots.txt.
---

## What this tool does

The robots.txt generator creates the small text file that tells search engines and other crawlers which parts of your website they may visit. You can allow or block everything, list folders and pages to block, add exceptions, ask AI crawlers to stay away, set a crawl delay and point to your sitemap.

## How to create robots.txt

1. Choose **Allow everything** (most sites) or **Block everything** (staging or private sites).
2. List **folders or pages to block**, one per line, such as `/admin/`.
3. Add **exceptions** that should still be crawled.
4. Tick **Block AI crawlers** if you want to.
5. Add your **sitemap URL**.
6. Download `robots.txt` and upload it to your site's root folder.

## Path patterns

- `/admin/` blocks everything inside the admin folder.
- `/cart` blocks URLs starting with /cart.
- `/*?sessionid=` blocks any URL containing that parameter.
- `/*.pdf$` blocks URLs ending in .pdf.

## Common mistakes to avoid

- **Blocking your whole site** by accident with `Disallow: /`. The tool warns you when everything is blocked.
- **Blocking CSS and JavaScript** files that search engines need to render your pages.
- **Using robots.txt to remove pages from Google.** Use a `noindex` tag instead, and let crawlers see it.
- **Typos in paths:** paths are case-sensitive.

## Testing

After uploading, open `yourdomain.com/robots.txt` in a browser to check it. Google Search Console also reports robots.txt problems.

## Related tools

Create a [Sitemap](/sitemap-generator) for your pages, and write title and description tags with the [Meta Tag Generator](/meta-tag-generator).
