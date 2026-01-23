let data;
let currentMode = "overall";

fetch("data.json")
  .then(res => res.json())
  .then(json => {
    data = json;
    render();
  });

document.querySelectorAll(".modes button").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector(".modes .active").classList.remove("active");
    btn.classList.add("active");
    currentMode = btn.dataset.mode;
    render();
  });
});

function render() {
  const list = data[currentMode];
  const featured = document.getElementById("featured");
  const rankings = document.getElementById("rankings");

  featured.innerHTML = "";
  rankings.innerHTML = "";

  if (!list || list.length === 0) return;

  // FEATURED #1
  const top = list[0];
  featured.innerHTML = `
    <div class="featured">
      <div class="rank">#1</div>
      <div class="name">${top.name}</div>
      <div class="rating">Rating: ${top.rating}</div>
    </div>
  `;

  // REST
  list.slice(1).forEach((p, i) => {
    rankings.innerHTML += `
      <div class="rank-card">
        <span class="pos">#${i + 2}</span>
        <span>${p.name}</span>
        <span>${p.rating}</span>
      </div>
    `;
  });
}
