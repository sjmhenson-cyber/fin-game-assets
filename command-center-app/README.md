# Command Center — the game

A walkable, Pokémon-style overworld built on top of the Command Center finance
tracker. Real debts are monsters; real payments are the only thing that can
hurt them.

## Run it

Double-click **`START-GAME.bat`**, then open <http://localhost:8080>.

(Or: `powershell -ExecutionPolicy Bypass -File server.ps1`)

Needs nothing installed — the server is plain PowerShell using .NET's
`HttpListener`.

## What's here

| Path | What it is |
|---|---|
| `index.html` | The whole game: map engine, battles, shops, painter |
| `server.ps1` | Local web server + save API. Also serves `../assets` at `/assets` |
| `START-GAME.bat` | Double-click launcher |
| `art/` | Sprites baked out of the main asset library with stable names |
| `tiles/` | Ground tiles pre-cut from the tilesets, plus `manifest.json` |
| `screenshots/` | Captures of the game |
| `save-data.json` | **Your save. Git-ignored — it holds real balances.** |

## The save file

`save-data.json` is the save. It's plain text, so you can edit a debt balance
by hand — and the game will notice. On the next Sync (or when the window
regains focus) the **Ledger Book** opens and asks you to approve the change
in-character, the same way it used to work against the Google Sheet.

## Assets

Art lives in `../assets` and is served live at `/assets/...`. Because that
library gets reorganised, the sprites the game actually needs are also **baked**
into `art/` and `tiles/` under stable names, so a rename can't break the game.
Re-run the bake steps to refresh them.

Every sprite path is declared in one `ASSETS` block near the top of the script —
that's the only place to edit when art moves.

## Map painter

Press **🖌 Paint** in the game. Tabs expose every tileset you own (Tiny Swords
in 5 colourways, Cainos, CraftPix roads) sliced on its native grid. Toggle
layers off to paint underneath trees and buildings. Strokes save automatically;
**↩ Undo** walks back stroke by stroke.

## Screenshots

`server.ps1` must be running, then:

```
chrome --headless=new --window-size=760,980 \
  --screenshot=screenshots/03-overworld.png \
  "http://localhost:8080/?shot=overworld"
```

`?shot=` accepts: `title`, `players`, `creator`, `overworld`, `dialogue`,
`shop`, `interior`, `battle`, `paint`, `ledger`, `keep`, `bag`. The harness is
read-only and never writes to the save file.
