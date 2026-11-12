---
seoTitle: "CSS Gradient Generator: Linear, Radial and Conic | toolwise"
metaDescription: "Design linear, radial and conic CSS gradients with up to 8 colors, adjust angle and positions, and copy ready-to-use CSS. Free."
faqs:
  - q: Do CSS gradients work in all browsers?
    a: Linear and radial gradients work in every modern browser without prefixes. Conic gradients work in all current versions of Chrome, Edge, Firefox and Safari. The code includes a solid color fallback first, just in case.
  - q: How do I make a hard edge instead of a smooth blend?
    a: Put two colors at the same position, for example red at 50% and blue at 50%. The colors switch instantly instead of blending, which is useful for stripes.
  - q: How do I use the gradient as text color?
    a: Use it as a background, then add background-clip set to text and color set to transparent on the text element.
  - q: Are gradients better than images?
    a: For backgrounds, yes in most cases. Gradients load instantly, scale to any screen size and stay sharp, with no image file to download.
---

## What this tool does

The CSS gradient generator helps you design smooth color transitions for website backgrounds, buttons, cards and hero sections. Choose a linear, radial or conic gradient, pick up to eight colors, set the angle and the position of each color, and copy the CSS code.

## How to create a gradient

1. Choose **Linear**, **Radial** or **Conic**.
2. Set the **angle** for linear and conic gradients.
3. Adjust each **color** and its **position** with the slider. Use **Add color** for more.
4. Try a **preset** for inspiration.
5. Press **Copy CSS** and paste it into your stylesheet.

## The three gradient types

- **Linear:** colors blend along a straight line. 90° goes left to right, 180° goes top to bottom.
- **Radial:** colors spread outwards from the center in a circle, great for spotlights and glows.
- **Conic:** colors rotate around a center point, like a pie chart or color wheel.

## Design tips

- **Keep it subtle.** Two similar colors often look more professional than a rainbow.
- **Check text contrast** on top of gradients, especially at the lightest and darkest ends; use the [Color Picker](/color-picker) to test.
- **Use your brand colors** and their lighter or darker shades for a cohesive look.
- **Avoid muddy middles:** blending complementary colors, such as red and green, can create a gray band. Add a third color in between.

## Example code

```css
background: linear-gradient(135deg, #0ea5e9 0%, #1d4ed8 100%);
```

## Related tools

Pick and convert colors with the [Color Picker](/color-picker), or shrink your stylesheet with the [CSS Minifier](/css-minifier).
