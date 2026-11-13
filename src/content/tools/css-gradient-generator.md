---
seoTitle: "CSS Gradient Generator: Linear, Radial and Conic | toolwise"
metaDescription: "Design linear, radial and conic CSS gradients with up to 8 colors, adjust angle and positions, and copy ready-to-use CSS. Free."
faqs:
  - q: "Why is there a plain background color before the gradient?"
    a: "The first line, such as background: #0ea5e9;, is a fallback for very old browsers that do not support gradients. Modern browsers use the second line. Keeping both is a good habit."
  - q: "What is the difference between linear, radial and conic?"
    a: "A linear gradient blends colors along a straight line at the angle you choose. A radial gradient spreads out from the center in a circle. A conic gradient sweeps colors around a center point, like the hands of a clock, which is useful for pie charts and color wheels."
  - q: "How many colors can I use?"
    a: "Between two and eight. Use Add color for more, and the remove button to delete one. Each color has a position slider from 0% to 100%."
  - q: "Can I use the gradient for text?"
    a: "Yes, with a little extra CSS. Apply the gradient as the background, then add background-clip: text and color: transparent to the text element."
  - q: "Do gradients slow down a website?"
    a: "No. CSS gradients are drawn by the browser and need no image download, so they are usually faster than using a background image."
---

## When to use it

Use this tool to design a CSS gradient visually and copy ready-to-use code. Gradients are popular for hero sections, buttons, cards, banners and backgrounds. Seeing the result live is much faster than adjusting numbers in a code editor and refreshing the page.

## How to use it

1. Start from a preset, such as **Ocean**, **Sunset**, **Mint**, **Peach**, **Night** or **Rainbow**, or build your own.
2. Choose the **Type**: **Linear**, **Radial** or **Conic**.
3. Set the **Angle** for linear and conic gradients.
4. Under **Colors**, pick each color and drag its position slider. Use **Add color** for more stops.
5. Watch the large preview, then click **Copy CSS**.

## Worked example

The default **Ocean** preset blends sky blue into deep blue at 135 degrees. The CSS is:

```
background: #0ea5e9;
background: linear-gradient(135deg, #0ea5e9 0%, #1d4ed8 100%);
```

Paste it into a CSS rule, such as .hero, to give a page header a diagonal blue background. To make the blue appear sooner, drag the second color's position from 100% to 70%. The code updates to #1d4ed8 70%.

For a soft spotlight effect, switch to **Radial**, choose a light color in the middle and a darker one at the edge.

## Color stops explained

Each color has a position from 0% to 100% along the gradient. Two colors at 0% and 100% blend evenly across the whole area. Moving them closer together makes the change sharper. If two stops share the same position, you get a hard line instead of a blend, which is a neat way to make stripes or split backgrounds.

## Using it in a page

Add the copied lines to any CSS rule, such as a header, a button or the body. The gradient fills the element's background and adapts to any size, so it looks right on phones and large screens alike. Pair it with a matching solid color for borders or hover states.

## Tips

- **Keep it subtle.** Two similar colors usually look more professional than strong contrasts.
- **Check text contrast.** Make sure text stays readable over the lightest and darkest parts.
- **Use angles for direction.** 90deg runs left to right, 180deg top to bottom.
- **Reuse the code.** Store it as a CSS variable to use the same gradient across your site.

## Common mistakes

- **Using too many colors.** More than three or four stops can look muddy.
- **Forgetting the fallback.** It costs nothing and protects older browsers.
- **Putting gradients on large text blocks.** Busy backgrounds make long text hard to read.
