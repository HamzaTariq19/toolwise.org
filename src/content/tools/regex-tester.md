---
seoTitle: "Regex Tester: Test Regular Expressions Online | toolwise"
metaDescription: "Test JavaScript regular expressions with live highlighting, match details, capture groups and replace preview. Clear error messages. Free."
faqs:
  - q: Which regex flavor does this tester use?
    a: JavaScript (ECMAScript) regular expressions, the same as in browsers and Node.js. Most syntax is shared with other languages, but some features, such as lookbehind support and flags, differ slightly between languages.
  - q: What do the flags mean?
    a: g finds all matches instead of the first, i ignores capital letters, m makes ^ and $ match at line starts and ends, s lets the dot match line breaks, u enables full Unicode, and y matches only at the current position.
  - q: How do I use capture groups in a replacement?
    a: Wrap part of the pattern in brackets, then refer to it as $1, $2 and so on in the replacement. $& inserts the whole match. Named groups like (?<year>\d{4}) appear by name in the match details.
  - q: Why does my pattern freeze or time out?
    a: Patterns with nested repetition, such as (a+)+, can take an extremely long time on some text. This is called catastrophic backtracking. Make repeated parts more specific.
---

## What this tool does

The regex tester lets you write and test regular expressions against your own text. Matches are highlighted as you type, a table shows each match with its position and capture groups, and a replace preview shows what a replacement would produce.

## How to test a regular expression

1. Type your **pattern** between the slashes, without the slashes themselves.
2. Set the **flags**, such as `gi`.
3. Paste or type **test text**.
4. See matches highlighted on the right and listed in **Match details**.
5. Optionally type a **replacement** to preview a find-and-replace.

## Useful patterns

- Email (simple): `[\w.+-]+@[\w-]+\.[\w.]+`
- Digits only: `^\d+$`
- US ZIP code: `^\d{5}(-\d{4})?$`
- Date YYYY-MM-DD: `\d{4}-\d{2}-\d{2}`
- Hex color: `#(?:[0-9a-f]{3}){1,2}\b` with the `i` flag
- Repeated words: `\b(\w+)\s+\1\b`

## Regex basics

- `.` any character; `\d` digit; `\w` letter, digit or underscore; `\s` whitespace
- `*` zero or more; `+` one or more; `?` optional; `{2,4}` between two and four
- `^` start and `$` end; `[abc]` any of a, b or c; `(…)` a capture group
- `\b` a word boundary; `|` either side

## Tips

- **Start small** and build the pattern up step by step, checking the highlights each time.
- **Escape special characters** like `.`, `?` and `(` with a backslash when you mean them literally.
- **Be careful with greedy matches:** `.*` grabs as much as possible; `.*?` grabs as little as possible.

## Related tools

Run replacements on larger texts with [Find and Replace](/find-and-replace), or compare outputs with [Text Compare](/text-compare).

## Private

Everything runs in your browser. Your patterns and text are never uploaded.
