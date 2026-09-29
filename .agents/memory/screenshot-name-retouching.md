---
name: Screenshot name retouching
description: Localized edits for personalized text inside captured interface images.
---

Replace names in UI screenshots as a localized image repair, not by laying new text on an opaque rectangle. Retain the source image outside the actual lettering; restore the background under the old name from clean nearby pixels, then composite the new letters with soft edges. Include punctuation in the replacement mask.

**Why:** Flat fills are especially obvious on gradient or patterned screens. Interpolating too far into nearby labels can create vertical streaks or erase punctuation even after the rectangular seam is gone.

**How to apply:** Compare a personalized composite against its unedited source at native resolution, isolate each affected word, and inspect both enlarged crops and the image at its actual on-page size. Keep the original source available.