---
seoTitle: "Unix Timestamp Converter: Epoch to Date and Back | toolwise"
metaDescription: "Convert Unix timestamps to human-readable dates in your time zone and UTC, and dates to timestamps. Seconds and milliseconds detected."
faqs:
  - q: "What is a Unix timestamp?"
    a: "It is the number of seconds since 00:00:00 UTC on 1 January 1970, a moment called the Unix epoch. Computers use it because a single number is easy to store, compare and sort, and it means the same moment everywhere in the world."
  - q: "How does the tool know if it is seconds or milliseconds?"
    a: "By the number of digits. Current timestamps in seconds have 10 digits, and in milliseconds 13. The hint under the box tells you how your number was read."
  - q: "Does a timestamp have a time zone?"
    a: "No. A timestamp is the same everywhere. The time zone only matters when you show it as a date, which is why the tool shows both your local time and UTC."
  - q: "What is the year 2038 problem?"
    a: "Older systems store timestamps as 32-bit numbers, which run out on 19 January 2038. Modern systems use 64-bit numbers, which last far longer. This tool handles dates well beyond 2038."
  - q: "Can I enter dates before 1970?"
    a: "Yes. Dates before 1970 have negative timestamps. Type a minus sign before the number, or pick an early date in Date to timestamp."
---

## When to use it

Use this tool to turn a Unix timestamp into a readable date, or a date into a timestamp. Developers see timestamps in logs, databases, APIs, cookies and JSON Web Tokens. Being able to read them quickly helps when debugging, checking when something happened, or setting an expiry time.

## How to use it

The top of the tool shows the **Current Unix time**, updating every second, with a **Copy** button.

**Timestamp to date**

1. Paste a number into **Unix timestamp**. Seconds or milliseconds are detected automatically.
2. Read the results: **Your time**, **UTC**, **ISO 8601**, **Relative** (such as 3 days ago), **Seconds** and **Milliseconds**.
3. Click the copy button next to any line.

**Date to timestamp**

1. Choose a **Date** and **Time**.
2. Under **Time zone**, choose **My local time** or **UTC**.
3. Read the **Seconds**, **Milliseconds** and **ISO 8601** values.

## Worked example

A log line shows 1767225600. Paste it in and the UTC line reads Thu, 01 Jan 2026 00:00:00 GMT, midnight on New Year's Day 2026. The **Your time** line shows the same moment in your own time zone, so in New York it would be the evening of 31 December 2025.

Now you need a timestamp for an offer that ends at 09:00 UTC on 1 March 2027. Choose that date and time, select **UTC**, and the seconds value is 1803891600. Add three zeros for milliseconds: 1803891600000.

## Where you will see timestamps

- **Logs and databases:** created and updated times are often stored as seconds or milliseconds.
- **APIs:** many return times as numbers in JSON.
- **JSON Web Tokens:** the exp and iat fields are timestamps in seconds.
- **JavaScript:** Date.now() returns milliseconds.

## Tips

- **Store times in UTC.** Convert to local time only when showing it to people.
- **Check the digit count.** A 13-digit value is milliseconds. Dividing by 1,000 gives seconds.
- **Compare two events quickly.** Subtract one timestamp from another to get the seconds between them, then divide by 86,400 for days.
- **Use ISO 8601 for readable data.** Text like 2026-01-01T00:00:00.000Z is clear to people and to most software.

## Common mistakes

- **Mixing up seconds and milliseconds.** A seconds value read as milliseconds lands in January 1970.
- **Forgetting the time zone when converting a date.** 09:00 local time and 09:00 UTC give different timestamps unless you live in UTC.
- **Using the relative time for records.** "3 days ago" changes every day. Store the exact value.
