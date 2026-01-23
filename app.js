let data = {};
let currentMode = "Overall";

fetch("data.json")
  .then(r => r.json())
  .then(json => {
    data = json;
    buildModes();
    render();
  });

function buildModes() {
  const modes = document.getElementById("modes");
  modes.innerHTML = "";

  Object.keys(data).forEach(mode => {
    const btn = document.createElement("button");
    btn.textContent = mode;
    btn.className = "mode-btn";
    if (mode === currentMode) btn.classList.add("active");

    btn.onclick = () => {
      currentMode = mode;
      document.querySelectorAll(".mode-btn")
        .forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      render();
    };

    modes.appendChild(btn);
  });
}

function render() {
  const tiers = document.getElementById("tiers");
  tiers.innerHTML = "";

  for (let i = 1; i <= 5; i++) {
    const box = document.createElement("div");
    box.className = "tier";
    box.innerHTML = `<h3>Tier ${i}</h3>`;

    (data[currentMode][i] || []).forEach(p => {
      const el = document.createElement("div");
      el.className = "player";
      el.textContent = p;
      box.appendChild(el);
    });

    tiers.appendChild(box);
  }
}

document.getElementById("search").addEventListener("input", e => {
  const q = e.target.value.toLowerCase();
  document.querySelectorAll(".player").forEach(p => {
    p.style.display = p.textContent.toLowerCase().includes(q)
      ? "block" : "none";
  });
});
