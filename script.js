const area = document.getElementById("teleportArea");
const noBtn = document.getElementById("noBtn");
const hitbox = document.getElementById("noHitbox");

// 9 spots: center, 4 corners, 4 mid-edges
const spots = [
  { x: 50, y: 50 }, // center

  { x: 10, y: 15 }, // top-left
  { x: 90, y: 15 }, // top-right
  { x: 10, y: 85 }, // bottom-left
  { x: 90, y: 85 }, // bottom-right

  { x: 50, y: 15 }, // top-middle
  { x: 50, y: 85 }, // bottom-middle
  { x: 10, y: 50 }, // left-middle
  { x: 90, y: 50 }  // right-middle
];

let currentIndex = 0;

function placeAt(index) {
  const s = spots[index];

  noBtn.style.left = s.x + "%";
  noBtn.style.top = s.y + "%";

  hitbox.style.left = s.x + "%";
  hitbox.style.top = s.y + "%";
}

function teleport() {
  if (!area || !noBtn || !hitbox) return;

  let next = currentIndex;
  while (next === currentIndex) {
    next = Math.floor(Math.random() * spots.length);
  }

  currentIndex = next;
  placeAt(currentIndex);
}

// Start in center
placeAt(currentIndex);

// Faster reaction: any movement inside the invisible zone triggers teleport
hitbox.addEventListener("mouseenter", teleport);
hitbox.addEventListener("mousemove", teleport);

// If she tries to click it anyway, also teleport
noBtn.addEventListener("pointerdown", (e) => {
  e.preventDefault();
  teleport();
});

// Mobile: touching near it should still cause teleport
hitbox.addEventListener("touchstart", teleport, { passive: true });
hitbox.addEventListener("touchmove", teleport, { passive: true });
