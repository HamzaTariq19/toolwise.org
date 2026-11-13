---
seoTitle: "XML Sitemap Generator: Create sitemap.xml from URLs | toolwise"
metaDescription: "Create a valid XML sitemap from a list of page URLs with last modified date, change frequency and priority. Download sitemap.xml free."
faqs:
  - q: "Do I need a sitemap?"
    a: "Small, well-linked sites can be found without one, but a sitemap helps search engines discover new pages faster and find pages that few links point to. It is especially useful for new sites and large sites."
  - q: "Where do I put sitemap.xml?"
    a: "Upload it to the root of your site, so it opens at yourdomain.com/sitemap.xml. Then add a Sitemap line to robots.txt and submit the address in Google Search Console and Bing Webmaster Tools."
  - q: "Does Google use priority and change frequency?"
    a: "Google says it ignores both and relies on its own signals. Some other search engines may still read them. Last modified is useful if you keep it accurate."
  - q: "Why is the & in my URL written as &amp;?"
    a: "XML has special characters that must be escaped. An & inside a sitemap URL must be written as &amp;, and the tool does this for you, so the file stays valid."
  - q: "How many URLs can a sitemap have?"
    a: "Up to 50,000 URLs per file. Larger sites split their pages across several sitemaps and list them in a sitemap index."
---

## When to use it

Use this tool to create a sitemap.xml file, the list of pages you want search engines to find. It is handy for new websites, small sites without a plugin that does it automatically, static sites, and quick fixes when a site's built-in sitemap is missing pages.

## How to use it

1. Paste your **Page URLs, one per line**. Use full addresses including https://. Duplicates are removed for you.
2. Choose **Last modified**: **Today** or **Leave out**.
3. Choose a **Change frequency**, from daily to yearly, or **Leave out**.
4. Choose a **Priority**: **Automatic (by depth)**, **0.5 for all** or **Leave out**.
5. Check the **sitemap.xml** preview, then **Copy sitemap** or **Download sitemap.xml**.

If a line is not a full URL, the tool skips it and tells you which one.

## Worked example

The example lists four pages: the home page, an about page, a blog post and a contact page with tracking parameters. With automatic priority, the home page gets 1.0, top-level pages like /about and /contact get 0.8, and the deeper blog post gets 0.6. Every page gets today's date as last modified, and monthly as change frequency.

The contact URL contains ?ref=footer&lang=en. In the sitemap it is written with `&amp;`, which is how XML requires an ampersand to be stored.

## Collecting your URLs

For a small site, copy the links from your navigation menu and footer. For a larger site, export them from your content management system, or from a crawler tool, and paste them in. Leave out pages you do not want in search, such as thank-you pages, logins and duplicates.

## Tips

- **List only canonical URLs.** Use the main version of each page, not copies with tracking tags.
- **Keep it current.** Regenerate the sitemap when you add or remove pages, and upload the new file over the old one.
- **Check it in Search Console.** The Sitemaps report shows how many pages Google read and any errors it found.
- **Point to it from robots.txt.** Add a Sitemap line using the [Robots.txt Generator](/robots-txt-generator).

## Common mistakes

- **Mixing http and https, or www and non-www.** Use the same version your site actually uses.
- **Including blocked or noindex pages.** A sitemap should only list pages you want indexed.
- **Setting every page to priority 1.0.** It tells search engines nothing.
