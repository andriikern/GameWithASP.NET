﻿const canvas = document.getElementById("hall_map");
const ctx = canvas.getContext("2d");
canvas.height = 480;
canvas.width = 480;

const keys = [];

const player = {
  x: 240,
  y: 240,
  width: 32,
  height: 48,
  frameX: 0,
  frameY: 0,
  speed: 10,
  moving: false,
};

const playerSprite = new Image();
playerSprite.src = "../assets/indianajones.png";
const hallMap = new Image();
hallMap.src = "../assets/hall_map.png";

function drawSprite(img, sX, xY, xW, sH, dX, dY, dW, dH) {
  ctx.drawImage(img, sX, xY, xW, sH, dX, dY, dW, dH);
}

window.addEventListener("keydown", (e) => {
  keys[e.key] = true;
  player.moving = true;
});

window.addEventListener("keyup", (e) => {
  delete keys[e.key];
  player.moving = false;
});

function movePlayer() {
  if ((keys["ArrowLeft"] || keys["a"]) && player.x > 0) {
    player.x -= player.speed;
    player.frameY = 1;
    player.moving = true;
  }
  if (
    (keys["ArrowRight"] || keys["d"]) &&
    player.x < canvas.width - player.width
  ) {
    player.x += player.speed;
    player.frameY = 2;
    player.moving = true;
  }
  if ((keys["ArrowUp"] || keys["w"]) && player.y > 0) {
    player.y -= player.speed;
    player.frameY = 3;
    player.moving = true;
  }
  if (
    (keys["ArrowDown"] || keys["s"]) &&
    player.y < canvas.height - player.height
  ) {
    player.y += player.speed;
    player.frameY = 0;
    player.moving = true;
  }
}
function handlePlayerFrame() {
  if (player.frameX < 3 && player.moving) {
    player.frameX++;
  } else {
    player.frameX = 0;
  }
}

let fps, fpsInterval, startTime, now, then, elapsed;

function startAnimating(fps) {
  fpsInterval = 1000 / fps;
  then = Date.now();
  startTime = then;
  animate();
}

function animate() {
  requestAnimationFrame(animate);
  now = Date.now();
  elapsed = now - then;
  if (elapsed > fpsInterval) {
    then = now - (elapsed % fpsInterval);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(hallMap, 0, 0);
    drawSprite(
      playerSprite,
      player.width * player.frameX,
      player.height * player.frameY,
      player.width,
      player.height,
      player.x,
      player.y,
      player.width,
      player.height
    );
    movePlayer();
    handlePlayerFrame();
  }
}

startAnimating(10);