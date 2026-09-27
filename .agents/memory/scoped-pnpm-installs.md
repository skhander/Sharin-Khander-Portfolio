---
name: Scoped pnpm installs
description: Limitation of package-install callback in this pnpm workspace.
---

The package-install callback invokes `pnpm add` at the workspace root and rejects pnpm flags as package tokens. It cannot place a dependency in a specific artifact.

**Why:** An artifact-scoped development dependency failed with the root-add safeguard, and supplying `-w` through the callback was rejected. The callback also added an unrelated Nix stanza to `.replit`.

**How to apply:** Try the package-management skill first. If it cannot scope the install, use `pnpm --filter @workspace/<artifact> add -D <package>` for artifact dependencies; inspect incidental `.replit` changes afterward.