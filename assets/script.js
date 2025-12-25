let currentLevel = 1;

/* CAMBIO LIVELLO */
function nextLevel() {
  document
    .querySelector(`.level[data-level="${currentLevel}"]`)
    .classList.remove("active");

  currentLevel++;

  const next = document.querySelector(
    `.level[data-level="${currentLevel}"]`
  );
  next.classList.add("active");

  if (currentLevel === 3) startWalking();
  if (currentLevel === 4) startTimer();
}

/* LIVELLO 2 – DRAG */
const box = document.getElementById("box");
const track = document.getElementById("track");
let dragging = false;

function moveBox(clientX) {
  const rect = track.getBoundingClientRect();
  let x = clientX - rect.left;
  x = Math.max(0, Math.min(x, track.offsetWidth - box.offsetWidth));
  box.style.left = x + "px";

  if (x >= track.offsetWidth - box.offsetWidth - 2) {
    dragging = false;
    nextLevel();
  }
}

box.addEventListener("mousedown", () => dragging = true);
box.addEventListener("touchstart", () => dragging = true);
document.addEventListener("mouseup", () => dragging = false);
document.addEventListener("touchend", () => dragging = false);
document.addEventListener("mousemove", e => { if (dragging) moveBox(e.clientX); });
document.addEventListener("touchmove", e => { if (dragging) moveBox(e.touches[0].clientX); });

/* LIVELLO 3 – OMINO con polvere */
function startWalking() {
  const player = document.getElementById("player");
  const path = document.querySelector(".path");
  const dustContainer = document.getElementById("dust-container");

  // parte da destra
  let x = path.offsetWidth - player.offsetWidth;

  player.style.left = x + "px";

  const interval = setInterval(() => {
    x -= 1; // muove verso sinistra
    player.style.left = x + "px";

    // polvere
    const dust = document.createElement("div");
    dust.className = "dust";
    dust.style.left = x + player.offsetWidth/2 + "px"; // centrato sotto piedi
    dust.style.bottom = "0px";
    dustContainer.appendChild(dust);
    setTimeout(() => dust.remove(), 500);

    if (x <= 0) {
      clearInterval(interval);
      setTimeout(nextLevel, 500);
    }
  }, 16);
}

/* LIVELLO 4 – TIMER */
function startTimer() {
  let t = 10;
  const el = document.getElementById("timer");
  const interval = setInterval(() => {
    t--;
    el.innerText = t;
    if (t === 0) {
      clearInterval(interval);
      nextLevel();
    }
  }, 1000);
}

/* ❄️ NEVE */
const snowContainer = document.getElementById("snow");
function createSnowflake() {
  const snow = document.createElement("div");
  snow.className = "snowflake";
  snow.style.left = Math.random() * 100 + "vw";
  snow.style.animationDuration = 5 + Math.random() * 5 + "s";
  snow.style.opacity = Math.random();
  snowContainer.appendChild(snow);
  setTimeout(() => snow.remove(), 10000);
}
setInterval(createSnowflake, 200);

document.addEventListener("click", () => {
  const audio = document.getElementById("bg-music");
  if (audio.paused) audio.play();
}, { once: true });

