---
seoTitle: "UTM Builder: Create Campaign URLs for Google Analytics | toolwise"
metaDescription: "Build campaign links with UTM parameters (source, medium, campaign, term, content) for Google Analytics. Validates URLs and cleans values. Free."
faqs:
  - q: What are UTM parameters?
    a: UTM parameters are tags added to the end of a link, such as utm_source=newsletter. When someone clicks, analytics tools like Google Analytics record where the visit came from, so you can measure which campaigns work.
  - q: Which parameters are required?
    a: Source, medium and campaign should always be filled in. Term and content are optional; use content to tell apart two links in the same email or ad.
  - q: Why lowercase the values?
    a: UTM values are case-sensitive, so "Facebook" and "facebook" appear as two different sources in reports. Lowercasing keeps your data tidy.
  - q: Should I use UTM links on my own website?
    a: No. Use them only on links from outside your site, such as emails, ads and social posts. Internal UTM links can overwrite the real source of a visit.
---

## What this tool does

The UTM builder creates trackable campaign links. Enter your page URL and campaign details, and it adds the correct `utm_` parameters, encodes special characters, and optionally cleans values to lowercase with hyphens. Paste an existing UTM link and the fields fill in, so you can edit it.

## How to build a campaign URL

1. Enter the **website URL** people should land on.
2. Fill in **source**, **medium** and **campaign**.
3. Optionally add **term** and **content**.
4. Copy the URL, or make a QR code for print campaigns.

## What each parameter means

- **utm_source:** where the traffic comes from, such as google, facebook or newsletter.
- **utm_medium:** the type of channel, such as cpc, email, social or print.
- **utm_campaign:** the campaign name, such as spring-sale-2026.
- **utm_term:** paid search keywords.
- **utm_content:** which link or ad was clicked, such as header-button.

## Naming conventions

Agree on a simple system and stick to it: lowercase, hyphens instead of spaces, and a fixed list of sources and mediums. Consistent naming makes reports easy to read; inconsistent naming splits the same campaign across several rows.

## Common combinations

- Email newsletter: source=newsletter, medium=email
- Facebook ad: source=facebook, medium=paid_social
- Instagram bio link: source=instagram, medium=social
- Printed flyer QR code: source=flyer, medium=print

## Related tools

Turn the link into a QR code with the [QR Code Generator](/qr-code-generator), or encode other URL values with the [URL Encoder and Decoder](/url-encoder-decoder).
