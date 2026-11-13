---
seoTitle: "Meta Tag Generator: Title, Description and Open Graph Tags | toolwise"
metaDescription: "Create SEO meta tags, Open Graph and X card tags with a live Google preview and length checks. Copy the HTML into your page's head. Free."
faqs:
  - q: "Where do I put the meta tags?"
    a: "Inside the head section of your page's HTML, before the closing head tag. Many website builders and blog platforms have a \"custom head code\" or SEO settings box where you can paste them or fill in the same details."
  - q: "How long should a title and description be?"
    a: "Aim for 50 to 60 characters for the title and 120 to 160 for the description. Google cuts off longer text based on pixel width, so the preview in the tool shows roughly how yours will look."
  - q: "Will Google always use my description?"
    a: "Not always. Google sometimes writes its own snippet from the page text if it thinks that matches the search better. A clear, accurate description gives it the best chance of being used."
  - q: "What is a canonical URL?"
    a: "It tells search engines which address is the main version of a page. It helps when the same page can be reached through several URLs, for example with tracking parameters."
  - q: "What are Open Graph and Twitter tags for?"
    a: "They control the title, description and image shown when someone shares your link on Facebook, LinkedIn, WhatsApp, Slack or X. Without them, those sites guess, often badly."
---

## When to use it

Use this tool to create the HTML meta tags for a web page: the title, description, canonical link, robots rules, and the Open Graph and X (Twitter) tags used when the link is shared. It is ideal for hand-built sites, landing pages and anyone who wants to check how a page will look in Google before publishing.

## How to use it

1. Enter the **Page title**. Aim for 50 to 60 characters and put the main topic first.
2. Write the **Meta description**, 120 to 160 characters that make people want to click.
3. Add the **Page URL (canonical)** and a **Social share image URL**, ideally 1200 × 630 pixels.
4. Optionally add the **Site name** and your **X (Twitter) handle**.
5. Choose the **Content type**: **Website / page**, **Article / blog post** or **Product**, and the **Language**.
6. Leave **Allow search engines to index** and **Allow following links** ticked for normal public pages.
7. Check the **Google search preview**, then **Copy code** or **Download meta-tags.html**.

## Worked example

The default page is a tools website. The title "Free Online Tools for Everyday Tasks | toolwise" is 47 characters, so it fits in search results. The description explains the benefit in one sentence.

The generated code includes `<title>`, `<meta name="description">`, a canonical link to https://example.com/, and Open Graph tags such as `og:title` and `og:url`. Because no share image was added, the X card type is "summary". Add an image URL and it switches to a large image card, which gets far more attention in feeds.

## Choosing the content type

Use **Website / page** for home, service and contact pages. Use **Article / blog post** for news and blog posts, so sharing apps treat them as articles. Use **Product** for a page that sells one item. The choice sets the `og:type` tag.

## Tips

- **Write for people first.** The title and description are your advert in search results.
- **Make every page unique.** Duplicate titles across pages make it hard for search engines to pick the right result.
- **Use a share image with text in the middle.** Some apps crop the edges.
- **Test shared links.** After publishing, paste the URL into the [Open Graph Preview](/open-graph-preview) tool to check how it looks.

## Common mistakes

- **Stuffing keywords.** Repeating the same words looks spammy and can lower clicks.
- **Unticking index by accident.** That adds noindex, and the page will drop out of search results.
- **Using a relative image URL.** Share images need a full address starting with https://.
