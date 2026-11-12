---
seoTitle: "Video to GIF Converter: Make a GIF from a Video | toolwise"
metaDescription: "Turn part of a video into an animated GIF in your browser. Pick the clip, width, frame rate and colors, preview it and download. No upload, no watermark."
faqs:
  - q: How long can the GIF be?
    a: Up to 30 seconds, but 2 to 6 seconds works best. GIFs store every frame as a picture, so longer clips quickly become very large files.
  - q: How do I make the GIF smaller?
    a: Lower the width (480 or 320 pixels), choose 10 frames per second, reduce the colors to 128 or 64, and keep the clip short. Each of these can halve the file size.
  - q: Why does my GIF look grainy?
    a: GIFs can only show 256 colors per frame. toolwise builds the best palette for your clip and uses dithering to blend colors, but smooth gradients and skies may still look a little grainy. That's a limit of the GIF format.
  - q: Is my video uploaded?
    a: No. The GIF is made on your device using a WebAssembly version of FFmpeg.
---

## What this tool does

Video to GIF turns a moment from a video into an animated GIF that you can share in chats, emails, documentation and social posts. Choose the part of the video with the start and end handles, set the width, smoothness (frames per second), number of colors and whether it loops, and press **Make GIF**. You'll see the finished GIF and its file size before you download it.

## How to make a GIF

1. Choose a video file, or drag it onto the page.
2. Select the clip: drag the handles, type times, or use the pin buttons to mark the current playback position. The first 5 seconds are selected to start with.
3. Choose the **width**, **smoothness**, **colors** and **repeat** setting. The estimate under the options updates as you go.
4. Press **Make GIF**.
5. Check the result. If it's too big, press **Change settings** and lower the width or frame rate.
6. Press **Download GIF**.

## Getting a great GIF

- **Keep it short:** a reaction or a single action of 2 to 4 seconds is ideal.
- **Crop the moment, not the context:** start just before the action and end just after.
- **480 pixels wide** suits chats and most websites; 320 is enough for small previews.
- **15 fps** looks smooth; 10 fps is fine for screen recordings and makes much smaller files.
- **Check size limits:** many apps reject GIFs over 8 to 15 MB.

## How it works

toolwise first analyzes the clip to create a custom 256-color palette, then converts each frame using that palette with careful dithering. This two-pass method gives clearly better colors than simple converters that use a fixed palette.

## Related tools

Shorten the video first with [Trim Video](/trim-video), make it smaller with [Compress Video](/compress-video), or edit still images with [Resize Image](/resize-image).
