---
seoTitle: "JSON to CSV Converter: Open JSON in Excel or Sheets | toolwise"
metaDescription: "Convert a JSON array of objects to CSV for Excel or Google Sheets. Flattens nested objects, handles commas and quotes. Free and private."
faqs:
  - q: What JSON shape works best?
    a: An array of objects, where each object is one row and each key is a column, like [{"name":"Ann","age":31}]. If you paste an object that contains an array, toolwise uses that array.
  - q: What happens to nested objects and arrays?
    a: Nested objects are flattened into columns such as address.city when "Flatten nested objects" is on. Arrays are written as JSON text inside the cell, like ["admin","staff"].
  - q: Why does Excel show everything in one column?
    a: Excel in many European countries expects semicolons instead of commas. Choose the semicolon separator, or import the file with Excel's Data, From Text/CSV option.
  - q: What if rows have different keys?
    a: Every key that appears in any row becomes a column. Rows without a value for a column get an empty cell.
---

## What this tool does

JSON to CSV turns JSON data into a CSV (comma-separated values) table that opens in Excel, Google Sheets, Numbers and almost any database or analytics tool. It collects every key across all your rows as columns, flattens nested objects, and correctly quotes values that contain commas, quotes or line breaks.

## How to convert JSON to CSV

1. Paste your JSON, open a `.json` file, or press **Example**.
2. Choose a **separator**: comma for most tools, semicolon for Excel in many European locales, or tab.
3. Decide whether to **flatten nested objects**.
4. Copy the CSV or press **Download .csv**.

## Example

`[{"name":"Ann","address":{"city":"Paris"}}]` becomes a CSV with the columns `name` and `address.city`.

## Common uses

- **API responses:** turn data from an API into a spreadsheet for analysis or reporting.
- **Exports:** convert app or database exports into a format colleagues can open.
- **Data cleaning:** review JSON data in a spreadsheet, then convert it back with [CSV to JSON](/csv-to-json).

## Tips

- **Validate first.** If the JSON has an error, toolwise tells you; fix it with the [JSON Formatter](/json-formatter), which points to the exact line.
- **Large files:** files up to 30 MB convert in the browser. Very large exports are best split first.
- **Leading zeros:** spreadsheets may drop leading zeros from values such as postal codes. Format those columns as text when importing.
- **Dates:** ISO dates like 2024-05-31 are recognized by most spreadsheets automatically.

## How quoting works

CSV values that contain the separator, a double quote or a line break are wrapped in double quotes, and any quotes inside are doubled, following the CSV standard (RFC 4180). This keeps text like `Lee, Ann` or `He said "hi"` in a single cell.

## Private

Your data is converted in your browser and never uploaded.
