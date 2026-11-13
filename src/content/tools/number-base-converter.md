---
seoTitle: "Binary, Decimal, Hex and Octal Converter | toolwise"
metaDescription: "Convert numbers between binary, decimal, hexadecimal, octal and any base from 2 to 36. Handles very large numbers. Free and instant."
faqs:
  - q: "What is a number base?"
    a: "The number of different digits a system uses. Everyday decimal uses ten (0 to 9). Binary uses two (0 and 1), octal uses eight (0 to 7) and hexadecimal uses sixteen (0 to 9, then A to F for 10 to 15)."
  - q: "Can I paste values like 0xFF or 0b1010?"
    a: "Yes. The prefixes 0x, 0b and 0o are removed automatically, and spaces and underscores are ignored, so grouped values like 1111 0000 work too."
  - q: "Does it work with very large numbers?"
    a: "Yes. It uses whole-number arithmetic with no size limit, so long binary strings and large hexadecimal values convert exactly, without rounding."
  - q: "Can it convert negative numbers?"
    a: "Yes. Type a minus sign in front, and the other boxes show the negative value in each base. It does not show two's complement, the way computers store negative numbers in a fixed number of bits."
  - q: "What is base 36 used for?"
    a: "Base 36 uses all digits and letters, 0 to 9 and A to Z. It is used for short IDs, such as in some URL shorteners and product codes, because it packs large numbers into few characters."
---

## When to use it

Use this tool to convert numbers between decimal, binary, hexadecimal, octal and any base from 2 to 36. It is useful for programming, computer science homework, networking, electronics, reading color codes, and understanding how computers store data.

## How to use it

1. Type a number in any box: **Decimal**, **Binary**, **Hexadecimal** or **Octal**. The others update instantly.
2. To use another base, set **Other base** to a number from 2 to 36 and type in the box next to it.
3. Read **Binary, grouped in bytes**, which shows the binary value in groups of 8 bits and how many bytes it needs.
4. Click **Copy** next to any value.

## Worked example

The default value is 255. In binary that is 11111111, in hexadecimal FF and in octal 377. The byte view says it uses 8 bits and fits in 1 byte, which is why 255 is the largest value of a single byte.

For a web color, the hex code #1D4ED8 has a red part of 1D. Type 1D in **Hexadecimal** and the decimal box shows 29. That is the same red value you would see written as rgb(29, 78, 216).

In base 36, 255 is written 73, since 7 × 36 + 3 = 255.

## How to convert by hand

To turn decimal into binary, keep dividing by 2 and write down the remainders, then read them from bottom to top. For 13: 13 ÷ 2 = 6 r1, 6 ÷ 2 = 3 r0, 3 ÷ 2 = 1 r1, 1 ÷ 2 = 0 r1. Reading upwards gives 1101.

## Where you will meet each base

- **Binary:** how computers store everything, from numbers to images.
- **Hexadecimal:** colors in CSS, memory addresses, MAC addresses and error codes.
- **Octal:** Linux and Unix file permissions, such as 644 and 755.

## Tips

- **Group binary in fours.** Each group of four bits is one hexadecimal digit, so 1111 1111 is F F.
- **Use hexadecimal for long binary values.** It is shorter and easier to read.
- **Check permissions on Linux.** File permissions like 755 are octal numbers: 7 is 111 in binary, meaning read, write and execute.

## Common mistakes

- **Mixing up O and 0.** Hexadecimal only uses the digits 0 to 9 and the letters A to F.
- **Expecting 10 to mean ten.** In binary, 10 is two. In hexadecimal, 10 is sixteen.
- **Dropping leading zeros in fixed-width values.** 00001111 and 1111 are the same number, but some systems expect all 8 bits.
