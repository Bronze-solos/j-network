const data = {
  overall: [
    "NOTSQURMYSHI",
    "BronzeHarpy80",
    "JeffersonD44"
  ],
  mace: [],
  sword: [],
  axe: [],
  crystal: [],
  pot: [],
  netherite: [],
  diamond: [],
  uhc: [],
  tnt: []
};

const tableBody = document.querySelector("#ranking-table tbody");
const title = document.getElementById("panel-title");
const buttons = document.querySelectorAll(".modes button");

function loadMode(mode) {
  tableBody.innerHTML = "";
  title.textContent = mode === "overall"
    ? "Overall Rankings"
    : `${mode.toUpperCase()} Rankings`;

  data[mode].forEach((player, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>#${index + 1}</td>
      <td>${player}</td>
    `;
    tableBody.appendChild(row);
  });
}

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    buttons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    loadMode(btn.dataset.mode);
  });
});

loadMode("overall");
