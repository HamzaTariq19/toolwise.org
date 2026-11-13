---
seoTitle: "JSON to CSV Converter: Open JSON in Excel or Sheets | toolwise"
metaDescription: "Convert a JSON array of objects to CSV for Excel or Google Sheets. Flattens nested objects, handles commas and quotes. Free and private."
faqs:
  - q: "What kind of JSON can it convert?"
    a: "An array of objects, like a list of records from an API. If you paste an object that contains an array, such as a response with a results list, the tool finds the first array and converts it. A single object becomes one row."
  - q: "What happens to nested objects?"
    a: "With Flatten nested objects ticked, an address object becomes columns like address.city and address.zip. If you untick it, the whole object is written into one cell as JSON text."
  - q: "What happens to lists inside a record?"
    a: "Arrays, such as a list of tags, are written into one cell as JSON text, for example [\"admin\",\"staff\"]. A spreadsheet can't show a list in one cell any other way without losing information."
  - q: "Why do some rows have empty cells?"
    a: "The tool collects every field that appears in any record and makes a column for each. If a record does not have that field, its cell is left empty."
  - q: "Which separator should I use?"
    a: "Use comma for most tools and for Excel in English. Choose semicolon if you use Excel in a country where the comma is the decimal separator, such as Germany or France. Tab works well when pasting straight into a spreadsheet."
---

## When to use it

Use this tool to turn JSON data into a CSV file you can open in Excel, Google Sheets or Numbers. It is useful when an API, app export or database gives you JSON and you need a table to sort, filter, share with colleagues or import into another system.

## How to use it

1. Paste JSON into **Your text**, click **Open .json file** to load a file of up to 30 MB, or click **Example**.
2. Choose a **Separator**: **Comma**, **Semicolon ( ; ) for Excel in Europe** or **Tab**.
3. Leave **Flatten nested objects (address.city)** ticked to split nested data into separate columns.
4. The **CSV** appears straight away, with the number of rows and columns.
5. Click **Copy result** or **Download .csv**.

## Worked example

The example has three people. Ann has a city and a list of tags, Bo has a nested address, and Cara's name contains a comma and her note contains quotes.

The result has 3 rows and 7 columns: name, age, city, tags, address.city, address.zip and note. Bo's address is split into address.city (Oslo) and address.zip (0150). Ann's tags appear in one cell as a JSON list. "Cara, Jr." is wrapped in quotes so the comma does not split the cell, and the quotes in her note are doubled, which is how CSV stores them. Everyone gets every column, with empty cells where a value is missing.

## Privacy

The conversion happens in your browser, so customer lists, orders and other private exports never leave your device. That makes it safe to use with data you are not allowed to upload to online services.

## Tips

- **Check the JSON first.** If the tool says the JSON is not valid, run it through the [JSON Formatter](/json-formatter) to find the error.
- **Keep leading zeros in spreadsheets.** Values like 0150 are written correctly, but Excel may remove the zero when it opens the file. Import the column as text to keep it.
- **Use tab for quick pasting.** Copying tab-separated text into a spreadsheet puts each value in its own cell.

## Common mistakes

- **Pasting JSON Lines.** One object per line, without square brackets and commas, is not a JSON array. Wrap the lines in [ ] and separate them with commas first.
- **Using comma in a European Excel.** Everything may land in one column. Choose semicolon instead.
- **Expecting nested lists to become rows.** Each top-level record is one row.
