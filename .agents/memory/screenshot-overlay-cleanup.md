---
name: Screenshot overlay cleanup
description: Preserving UI screenshot detail when removing overlaid social controls.
---

When social controls overlap a screenshot's panel edge, reconstruct the covered area from clean neighboring rows rather than painting a flat background.

**Why:** Flat fills leave obvious rectangular blocks and erase the panel shadow; cloning one row creates visible banding. Interpolating between unaffected rows keeps the original interface and background transition intact.

**How to apply:** Limit the edit to the overlays, inspect the edge at native resolution and in the full image, and keep the unedited source available.