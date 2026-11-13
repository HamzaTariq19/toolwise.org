---
seoTitle: "Find and Replace Text Online: Replace All Words at Once | toolwise"
metaDescription: "Find a word or phrase and replace every occurrence instantly. Match case, whole words only, or use regular expressions. Free and private."
faqs:
  - q: "How do I delete a word everywhere?"
    a: "Type it in Find and leave \"Replace with\" empty. Every match is removed, and the note shows how many were deleted."
  - q: "What does \"Whole words only\" do?"
    a: "It matches complete words only, so replacing \"cat\" won't change \"category\" or \"concatenate\". Turn it off to replace text anywhere it appears."
  - q: "What is a regular expression?"
    a: "A pattern language for advanced searches, such as \\d+ for any number or ^ for the start of a line. Tick \"Use regular expression\" to use one; you can refer to captured groups with $1, $2 in the replacement."
  - q: "Is the search case-sensitive?"
    a: "Only if you tick \"Match capital letters\". By default, \"Order\", \"order\" and \"ORDER\" all match."
  - q: "Is my text uploaded?"
    a: "No. Everything happens in your browser."
---

## When to use it

Find and Replace changes every occurrence of a word or phrase in a piece of text at once. Use it to update a product or company name throughout a document, fix a word you've misspelled many times, change date formats, remove unwanted words, swap British and American spellings, or clean up data before pasting it into a spreadsheet.

## How to find and replace text

1. Paste your text into **Your text**, or press **Example**.
2. Type what to look for in **Find** (for example "order").
3. Type the new text in **Replace with**, or leave it empty to delete the matches.
4. Choose options: **Match capital letters**, **Whole words only** or **Use regular expression**.
5. Read the **Result** and the note showing how many replacements were made.
6. Press **Copy result** or **Download .txt**.

## A worked example

Your company changed its name from "Brightline" to "Northlight", and you have a 1,200-word "About us" text to update. Paste it in, find "Brightline", replace with "Northlight", and tick **Whole words only** so "Brightlines" in an old URL isn't half-changed by accident. The note says "14 replacements made". Skim the result, then copy it back into your website editor.

## Regular expression examples

- **Remove all numbers:** find `\d+`, replace with nothing.
- **Swap "Smith, Ana" to "Ana Smith":** find `(\w+), (\w+)`, replace with `$2 $1`.
- **Remove spaces before commas:** find ` +,`, replace with `,`.
- **Change dates from 2026-03-14 to 14/03/2026:** find `(\d{4})-(\d{2})-(\d{2})`, replace with `$3/$2/$1`.

If a pattern is invalid, the tool explains the problem instead of guessing.

## Tips

- **Check the count:** an unexpectedly high number means the search is too broad.
- **Use Whole words only** for short words like "it", "in" or "on".
- **Do one change at a time** and check the result before the next.

## Common mistakes

- **Replacing a short word without Whole words only,** turning "cat" into "dog" inside "location" ("lodogion").
- **Forgetting capital letters** when they matter, such as names at the start of sentences.
- **Typing . or ? with "Use regular expression" ticked.** In patterns they mean "any character" and "optional"; leave the option off to search for them as plain text.

## Private by design

Your text never leaves your browser.

## Related tools

Compare before and after with [Text Compare](/text-compare), change capitalisation with the [Case Converter](/case-converter), or tidy spacing with [Remove Extra Spaces](/remove-extra-spaces).
