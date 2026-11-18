// ===== Confetti =====
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
let pieces = [];
let animating = false;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function launchConfetti() {
  const colors = ["#ffd54a", "#ff5c8a", "#3de0c5", "#ffffff", "#8a7dff"];
  for (let i = 0; i < 160; i++) {
    pieces.push({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * canvas.height * 0.4,
      size: 6 + Math.random() * 7,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedY: 2 + Math.random() * 4,
      speedX: -2 + Math.random() * 4,
      tilt: Math.random() * Math.PI,
      spin: -0.2 + Math.random() * 0.4
    });
  }
  if (!animating) {
    animating = true;
    requestAnimationFrame(drawConfetti);
  }
}

function drawConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  pieces.forEach(function (p) {
    p.y += p.speedY;
    p.x += p.speedX;
    p.tilt += p.spin;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.tilt);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
    ctx.restore();
  });

  pieces = pieces.filter(function (p) { return p.y < canvas.height + 30; });

  if (pieces.length > 0) {
    requestAnimationFrame(drawConfetti);
  } else {
    animating = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

document.getElementById("celebrateBtn").addEventListener("click", launchConfetti);

// ===== Memory button =====
const memories = [
  "Visiting family in Mexico",
  "Going to concerts",
  "Learning how to skate",
  "Going to Chicago",
  "The moment this website finally worked!"
];

document.getElementById("memoryBtn").addEventListener("click", function () {
  const pick = memories[Math.floor(Math.random() * memories.length)];
  document.getElementById("memoryText").textContent = pick;
  launchConfetti();
});
