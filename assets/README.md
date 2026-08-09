# Assets

1,555 files, sorted **by format first, then by subject**.

## Where things live

| Folder | What goes in it |
|---|---|
| `sprites/` | Single static images — one picture, one file |
| `spritesheets/` | Animation strips and packed atlases (multiple frames in one image) |
| `animations/` | Ready-to-play `.gif` loops |
| `tilesets/` | Tilemap sheets and Tiled `.tmx` map files |
| `source/` | Editable originals — `.aseprite`, `.psd` |
| `_packs/` | Licenses, previews, coupons, original `.zip`s. **Not game art.** |

Subject folders repeat under each format tier, so the same subject is
findable at whatever format you need it in:

```
sprites/food/{fruit,vegetables,meat,baked-goods,desserts,prepared-dishes,snacks,tableware}
sprites/icons/{loot,book,ui}
sprites/environment/{buildings,decorations/*,resources/*}
sprites/ui/{banners,bars,buttons,cursors,human-avatars,papers,ribbons,swords,wood-table}
sprites/props/magic-book
sprites/characters/pets

spritesheets/vfx/{fire,smoke,water,electric,dark-magic,holy-magic,weather,nature,impact,shield,particles,misc}
spritesheets/characters/units/{archer,lancer,monk,pawn,warrior}
spritesheets/props/magic-book
spritesheets/food

animations/vfx/{fire,smoke,water,electric,dark-magic,holy-magic,weather,nature,impact,shield}

tilesets/{magic-book,magic-book/tiled,tiny-swords}
source/{aseprite,psd}
```

## Naming convention

```
<item>_<category>_<color?>_<variant?>_<maker>.<ext>
```

Fields are separated by `_`; words *inside* a field use `-`. Everything is
lowercase. `color` and `variant` are only present when they carry meaning.

```
apple-half-bottom_fruit_outline_bigwander.png
onion_vegetable_red_nooutline_bigwander.png
burger-dish_prepared-dishes_ghostpixxells.png
fire-meteor_vfx_craftpix.gif
pile-of-coins_icon_craftpix.png
pawn-idle-axe_unit_blue_tinyswords.png
castle_building_red_tinyswords.png
```

The maker is always **last** so names sort by subject, not by vendor.

| Tag | Pack |
|---|---|
| `bigwander` | BigWander — *The Banquet* (raw foods, 16×16) |
| `ghostpixxells` | Ghostpixxells — *Pixel Food* (prepared dishes) |
| `craftpix` | CraftPix — VFX, loot icons, magic-book pack |
| `tinyswords` | *Tiny Swords* free pack (units, buildings, terrain, UI) |

See [`../CREDITS.md`](../CREDITS.md) for licensing.

## Notes / gotchas

- **`tilesets/magic-book/tiled/` keeps its original filenames on purpose.**
  The `.tmx` maps reference their PNGs by filename; renaming them silently
  breaks the maps.
- The Banquet ships every food **twice** — `_outline_` and `_nooutline_`.
  Pick one style and stay consistent.
- Its two halves were hand-named inconsistently upstream (`leaf01` vs
  `leaf-01`, `radish-a-individual` vs `radish-individual-a`, a `Half_TopOutline`
  typo). Names here are normalized, so outline/no-outline pairs now match.
  11 sprites genuinely exist in only one of the two styles.
- `desktop.ini` is gitignored — Google Drive regenerates it in every folder.
