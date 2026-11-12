---
seoTitle: "Unix Timestamp Converter: Epoch to Date and Back | toolwise"
metaDescription: "Convert Unix timestamps to human-readable dates in your time zone and UTC, and dates to timestamps. Seconds and milliseconds detected."
faqs:
  - q: What is a Unix timestamp?
    a: A Unix timestamp is the number of seconds since 00:00:00 UTC on 1 January 1970, known as the Unix epoch. It is a simple, time-zone-free way for computers to store moments in time.
  - q: Seconds or milliseconds?
    a: Unix timestamps are traditionally in seconds (10 digits for current dates), but JavaScript and many APIs use milliseconds (13 digits). toolwise detects which one you entered from the number of digits.
  - q: Why does the converted time differ from what I expected?
    a: Timestamps are always in UTC. The "Your time" row converts to your device's time zone, while the UTC row shows the universal time. Check which one your system expects.
  - q: What is the year 2038 problem?
    a: Some older systems store timestamps as 32-bit numbers, which run out on 19 January 2038. Modern systems use 64-bit values that last for billions of years.
---

## What this tool does

The Unix timestamp converter turns epoch timestamps into readable dates and times, and converts dates back into timestamps. It shows the result in your local time, in UTC and in ISO 8601 format, with a relative description such as "3 days ago". The current Unix time is shown live at the top.

## How to use it

**Timestamp to date:**

1. Paste a timestamp, in seconds or milliseconds.
2. Read your local time, UTC, ISO 8601, relative time and both timestamp formats.

**Date to timestamp:**

1. Pick a date and time.
2. Choose whether that time is in **your local time** or **UTC**.
3. Copy the timestamp in seconds or milliseconds.

## Examples

- `0` = 1 January 1970, 00:00:00 UTC
- `1700000000` = 14 November 2023, 22:13:20 UTC
- `2000000000` = 18 May 2033, 03:33:20 UTC

## Common uses

- **Debugging:** read timestamps in log files, databases and API responses.
- **Development:** create timestamps for tests, cookies, tokens and scheduled jobs.
- **Data analysis:** convert timestamp columns into readable dates.
- **JWT tokens:** check the `exp` and `iat` claims, which are Unix timestamps in seconds.

## Tips

- If a date comes out in 1970, you probably entered milliseconds where seconds were expected, or vice versa.
- ISO 8601 (like `2024-05-31T14:00:00.000Z`) is the safest format for exchanging dates between systems.

## Related tools

Count days between dates with the [Date Difference Calculator](/date-difference-calculator), or compare times across cities with the [Time Zone Converter](/time-zone-converter).
