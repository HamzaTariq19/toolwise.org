---
seoTitle: "Line Counter: Count Lines in Text or a File Online | toolwise"
metaDescription: "Count total, non-empty, empty and unique lines in text or a text file. Copy with line numbers. Free, instant and private."
faqs:
  - q: "Does an empty line at the end count?"
    a: "Yes, if there is one. Many files end with a line break, which creates a final empty line. The Lines with text count ignores it, so use that number if you only care about real content."
  - q: "How are unique lines counted?"
    a: "Lines with text are compared after removing spaces at the start and end. Two lines that differ only in spaces count as the same. Capital letters do matter, so Apple and apple are different."
  - q: "What does Copy with line numbers do?"
    a: "It copies your text with a number in front of each line, with spaces before the smaller numbers so that the text lines up neatly in a column. This is useful for code reviews, transcripts and legal documents."
  - q: "Can I open large files?"
    a: "Yes. Open text file loads a plain text file such as .txt, .csv or a log file directly from your device. Nothing is uploaded."
  - q: "What is the longest line count for?"
    a: "It shows the number of characters in the longest line. It is handy for checking code style limits, such as 80 or 120 characters, or fields with a maximum length."
---

## When to use it

Use this tool to count lines in any text: a list of email addresses, a CSV file, a log file, lines of code, poem lines or a list of names. It also shows how many lines are empty, how many are unique, and how long the longest line is, which helps when cleaning data or checking limits.

## How to use it

1. Paste text into **Your text**, or click **Open text file** to load a file from your device.
2. Read the results:
   - **Total lines**, including empty ones.
   - **Lines with text**, ignoring empty lines.
   - **Empty lines**.
   - **Unique lines**, counting repeats only once.
   - **Longest line**, in characters.
3. Click **Copy with line numbers** to copy the text with numbered lines, or **Clear** to start again.

## Worked example

You export a list of newsletter subscribers and paste it in. The tool shows 1,204 total lines, 1,198 lines with text, 6 empty lines and 1,150 unique lines. That tells you there are 48 duplicate addresses to remove before importing the list somewhere else.

A programmer pastes a function and sees the longest line is 132 characters, over the team's 120-character limit, so they know a line needs wrapping.

## What counts as a line?

A line ends wherever there is a line break, whether it came from Windows, Mac or Linux, since the tool understands all three styles. A line with only spaces counts as empty. A single line can be thousands of characters long, which is common in exported data or minified code.

## Cleaning a list

For a messy list, check the counts here first, then tidy it up with [Remove Duplicate Lines](/remove-duplicate-lines) and [Sort Lines](/sort-lines). Running the counter again afterwards confirms that nothing important was lost along the way.

## Tips

- **Compare Lines with text and Unique lines.** The difference is the number of duplicates.
- **Use it before importing data.** Many systems limit how many rows you can upload at once.
- **Number lines for feedback.** Sending numbered text makes it easy to say "see line 14".

## Common mistakes

- **Counting wrapped lines as separate lines.** A long line that wraps on screen is still one line. Only real line breaks start a new line.
- **Forgetting the header row.** In a CSV file, the first line is usually column names, not data.
- **Expecting case-insensitive duplicates.** Email addresses in different capitals count as different lines, so convert the list to lowercase first with the [Case Converter](/case-converter) if needed.
