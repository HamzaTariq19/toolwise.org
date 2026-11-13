---
seoTitle: "Regex Tester: Test Regular Expressions Online | toolwise"
metaDescription: "Test JavaScript regular expressions with live highlighting, match details, capture groups and replace preview. Clear error messages. Free."
faqs:
  - q: "Which regex flavor does it use?"
    a: "JavaScript regular expressions, as built into your browser. Most everyday syntax is the same in Python, PHP, Java and other languages, but some advanced features differ, so test in your own language too."
  - q: "What do the flags do?"
    a: "g finds all matches instead of just the first. i ignores upper and lower case. m makes ^ and $ match at the start and end of each line. s lets the dot match line breaks. u turns on full Unicode support, which helps with emoji and letters outside English."
  - q: "How do I use groups in the replacement?"
    a: "Wrap parts of the pattern in brackets to capture them, then use $1, $2 and so on in Replace with. $& inserts the whole match. Named groups like (?<user>\\w+) are shown by name in the match details."
  - q: "Why does it say the pattern is taking too long?"
    a: "Some patterns, often with nested repeats like (a+)+, can take an extremely long time on certain text. This is called catastrophic backtracking. The tool stops after a second and a half so your browser does not freeze. Simplify the pattern."
  - q: "Is my text sent anywhere?"
    a: "No. Matching happens in your browser, so you can safely test patterns on logs or private data."
---

## When to use it

Use this tool to build and test a regular expression before you use it in code, a spreadsheet, a text editor or a search-and-replace. Seeing the matches highlighted live makes it much easier to get a pattern right, whether you are pulling email addresses from text, validating input, cleaning data or renaming files.

## How to use it

1. Type your pattern in **Regular expression**, between the slashes. Do not add the slashes yourself.
2. Set the **Flags** by typing them or tapping **g**, **i**, **m**, **s** and **u**.
3. Paste sample text into **Test text**.
4. See **Matches highlighted** in the text, with the number of matches.
5. Check **Match details**, which lists each match, its position and the value of every group.
6. Optionally, type in **Replace with** to preview a search-and-replace.

## Worked example

The default pattern is `(\w+)@(\w+)\.com` with the flags gi. In the test text it finds 2 matches: anna@example.com and SUPPORT@toolwise.com. The match details show group $1 as anna and $2 as example for the first one.

hello@ world is not matched because of the space, and bob@test.org is not matched because the pattern asks for .com.

Type `$1 at $2 dot com` in **Replace with**. The preview reads: Contact anna at example dot com or SUPPORT at toolwise dot com. This kind of replacement is handy for hiding email addresses from spam bots.

## Handy building blocks

- `\d` matches a digit, `\w` a letter, digit or underscore, and `\s` a space or line break.
- `+` means one or more, `*` zero or more, and `{2,4}` between two and four.
- `[abc]` matches any one of a, b or c, and `[^abc]` anything else.

## Tips

- **Start small.** Match one simple piece first, then add to the pattern step by step.
- **Escape special characters.** A dot means any character, so use `\.` for a real dot. The same goes for ( ) [ ] { } + * ? ^ $ | and \.
- **Use realistic test text.** Include examples that should not match, so you can check the pattern ignores them.
- **Anchor validation patterns.** For checking a whole value, wrap the pattern in ^ and $.

## Common mistakes

- **Forgetting the g flag.** Without it, only the first match is found and replaced.
- **Being too greedy.** `.*` grabs as much as possible. Use `.*?` to match as little as possible.
- **Trusting a regex to validate emails perfectly.** Real email rules are complex. Use a simple pattern and confirm by sending an email.
