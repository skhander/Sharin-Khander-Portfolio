---
name: Embedded phone scrolling
description: Visibility and discoverability of scrolling in portfolio-embedded phone prototypes.
---

When a phone prototype is embedded inside the portfolio preview, do not assume a styled native scrollbar will be visibly persistent. Provide an explicit visible scroll affordance, and keep touch, wheel, and mouse-drag scrolling usable.

**Why:** A user reported that the Dream Catcher prototype looked unscrollable even though its inner pane responded to wheel and touch; the browser's native scrollbar styling did not make a visible cue in the preview.

**How to apply:** For future embedded phone prototypes, verify both actual scrolling and an always-visible indication of scrollability at desktop and mobile widths, including within the nested portfolio preview.