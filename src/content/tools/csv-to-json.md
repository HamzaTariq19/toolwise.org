---
seoTitle: "CSV to JSON Converter: Spreadsheet Data to JSON | toolwise"
metaDescription: "Convert CSV to JSON with automatic separator detection, number and true/false conversion, and quoted values handled correctly. Free."
faqs:
  - q: "What is the difference between an array of objects and an array of arrays?"
    a: "An array of objects uses the first row as names, so each record looks like {\"name\": \"Bo\", \"age\": 27}. An array of arrays keeps every row, including the header, as a simple list, like [\"Bo\", 27]. Objects are easier to read and use in most code."
  - q: "What does Convert numbers and true/false do?"
    a: "It turns values like 31 into numbers and true or false into booleans, instead of leaving everything as text. Empty cells become null. Untick it if you need every value kept exactly as text."
  - q: "Why did my zip codes lose their leading zero?"
    a: "With number conversion on, 0150 is read as the number 150. Untick Convert numbers and true/false to keep codes, phone numbers and IDs exactly as written."
  - q: "How does it handle commas inside values?"
    a: "Values wrapped in double quotes, such as \"Lee, Ann\", are read as one value even though they contain a comma. This is standard CSV, and spreadsheet exports do it for you."
  - q: "Why does it warn about a different number of columns?"
    a: "One or more rows have more or fewer values than the header. This often means a missing comma or an unquoted comma in a value. The note shows the first row to check."
---

## When to use it

Use this tool to turn a CSV file or spreadsheet export into JSON for code, APIs, configuration or test data. It is handy for developers building a quick prototype, people moving data from Excel or Google Sheets into an app, and anyone who needs a list of records in a structured format.

## How to use it

1. Paste CSV into **Your text**, click **Open .csv file** to load a file of up to 30 MB, or click **Example**.
2. Choose a **Separator**. **Detect automatically** works for most files, or pick **Comma**, **Semicolon**, **Tab** or **Pipe ( | )**.
3. Choose the **Output**: **Array of objects** or **Array of arrays**.
4. Tick or untick **Convert numbers and true/false**.
5. The **JSON** appears straight away, with the number of rows and columns. Click **Copy result** or **Download .json**.

The first line of your CSV should be a header row with column names.

## Worked example

The example has a header row (name, age, city, active) and three people. The result is an array of three objects with 3 rows and 4 columns.

"Lee, Ann" stays as one name because it is in quotes. Ages become numbers, so 31 rather than "31", and active becomes true or false. Cara has no age, so her age is null. "New York" keeps its space.

Switch the output to **Array of arrays** and you get four lists, starting with the header row ["name", "age", "city", "active"].

## Using the result

Most programming languages can read the JSON directly. In JavaScript, JSON.parse turns it into a list you can loop through. You can also save it as a .json file for a test fixture, a static website or a no-code tool that accepts JSON imports.

## Tips

- **Clean up the header row.** Short, simple column names without spaces, such as first_name, are easier to use in code.
- **Turn off conversion for IDs.** Phone numbers, zip codes and account numbers should stay as text.
- **Export from spreadsheets as CSV UTF-8.** It keeps accented letters and symbols correct.

## Common mistakes

- **Forgetting the header row.** Without it, the first record is used as column names.
- **Mixing separators.** A file that uses both commas and semicolons will not split cleanly. Choose the right separator by hand.
- **Expecting totals rows to disappear.** Blank lines are skipped, but a totals or notes row at the bottom of a spreadsheet becomes a record. Delete it before converting.
