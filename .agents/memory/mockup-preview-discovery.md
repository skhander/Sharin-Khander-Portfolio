---
name: Mockup preview discovery
description: New mockup group directories may need a preview workflow restart before the component registry sees them.
---

Newly created mockup group directories can return HTTP 200 while the browser shows "No component found" for the preview route.

**Why:** The running preview service served the application shell, but its component discovery did not register a directory created after startup.

**How to apply:** Verify a new mockup preview by looking at the rendered page, not just the HTTP status. If the component is missing, restart the existing mockup preview workflow once; do not start a duplicate server.