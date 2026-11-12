---
seoTitle: "Hash Generator: MD5, SHA-1, SHA-256, SHA-512 for Text and Files | toolwise"
metaDescription: "Calculate MD5, SHA-1, SHA-256, SHA-384 and SHA-512 hashes of text or files, and compare with a checksum. Free, files never uploaded."
faqs:
  - q: What is a hash?
    a: A hash is a short, fixed-length fingerprint of data. The same input always gives the same hash, but changing even one character gives a completely different one. Hashes are used to check that files haven't been changed or corrupted.
  - q: How do I verify a download?
    a: Choose File, select the downloaded file, then paste the checksum from the download page into "Compare with an expected hash". A green tick confirms the file matches.
  - q: Can I reverse a hash to get the original text?
    a: No. Hash functions are one-way. However, short or common inputs can be guessed by trying many possibilities, which is why passwords need special slow hashing.
  - q: Why is MD5 not secure?
    a: Researchers can create two different inputs with the same MD5 or SHA-1 hash. They are still fine for detecting accidental corruption, but use SHA-256 or stronger for security.
---

## What this tool does

The hash generator calculates cryptographic hashes of text or files using MD5, SHA-1, SHA-256, SHA-384 and SHA-512, all at once. You can copy any hash or paste an expected checksum to verify that a file or text matches exactly.

## How to generate a hash

1. Choose **Text** or **File**.
2. Type or paste your text, or choose a file (up to 1 GB).
3. Read the five hashes and copy the one you need.
4. Optionally paste an expected checksum to check for a match.

## Examples

The text `hello world` produces:

- MD5: `5eb63bbbe01eeed093cb22bb8f5acdc3`
- SHA-256: `b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9`

## Common uses

- **Verifying downloads:** software sites publish checksums so you can confirm the file wasn't corrupted or tampered with.
- **Detecting duplicates:** identical files have identical hashes.
- **Developers:** create cache keys, content fingerprints and test values.
- **Integrity checks:** confirm a file hasn't changed since it was archived.

## Choosing an algorithm

- **SHA-256:** the best default; secure and widely supported.
- **SHA-384 and SHA-512:** longer hashes for higher security margins.
- **MD5 and SHA-1:** only for compatibility and non-security checksums.

## Good to know

Text is hashed exactly as entered, using UTF-8. A trailing space or line break changes the hash, so copy text carefully. File hashing reads the whole file into memory, so very large files depend on your device.

## Related tools

Create random IDs with the [UUID Generator](/uuid-generator), or encode data with the [Base64 Encoder and Decoder](/base64-encoder-decoder).

## Private

Hashing happens on your device using the Web Crypto API. Your text and files are never uploaded.
