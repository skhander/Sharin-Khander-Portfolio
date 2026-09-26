---
name: Temporary PDF tooling
description: Avoid carrying PDF-inspection package setup into the web project.
---

When installing Python tooling solely to inspect an attached PDF, check the workspace for incidental Python manifests and Replit configuration changes before delivery. Remove only the temporary setup, not the user's existing project files.

**Why:** A PDF-inspection package installation in this web-only workspace also created Python project files and modified Replit's Nix configuration, although the portfolio itself did not need Python at runtime.

**How to apply:** After temporary document processing, inspect the diff and restore incidental configuration through its validated replacement flow rather than editing `.replit` directly.