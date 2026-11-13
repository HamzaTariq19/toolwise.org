---
seoTitle: "Image to Base64 Converter: Data URL for HTML and CSS | toolwise"
metaDescription: "Encode an image as Base64 or a data URL and copy it as raw text, an HTML img tag or a CSS background. Free, private, no upload."
faqs:
  - q: "What is Base64?"
    a: "Base64 is a way of writing binary data, like an image, using only letters, numbers, + and /. That lets an image be placed directly inside HTML, CSS, JSON or an email as text."
  - q: "Why is the Base64 text bigger than the image?"
    a: "Base64 adds about 33%. A 30 KB image becomes about 40 KB of text. That's why it suits small images like icons and logos, not photos."
  - q: "What's the difference between the output options?"
    a: "Data URL starts with \"data:image/png;base64,\" and works in an img src or CSS url(). Base64 only is the raw text for APIs and JSON. HTML <img> and CSS give ready-made snippets to paste."
  - q: "Which formats are supported?"
    a: "JPG, PNG, GIF, WebP, SVG and ICO, up to 10 MB. The tool checks that the file really is an image before encoding."
  - q: "Is my image uploaded?"
    a: "No. Encoding happens in your browser."
---

## When to use it

Image to Base64 turns an image into text that can be placed directly inside code. Developers use it to embed small icons and logos in HTML or CSS without a separate file, include images in JSON for APIs, add pictures to HTML email signatures and templates, or store images in places that only accept text, like some configuration files and databases.

## How to convert an image to Base64

1. Tap **Choose image**, or drag a JPG, PNG, GIF, WebP, SVG or ICO file (up to 10 MB) onto the box.
2. Choose the **Output**:
   - **Data URL**: ready for an `src` or `url()`.
   - **Base64 only**: just the encoded text.
   - **HTML &lt;img&gt;**: a complete image tag.
   - **CSS**: a background-image rule.
3. Read the result under **Base64 output**, with its length and size.
4. Press **Copy** or **Download .txt**.
5. Press **Start over** for another image.

## A worked example

Your web page shows a 2 KB "check" icon in 20 places and you'd like to avoid an extra file request. Open "check.svg" and choose **CSS**. You get a rule like `background-image: url("data:image/svg+xml;base64,PHN2Zy...")`. Paste it into your stylesheet's `.icon-check` class, and the icon now loads with the CSS itself.

## When Base64 makes sense

- **Tiny images** under about 5 to 10 KB, such as icons, bullets and small logos.
- **Single-file deliverables,** such as an HTML report or email template that must work offline.
- **APIs and JSON payloads** that only accept text.

## When to avoid it

- **Photos and large images.** They grow by a third, can't be cached separately, and slow down page loading.
- **Images used across many pages.** A normal file is cached once by the browser; Base64 is repeated in every page.
- **Email marketing images.** Many email apps block Base64 images; host them online instead.

## Tips

- **Compress first.** Run images through Compress Image or use SVG for icons to keep the text short.
- **Keep SVG as SVG text** where possible; it's often smaller than its Base64 version.
- **Name your snippets** clearly in code so others know what the long string is.

## Common mistakes

- **Pasting raw Base64 into an img src** without the "data:image/...;base64," prefix.
- **Embedding a 2 MB photo,** which makes the HTML huge.
- **Breaking the string** with line breaks or spaces when copying.

## Private by design

Images are encoded in your browser and never uploaded.

## Related tools

Decode or encode text with the [Base64 Encoder and Decoder](/base64-encoder-decoder), shrink images first with [Compress Image](/compress-image), or create site icons with the [Favicon Generator](/favicon-generator).
