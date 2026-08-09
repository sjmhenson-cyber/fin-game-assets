# Cozy Layer & Milestone Progression

Supplements 02-game-design-document.md. Covers the farming/crafting/store
economy and how it connects to real debt payoff.

## Two-Currency Model
- **Gold** (real money, reality-locked, 1 gold = $1) — used only for combat
  siege and Ēkehya appliance *upgrades* tied to a real logged payment.
- **Materials** (wood, ore, crops, ingredients — non-monetary) — earned via
  farming/gathering/cooking, spent freely on decor, crafting, appliance
  *maintenance*, and store purchases. No connection to real dollars, so
  this layer can be a full Animal Crossing/Stardew-style store-and-craft
  economy without threatening the reality lock.

## Farming & Gathering
- Runs on its **own real-time clock**, independent of payday turns — grows
  in real time whether or not the player is logged in, matching Animal
  Crossing's rhythm rather than the finance side's payday cadence.
- **Personal plot** (per player, near her own house) — hers to plant/design;
  harvest goes to her personal material inventory.
- **Shared garden** (Housing Hub) — both players can plant/water/harvest;
  yield goes to a shared material pool.
- Zones: **The Plains** (farm plot), **Whispering Woods** (wood/herbs/
  mushrooms foraging), **The Mountains** (ore/stone gathering), **Sapphire
  Lake dock** (peaceful fishing, separate from the boss encounters in the
  same zone).
- No Stamina or Gold cost to plant/water/gather — only real time passing.
  Kept deliberately stress-free, the opposite of the finance side.

## Milestone Progression (real payoff → cozy unlocks)
The mechanism that connects the two halves of the game — real financial
discipline unlocks the cozy layer.

| Trigger | Unlock |
|---|---|
| Any single payment above minimum | New seed |
| 5 consecutive on-time, above-minimum payments (personal) | Personal Garden |
| 5 payments each made toward the *other player's* debt | Gift-giving between players |
| 10 payments each made toward the *other player's* debt | Shared Garden |
| $1,000 of cumulative **principal** paid (not interest), **per player** | Sprinklers, grazing animals |

## New Data Model Requirement
**Debt ownership tagging.** Debts currently have no concept of "whose"
they are. The cross-payment milestones (5/10 payments toward the other
player's debt) require each debt to be tagged to an owning player, so the
game can distinguish "you paid your own debt" from "you paid hers."

**Principal tracking.** The $1,000 milestone requires tracking cumulative
principal paid separately from interest — calculable from the existing
interest-logging system (payment amount minus interest accrued since last
payment, summed over time), but needs to be surfaced as its own running
total per player, not just folded into the boss's HP number.

## Open Question Carried Forward
- Store framing is now fully embraced (reversed from the earlier "no
  stores" constraint) — but confirm stores only ever transact in
  Materials, never Gold, to preserve the reality lock.
