---
seoTitle: "URL Encoder and Decoder: Percent-Encode Text Online | toolwise"
metaDescription: "Encode text for safe use in URLs and query strings, or decode percent-encoded URLs back to readable text. Free, private and instant."
faqs:
  - q: When should I encode a value versus a whole URL?
    a: Encode a value (a query parameter or path segment) when it goes inside a URL, because characters like &, = and / must be escaped. Encode a whole URL only to fix spaces and non-ASCII characters while keeping its structure.
  - q: Why does a space become %20 or +?
    a: In URLs a space is %20. In HTML form submissions (application/x-www-form-urlencoded), a space is often written as +. Choose the option that matches where the text will be used.
  - q: Why does decoding fail?
    a: A % sign must be followed by two hexadecimal digits. Text like "50% off" that wasn't encoded properly cannot be decoded; toolwise tells you which line has the problem.
  - q: Are accented letters and emoji supported?
    a: Yes. They are encoded as UTF-8 bytes, so é becomes %C3%A9, which every modern browser and server understands.
---

## What this tool does

The URL encoder and decoder converts text into a format that is safe to put in a web address, and turns encoded addresses back into readable text. This process, called percent-encoding, replaces spaces, symbols and non-English characters with codes like `%20` and `%C3%A9`.

## How to use it

1. Choose **Encode** or **Decode**.
2. Paste your text. Each line is handled separately, so you can convert several values at once.
3. When encoding, choose **a value** (the usual choice) or **a whole URL**, and whether spaces should become `+`.
4. When decoding, choose whether `+` means a space.
5. Copy the result.

## Examples

- `café & crème` → `caf%C3%A9%20%26%20cr%C3%A8me`
- `50% off` → `50%25%20off`
- `https%3A%2F%2Fexample.com` → `https://example.com`

## Common uses

- **Building links** with search terms or user input in the query string.
- **Reading tracking links** from emails and ads, which are often encoded several times.
- **APIs:** encoding parameters before sending requests.
- **Debugging:** understanding what a browser actually sent to a server.

## Characters that must be encoded in values

Spaces, `&`, `=`, `?`, `#`, `/`, `+`, `%`, quotes and any non-ASCII characters. Letters, digits and `- _ . ~` never need encoding.

## Tips

- If decoded text still contains `%` codes, it was encoded twice; decode it again.
- To build campaign links with properly encoded parameters, use the [UTM Builder](/utm-builder).
- To encode binary data or longer text for other purposes, use the [Base64 Encoder and Decoder](/base64-encoder-decoder).

## Private

Everything runs in your browser. Your URLs are never sent anywhere.
