---
seoTitle: "Base64 Encode and Decode Online: Text to Base64 | toolwise"
metaDescription: "Encode text to Base64 or decode Base64 back to readable text, with full Unicode support and URL-safe mode. Free, private, instant."
faqs:
  - q: Is Base64 encryption?
    a: No. Base64 is an encoding, not encryption. Anyone can decode it, so never use it to protect passwords or secrets. It exists to carry binary data safely through systems that only handle text.
  - q: What is URL-safe Base64?
    a: Standard Base64 uses + and /, which have special meanings in URLs. URL-safe Base64 replaces them with - and _ and usually drops the = padding. It is used in JSON Web Tokens and web links.
  - q: Why can't my Base64 be decoded as text?
    a: It probably contains a file, such as an image or PDF, rather than text. The tool tells you how many bytes it decoded. Pasting a full data URL into your browser's address bar can display images.
  - q: Does it support emoji and accented letters?
    a: Yes. Text is converted to UTF-8 before encoding and decoded from UTF-8, so every language and emoji survives the round trip.
---

## What this tool does

The Base64 encoder and decoder converts text to Base64 and Base64 back to text. Base64 represents data using only letters, digits, + and /, which makes it safe to include in emails, URLs, JSON, HTML and other text-based formats. It is widely used in web development, APIs, email attachments and authentication headers.

## How to use it

1. Choose **Encode to Base64** or **Decode Base64**.
2. Paste or type your text.
3. Turn on **URL-safe** if the result will be used in a link or token, or **split into lines** for email-style formatting.
4. Copy the result or download it.

## Examples

- `Hello` encodes to `SGVsbG8=`
- `toolwise` encodes to `dG9vbHdpc2U=`
- `SGVsbG8gd29ybGQ=` decodes to `Hello world`

## Where you'll see Base64

- **Data URLs:** small images embedded in HTML and CSS, created with [Image to Base64](/image-to-base64).
- **HTTP Basic authentication:** the Authorization header contains `username:password` in Base64.
- **JSON Web Tokens (JWT):** each part is URL-safe Base64.
- **Email:** attachments are Base64 encoded inside the message.
- **APIs:** files are often sent as Base64 strings inside JSON.

## Tips

- Base64 makes data about 33% larger, so it is not a way to save space.
- Whitespace and line breaks in Base64 input are ignored when decoding, and data URL prefixes such as `data:text/plain;base64,` are removed automatically.
- If decoding reports invalid characters, check that the text wasn't cut off or changed when copied.

## Related tools

Encode text for URLs with the [URL Encoder and Decoder](/url-encoder-decoder), or create checksums with the [Hash Generator](/hash-generator).

## Private

Encoding and decoding happen in your browser. Nothing is uploaded.
