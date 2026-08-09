# Command Center — Game Design Document

Living document. Two players: Sarah and Taliyah. A real-life finance tracker
expressed as a Tiny Swords pixel-art kingdom.

## Design Pillars
1. **Reality lock** — 1 gold = $1, always. Never broken, in any system.
2. **Debt-type-to-verb mapping** — only adversarial/interest debt is combat.
   Secured/asset debt is construction. Small/interpersonal debt is an errand.
   This keeps combat logic from having to explain every kind of payment.
3. **Extend, don't discard** — V4's finance engine (dual vaults, boss HP,
   Sheet-as-database, interest calendar) is the ported spec, not something
   to rebuild from scratch. The frontend/presentation layer is being rebuilt
   toward a Canvas-based overworld; the math and edge cases underneath it
   are not.
4. **Two-player shared/individual economy** — each player has her own vault
   and avatar; shared debts and a Family Treasury view exist once all
   combat debts are cleared.

## Decision: Scope
Full vision (zones, real turn-based combat, businesses) — not a small
V4 extension. Confirmed by the user: the V4 prototype's value was in the
design decisions it forced, not the code itself, so a rebuild doesn't
waste that work.

## World / Characters
- **Players:** Sarah, Taliyah — each with own Vault, avatar (5 classes x
  5 factions in the existing character creator), and Business.
- **Businesses:** a decorated building per player representing her real
  job. Produces gold on real payday. (New — not yet in either source doc,
  decided in conversation.)
- **Hunter** — Battle-Poodle companion (asset exists, unbuilt; from Gemini
  doc).
- **Zones** (from Gemini doc, unbuilt): The Plains, Whispering Woods,
  Sapphire Lake, The Mountains — walkable overworld, zone-gated.
- **The Keep of Ēkehya** — Swedish/IKEA-inspired faction/building in The
  Plains, tied to the Housing Hub (from Gemini doc, unbuilt). See Economy.

## Economy

### Income
- **Deposit** (existing, V4): manual entry of real income to active
  player's Vault.
- **Payday / Business income** (new): Business building produces gold
  matching real pay.
- **Payday Audit** (new): if a payday amount differs meaningfully from the
  player's usual, an optional investigate action is offered (e.g. via a
  bookkeeper NPC) — catch a payroll error for a possible payoff, or bank it
  and move on. Optional, not a gate.

### Debt Resolution — split by type
- **Combat (Sapphire Lake monsters)** — adversarial, interest-bearing debt
  (e.g. credit cards). Auto-forged as a boss from a hash of the real debt
  name (epic title + creature + sprite, Black/Purple palette only). See
  Combat section.
- **Construction (The Keep of Ēkehya)** — secured/asset debt (e.g. IKEA).
  Two sub-economies:
  - *Maintenance*: spend raw materials to repair appliances for temporary
    buffs.
  - *Upgrades*: spend Vault gold for permanent appliance replacement —
    changes the overworld sprite, grants a permanent baseline buff.
- **Errand (courier/delivery)** — small, person-to-person debt (e.g.
  Venmo). Low-ceremony, quick-resolve. **Not yet designed in detail —
  open item.**

### Savings
- **Guild (existing, V4):** name a goal + target, fund from vault, trophy
  at 100%.

### Leisure
- **Tavern / Stamina (existing, V4):** weekly leisure budget, separate
  pool from Vault. **Known gap:** spending here doesn't reduce the Vault,
  silently breaking the reality lock. Unresolved — see open questions.

### Ledger transparency
- **Lexicon system** (from Gemini doc): custom naming layer so real debt
  names (e.g. `fact_venmo`) map to in-game names without losing the real
  reference underneath.
- **Ledger-edit detection** (from Notes): hand-editing the Sheet directly
  should be noticed and narrated in-game ("a mysterious entity provided/
  stole resources"), with its own Log entry so the audit trail doesn't
  gap. Not yet designed in detail.

## Combat (Sapphire Lake only)
- **V4 baseline (built):** flat gold-to-HP — Strike a boss for the exact
  payment amount, HP -= X. Army-march + explosion animation.
- **Direction being explored (not finalized):**
  - Tiered units (Footmen/Archers/Catapults) instead of flat conversion —
    rewards large/lump payments with a bigger strike.
  - Standing siege — once committed, income routed to that boss auto-feeds
    the siege over time rather than one-off clicks.
  - Boss reinforcement — an unpaid turn lets the boss's own army grow
    (models real APR/missed payments), possibly striking back.
- **Undecided:** what a "turn" actually is (a real payday? a calendar
  week? a login session?) — this decision gates the whole combat system
  and needs to be made before implementation.

## Known Bugs (V4 as built)
- Boss HP bar doesn't visually update after a Strike.
- Hero selection flashes the full sprite sheet before settling on the
  chosen icon.

## Asset Sources
- GitHub: `sjmhenson-cyber/fin-game-assets` — ~975 sprites (Tiny Swords,
  food/Banquet pack, FX gifs, pets, tiles).
- UI chrome embedded as base64 9-slice borders (parchment/ribbon/teal) —
  not remote-loaded.

## Source Documents (for reference)
- `COMMAND-CENTER-HANDOFF.txt` / `COMMAND-CENTER-PROMPT.txt` — describes
  the actual built, tested V4 app.
- `FIN-GAME-INFO.txt` / `FIN-GAME-PROMPT.txt` — describes the unbuilt
  full-scope redesign (zones, turn-based combat, Lexicon, Ēkehya).
- "Notes for Claude" — the original bug/feature punch list.
