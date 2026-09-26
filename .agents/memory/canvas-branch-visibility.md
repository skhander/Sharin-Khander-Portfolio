---
name: Concurrent canvas branch visibility
description: A successful preview and a live-frame report may not match the later canvas state after multiple suggestion branches.
---

When user-triggered canvas suggestion branches finish close together, verify both the rendered preview and the board state. A subagent report that a frame went live is not sufficient evidence that it remains on the board.

**Why:** A variant preview rendered correctly, but its reserved frame was absent from a subsequent board-state read after another branch finished. The cause was not established, so do not assume why it disappeared.

**How to apply:** Check the board after branches finish. Respect reserved-frame ownership; do not create replacement frames or rearrange the board merely because a preview file exists.