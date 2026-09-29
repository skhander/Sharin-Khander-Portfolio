---
name: Product-only backdrop crops
description: A visual constraint when deriving repeating product backgrounds from listing screenshots.
---

Check each product row independently when extracting a tiled background from a catalog screenshot; do not assume all rows can share one tight crop.

**Why:** Crops that excluded product labels in one row clipped the jewelry in another; wider crops let catalog badges and text leak into the pattern.

**How to apply:** Before using a screenshot-derived product tile, inspect the generated tile visually at full size and check both the tops and bottoms of every item as well as all caption boundaries.