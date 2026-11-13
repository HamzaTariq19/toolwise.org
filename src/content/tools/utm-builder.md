---
seoTitle: "UTM Builder: Create Campaign URLs for Google Analytics | toolwise"
metaDescription: "Build campaign links with UTM parameters (source, medium, campaign, term, content) for Google Analytics. Validates URLs and cleans values. Free."
faqs:
  - q: "What are UTM parameters?"
    a: "Short tags added to the end of a link, such as utm_source=newsletter, that tell analytics tools like Google Analytics where a visitor came from. They do not change the page the link opens."
  - q: "Which fields are required?"
    a: "Source, medium and campaign name. Google Analytics groups traffic using these three. Term and content are optional."
  - q: "Why should I use lowercase?"
    a: "UTM values are case-sensitive, so Email and email would show up as two different mediums in your reports. The Lowercase and replace spaces with hyphens option keeps your data tidy."
  - q: "Should I use UTM tags on links within my own website?"
    a: "No. Tagging internal links starts a new session in analytics and hides where visitors originally came from. Use UTM tags only on links from outside your site, such as emails, ads and social posts."
  - q: "What if my link already has UTM tags?"
    a: "Paste it into Website URL and the tool fills in the fields from the existing tags, so you can edit them and get a clean new link."
---

## When to use it

Use this tool to build tracked links for marketing campaigns. Adding UTM tags to the links in your emails, social posts, ads, QR codes and printed material lets you see in Google Analytics exactly which ones bring visitors and sales.

## How to use it

1. Enter the **Website URL** of the page you are linking to.
2. Fill in **Campaign source**, such as newsletter, facebook or google. Tap a suggestion to use it.
3. Fill in **Campaign medium**, such as email, social or cpc.
4. Enter a **Campaign name**, such as Spring Sale 2026.
5. Optionally, add a **Term** for paid keywords, and **Content** to tell apart links in the same message, such as header-button.
6. Leave **Lowercase and replace spaces with hyphens** ticked for consistent reports.
7. Copy **Your campaign URL** with **Copy URL**, or click **Make a QR code** for printed material.

## Worked example

You are sending a newsletter about a spring sale. With the website URL https://example.com/spring-sale, source newsletter, medium email and campaign name Spring Sale 2026, the tool builds:

`https://example.com/spring-sale?utm_source=newsletter&utm_medium=email&utm_campaign=spring-sale-2026`

The campaign name was turned into lowercase with hyphens. If the email has two links, one in the header and one at the bottom, add content values header-button and footer-link to see which one gets more clicks.

## A simple naming plan

Decide on a few names and stick to them:

- **Source:** where the link appears, such as newsletter, facebook or flyer.
- **Medium:** the type of channel, such as email, social, cpc or print.
- **Campaign:** the promotion, such as spring-sale-2026.

Write them down so everyone on your team uses the same words.

## Tips

- **Use a QR code for print.** Long tagged links are hard to type, so **Make a QR code** turns the link into something people can scan from a poster or flyer.
- **Keep a list of your links.** A simple spreadsheet of every tagged link makes it easy to reuse names and compare results later.
- **Test the link.** Click it once to check it opens the right page.

## Where to see the results

In Google Analytics, open the traffic acquisition report and choose session source / medium or session campaign. Visits from your tagged links appear under the names you chose.

## Common mistakes

- **Mixing spellings.** Facebook, facebook and fb become three sources in reports.
- **Tagging internal links.** It breaks your session data.
- **Putting the campaign in the source.** Keep each field for its own purpose, or reports become hard to filter.
