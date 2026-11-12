---
seoTitle: "CSS Minifier: Compress CSS Online Free | toolwise"
metaDescription: "Minify CSS by removing comments, whitespace and redundant characters. Keeps strings and license comments intact. Shows the size saving."
faqs:
  - q: Will minifying change how my site looks?
    a: No. Minification only removes characters the browser doesn't need, such as comments, line breaks and extra spaces. The rules and their meaning stay exactly the same.
  - q: What are license comments?
    a: Comments starting with /*! are often used for copyright and license notices that must be kept. They are preserved by default.
  - q: Are strings and URLs safe?
    a: Yes. Text inside quotes, such as font names and URLs with spaces, is copied exactly as written.
  - q: How much smaller will my CSS get?
    a: Typically 15 to 40%, depending on how many comments and how much indentation the original has. Server compression (gzip or Brotli) then reduces it further.
---

## What this tool does

The CSS minifier shrinks stylesheets by removing comments, line breaks, indentation and unnecessary spaces and semicolons, and by shortening colors like `#ffffff` to `#fff`. Smaller CSS loads faster and helps pages render sooner.

## How to minify CSS

1. Paste your CSS, or press **Example**.
2. Choose whether to keep **license comments**.
3. Check the size saving, then copy the minified CSS or download it.

## What the minifier does

- Removes `/* comments */`
- Collapses whitespace and line breaks
- Removes spaces around `{ } : ; , >`
- Removes the last semicolon before `}`
- Shortens `0.5em` to `.5em` and `#aabbcc` to `#abc`

It deliberately avoids risky rewrites, such as changing units inside `calc()`, so your styles always behave the same.

## Tips

- **Keep the original.** Edit the readable version and minify a copy for publishing.
- **Bracket warning:** if the number of `{` and `}` doesn't match, toolwise warns you, which usually means a typo in the original.
- **Combine files** before minifying to reduce the number of downloads.
- **Remove unused CSS** for the biggest savings; minifying alone can't remove rules you don't use.

## Related tools

Minify HTML with the [HTML Minifier](/html-minifier) and JavaScript with the [JavaScript Minifier](/js-minifier). Design backgrounds with the [CSS Gradient Generator](/css-gradient-generator).

## Private

Your stylesheet is minified in your browser and never uploaded.
