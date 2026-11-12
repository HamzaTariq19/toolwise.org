---
seoTitle: "Open Graph Preview: See How Your Link Looks When Shared | toolwise"
metaDescription: "Preview how a link appears on Facebook, LinkedIn, X, WhatsApp and Slack. Paste your HTML or enter Open Graph tags and check the image size."
faqs:
  - q: Why doesn't toolwise fetch my page automatically?
    a: Browsers don't allow one website to read another website's code directly, and toolwise doesn't send your URLs to a server. Instead, paste your page's HTML source and the tags are read instantly on your device.
  - q: What image size should I use?
    a: 1200 × 630 pixels (a 1.91:1 ratio) works well on all major platforms. Keep important text away from the edges, as some apps crop the image.
  - q: I updated my tags but Facebook still shows the old preview. Why?
    a: Platforms cache link previews. Use Facebook's Sharing Debugger, LinkedIn's Post Inspector or simply wait for the cache to expire.
  - q: What if there are no Open Graph tags?
    a: Platforms fall back to the page title, meta description and a random image from the page, which often looks poor. Adding og:title, og:description and og:image gives you control.
---

## What this tool does

Open Graph Preview shows how a link to your page will look when people share it on Facebook, LinkedIn, X, WhatsApp, iMessage and Slack. It reads your Open Graph tags, checks the title, description and image, and warns you about missing tags or image sizes that will be cropped.

## How to use it

1. Open your page in a browser, view the page source, copy it and paste it into the box. The tags fill in automatically.
2. Or type the **title**, **description**, **URL** and **image URL** yourself.
3. Testing a new image? Use **Or test an image from your device**.
4. Review the previews and the checklist, then fix any issues on your site.

## The essential tags

```html
<meta property="og:title" content="Your page title">
<meta property="og:description" content="A short, compelling summary.">
<meta property="og:image" content="https://example.com/share.jpg">
<meta property="og:url" content="https://example.com/page">
<meta name="twitter:card" content="summary_large_image">
```

Generate them for your page with the [Meta Tag Generator](/meta-tag-generator).

## Tips for better link previews

- **Use a custom image** for each important page, with a clear subject and minimal text.
- **Keep titles under 60 characters** so they aren't cut off.
- **Write descriptions for people,** not search engines: say why the link is worth opening.
- **Use absolute URLs** with https:// for images.
- **Make images public:** previews can't show images behind a login.

## Related tools

Check video titles with the [YouTube Title Checker](/youtube-title-checker), or create site icons with the [Favicon Generator](/favicon-generator).
