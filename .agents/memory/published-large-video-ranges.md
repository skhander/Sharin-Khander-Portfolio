---
name: Published large-video ranges
description: A production-only failure mode for portfolio video delivery.
---

A large MP4 played through the local preview and answered production HEAD and bounded range requests, but the published static service returned HTTP 500 for the browser's open-ended `Range: bytes=0-` request. Smaller MP4s on the same site played successfully.

**Why:** Checking only that an asset exists or returns 200 on HEAD does not exercise the range request the browser actually makes. Local preview serving also differs from published static serving.

**How to apply:** For portfolio media bugs, test playback in the published app and inspect the actual video request. If a large asset fails only on the live open-ended range, preserve the original and serve a smaller browser-compatible copy without shrinking the source resolution; compare rendered frames for UI legibility.