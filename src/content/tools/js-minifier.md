---
seoTitle: "JavaScript Minifier: Minify JS Online with Terser | toolwise"
metaDescription: "Minify JavaScript with Terser: remove whitespace, shorten variable names and optionally drop console.log. Clear syntax errors. Free and private."
faqs:
  - q: Which minifier does toolwise use?
    a: Terser, the open-source JavaScript minifier used by most modern build tools. It is loaded only on this page, the first time you minify something.
  - q: Is it safe to shorten variable names?
    a: Yes. Terser only renames local variables that can't be seen from outside, so your code behaves the same. Turn it off if you need readable names, for example for debugging.
  - q: Does it support modern JavaScript?
    a: Yes, including ES2015+ syntax such as classes, arrow functions, async/await and modules. Tick the module option, or it is detected automatically when your code uses import or export.
  - q: Can it minify TypeScript or JSX?
    a: No. Compile TypeScript or JSX to plain JavaScript first, then minify the result.
---

## What this tool does

The JavaScript minifier reduces the size of JavaScript code by removing comments and whitespace, shortening local variable names and simplifying expressions, without changing what the code does. Smaller scripts download and parse faster, improving page speed.

## How to minify JavaScript

1. Paste your JavaScript, or press **Example**.
2. Choose whether to **shorten variable names**, **remove console.log calls**, and treat the code as an **ES module**.
3. Copy the minified code or download it as a file.

If your code has a syntax error, toolwise shows the line and column so you can fix it.

## What minification does

- Removes comments, except license comments starting with `/*!`, `@license` or `@preserve`.
- Removes unnecessary spaces, line breaks and semicolons.
- Renames local variables, such as `firstNumber`, to short names like `n`.
- Simplifies code, for example removing unreachable code and folding constants.

## Tips

- **Keep the original** source for editing; minified code is hard to read.
- **Remove console.log** for production to reduce noise and size.
- **Use source maps** in a real build setup if you need to debug minified code.
- **Test after minifying,** especially code that relies on function names, such as some frameworks.

## When you need this tool

Build tools like Vite, webpack and esbuild minify automatically. This tool is handy for quick jobs: a script for a static site, a bookmarklet, a widget snippet, or checking how small a piece of code can get.

## Related tools

Minify stylesheets with the [CSS Minifier](/css-minifier) and pages with the [HTML Minifier](/html-minifier). Format data with the [JSON Formatter](/json-formatter).

## Private

Your code is minified in your browser and never uploaded.
