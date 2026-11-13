---
seoTitle: "Open Graph Preview: See How Your Link Looks When Shared | toolwise"
metaDescription: "Preview how a link appears on Facebook, LinkedIn, X, WhatsApp and Slack. Paste your HTML or enter Open Graph tags and check the image size."
faqs:
  - q: "Why does my link show the wrong image after I changed it?"
    a: "Facebook, LinkedIn, X and messaging apps cache link previews, sometimes for days. Use the platform's own tool, such as Facebook's Sharing Debugger or LinkedIn's Post Inspector, to fetch the page again."
  - q: "What size should my og:image be?"
    a: "1200 × 630 pixels works well on most platforms. Keep important text and faces in the middle, because some apps crop the image to a square."
  - q: "Does the tool fetch my page from the web?"
    a: "No. It works only with what you paste or type, so it can preview pages that are not public yet, such as a draft on your own computer."
  - q: "Why does the preview not show my local image?"
    a: "It does. Use Or test an image from your device to see how a picture will look before you upload it. The real page still needs a full public image URL in og:image."
  - q: "Are the previews exact?"
    a: "They are close approximations of each platform's layout. Platforms change their designs and may shorten text differently, so treat the previews as a guide."
---

## When to use it

Use this tool to see how a link will look when it is shared on Facebook, LinkedIn, X, WhatsApp, iMessage or Slack, before you post it. It reads Open Graph tags, the meta tags that control the title, description and image in link previews, and helps you catch missing images, cut-off titles and the wrong description.

## How to use it

1. Optionally, paste your page's HTML into **Paste your page's HTML**. In your browser, open the page, press Ctrl+U (or ⌘+Option+U on a Mac), copy everything and paste it. The fields fill in automatically.
2. Or type the details yourself: **Title (og:title)**, **Description (og:description)**, **Page URL (og:url)**, **Image URL (og:image)** and **Site name (og:site_name)**.
3. To try an image before uploading it, use **Or test an image from your device**.
4. Compare the previews for **Facebook and LinkedIn**, **X (Twitter)** and **WhatsApp, iMessage and Slack**.

## Worked example

You are about to share a new blog post. Open the post, view its source and paste it in. The title and description fill in, but the image box stays empty, and the previews show no picture. That means the page is missing an og:image tag, so the post would look plain in feeds.

You pick a 1200 × 630 image from your computer with **Or test an image from your device**, check that the headline on it is not cropped in the WhatsApp preview, then add its public URL to the page's og:image tag.

## Which tags matter most

The four essentials are og:title, og:description, og:image and og:url. Add og:site_name so your brand shows on Facebook and LinkedIn. X reads the same Open Graph tags if there are no Twitter-specific tags, so one set covers every platform in the previews.

## Tips

- **Keep titles short.** Around 60 characters avoids cut-offs on most platforms.
- **Write a description that adds something.** Do not just repeat the title.
- **Use the same image on every platform.** One well-designed 1200 × 630 image covers almost everything.
- **Create the tags first.** If your page has none, the [Meta Tag Generator](/meta-tag-generator) writes them for you.

## Common mistakes

- **Using a relative image path.** og:image must be a full URL starting with https://.
- **Forgetting to refresh caches.** Old previews can stay for days after you fix the tags.
- **Text too close to the edges of the image.** Square crops in chat apps can cut it off.
