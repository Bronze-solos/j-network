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
  const bar = document.getElementById("modes");
  bar.innerHTML = "";

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

    bar.appendChild(btn);
  });
}

function render() {
  document.getElementById("modeTitle").textContent = currentMode;
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
