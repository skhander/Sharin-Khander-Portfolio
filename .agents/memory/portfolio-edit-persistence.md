---
name: Portfolio edit persistence
description: A recurring workspace behavior to check when continuing edits to the portfolio homepage.
---

After a prior homepage change appears complete, verify the current rendered card and source before extending that change. On separate occasions, the page component reverted to earlier copy or imagery while related assets and styling remained. A later saved revision can contain the older page even when the intended page exists in an earlier revision. The cause was not established.

**Why:** Assuming the previous card edit was still present led to a layout-only update that accidentally showed the old screenshot and caption again.

**How to apply:** When continuing a portfolio card change in a later turn, compare the current card content against the user's latest requirements before editing or reporting completion. Do not assume a media asset's presence means the page uses it. If the page appears reverted, compare revisions and the running page before deciding which file version to restore; do not assume the most recent revision is the intended one.

Broad homepage card refactors can also replace specialized previews with generic images while the associated media and styling remain in the project.

**Why:** A refactor silently replaced the product-attribute preview, playable image-search prototype, and portrait shopping-agent demo with generic media, and subsequent unrelated visual work did not detect the regression.

**How to apply:** After changing the homepage project map or media branches, compare every card's visible description, badges, link, placeholder state, and media behavior against the last approved version. Check the hero copy too; do not verify only the card being edited.