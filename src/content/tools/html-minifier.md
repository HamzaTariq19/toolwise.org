---
seoTitle: "HTML Minifier: Compress HTML Online Free | toolwise"
metaDescription: "Minify HTML by removing comments and extra whitespace, with optional CSS minification. Keeps pre, textarea and scripts intact. Free."
faqs:
  - q: "Is it safe to minify HTML?"
    a: "Yes, for normal pages. The minifier keeps the content of pre, textarea, script and style blocks exactly as written, and keeps single spaces where they affect the layout, such as between links or words."
  - q: "Why is there still a space between some tags?"
    a: "Spaces between inline elements like links and bold text show up on the page. Removing them would join words together, so one space is kept."
  - q: "Should I remove comments?"
    a: "Usually yes, since visitors do not need them. Leave Remove comments unticked if your HTML uses special comments, for example ones that a template system or old email client relies on."
  - q: "Does it minify JavaScript inside the page?"
    a: "No. Script blocks are left as they are. Use the JS Minifier for JavaScript. CSS inside style tags is minified when Minify CSS in style tags is ticked."
  - q: "Is my HTML uploaded?"
    a: "No. Everything runs in your browser, so your code stays on your device."
---

## When to use it

Use this tool to shrink an HTML page by removing comments, extra spaces and line breaks. It is useful for hand-written websites, landing pages, HTML email templates that must stay under size limits, and snippets pasted into website builders that limit how much code you can add.

## How to use it

1. Paste your HTML into **Your text**, or click **Example** to see a sample page.
2. Choose the options:
   - **Remove comments** deletes `<!-- … -->` notes.
   - **Minify CSS in `<style>` tags** also shrinks the CSS inside the page.
3. The **Minified HTML** appears immediately, with the old size, new size and percentage saved.
4. Click **Copy result**, or **Download .html** to save the file.

## Worked example

The example page has indentation, a style block, a navigation menu with a comment, a pre block and a paragraph with extra spaces. It is 357 bytes before and 252 bytes after, 29% smaller.

Look at what changed. The `<!-- Navigation -->` comment is gone. Inside the style tag, `color: #333333` becomes `color:#333`. The two links in the menu keep one space between them, so they do not run together on screen. The text inside the pre tag, `keep   this   spacing`, is left exactly as it was, because pre shows spaces as they are typed. In the paragraph, `Hello   world` becomes `Hello world`, which is how a browser shows it anyway.

## What stays the same

The minifier never changes your text, links, attributes or the order of elements. It only removes characters the browser ignores, so the page looks and works the same. Search engines read minified HTML just as well as the original, so it has no effect on SEO apart from making pages load a little faster.

## Tips

- **Keep the readable version.** Edit the original, then minify again before you publish.
- **Check email templates in a test send.** Some email clients are picky, so preview the minified version before sending to a list.
- **Combine with server compression.** Gzip or Brotli on your server makes HTML smaller still.
- **Minify scripts separately.** Run JavaScript through the [JS Minifier](/js-minifier) and CSS files through the [CSS Minifier](/css-minifier).

## Common mistakes

- **Expecting a big change on small pages.** Savings depend on how much indentation and how many comments there are.
- **Removing comments a system needs.** Conditional comments in old email templates are a common example.
- **Editing the minified file by hand.** One long line of HTML is hard to change safely.
