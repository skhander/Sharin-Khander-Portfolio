---
name: Lazy media screenshots
description: Prevent misleading visual checks below lazily loaded walkthrough media.
---

When capturing a section below a lazy media poster, let the poster load and settle before taking the section screenshot.

**Why:** Scrolling to the lower section triggered the preceding poster to load, shifting the layout during the capture. The first screenshots showed the previous media instead of the intended section even though the page text was correct.

**How to apply:** Scroll the nearby poster into view, wait for its image to decode, then scroll to and capture the target section. Verify its position after the load rather than treating an early screenshot as a content regression.