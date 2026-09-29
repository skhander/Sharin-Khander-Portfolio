---
name: Screen recording fidelity
description: Quality constraint for portfolio videos that show detailed product interfaces.
---

For UI screen recordings, inspect the original media before producing a web preview. Prefer a browser-compatible remux when the source is already H.264 rather than shrinking and heavily recompressing it. Regenerate preview posters at enough resolution for high-density displays.

**Why:** A very small derivative of a high-resolution Virtual Try-On recording looked visibly blurry when displayed as a prominent portfolio video. Enlarging its CSS box could not recover the detail discarded during compression.

**How to apply:** Compare the original and served video's dimensions and bitrate before changing video presentation. Keep the original available. If only a low-quality source exists, request a higher-quality export rather than sharpening or upscaling the compressed file.

When cropping screen recordings, confirm coordinates against the original file dimensions rather than a resized image preview, and inspect a still crop before encoding the full video.

**Why:** A frame preview was displayed smaller than its source resolution, so directly using preview coordinates initially retained black padding in the crop.

**How to apply:** Check the original dimensions with a media inspector, scale any visually estimated crop bounds, and validate the result on a single frame first.