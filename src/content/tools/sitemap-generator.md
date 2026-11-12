---
seoTitle: "XML Sitemap Generator: Create sitemap.xml from URLs | toolwise"
metaDescription: "Create a valid XML sitemap from a list of page URLs with last modified date, change frequency and priority. Download sitemap.xml free."
faqs:
  - q: Does my website need a sitemap?
    a: Small, well-linked sites can be found without one, but a sitemap helps search engines discover all your pages quickly, especially new pages, large sites and pages with few links pointing to them.
  - q: Does this tool crawl my website?
    a: No. It builds the sitemap from the list of URLs you paste, entirely in your browser. You can get a list of URLs from your CMS, your analytics tool or a site crawler.
  - q: Do priority and change frequency matter?
    a: Google says it ignores them, though some other search engines may use them. Accurate last modified dates are more useful. You can leave priority and frequency out.
  - q: How do I tell Google about my sitemap?
    a: Upload sitemap.xml to your site, add a Sitemap line to robots.txt, and submit the URL in Google Search Console and Bing Webmaster Tools.
---

## What this tool does

The sitemap generator turns a list of page URLs into a valid XML sitemap file that search engines understand. It removes duplicates, skips invalid lines, escapes special characters, and lets you add the last modified date, change frequency and priority for each page.

## How to create a sitemap

1. Paste your page URLs, one per line, including `https://`.
2. Choose whether to include **last modified**, **change frequency** and **priority**.
3. Check any warnings, for example about invalid lines or mixed domains.
4. Press **Download sitemap.xml** and upload it to your website's root folder.

## Which pages to include

- **Include** pages you want people to find in search: home, products, services, articles and important landing pages.
- **Leave out** duplicate pages, login and cart pages, thank-you pages, search result pages and anything marked `noindex`.
- **Use canonical URLs:** the exact version you want indexed, with the same `https://` and `www` choice everywhere.

## Sitemap limits

One sitemap can list up to **50,000 URLs** and be up to 50 MB. Larger sites use several sitemaps and a sitemap index file.

## After uploading

1. Visit `yourdomain.com/sitemap.xml` to confirm it opens.
2. Add `Sitemap: https://yourdomain.com/sitemap.xml` to your [robots.txt](/robots-txt-generator).
3. Submit it in Google Search Console.
4. Update it whenever you add or remove important pages.

## Automatic priority

With **Automatic (by depth)**, the home page gets 1.0 and deeper pages get lower values. This is a common convention, but as Google ignores priority, it's purely optional.

## Related tools

Create robots.txt with the [Robots.txt Generator](/robots-txt-generator) and page tags with the [Meta Tag Generator](/meta-tag-generator).
