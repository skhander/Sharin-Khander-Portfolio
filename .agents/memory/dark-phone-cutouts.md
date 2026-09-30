---
name: Dark phone cutouts
description: Preserve screen content when removing backgrounds from dark phone screenshots.
---

Automatic background removal on dark phone mockups can leave partially transparent horizontal streaks inside the screen, even after fully transparent holes are filled. A clean-looking full-size image may still show bright lines when displayed small on a white page.

**Why:** The phone frame and dark interior have similar tones to the surrounding background, so segmentation may damage interior pixels while still producing a plausible outer silhouette.

**How to apply:** Preserve the source image's RGB pixels, repair only the cutout's alpha channel inside the phone silhouette, and inspect the result composited onto the actual page background at the size it will be displayed.