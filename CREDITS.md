# Asset Credits

Every asset in `assets/` carries its source pack as the last field of its
filename. Original license files and previews are preserved in `assets/_packs/`.

| Tag in filename | Pack | Author | License |
|---|---|---|---|
| `bigwander` | The Banquet (16×16 food) | BigWander | see `assets/_packs/bigwander-banquet/` |
| `ghostpixxells` | Pixel Food | Ghostpixxells | pack terms |
| `craftpix` | Retro pixel effects, loot icons, animated magic book, path & road tileset | CraftPix.net | <https://craftpix.net/file-licenses/> |
| `tinyswords` | Tiny Swords (Free Pack + Enemy Pack + Update 010 extras) | — | pack terms |
| `cainos` | Pixel Art Top Down - Basic | Cainos | see `assets/_packs/pixel-art-top-down-basic-cainos/`, <https://docs.cainos.net/pixel-art-top-down-basic> |
| `fantasy` | The Fan-tasy Tileset (Free) | — | see `assets/_packs/fantasy-tileset/` |
| `kingsandpigs` | Kings and Pigs | — | see `assets/_packs/kings-and-pigs/` |

## Notes

- **CraftPix** packs are covered by the license at
  <https://craftpix.net/file-licenses/> (URL taken verbatim from the
  `License.txt` files that shipped with them, preserved in `_packs/`).
- **Tiny Swords** shipped with no license or author file in the archive.
  Its assets are tagged `tinyswords` after the pack name rather than an
  author, because no author was recorded in the files. **Confirm the
  original download page's terms before shipping commercially.**
- `assets/_packs/` also holds the original `.zip` archives and CraftPix
  coupon/preview files. Nothing in `_packs/` is game art.
- **The Fan-tasy Tileset** shipped with no license or author file (only a
  trial guide and documentation PDF, both signed just "my asset pack").
  Tagged `fantasy` after the pack name for the same reason as Tiny Swords —
  **confirm the original download page's terms before shipping
  commercially.** Its `environment/tilesets/fantasy-16px/tiled/` folder is
  kept byte-for-byte as shipped (`Art/` + `Tiled/` side by side, no renamed
  files) because every `.tsx` tileset references its `.png` via a relative
  `../../Art/...` path, and the pack's own docs warn its naming/spacing is
  deliberately built for merging paid expansions — renaming anything here
  breaks both.
- **Kings and Pigs** shipped with no license, readme, or author file at all.
  Tagged `kingsandpigs` after the pack name for the same reason as Tiny
  Swords and The Fan-tasy Tileset — **confirm the original download page's
  terms before shipping commercially.** Its terrain/decoration tilesets are
  32×32px (`environment/tilesets/kings-and-pigs-32px/`), half the size of
  the Tiny Swords reference.
- **"Tiny Swords (Update 010)"** (`assets/_packs/tiny-swords-update-010/`)
  is an older edition of the base pack with a different folder layout. Only
  its non-overlapping content was added (Deco, Explosion/Fire effects,
  Goblin faction buildings/props, Gold Mine, resource pickups, Sheep, Trees,
  and the Banners/Buttons/Icons/Pointers/Ribbons UI set). Its Archer, Pawn,
  Warrior, Castle, House, and Tower art was **not** added — those are older
  single-pose duplicates of characters/buildings already covered by the
  current Free Pack as full animated spritesheets. The raw pack (including
  the skipped folders) is preserved in `_packs/` if ever needed.

If you add a pack, add a row here and keep its license file in `_packs/`.
