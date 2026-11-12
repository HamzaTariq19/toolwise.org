---
seoTitle: "Trim Video Online: Cut the Start and End of a Video | toolwise"
metaDescription: "Trim a video in your browser. Choose the start and end, keep original quality with fast cutting, or cut on the exact frame. No upload, no watermark."
faqs:
  - q: What's the difference between Fast and Exact frame?
    a: Fast copies the video without re-encoding, so it's quick and keeps the original quality, but the cut snaps to the nearest keyframe and may start up to a couple of seconds early. Exact frame re-encodes the clip so it starts and ends precisely where you chose, which takes longer.
  - q: Is there a watermark?
    a: No. toolwise never adds watermarks, and there is no sign-up.
  - q: Is my video uploaded?
    a: No. The video is read and trimmed on your device using a WebAssembly version of FFmpeg, so it never leaves your computer or phone.
  - q: Why is there no preview for my file?
    a: Browsers can't play some formats, such as MKV or AVI, but they can still be trimmed. Type the start and end times instead of using the preview.
  - q: Can I cut out a part in the middle?
    a: This tool keeps one section. To remove a middle part, trim the two pieces you want to keep separately.
---

## What this tool does

Trim Video cuts a video down to the part you want to keep. Watch the preview, drag the start and end handles or type exact times, and press **Trim video**. The **Fast** method copies the original video stream, so it's done in seconds with no quality loss. The **Exact frame** method re-encodes the clip so it begins and ends on precisely the frames you picked. You can also remove the sound.

## How to trim a video

1. Choose a video, or drag it onto the page. Files up to 2 GB.
2. Play the video and drag the handles under it, or type times like `0:12.5`. The pin buttons set the start or end to the current playback position.
3. Press **Play selection** to check your cut.
4. Choose **Fast, original quality** or **Exact frame**.
5. Tick **Remove the sound** if you want a silent clip.
6. Press **Trim video**, then **Download**.

## Why fast cuts snap to keyframes

Compressed video stores complete pictures (keyframes) only every second or two; frames in between only record changes. A cut without re-encoding has to start on a keyframe, so it may begin slightly before the time you chose. If you need frame-perfect timing, for example to remove a single word, use **Exact frame**.

## Tips

- **Phones:** short videos trim quickly; long 4K videos may take a while in Exact mode.
- **Social media:** many platforms limit clip length, such as 60 or 90 seconds for short videos. Check the **Selected** time under the slider.
- **Keep the original** until you're happy with the result.

## Related tools

Make a smaller file with [Compress Video](/compress-video), turn a moment into an animation with [Video to GIF](/video-to-gif), or save the soundtrack with [Extract Audio](/extract-audio).
