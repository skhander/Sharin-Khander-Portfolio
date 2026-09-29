---
name: Publish layer warnings
description: How to interpret a broken temporary symlink warning during project packaging.
---

An incomplete publish log that stops after a successful build while pushing the project layer does not establish a source-code failure. A warning about a broken temporary audio symlink also appeared in a successful publish, so do not treat it alone as the cause.

**Why:** A failed packaging attempt and the preceding successful publish showed the same warning; only the successful one continued to create the project layer and start the service.

**How to apply:** When publishing fails after compilation, compare the failed log with a successful build and reproduce the production build locally with the artifact-provided environment before changing code. If packaging still fails without a specific error, retry publishing rather than making speculative edits.