let data;
let currentMode = null;
let currentTier = null;

const modesEl = document.getElementById("modes");
const tiersEl = document.getElementById("tiers");
const playerList = document.getElementById("player-list");
const playersTitle = document.getElementById("players-title");

fetch("data.json")
  .then(res => res.json())
  .then(json => {
    data = json;
    renderModes();
  });

function renderModes() {
  modesEl.innerHTML = "";
  Object.keys(data).forEach(mode => {
    const btn = document.createElement("button");
    btn.textContent = mode;
    btn.onclick = () => selectMode(mode, btn);
    modesEl.appendChild(btn);
  });
}

function selectMode(mode, btn) {
  currentMode = mode;
  currentTier = null;
  document.querySelectorAll("#modes button").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  renderTiers();
  playerList.innerHTML = "";
  playersTitle.textContent = "Select a tier";
}

function renderTiers() {
  tiersEl.innerHTML = "";
  const tiers = [
    "HT1","LT1",
    "HT2","LT2",
    "HT3","LT3",
    "HT4","LT4",
    "HT5","LT5"
  ];

  tiers.forEach(tier => {
    const btn = document.createElement("button");
    btn.textContent = tier;
    btn.onclick = () => selectTier(tier, btn);
    tiersEl.appendChild(btn);
  });
}

function selectTier(tier, btn) {
  currentTier = tier;
  document.querySelectorAll("#tiers button").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  renderPlayers();
}

function renderPlayers() {
  playerList.innerHTML = "";
  playersTitle.textContent = `${currentMode} — ${currentTier}`;

  const players = data[currentMode][currentTier] || [];

  if (players.length === 0) {
    const li = document.createElement("li");
    li.textContent = "No players ranked";
    playerList.appendChild(li);
    return;
  }

  players.forEach(p => {
    const li = document.createElement("li");
    li.textContent = p;
    playerList.appendChild(li);
  });
}
