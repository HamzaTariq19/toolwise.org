---
seoTitle: "CSS Minifier: Compress CSS Online Free | toolwise"
metaDescription: "Minify CSS by removing comments, whitespace and redundant characters. Keeps strings and license comments intact. Shows the size saving."
faqs:
  - q: "Will minifying change how my site looks?"
    a: "No. The minifier only removes things browsers ignore, such as comments, spaces, line breaks and the last semicolon in each rule, and shortens values like #ffffff to #fff. The styles stay the same."
  - q: "What are license comments?"
    a: "Comments that start with /*! are a convention for copyright and license notices that must stay with the code. Keep license comments is on by default so they are not removed."
  - q: "Should I keep the original file?"
    a: "Yes. Always edit the readable version and minify again when you publish. Minified CSS is hard to read and change."
  - q: "Why does it warn that brackets don't match?"
    a: "The number of { and } in your CSS is different, which usually means a rule is not closed. The minified output may not work as expected until you fix the original."
  - q: "Is my CSS uploaded?"
    a: "No. Minifying happens in your browser, so your code stays on your device."
---

## When to use it

Use this tool to make a CSS file smaller before you put it on a website. Smaller files download faster, which helps page speed, especially on mobile. It is useful for small sites without a build tool, email templates, CSS you paste into a content management system, or a quick check of how much a stylesheet can shrink.

## How to use it

1. Paste your CSS into **Your text**, or click **Example** to try a sample.
2. Leave **Keep license comments (/*! … */)** ticked unless you are sure no license notice is needed.
3. The **Minified CSS** appears straight away, with the old and new size and the percentage saved.
4. Click **Copy result**, or **Download .css** to save a file.

## Worked example

The example has a comment, indented rules, a hover style, a license comment and a media query, 268 bytes in total. After minifying, it is 203 bytes, 24% smaller. You can see what changed:

- The /* Main button */ comment is gone, but /*! License: keep me */ stays.
- color: #ffffff becomes color:#fff.
- margin: 0.5em 0 becomes margin:.5em 0.
- Spaces, line breaks and the last semicolon in each rule are removed.
- Text inside quotes, like "img/bg one.png", is left alone.

On a real stylesheet with many comments and indents, savings of 20 to 40% are common.

## What it does not do

The minifier does not remove unused rules, merge duplicate selectors or change the order of your CSS, because those changes can alter how a page looks. It sticks to safe changes that never affect the result. If you need to find unused CSS, the coverage panel in your browser's developer tools can show it.

## Tips

- **Name the file clearly.** A common habit is styles.css for the readable file and styles.min.css for the minified one.
- **Turn on compression on your server too.** Gzip or Brotli shrink files further, and they work well together with minifying.
- **Minify after you finish editing.** Make changes in the original, then minify again.
- **Test the page afterwards.** A quick look confirms nothing broke, especially if the warning about brackets appeared.

## Common mistakes

- **Editing the minified file.** Changes are hard to make and easy to lose. Keep the original.
- **Removing license comments from third-party code.** Many licenses require the notice to stay.
- **Expecting big savings on tiny files.** A 1 KB stylesheet will only save a few hundred bytes. Removing unused CSS often helps more.
