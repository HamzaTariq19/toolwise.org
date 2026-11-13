---
seoTitle: "JavaScript Minifier: Minify JS Online with Terser | toolwise"
metaDescription: "Minify JavaScript with Terser: remove whitespace, shorten variable names and optionally drop console.log. Clear syntax errors. Free and private."
faqs:
  - q: "Will minified JavaScript still work the same way?"
    a: "Yes. The minifier, Terser, rewrites the code so it does exactly the same thing in fewer characters. It removes comments and spaces, shortens local names and simplifies some expressions."
  - q: "Why were some names not shortened?"
    a: "Names at the top level of a normal script, such as functions and global variables, may be used by other scripts on the page, so they are kept. Names inside functions are safe to shorten. In an ES module, more names can be shortened."
  - q: "What does Code is an ES module mean?"
    a: "Tick it if your file uses import or export. The tool also detects this automatically when the file starts a line with import or export."
  - q: "Are license comments kept?"
    a: "Yes. Comments starting with /*! or containing @license or @preserve stay in the output, because many licenses require them."
  - q: "Why does it show a syntax error?"
    a: "The minifier has to understand your code to shrink it. If there is a mistake, it shows the line and column so you can fix the original. The minified version appears as soon as the code is valid."
---

## When to use it

Use this tool to shrink a JavaScript file before adding it to a website. Smaller scripts download and start faster, which matters most on phones. It suits small projects without a build step, snippets for website builders and tag managers, bookmarklets, and checking how much a script could shrink.

## How to use it

1. Paste your code into **Your text**, or click **Example**.
2. Choose the options:
   - **Shorten variable names** renames local variables to single letters.
   - **Remove console.log calls** strips debugging messages.
   - **Code is an ES module (import/export)** for module files.
3. The **Minified JavaScript** appears with the old size, new size and percentage saved.
4. Click **Copy result**, or **Download .js**.

## Worked example

The example has a comment, a function that adds two numbers and logs the total, and a line that doubles some numbers. It is 272 bytes, and the minified version is 139 bytes, 49% smaller.

Look at the changes. The comment is removed. Inside `addNumbers`, the parameters `firstNumber` and `secondNumber` become `s` and `t`, and `total` becomes `e`. The arrow function `(value) => value * 2` becomes `s=>2*s`. The function name `addNumbers` and the variable `items` stay the same, because other scripts could use them.

Tick **Remove console.log calls** and the logging line disappears completely, making the code smaller still.

## Why smaller scripts help

Before a browser can run a script, it has to download it and read through it. Fewer bytes mean less waiting on slow connections and less work for older phones. For a small site, minifying one or two scripts can make pages feel noticeably quicker.

## Source maps

Large projects often use a build tool that also creates a source map, which lets developer tools show the original code when debugging. This tool is for quick, one-off minifying, so it does not create source maps. Keep the original file to debug instead.

## Tips

- **Keep the original source.** Minified code is very hard to read or debug.
- **Remove console.log for production.** Debug messages are rarely useful to visitors and add size.
- **Test after minifying.** Load the page and check that everything still works, especially if the code is old or unusual.

## Common mistakes

- **Pasting code with a syntax error.** Fix the error the tool reports, then try again.
- **Ticking module for an ordinary script.** Module mode allows changes that can break a normal script that relies on global names.
- **Minifying code that is already minified.** It will save very little.
- **Editing the minified output.** Make changes in the readable version and minify again.
