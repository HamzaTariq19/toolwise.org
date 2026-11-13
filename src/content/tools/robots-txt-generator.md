---
seoTitle: "Robots.txt Generator: Create a robots.txt File Free | toolwise"
metaDescription: "Generate a correct robots.txt file: block folders, add exceptions, block AI crawlers, set crawl delay and add your sitemap. Free."
faqs:
  - q: "Does robots.txt hide private pages?"
    a: "No. It only asks well-behaved crawlers not to visit certain paths, and the file itself is public, so anyone can read the list. Protect private areas with a login, and use a noindex tag to keep pages out of search results."
  - q: "Where do I upload robots.txt?"
    a: "To the root of your website, so it opens at yourdomain.com/robots.txt. A robots.txt in a subfolder is ignored. Each subdomain needs its own file."
  - q: "What do * and $ mean in paths?"
    a: "The * matches any characters, so /*?sessionid= blocks any URL containing ?sessionid=. The $ means \"ends with\", so /*.pdf$ blocks addresses ending in .pdf."
  - q: "Will blocking AI crawlers remove my site from Google?"
    a: "No. The AI option blocks crawlers used for AI training and AI search, such as GPTBot, ClaudeBot and CCBot, and Google-Extended, which controls use in Google's AI models. Normal Google Search crawling is not affected."
  - q: "Should I use crawl delay?"
    a: "Only if a crawler is putting real load on your server. Google ignores it, and some other search engines respect it."
---

## When to use it

Use this tool to create a robots.txt file, the small text file that tells search engine and AI crawlers which parts of your site they may visit. It is useful when launching a site, keeping crawlers out of admin or checkout pages, avoiding endless filter and session URLs, pointing crawlers to your sitemap, or opting out of AI training.

## How to use it

1. Choose the **Default for all crawlers**: **Allow everything** or **Block everything**.
2. List **Folders or pages to block**, one per line, each starting with /.
3. Optionally, add **Exceptions to allow** inside blocked folders.
4. Tick **Block AI training and AI search crawlers** if you want to opt out.
5. Add your **Sitemap URL** and, if needed, a **Crawl delay in seconds**.
6. Check the **robots.txt** preview, then **Copy robots.txt** or **Download robots.txt**.

## Worked example

An online shop wants search engines to skip its admin area, its cart and URLs with session IDs. The default list does exactly that:

```
User-agent: *
Disallow: /admin/
Disallow: /cart
Disallow: /*?sessionid=
```

Add https://example.com/sitemap.xml as the sitemap URL and a Sitemap line is added at the end, so crawlers find all your product pages. If the shop also wants to keep its product descriptions out of AI training, ticking the AI option adds one more group that lists each AI crawler by name, such as GPTBot, ClaudeBot and PerplexityBot, followed by Disallow: / to keep them off the whole site. Ordinary search engines still follow the rules above.

## Allow and Disallow together

An exception lets crawlers into one part of a blocked folder. For example, block /private/ but allow /private/press-kit/. The more specific rule wins, so the press kit stays visible while the rest of the folder is skipped.

## Tips

- **Block as little as possible.** Every blocked path is something search engines will not see.
- **Use a trailing slash for folders.** /admin/ blocks everything in that folder, while /admin also blocks /administrator.
- **Test after uploading.** Google Search Console has a robots.txt report that shows how Google reads your file.
- **Keep CSS and JavaScript crawlable.** Search engines need them to see your pages properly.

## Common mistakes

- **Blocking the whole site by accident.** Disallow: / on its own blocks everything. Check the preview carefully.
- **Using robots.txt to remove pages from Google.** A blocked page can still appear in results if other sites link to it. Use noindex instead.
- **Putting the file in the wrong place.** It must be at the root of the domain.
