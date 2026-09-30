---
name: Artifact shell-build environment
description: Direct Vite builds need managed artifact runtime values even when no server will run.
---

Direct shell builds of this portfolio need the artifact's configured runtime variables. Managed workflows inject them automatically, but a standalone build command does not.

**Why:** The Vite configuration validates the port and base path while loading, including during production builds. A plain filtered package build fails before compilation when those workflow-provided values are absent.

**How to apply:** When building outside a managed workflow, read the artifact manifest and supply its non-secret runtime values to the command. Do not weaken configuration validation just to accommodate an ad hoc build.