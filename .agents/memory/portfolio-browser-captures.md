---
name: Portfolio browser captures
description: Environment and layout quirks when capturing a late portfolio section with a direct browser script.
---

Direct scripts using the installed Playwright test package cannot rely on its default bundled browser in this workspace. Launch the system Chromium executable instead; do not install a new browser just to take a screenshot.

**Why:** The bundled headless-shell executable was unavailable, while the system Chromium was usable. Also, lazy media higher on the page can shift late sections after an initial scroll, causing element or single-scroll captures to show the preceding section.

**How to apply:** For direct browser captures, locate system Chromium (`command -v chromium`) and pass that executable to Playwright. When capturing a late section, let media settle and scroll to the page bottom again before taking a viewport screenshot. A fragment in the preview URL may leave a client-rendered page at the top.