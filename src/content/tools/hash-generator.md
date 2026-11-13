---
seoTitle: "Hash Generator: MD5, SHA-1, SHA-256, SHA-512 for Text and Files | toolwise"
metaDescription: "Calculate MD5, SHA-1, SHA-256, SHA-384 and SHA-512 hashes of text or files, and compare with a checksum. Free, files never uploaded."
faqs:
  - q: "What is a hash?"
    a: "A hash is a short fingerprint made from any text or file. The same input always gives the same hash, but changing even one character gives a completely different one. You cannot turn a hash back into the original text."
  - q: "Which algorithm should I use?"
    a: "Use SHA-256 unless something asks for a different one. MD5 and SHA-1 are still fine for checking that a download is not damaged, but they are no longer secure for passwords or digital signatures."
  - q: "Are my files uploaded?"
    a: "No. Text and files are hashed inside your browser and never leave your device. Files can be up to 1 GB."
  - q: "Why does my hash not match the website's?"
    a: "Check that you used the same algorithm and the exact same input. For text, an extra space or line break at the end changes the hash. For downloads, a mismatch can mean the file is incomplete or has been changed, so download it again from the official site."
  - q: "Should I use this to store passwords?"
    a: "No. Plain hashes like these are too fast to compute, so leaked password hashes can be guessed quickly. Websites should use slow password hashing methods such as bcrypt, scrypt or Argon2."
---

## When to use it

Use this tool to create MD5, SHA-1, SHA-256, SHA-384 and SHA-512 hashes of text or files. The most common use is checking that a download is complete and has not been changed, by comparing its hash with the checksum on the download page. Developers also use hashes to test code, compare data and spot duplicate files.

## How to use it

**For text**

1. Choose **Text**.
2. Type or paste into **Text to hash**. The hashes update as you type.

**For a file**

1. Choose **File**.
2. Click **Choose a file** and select a file of up to 1 GB.

**Then**

1. Read the five hashes and use **Copy** next to the one you need.
2. Tick **Uppercase letters** if you need capitals.
3. To check a download, paste the expected value into **Compare with an expected hash**. The tool tells you if it matches and which algorithm it is.

## Worked example

Type hello world, with no line break. The SHA-256 hash is b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9. Now change it to Hello world with a capital H. The hash becomes completely different, starting 64ec88ca. This is why hashes are good at spotting even tiny changes.

To check a download, open the file here and paste the SHA-256 checksum from the download page into the compare box. If you see "Match: this is the SHA-256 hash", the file is exactly the one the publisher released. If there is no match, download the file again.

## Tips

- **Copy checksums carefully.** Paste the whole value. The compare box ignores capitals, and a label such as "sha256:" at the start.
- **Watch for hidden line breaks.** Text copied from a document may end with a line break that changes the hash.
- **Get checksums from the official site.** A checksum from the same place as a tampered file proves little.

## Large files

Hashing a big file, such as a 900 MB installer, can take a little while, especially on phones. Keep the page open until the hashes appear. The file stays on your device the whole time.

## Common mistakes

- **Comparing different algorithms.** An MD5 hash will never match a SHA-256 checksum. The length is a clue: MD5 has 32 characters and SHA-256 has 64.
- **Thinking a hash is encryption.** Hashing cannot be reversed. To protect data you want to read again, use encryption instead.
- **Using MD5 for security.** It is fine for spotting accidental damage, not for protecting against attackers.
