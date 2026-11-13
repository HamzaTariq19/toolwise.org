---
seoTitle: "URL Encoder and Decoder: Percent-Encode Text Online | toolwise"
metaDescription: "Encode text for safe use in URLs and query strings, or decode percent-encoded URLs back to readable text. Free, private and instant."
faqs:
  - q: "What is the difference between encoding a value and a whole URL?"
    a: "A value is one part of a URL, such as a search term, so characters like &, = and / are encoded too. A whole URL keeps those characters, because they give the address its structure. Encoding a whole link as a value would break it."
  - q: "Should spaces be %20 or +?"
    a: "Both are used. %20 works everywhere. The + sign means a space only in query strings sent by HTML forms. Tick Write spaces as + if the system you are building for expects it."
  - q: "Why does decoding fail with an error?"
    a: "Every % must be followed by two hexadecimal digits, such as %20. A lone % or a code cut off halfway, often from a link copied in parts, cannot be decoded. The tool tells you which line has the problem."
  - q: "Why are accented letters turned into two codes?"
    a: "URLs use UTF-8, where letters like é take two bytes. Each byte becomes its own %-code, so é becomes %C3%A9."
  - q: "Can I encode several values at once?"
    a: "Yes. Each line is encoded or decoded separately, so you can paste a list and get a matching list back."
---

## When to use it

Use this tool to make text safe to put inside a web address, or to turn a confusing link full of %-codes back into readable text. It helps when building links with search terms or tracking parameters, debugging API requests, reading redirect links, or fixing broken links in emails and spreadsheets.

## How to use it

1. Choose **Encode** or **Decode**.
2. Type or paste into **Your text**, or click **Example**. The result updates as you type.
3. When encoding, choose **What to encode**:
   - **A value (query parameter, path part)** encodes everything that is not a plain letter or number, including & = / ?.
   - **A whole URL (keep : / ? & =)** keeps the characters that give a link its structure.
4. Tick **Write spaces as +** if needed. When decoding, **Treat + as a space** is on by default.
5. Click **Copy result** or **Download .txt**.

## Worked example

You want to link to a search for café & crème. If you put that straight into a URL, the & would start a new parameter and the search would break. Encode it as a value and you get caf%C3%A9%20%26%20cr%C3%A8me. The link becomes example.com/search?q=caf%C3%A9%20%26%20cr%C3%A8me, which works everywhere.

Now someone sends you a link containing tag=50%25%20off. Choose **Decode** and paste it. The result reads tag=50% off, so you can see what the link does before clicking.

## Which characters are safe?

Letters, digits and the four symbols - _ . ~ never need encoding. Most other characters do, including spaces, quotes, # and %. Letters outside basic English, such as é or ñ, are always encoded, because web addresses were designed for a small set of characters.

## Tips

- **Encode values, then join them.** Build each parameter with value encoding, then put the URL together.
- **Decode to check suspicious links.** Long encoded redirect links can hide where they really lead.
- **Keep a readable copy.** Save the plain version of long tracking links so you can edit them later.
- **Encode once only.** If you see %2520 in a URL, it was encoded twice: %25 is the code for %.

## Common mistakes

- **Encoding the whole link as a value.** The result turns https:// into https%3A%2F%2F, which browsers will not open as a link.
- **Leaving & in search terms.** It splits the value, so everything after it is lost.
- **Mixing up + and %20 when decoding.** A real plus sign in data must be written as %2B, or it will be read as a space.
