# fin-game

## Asset intake rule

**Every new asset added to this repo must be screened, renamed, and sorted
before it is committed.** No exceptions, and no need to wait for an explicit
request — if new or unsorted files are noticed in `assets/` during a session,
process them then and there.

### 1. Screen

Delete junk rather than committing it:

- `__MACOSX/`, `._*`, `.DS_Store` — macOS archive residue
- `desktop.ini`, `Thumbs.db` — Google Drive / Windows folder metadata
- Duplicate copies of a file that already exists elsewhere in `assets/`

Keep licenses, readmes, previews, coupons and original `.zip`s, but move them
to `assets/_packs/<pack-name>/` — they are **not** game art and must never sit
in the sprite tree.

Open the files if the pack name is unreliable. Folder labels lie: a folder
called "retro pixel effects" in this repo turned out to hold explosion
*spritesheets*, and a stray `Icons_name.txt` inside it actually named a
different pack's loot icons. Verify before trusting a name.

### 2. Sort — subject first, then format

```
assets/
  <subject>/
    sprites/       single static images
    spritesheets/  animation strips and packed atlases
    animations/    ready-to-play .gif loops
    tilesets/      tilemap sheets and Tiled .tmx maps
    source/        editable originals (.aseprite, .psd)
  _packs/          licenses, previews, coupons, original .zips
```

Top-level subject folders group everything about one *thing* — e.g.
`characters/`, `environment/`, `food/`, `icons/`, `props/`, `ui/`, `vfx/`,
or a self-contained pack that's its own subject (`magic-book/`). Nested
subject folders (`environment/decorations/bushes/`, `environment/resources/gold/`)
follow the same granularity rule as before: `fruit`, `baked-goods`, `fire`,
`smoke` — not `stuff`, and not left loose at a format-tier root.

Generic terrain/ground tilesets (tiny-swords, road, topdown-basic, …) live
under `environment/tilesets/`, even when they came from a pack with its own
name — the pack name stays only in the filename's maker field.

**If an asset has no matching subject, create one** — do not dump it in a
`misc/` bucket.

#### Pixel-size mismatches

The game's reference tile size is Tiny Swords' **64×64px**. Any tileset
folder built on a different native tile grid must say so in its folder name,
e.g. `environment/tilesets/road-16px/`, `magic-book/tilesets-16px/` — so it's
obvious at a glance that the asset needs scaling before it lines up with
Tiny Swords tiles. Check tile size from a shipped `.tmx`'s `tilewidth`
attribute, or by measuring the tileset PNG against its known tile-count grid.
Individual sprites/spritesheets (non-tile-grid art) don't need this tag —
only tile-grid tilesets do.

### 3. Rename

```
<item>_<category>_<color?>_<variant?>_<maker>.<ext>
```

- Fields separated by `_`; words inside a field separated by `-`
- All lowercase
- `color` only when it distinguishes the asset (`red` onion, `blue` team unit)
- `variant` only when it distinguishes the asset (`outline` / `nooutline`)
- **maker always last**, so files sort by subject rather than by vendor

```
apple-half-bottom_fruit_outline_bigwander.png
onion_vegetable_red_nooutline_bigwander.png
fire-meteor_vfx_craftpix.gif
castle_building_red_tinyswords.png
```

Do not repeat the colour inside the item name when it already has its own
field — `bigbutton-pressed_ui_blue`, not `bigbluebutton-pressed_ui_blue`.

### 4. Record

Add a row to `CREDITS.md` for any new pack and keep its license in `_packs/`.

### Exception

Any `tilesets/**/tiled/` folder (now under `<subject>/tilesets/.../tiled/`)
keeps original filenames. Tiled `.tmx` maps reference their PNGs by filename,
so renaming them silently breaks the maps. Rename those only if the `.tmx`
references are rewritten to match. Moving the whole `tiled/` folder as a unit
is safe — the `.tmx` references are relative to files in the same folder.

### Mechanics

Use `git mv` so history follows each file. On this Windows/Git Bash setup,
avoid per-file `sed`/`tr`/`basename` subprocesses when scripting bulk moves —
process spawn cost makes a 1,500-file run take minutes instead of seconds. Use
bash parameter expansion (`${f##*/}`, `${s,,}`, `${s//x/y}`) instead. Note the
filesystem is case-insensitive: renaming a folder's casing needs a two-step
`mv` through a temporary name.

---

## Design Docs versioning

See `Command Center - Design Docs/CLAUDE.md` for the `NN-name-vN.md`
versioning and archival rule that governs that folder.
