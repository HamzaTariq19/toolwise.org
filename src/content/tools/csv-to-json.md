---
seoTitle: "CSV to JSON Converter: Spreadsheet Data to JSON | toolwise"
metaDescription: "Convert CSV to JSON with automatic separator detection, number and true/false conversion, and quoted values handled correctly. Free."
faqs:
  - q: Does the first row need to be a header?
    a: For the Array of objects output, yes. The first row provides the keys. If your CSV has no header, choose Array of arrays, which keeps every row as a list of values.
  - q: How are numbers and booleans handled?
    a: With "Convert numbers and true/false" on, values like 31 and true become JSON numbers and booleans, and empty cells become null. Turn it off to keep everything as text, for example to keep leading zeros in codes like 00123.
  - q: Can it read semicolon or tab separated files?
    a: Yes. The separator is detected automatically, or you can choose comma, semicolon, tab or pipe yourself.
  - q: What if a row has too many or too few values?
    a: The conversion still runs, and a note tells you which row has a different number of columns so you can check it.
---

## What this tool does

CSV to JSON converts spreadsheet data into JSON, the format used by web APIs, JavaScript apps and configuration files. It handles real-world CSV correctly: quoted values with commas, quotes inside quotes, line breaks within cells, different separators and a byte order mark from Excel.

## How to convert CSV to JSON

1. Paste your CSV, open a `.csv` file, or press **Example**.
2. Leave **Separator** on automatic, or choose one.
3. Choose **Array of objects** (one object per row, using the header row as keys) or **Array of arrays**.
4. Choose whether to **convert numbers and true/false**.
5. Copy the JSON or download it as a `.json` file.

## Example

```
name,age
Ann,31
```

becomes `[{"name": "Ann", "age": 31}]`.

## Common uses

- **Developers:** turn a spreadsheet into seed data, test fixtures or a static data file for a website.
- **No-code tools:** prepare data for automation services that accept JSON.
- **APIs:** convert an export before sending it to an API.
- **Analysis:** load CSV data into JavaScript notebooks and charts.

## Tips

- **Export from Excel or Google Sheets** with File → Download or Save As → CSV.
- **Clean headers:** short, consistent header names without special characters make better JSON keys.
- **Check the result** in the [JSON Formatter](/json-formatter) if you need to validate or reformat it.
- **Going the other way?** Use [JSON to CSV](/json-to-csv).

## Reliable parsing

toolwise uses PapaParse, a widely used, well-tested open-source CSV parser, loaded only on this page. It follows the CSV standard, so values like `"Lee, Ann"` stay in one field.

## Private

Your spreadsheet data is converted in your browser and never uploaded.
