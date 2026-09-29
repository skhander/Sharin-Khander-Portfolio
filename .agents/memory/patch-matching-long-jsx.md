---
name: Long JSX patch matching
description: How to proceed when a large JSX patch fails to match without an explanation.
---

When moving a long JSX block, switch to small, anchored edits if a broad exact-match patch fails.

**Why:** Multiple patches against the same visible JSX failed without useful diagnostics; shorter edits anchored to structural boundaries succeeded.

**How to apply:** Inspect the current source after a failed patch, then edit one structural boundary or a few lines per hunk instead of repeatedly resubmitting the whole block.