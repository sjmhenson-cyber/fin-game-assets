// Command Center — Pokemon-style overworld prototype.
// Real Tiny Swords sprites pulled live from the public asset repo
// (sjmhenson-cyber/fin-game-assets), same convention the real V4 app uses.
// Data is still local/mocked (localStorage) — not wired to the live Sheet yet.

const GH_OWNER = 'sjmhenson-cyber';
const GH_REPO = 'fin-game-assets';
const GH_BRANCH = 'main';

function ghUrl(path) {
  return 'https://raw.githubusercontent.com/' + GH_OWNER + '/' + GH_REPO + '/' + GH_BRANCH + '/' +
    path.split('/').map(encodeURIComponent).join('/');
}

const SPRITES = {
  player: ghUrl('Blue Units/Warrior/Warrior_Idle.png'),
  castle: ghUrl('Buildings/Blue Buildings/Castle.png'),
  monastery: ghUrl('Buildings/Blue Buildings/Monastery.png'),
  archery: ghUrl('Buildings/Blue Buildings/Archery.png'),
  barracks: ghUrl('Buildings/Blue Buildings/Barracks.png'),
  house1: ghUrl('Buildings/Blue Buildings/House1.png'),
  keep: ghUrl('Buildings/Blue Buildings/Tower.png'),
  gate: ghUrl('Buildings/Black Buildings/Tower.png'),
  bush1: ghUrl('Terrain/Decorations/Bushes/Bushe1.png'),
  bush3: ghUrl('Terrain/Decorations/Bushes/Bushe3.png'),
  rock2: ghUrl('Terrain/Decorations/Rocks/Rock2.png'),
};

const TILE = 48;
const COLS = 13; // 0..12, col 12 is the Bridge lane
const ROWS = 8;

// ---------- Data model (mocked, mirrors the real Bosses/Owner shape) ----------

const STORAGE_KEY = 'cc_state_v2';

const DEFAULT_DEBTS = [
  { id: 'vinmohr', lexicon: 'Vinmohr', real: 'Venmo Credit Card', type: 'combat', flavor: 'ammo', owner: 'Sarah', balance: 42, maxBalance: 42, apr: 0.24, isBridgeBoss: true },
  { id: 'ekehya-reno', lexicon: 'The Ēkehya Renovation', real: 'IKEA Financing', type: 'construction', flavor: null, owner: 'Taliyah', balance: 800, maxBalance: 800, apr: 0 },
  { id: 'discover-host', lexicon: 'The Discover Host', real: 'Discover Card', type: 'combat', flavor: 'army', owner: null, balance: 1200, maxBalance: 1500, apr: 0.22 },
];

function freshState() {
  const debts = JSON.parse(JSON.stringify(DEFAULT_DEBTS));
  return {
    sheet: debts,
    snapshot: JSON.parse(JSON.stringify(debts)),
    trophies: [],
    log: [{ text: "The kingdom's ledgers are opened for the first time.", ts: Date.now() }],
  };
}

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return freshState();
  try { return JSON.parse(raw); } catch (e) { return freshState(); }
}
function saveState() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }

let state = loadState();
function addLog(text) { state.log.unshift({ text, ts: Date.now() }); }
function findSheetDebt(id) { return state.sheet.find(d => d.id === id); }
function findSnapshotDebt(id) { return state.snapshot.find(d => d.id === id); }
function vinmohrSlain() { return !findSheetDebt('vinmohr'); }

// ---------- World layout ----------

const buildings = [
  { id: 'castle', x: 2, y: 1, sprite: SPRITES.castle, label: 'Vault', w: 2 },
  { id: 'monastery', x: 6, y: 1, sprite: SPRITES.monastery, label: 'Heroes', w: 1 },
  { id: 'archery', x: 9, y: 1, sprite: SPRITES.archery, label: 'Guild', w: 1 },
  { id: 'barracks', x: 3, y: 6, sprite: SPRITES.barracks, label: 'Sieges', w: 1 },
  { id: 'house1', x: 6, y: 6, sprite: SPRITES.house1, label: 'Tavern', w: 1 },
  { id: 'keep', x: 9, y: 6, sprite: SPRITES.keep, label: 'Trophy Room', w: 1 },
];
const decorations = [
  { sprite: SPRITES.bush1, x: 1, y: 4 }, { sprite: SPRITES.bush3, x: 11, y: 2 },
  { sprite: SPRITES.rock2, x: 5, y: 4 }, { sprite: SPRITES.bush1, x: 8, y: 4 },
];

let player = { x: 1, y: 4, facingLeft: false };

function occupiedByBuilding(x, y) {
  return buildings.find(b => y === b.y && x >= b.x && x < b.x + b.w);
}

// ---------- Rendering: world ----------

function renderWorld() {
  const world = document.getElementById('world');
  world.innerHTML = '';
  world.style.width = (COLS - 1) * TILE + 'px'; // grass area excludes bridge lane

  decorations.forEach(d => {
    const img = document.createElement('img');
    img.src = d.sprite; img.className = 'tile-obj';
    img.style.left = d.x * TILE + 'px'; img.style.top = d.y * TILE - 12 + 'px'; img.style.width = '36px';
    world.appendChild(img);
  });

  buildings.forEach(b => {
    const wrap = document.createElement('div');
    wrap.className = 'tile-obj building';
    wrap.style.left = b.x * TILE + 'px';
    wrap.style.top = (b.y * TILE - 28) + 'px';
    wrap.innerHTML = `<img src="${b.sprite}" alt="${b.label}"><div class="building-label">${b.label}</div>`;
    world.appendChild(wrap);
  });

  // Bridge lane + Vinmohr gate
  const lane = document.createElement('div');
  lane.id = 'bridgeLane';
  const slain = vinmohrSlain();
  const gateDebt = findSheetDebt('vinmohr');
  lane.innerHTML = slain
    ? `<div style="color:#fff; text-align:center; font-size:.7em; margin-top:8px; text-shadow:1px 1px #000;">Open →</div>`
    : `<div id="gate" style="position:absolute; left:2px; top:${3 * TILE}px;">
         <div class="hp-mini"><div class="fill" style="width:${Math.round(gateDebt.balance / gateDebt.maxBalance * 100)}%"></div></div>
         <img src="${SPRITES.gate}" alt="Vinmohr">
       </div>`;
  world.appendChild(lane);

  const p = document.createElement('div');
  p.id = 'player';
  p.className = player.facingLeft ? 'flip' : '';
  p.style.left = player.x * TILE + 4 + 'px';
  p.style.top = player.y * TILE + 4 + 'px';
  p.innerHTML = `<img src="${SPRITES.player}" alt="You">`;
  world.appendChild(p);
}

function movePlayerDom() {
  const p = document.getElementById('player');
  p.style.left = player.x * TILE + 4 + 'px';
  p.style.top = player.y * TILE + 4 + 'px';
  p.className = player.facingLeft ? 'flip' : '';
}

// ---------- Movement ----------

let canMove = true;
function attemptMove(dx, dy) {
  if (!canMove) return;
  if (dx < 0) player.facingLeft = true;
  if (dx > 0) player.facingLeft = false;

  const nx = player.x + dx;
  const ny = player.y + dy;
  if (ny < 0 || ny >= ROWS) return;

  if (nx >= COLS - 1) { // stepping into the bridge lane
    if (vinmohrSlain()) {
      player.x = COLS - 1; player.y = player.y;
      showToast('You cross into Whispering Woods... (coming soon)');
    } else {
      openBossEncounter('vinmohr', 'The Bridge is Blocked');
    }
    throttleMove(); movePlayerDom(); return;
  }
  if (nx < 0) return;

  const b = occupiedByBuilding(nx, ny);
  if (b) {
    triggerBuilding(b.id);
    throttleMove();
    return;
  }

  player.x = nx; player.y = ny;
  throttleMove();
  movePlayerDom();
}

function throttleMove() {
  canMove = false;
  setTimeout(() => { canMove = true; }, 130);
}

window.addEventListener('keydown', (e) => {
  if (!document.getElementById('bossModal').classList.contains('hidden')) return;
  if (!document.getElementById('trophyModal').classList.contains('hidden')) return;
  if (!document.getElementById('ledgerModal').classList.contains('hidden')) return;
  if (!document.getElementById('ownerModal').classList.contains('hidden')) return;
  const map = { ArrowUp: [0, -1], ArrowDown: [0, 1], ArrowLeft: [-1, 0], ArrowRight: [1, 0],
                w: [0, -1], s: [0, 1], a: [-1, 0], d: [1, 0] };
  const dir = map[e.key];
  if (dir) { e.preventDefault(); attemptMove(dir[0], dir[1]); }
});

// ---------- Building interactions ----------

function triggerBuilding(id) {
  if (id === 'barracks') { openSiegeList(); return; }
  if (id === 'keep') { openTrophyRoom(); return; }
  showToast({ castle: 'The Vault — coming soon.', monastery: 'Heroes — coming soon.',
              archery: 'The Guild — coming soon.', house1: 'The Tavern — coming soon.' }[id] || 'Coming soon.');
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg; t.classList.add('show');
  clearTimeout(showToast._h);
  showToast._h = setTimeout(() => t.classList.remove('show'), 2200);
}

function closeModal(id) { document.getElementById(id).classList.add('hidden'); }

// ---------- Owner backfill ----------

function untaggedDebts() { return state.sheet.filter(d => !d.owner); }

function renderOwnerModal() {
  const untagged = untaggedDebts();
  const overlay = document.getElementById('ownerModal');
  if (untagged.length === 0) { overlay.classList.add('hidden'); return false; }
  overlay.classList.remove('hidden');
  document.getElementById('ownerModalBody').innerHTML = untagged.map(d => `
    <div class="entry">
      <div class="narration"><strong>${d.lexicon}</strong> <span style="color:#7a5c2e;">(${d.real})</span></div>
      <div class="owner-choices">
        <button onclick="assignOwner('${d.id}','Sarah')">Sarah</button>
        <button onclick="assignOwner('${d.id}','Taliyah')">Taliyah</button>
        <button onclick="assignOwner('${d.id}','Shared')">Shared</button>
      </div>
    </div>`).join('');
  return true;
}

function assignOwner(id, owner) {
  const d = findSheetDebt(id); d.owner = owner;
  const snap = findSnapshotDebt(id); if (snap) snap.owner = owner;
  addLog(`${d.lexicon} was claimed by ${owner === 'Shared' ? 'the Shared Treasury' : owner}.`);
  saveState();
  bootSequence();
}

// ---------- Ledger Book ----------

function computeDiff() {
  const changes = [];
  for (const sheetDebt of state.sheet) {
    const snapDebt = findSnapshotDebt(sheetDebt.id);
    if (!snapDebt) continue;
    if (sheetDebt.balance !== snapDebt.balance) {
      changes.push({ id: sheetDebt.id, lexicon: sheetDebt.lexicon, owner: sheetDebt.owner,
                     type: sheetDebt.type, oldValue: snapDebt.balance, newValue: sheetDebt.balance });
    }
  }
  return changes;
}

function narrate(c) {
  const dropped = c.newValue < c.oldValue;
  if (c.type === 'combat') {
    return dropped
      ? `${c.lexicon}'s ranks have thinned — tribute reduced from $${c.oldValue} to $${c.newValue}.`
      : `${c.lexicon} has reinforced its ranks — the toll has grown from $${c.oldValue} to $${c.newValue}.`;
  }
  if (c.type === 'construction') {
    return dropped
      ? `The foundations of ${c.lexicon} were quietly repaired — recorded cost fell from $${c.oldValue} to $${c.newValue}.`
      : `${c.lexicon} required unforeseen materials — recorded cost rose from $${c.oldValue} to $${c.newValue}.`;
  }
  return `${c.lexicon}'s record changed from $${c.oldValue} to $${c.newValue}.`;
}

let pendingChanges = [];

function renderLedgerModal() {
  pendingChanges = computeDiff();
  const overlay = document.getElementById('ledgerModal');
  if (pendingChanges.length === 0) { overlay.classList.add('hidden'); return false; }
  overlay.classList.remove('hidden');
  document.getElementById('ledgerModalBody').innerHTML = pendingChanges.map((c, i) => `
    <div class="entry" id="entry-${i}">
      <div class="who">Concerns: ${c.owner === 'Shared' ? 'the Shared Treasury' : (c.owner || 'unclaimed')}</div>
      <div class="narration">${narrate(c)}</div>
      <div class="delta">$${c.oldValue} → $${c.newValue}</div>
      <button onclick="approveEntry(${i})">Approve</button>
    </div>`).join('');
  return true;
}

function approveEntry(i) {
  const c = pendingChanges[i];
  if (!c || c._approved) return;
  c._approved = true;
  const snap = findSnapshotDebt(c.id);
  if (snap) snap.balance = c.newValue;
  addLog(narrate(c) + ' (reconciled)');
  document.getElementById(`entry-${i}`).classList.add('approved');
  saveState();
  if (pendingChanges.every(ch => ch._approved)) {
    closeModal('ledgerModal');
    renderWorld();
  }
}
function approveAll() { pendingChanges.forEach((c, i) => approveEntry(i)); }

// ---------- Boot sequence ----------

function bootSequence() {
  if (renderOwnerModal()) return;
  if (renderLedgerModal()) return;
  renderWorld();
}

// ---------- Siege / boss encounter ----------

function openSiegeList() {
  const overlay = document.getElementById('bossModal');
  document.getElementById('bossModalTitle').textContent = 'Standing Sieges';
  const debts = state.sheet.filter(d => !d.isBridgeBoss);
  document.getElementById('bossModalBody').innerHTML = debts.length
    ? debts.map(d => bossCardHtml(d)).join('')
    : '<p class="empty">No active sieges. All quiet in the kingdom.</p>';
  overlay.classList.remove('hidden');
}

function openBossEncounter(id, title) {
  const overlay = document.getElementById('bossModal');
  document.getElementById('bossModalTitle').textContent = title;
  const d = findSheetDebt(id);
  document.getElementById('bossModalBody').innerHTML = d
    ? bossCardHtml(d)
    : '<p class="empty">The gate is clear.</p>';
  overlay.classList.remove('hidden');
}

function bossCardHtml(d) {
  const pct = Math.round((d.balance / d.maxBalance) * 100);
  const label = d.type === 'combat' ? 'HP' : 'Remaining';
  return `
    <div class="boss-card">
      <div class="name">${d.lexicon} <span style="font-size:.6em; color:#7a5c2e;">(${d.owner || 'unclaimed'})</span></div>
      <div class="sub">${d.real} · ${d.type}${d.flavor ? ' · ' + d.flavor + ' flavor' : ''}</div>
      <div class="hp-back"><div class="hp-fill" style="width:${pct}%"></div></div>
      <div class="sub">${label}: $${d.balance} / $${d.maxBalance}</div>
      <div class="row">
        <input type="number" id="feed-${d.id}" placeholder="Gold" min="1">
        <button onclick="feedGold('${d.id}')">${d.type === 'combat' ? 'Strike' : 'Build'}</button>
      </div>
    </div>`;
}

function feedGold(id) {
  const input = document.getElementById(`feed-${id}`);
  const amount = Number(input.value) || 0;
  if (amount <= 0) return;
  const sheetDebt = findSheetDebt(id);
  const snapDebt = findSnapshotDebt(id);
  sheetDebt.balance = Math.max(0, sheetDebt.balance - amount);
  snapDebt.balance = sheetDebt.balance;
  addLog(`${amount} Gold fed into the siege against ${sheetDebt.lexicon}.`);
  const wasBridge = sheetDebt.isBridgeBoss;
  if (sheetDebt.balance === 0) slayBoss(sheetDebt);
  saveState();
  if (wasBridge && sheetDebt.balance === 0) {
    closeModal('bossModal');
    showToast('Vinmohr has fallen! The Bridge is clear.');
  } else if (document.getElementById('bossModalTitle').textContent === 'Standing Sieges') {
    openSiegeList();
  } else {
    openBossEncounter(id, document.getElementById('bossModalTitle').textContent);
  }
  renderWorld();
}

function slayBoss(debt) {
  state.trophies.push({ lexicon: debt.lexicon, real: debt.real, finalBalance: debt.maxBalance,
                         date: new Date().toLocaleDateString(), owner: debt.owner });
  state.sheet = state.sheet.filter(d => d.id !== debt.id);
  state.snapshot = state.snapshot.filter(d => d.id !== debt.id);
  addLog(`🏆 ${debt.lexicon} has fallen. A trophy is mounted in the Keep of Ēkehya.`);
}

// ---------- Trophy Room ----------

function openTrophyRoom() {
  const overlay = document.getElementById('trophyModal');
  document.getElementById('trophyModalBody').innerHTML = state.trophies.length
    ? state.trophies.slice().reverse().map(t => `
        <div class="trophy">
          <div class="name">🏆 ${t.lexicon}</div>
          <div class="meta">${t.real} · slain ${t.date} · final debt $${t.finalBalance} · ${t.owner || 'unclaimed'}</div>
        </div>`).join('')
    : '<p class="empty">No trophies yet — the Keep awaits its first victory.</p>';
  overlay.classList.remove('hidden');
}

// ---------- Log ----------

function openLog() {
  document.getElementById('logModalBody').innerHTML = state.log.slice(0, 30).map(l => `
    <div class="log-entry">${new Date(l.ts).toLocaleString()} — ${l.text}</div>`).join('')
    || '<p class="empty">Nothing recorded yet.</p>';
  document.getElementById('logModal').classList.remove('hidden');
}

// ---------- Dev tools ----------

function simulateEdit() {
  const combatDebts = state.sheet.filter(d => d.type === 'combat');
  if (combatDebts.length === 0) return;
  const target = combatDebts[Math.floor(Math.random() * combatDebts.length)];
  const delta = Math.floor(Math.random() * 40) + 10;
  const goUp = Math.random() < 0.4;
  target.balance = Math.max(0, target.balance + (goUp ? delta : -delta));
  saveState();
  showToast(`(Simulated) "${target.lexicon}" was hand-edited in the Sheet. Click Check Sync.`);
}

// ---------- Wire up ----------

document.getElementById('logBtn').addEventListener('click', openLog);
document.getElementById('simulateEditBtn').addEventListener('click', simulateEdit);
document.getElementById('checkSyncBtn').addEventListener('click', bootSequence);
document.getElementById('approveAllBtn').addEventListener('click', approveAll);
document.getElementById('world').addEventListener('click', () => document.getElementById('world').focus());

bootSequence();
