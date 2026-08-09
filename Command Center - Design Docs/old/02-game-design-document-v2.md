# Command Center — Game Design Document (v2)

> **v2 — supersedes 02-game-design-document.md (v1) and merges in
> 05-cozy-layer-and-progression.md. Delete the v1 file once you've
> confirmed this covers everything you need.**

Living document. Two players: Sarah and Taliyah. A real-life finance tracker
expressed as a Tiny Swords pixel-art kingdom.

## Design Pillars
1. **Reality lock** — 1 gold = $1, always, in Gold specifically. (See the
   Two-Currency Model below — this pillar governs Gold only, not Materials.)
2. **Debt-type-to-verb mapping** — only adversarial/interest debt is combat.
   Secured/asset debt is construction. Small/interpersonal debt is an errand.
3. **Extend, don't discard** — V4's finance engine (dual vaults, boss HP,
   Sheet-as-database, interest calendar) is the ported spec. The frontend
   is being rebuilt toward a Canvas-based overworld; the math underneath
   is not being rebuilt.
4. **Two-player shared/individual economy** — each player has her own vault,
   avatar, business, and personal farm plot. Shared systems (Family
   Treasury, shared garden) unlock through joint milestones.

## Decision: Scope
Full vision (zones, real turn-based combat, businesses, farming/crafting/
stores) — not a small V4 extension. The V4 prototype's value was the
design decisions it forced, not the code itself.

## Turn Structure
**A turn = a real payday, tracked per player independently.** Sarah's and
Taliyah's turns are not synced to each other or to a calendar. Combat/siege
actions are gated to once per turn — no spamming strikes mid-cycle.

## World / Characters
- **Players:** Sarah, Taliyah — each with own Vault, avatar, Business, and
  personal farm plot.
- **Businesses:** a decorated building per player representing her real
  job. Produces gold on real payday.
- **Hunter** — Battle-Poodle companion (asset exists, unbuilt).
- **Zones:** The Plains (farm/Housing Hub), Whispering Woods (foraging),
  Sapphire Lake (boss encounters + a peaceful fishing dock), The Mountains
  (ore/stone gathering).
- **The Keep of Ēkehya** — construction/upgrade building, see Economy.

## Two-Currency Model
- **Gold** — real money, reality-locked. Used only for: (1) combat siege,
  (2) Ēkehya appliance *upgrades* tied to a real logged payment. Never
  spent freely, never available in a general "browse and buy" screen —
  only enters play when routed from a real payment.
- **Materials** (wood, ore, crops, ingredients) — non-monetary, earned via
  farming/gathering/cooking. Spent freely on decor, crafting, appliance
  *maintenance*, and general stores. Stores are fully embraced for this
  currency — no restriction here, since it never touches real dollars.

## Economy

### Income
- **Deposit / Payday:** player enters her real paycheck total. Game
  auto-deducts her Stamina/leisure allowance (see below), shows a confirm
  popup with the math before it commits, and flags a Payday Audit if the
  amount looks off vs. her usual.
- **Payday Audit:** optional investigate step (e.g. via a bookkeeper NPC)
  if the paycheck differs meaningfully from her average. Not a gate.

### Stamina / Leisure (resolved)
- **Model: separate allowance.** A default leisure amount is carved out of
  the paycheck automatically at payday, before the remainder hits the
  Vault. The default is editable per-paycheck by the player.
- Shown in the same confirm popup as the Payday Audit.
- This money is never part of the fightable Vault pool.

### Debt Resolution — split by type
- **Combat (Sapphire Lake monsters)** — see Combat section below.
- **Construction (The Keep of Ēkehya)** — secured/asset debt (e.g. IKEA).
  *Maintenance* (Materials → temporary buffs) and *Upgrades* (Gold, tied
  to a real payment → permanent change).
- **Errand (courier/delivery)** — small person-to-person debt (e.g.
  Venmo). Low-ceremony, quick-resolve, no HP bar or build meter — a
  courier NPC delivers it with a small flourish. **Still needs detailed
  mechanic design — open item.**

### Savings
- **Guild:** name a goal + target, fund from Vault, trophy at 100%.

## Combat (Sapphire Lake only) — resolved model
- **Standing siege.** Commit a boss to siege; each subsequent payday's
  routed Gold auto-feeds it — no manual per-payment Strike button.
- **Tiered units**, bought automatically at best value each payday:
  Footmen (cheap/chip) → Archers (mid) → Catapults (expensive/burst).
- **Auto-rollover.** Leftover Gold that can't afford the next tier banks
  forward to the next payday automatically. No player-facing "save up and
  skip this payday" choice — this was deliberately ruled out so the game
  never rewards delaying a real payment for a better in-game outcome.
- **Boss reinforcement.** If a turn passes with nothing routed to a
  besieged boss, its HP grows by its real APR — using the interest engine
  already built, just tied to the per-player turn instead of a calendar
  month.

## Farming & Gathering
- Runs on its own **real-time clock**, independent of payday turns —
  grows in real time regardless of login, like Animal Crossing.
- **Personal plot** per player (near her own house) — her material
  inventory.
- **Shared garden** (Housing Hub) — joint plot, shared material pool.
- No Stamina or Gold cost to plant/water/gather — only real time passing.

## Milestone Progression (real payoff → cozy unlocks)
| Trigger | Unlock |
|---|---|
| Any single payment above minimum | New seed |
| 5 consecutive on-time, above-minimum payments (personal) | Personal Garden |
| 5 payments each made toward the *other player's* debt | Gift-giving between players |
| 10 payments each made toward the *other player's* debt | Shared Garden |
| $1,000 cumulative **principal** paid (not interest), **per player** | Sprinklers, grazing animals |

## New Data Model Requirements
- **Debt ownership tagging** — debts need to be tagged to an owning
  player so cross-payment milestones can be tracked.
- **Principal tracking** — cumulative principal paid needs its own running
  total per player (payment minus interest accrued since last payment,
  summed over time), not folded into boss HP.

## Ledger Transparency
- **Lexicon system:** custom naming layer so real debt names (e.g.
  `fact_venmo`) map to in-game names without losing the real reference.
- **Ledger-edit detection:** hand-editing the Sheet directly should be
  noticed and narrated in-game, with its own Log entry. **Not yet
  designed in detail — open item.**

## Known Bugs (V4 as built)
- Boss HP bar doesn't visually update after a Strike.
- Hero selection flashes the full sprite sheet before settling on the
  chosen icon.

## Asset Sources
- GitHub: `sjmhenson-cyber/fin-game-assets` — ~975 sprites (Tiny Swords,
  food/Banquet pack, FX gifs, pets, tiles).
- UI chrome embedded as base64 9-slice borders — not remote-loaded.

## Source Documents (for reference)
- `COMMAND-CENTER-HANDOFF.txt` / `COMMAND-CENTER-PROMPT.txt` — the actual
  built, tested V4 app.
- `FIN-GAME-INFO.txt` / `FIN-GAME-PROMPT.txt` — the unbuilt full-scope
  redesign (zones, turn-based combat, Lexicon, Ēkehya).
- "Notes for Claude" — the original bug/feature punch list.
