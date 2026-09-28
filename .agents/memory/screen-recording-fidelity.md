---
name: Screen recording fidelity
description: Quality constraint for portfolio videos that show detailed product interfaces.
---

For UI screen recordings, inspect the original media before producing a web preview. Prefer a browser-compatible remux when the source is already H.264 rather than shrinking and heavily recompressing it. Regenerate preview posters at enough resolution for high-density displays.

**Why:** A very small derivative of a high-resolution Virtual Try-On recording looked visibly blurry when displayed as a prominent portfolio video. Enlarging its CSS box could not recover the detail discarded during compression.

**How to apply:** Compare the original and served video's dimensions and bitrate before changing video presentation. Keep the original available. If only a low-quality source exists, request a higher-quality export rather than sharpening or upscaling the compressed file.