fetch("data.json")
  .then(res => res.json())
  .then(data => {
    const modesDiv = document.getElementById("modes");
    const tiersDiv = document.getElementById("tiers");

    Object.keys(data.modes).forEach(mode => {
      const btn = document.createElement("button");
      btn.textContent = mode;
      btn.onclick = () => renderMode(mode);
      modesDiv.appendChild(btn);
    });

    function renderMode(mode) {
      tiersDiv.innerHTML = "";
      const tiers = data.modes[mode];

      Object.keys(tiers).forEach(tier => {
        const box = document.createElement("div");
        box.className = "tier";

        box.innerHTML = `
          <h2>${tier}</h2>
          <ul>
            ${tiers[tier].map(p => `<li>${p}</li>`).join("")}
          </ul>
        `;

        tiersDiv.appendChild(box);
      });
    }

    renderMode(Object.keys(data.modes)[0]);
  });
