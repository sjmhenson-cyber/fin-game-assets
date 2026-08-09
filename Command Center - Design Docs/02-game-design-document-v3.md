# Command Center — Game Design Document (v3)

> **v3 — supersedes 02-game-design-document-v2.md. Delete v2 once
> confirmed. Changes: Venmo reclassified from errand to combat (it's a
> credit card, not peer-to-peer); adds the tutorial boss/Bridge concept
> from the Gemini conversation; combat flavor can now vary per boss.**

Living document. Two players: Sarah and Taliyah. A real-life finance tracker
expressed as a Tiny Swords pixel-art kingdom.

## Design Pillars
1. **Reality lock** — 1 gold = $1, always, in Gold specifically. (Materials
   are exempt — see Two-Currency Model.)
2. **Debt-type-to-verb mapping, by debt nature, not vendor name** —
   revolving/interest-bearing debt is combat, regardless of which company
   issued it. Secured/asset debt is construction. Genuine person-to-person
   debt is an errand. (Correction: Venmo was originally assumed to be
   peer-to-peer and assigned to errand — it's actually a credit card, so
   it belongs in combat.)
3. **Extend, don't discard** — V4's finance engine is the ported spec, not
   rebuilt from scratch.
4. **Two-player shared/individual economy** — own vault, avatar, business,
   personal farm plot per player; shared systems unlock via joint
   milestones.

## Decision: Scope
Full vision (zones, real turn-based combat, businesses, farming/crafting/
stores) — not a small V4 extension.

## Turn Structure
A turn = a real payday, tracked per player independently.

## World / Characters
- **Players:** Sarah, Taliyah — each with own Vault, avatar, Business,
  personal farm plot.
- **Businesses:** decorated building per player, produces gold on payday.
- **Hunter** — Battle-Poodle companion (unbuilt).
- **Zones:** The Plains (home base, farm/Housing Hub) → **The Bridge**
  (tutorial gate, see below) → Whispering Woods (foraging) → Sapphire Lake
  (main boss zone + peaceful fishing dock) → The Mountains (gathering).
- **The Keep of Ēkehya** — construction/upgrade building.

## The Bridge — Tutorial Gate (new)
- Stationed right outside home base, blocking the path from The Plains to
  Whispering Woods.
- Guarded by a single boss built from the player's **smallest** debt —
  gives a fast, achievable first win that teaches the combat loop before
  the player reaches the larger gauntlet at Sapphire Lake.
- Currently mapped to the user's real Venmo credit card balance: **the
  Vanguard/Knights of Venn-Mhor**, a "Keter-class anomaly" whose Max HP
  equals the real balance.
- Reward for defeat: the boss shatters, permanently clears the Bridge,
  unlocks Whispering Woods as the next zone.

## Two-Currency Model
- **Gold** — real money, reality-locked. Used only for combat and Ēkehya
  upgrades tied to a real payment. Never spent freely.
- **Materials** — non-monetary, earned via farming/gathering/cooking.
  Spent freely on decor, crafting, appliance maintenance, and stores
  (fully embraced, no restriction).

## Economy

### Income
- **Deposit / Payday:** real paycheck entered → Stamina allowance
  auto-deducted (default, editable per-paycheck) → confirm popup shows
  the math → Payday Audit flags if the amount looks off vs. usual.

### Debt Resolution — split by nature, not name
- **Combat** — any revolving/interest-bearing debt: credit cards
  (including Venmo), etc. See Combat section.
- **Construction (Ēkehya)** — secured/asset debt (e.g. IKEA). Maintenance
  (Materials → temp buffs) / Upgrades (Gold, tied to real payment →
  permanent).
- **Errand (courier/delivery)** — reserved for genuine person-to-person
  debt (owing a friend/family member directly). **Currently shelved — no
  active debt of this type exists.** Keep the verb defined for future use,
  but it's not part of the active build scope right now.

### Savings
- **Guild:** name a goal + target, fund from Vault, trophy at 100%.

## Combat — resolved model
- **Standing siege.** Commit a boss to siege; payday Gold auto-feeds it.
- **Tiered power, bought automatically at best value each payday.**
- **Combat flavor can vary per boss** — some bosses use army units
  (Footmen/Archers/Catapults, march + explosion animation, matches V4's
  existing assets), others use ammunition/weapons (Breaker rounds,
  alchemical bombs — Venn-Mhor's flavor). The underlying math (Gold spent
  → tiered damage) is identical either way; only the presentation differs.
  The auto-forge system should pick a flavor per boss alongside its name/
  creature/sprite.
- **Auto-rollover** — leftover Gold that can't afford the next tier banks
  forward automatically. No player-facing "save up and skip" choice.
- **Boss reinforcement** — unpaid turn → boss HP grows by real APR.

## Farming & Gathering
Own real-time clock, independent of payday turns. Personal plot per
player + shared garden (Housing Hub). No Stamina/Gold cost, only time.

## Milestone Progression
| Trigger | Unlock |
|---|---|
| Any single payment above minimum | New seed |
| 5 consecutive on-time, above-minimum payments (personal) | Personal Garden |
| 5 payments each toward the other player's debt | Gift-giving between players |
| 10 payments each toward the other player's debt | Shared Garden |
| $1,000 cumulative principal paid (not interest), per player | Sprinklers, grazing animals |

## Data Model Requirements
- **Debt ownership tagging** — for cross-payment milestones.
- **Principal tracking** — running total per player, separate from HP.
- **Combat flavor field per boss** — new, from this update.

## Ledger Transparency
- **Lexicon system** — custom debt naming layer.
- **Ledger-edit detection** — hand-edits to the Sheet noticed/narrated,
  logged. Not yet designed in detail.

## Known Bugs (V4 as built)
- Boss HP bar doesn't visually update after a Strike.
- Hero selection flashes the full sprite sheet before settling.

## Asset Sources
- GitHub: `sjmhenson-cyber/fin-game-assets` — ~975 sprites.
- UI chrome embedded as base64 9-slice borders.

## Source Documents
- `COMMAND-CENTER-HANDOFF.txt` / `COMMAND-CENTER-PROMPT.txt` — built V4.
- `FIN-GAME-INFO.txt` / `FIN-GAME-PROMPT.txt` — unbuilt full redesign.
- "Notes for Claude" — original punch list.
- Gemini conversation (screenshot, this session) — Vanguard of Venn-Mhor /
  Bridge tutorial gate concept.
