---
seoTitle: "HTML Minifier: Compress HTML Online Free | toolwise"
metaDescription: "Minify HTML by removing comments and extra whitespace, with optional CSS minification. Keeps pre, textarea and scripts intact. Free."
faqs:
  - q: Is it safe to minify HTML?
    a: Yes, when done carefully. toolwise only removes comments and extra whitespace, and leaves the contents of pre, textarea, script and style elements alone (except optionally minifying CSS), so the page looks and works the same.
  - q: Why is a space kept between some tags?
    a: Between inline elements, such as links and spans, a space can be visible on the page. toolwise keeps a single space there so text doesn't run together.
  - q: Does it minify JavaScript inside script tags?
    a: No. Inline scripts are left untouched to avoid breaking them. Minify JavaScript separately with the JavaScript Minifier.
  - q: Are conditional comments removed?
    a: Comments starting with <!--[if are kept, as older sites still use them for Internet Explorer.
---

## What this tool does

The HTML minifier reduces the size of HTML files by removing comments, line breaks, indentation and other unnecessary whitespace. Smaller HTML downloads faster, which helps page speed, especially on mobile connections. It can also minify CSS inside style tags.

## How to minify HTML

1. Paste your HTML, or press **Example**.
2. Choose whether to **remove comments** and **minify CSS in style tags**.
3. See the size saving, then copy the result or download it as a file.

## What is removed

- HTML comments like `<!-- navigation -->`
- Line breaks and indentation between tags
- Runs of spaces collapsed into one

## What is protected

- Content inside `<pre>` and `<textarea>`, where whitespace matters.
- JavaScript inside `<script>` tags.
- Spaces that separate words and inline elements.

## When to minify

- **Static websites** and landing pages you upload by hand.
- **Email templates**, where some email clients clip messages over about 100 KB.
- **Embedded widgets** and snippets you paste into other sites.

If you use a build tool, framework or content management system, it may minify HTML automatically. Keep an unminified copy for editing, because minified code is hard to read.

## Tips

- Combine with gzip or Brotli compression on your server for the biggest savings.
- After minifying, open the page and check it still looks right, particularly text with inline formatting.

## Related tools

Minify stylesheets with the [CSS Minifier](/css-minifier) and scripts with the [JavaScript Minifier](/js-minifier).

## Private

Your code is processed in your browser and never uploaded.
