---
seoTitle: "Base64 Encode and Decode Online: Text to Base64 | toolwise"
metaDescription: "Encode text to Base64 or decode Base64 back to readable text, with full Unicode support and URL-safe mode. Free, private, instant."
faqs:
  - q: "Is Base64 encryption?"
    a: "No. Base64 is an encoding, not encryption. Anyone can decode it in seconds, so never use it to hide passwords or private data."
  - q: "Why does Base64 make text longer?"
    a: "Base64 turns every 3 bytes into 4 characters, so the result is about a third larger than the original. Line breaks, if you add them, make it slightly longer still."
  - q: "What does URL-safe Base64 mean?"
    a: "Standard Base64 uses + and /, which have special meanings in web addresses. URL-safe Base64 uses - and _ instead and drops the = padding at the end, so it can go straight into a URL or a file name. The decoder accepts both forms."
  - q: "Does it handle emoji and accented letters?"
    a: "Yes. Text is encoded as UTF-8 first, so emoji and characters like é, ü and 中 come back exactly the same when decoded."
  - q: "Can I decode an image or file?"
    a: "This tool decodes Base64 that contains text. If the decoded bytes are not readable text, such as an image, it tells you. For an image data URL, paste it into your browser's address bar to view it."
---

## When to use it

Use this tool to turn text into Base64, or Base64 back into readable text. Developers use Base64 for data in JSON, email attachments, HTTP Basic authentication headers, data URLs and configuration files. It is also handy when you find a long string of letters and numbers and want to see what it says.

## How to use it

1. Choose **Encode to Base64** or **Decode Base64**.
2. Type or paste into **Your text**, or click **Example** to try a sample. The **Result** updates as you type.
3. When encoding, tick **URL-safe (- and _ instead of + and /)** if the result will go in a web address, and **Split into lines of 76 characters** for email or PEM-style formats.
4. Click **Copy result**, or **Download .txt** to save it.
5. Click **Clear** to start again.

The character and line counts under each box help you check the size.

## Worked example

Encode the word Hello and you get SGVsbG8=. The = at the end is padding, added because 5 bytes do not divide evenly into groups of 3.

For a Basic authentication header, encode the text user:pass. The result is dXNlcjpwYXNz, which goes after the word Basic in the header. Remember that this only encodes the details, it does not protect them, which is why such headers must be sent over HTTPS.

To decode, switch to **Decode Base64** and paste dXNlcjpwYXNz. The result is user:pass again. If you paste a data URL that starts with data:…;base64, the prefix is removed for you.

## How Base64 works

Computers store text as bytes. Base64 takes the bytes three at a time, splits those 24 bits into four groups of 6 bits, and writes each group as one of 64 safe characters: A–Z, a–z, 0–9, + and /. That is why the output only ever uses those letters, digits and symbols.

## Tips

- **Use URL-safe mode for web addresses and tokens.** JSON Web Tokens use this form.
- **Do not split lines for JSON.** Line breaks inside a JSON string can break the data.
- **Check the end of the string.** If decoding fails, the text may have been cut off when copied.

## Common mistakes

- **Treating Base64 as security.** It hides nothing from anyone who knows what it is.
- **Copying extra characters.** Quotes, commas or spaces around the string can make decoding fail. The tool ignores spaces and line breaks, but not other symbols.
- **Encoding twice.** Base64 of Base64 still decodes, but only to more Base64.
