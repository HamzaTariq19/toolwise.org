---
seoTitle: "Find and Replace Text Online: Replace All Words at Once | toolwise"
metaDescription: "Find a word or phrase and replace every occurrence instantly. Match case, whole words only, or use regular expressions. Free and private."
faqs:
  - q: How do I delete a word everywhere?
    a: Type the word in Find and leave Replace with empty. Every occurrence is removed. Tick Whole words only so that, for example, removing "cat" does not change "category".
  - q: What does Whole words only mean?
    a: It only matches the word on its own, not inside longer words. Replacing "art" with whole words on changes "art" but leaves "start" and "party" alone.
  - q: What are regular expressions?
    a: Regular expressions are patterns for finding text, such as \d+ for any number or ^ for the start of a line. They are powerful for advanced tasks. In the replacement you can use $1, $2 for captured groups and $& for the whole match.
  - q: Can I undo a replacement?
    a: Your original text stays untouched in the left box. Change or clear the Find field and the result updates, so nothing is lost.
---

## What this tool does

Find and Replace searches your text for a word, phrase or pattern and replaces every match at once. It shows how many replacements were made, so you know exactly what changed. Use it to update a name throughout a document, fix a repeated typo, change a date format, or tidy data before importing it somewhere else.

## How to find and replace

1. Paste your text into **Your text**.
2. Type what to look for in **Find**.
3. Type the new text in **Replace with**, or leave it empty to delete matches.
4. Choose **Match capital letters**, **Whole words only** or **Use regular expression** if needed.
5. Check the result and the replacement count, then copy or download it.

## Examples

- **Rename a client** in a proposal template: find "Acme Ltd", replace with "Bright Co".
- **Fix a consistent typo:** find "recieve", replace with "receive".
- **Change spelling style:** find "colour", replace with "color".
- **Remove a word** everywhere: find "basically" with Whole words only and leave the replacement empty.
- **Swap separators** in data: find ";" and replace with ",".

## Using regular expressions

Turn on **Use regular expression** for pattern matching:

- `\s+` matches runs of spaces; replace with a single space to tidy text.
- `\d{4}-\d{2}-\d{2}` matches dates like 2024-05-31.
- `(\w+)@example\.com` with replacement `$1@newdomain.com` changes an email domain while keeping the name.

If the pattern is not valid, a clear message explains the problem. Test patterns in detail with our [Regex Tester](/regex-tester).

## Tips

- **Start specific.** Replacing a short word like "in" can change far more than you expect; use Whole words only.
- **Check the count** against what you expected before copying the result.
- **Matching capital letters** keeps "May" (the month) separate from "may" (the verb).

## Private

Everything happens in your browser. Your text is never uploaded.
