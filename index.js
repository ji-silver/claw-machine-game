const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const scoreDisplay = document.querySelector(".score_point");

const dolls = [
  { src: "img/bomb.png", point: -50 },
  { src: "img/doll1.png", point: 10 },
  { src: "img/doll2.png", point: 20 },
  { src: "img/doll3.png", point: 30 },
];

placeDolls(14, 15);

const dollData = [];

function drawDolls() {
  dollData.forEach(function (doll) {
    if (doll.loaded) {
      const dollImage = doll.image;
      const ratio = dollImage.width / dollImage.height;
      const width = doll.height * ratio;
      ctx.save();
      ctx.translate(doll.x + width / 2, doll.y + doll.height / 2);
      ctx.rotate((doll.angle * Math.PI) / 180);
      ctx.drawImage(
        dollImage,
        -width / 2,
        -doll.height / 2,
        width,
        doll.height
      );
      ctx.restore();
    }
  });
}

function placeDolls(count, padding) {
  const containerWidth = canvas.width;
  const containerHeight = canvas.height;
  const dollHeight = 150;
  const dollWidth = 110;
  const dollsPerRow = Math.floor(containerWidth / (dollWidth * 1.5 + padding));
  const rowCount = Math.ceil(count / dollsPerRow);
  const space =
    (containerWidth -
      dollsPerRow * dollWidth * 1.5 -
      (dollsPerRow - 1) * padding) /
    2;
  for (let i = 0; i < count; i++) {
    const row = Math.floor(i / dollsPerRow);
    const col = i % dollsPerRow;
    const x = space + col * (dollWidth * 1.5 + padding);
    const y = containerHeight - (row + 1) * (dollHeight + padding);
    const randomDoll = dolls[Math.floor(Math.random() * dolls.length)];
    const angle = Math.random() * 360;
    const dollImage = new Image();
    dollImage.onload = function () {
      const ratio = dollImage.width / dollImage.height;
      const width = dollHeight * ratio;
      const doll = {
        x: x,
        y: y,
        angle: angle,
        src: randomDoll.src,
        point: randomDoll.point, // 인형의 point 값을 추가
        height: dollHeight,
        padding: padding,
        image: dollImage,
        loaded: true,
      };
      dollData.push(doll);
    };
    dollImage.src = randomDoll.src;
  }
}

console.log(dollData);

const craneImage = new Image();
craneImage.src = "./img/crane.png";

const targetWidth = 200;
const aspectRatio = craneImage.naturalWidth / craneImage.naturalHeight;
const targetHeight = targetWidth / aspectRatio;

let craneX = 0;
let craneY = -1400;
const craneWidth = targetWidth;
const craneHeight = targetHeight;

let isMovingDown = false;
const speed = 10;

let totalPoints = 0;

craneImage.onload = function () {
  draw();
  animate();
};

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawDolls();
  ctx.drawImage(craneImage, craneX, craneY, craneWidth, craneHeight);
}

function animate() {
  draw();
  requestAnimationFrame(animate);
}

document.addEventListener("keydown", function (event) {
  switch (event.keyCode) {
    case 37: // Left arrow key
      craneX = Math.max(craneX - 10, 0);
      break;
    case 39: // Right arrow key
      craneX = Math.min(craneX + 10, canvas.width - craneWidth);
      break;
    case 32: // Spacebar key
      if (!isMovingDown) {
        isMovingDown = true;
        moveDown();
      }
      break;
  }
});
function updateScoreDisplay() {
  scoreDisplay.textContent = totalPoints;
}

function moveDown() {
  if (craneY + craneHeight < canvas.height) {
    craneY += speed;
    draw();
    requestAnimationFrame(moveDown);
  } else {
    isMovingDown = false;
    const selectedDoll = dollData.find(
      (doll) =>
        craneX + craneWidth / 2 >= doll.x &&
        craneX + craneWidth / 2 <= doll.x + doll.height &&
        craneY + craneHeight >= doll.y
    );
    if (selectedDoll) {
      dollData.splice(dollData.indexOf(selectedDoll), 1);
      totalPoints += selectedDoll.point;
      updateScoreDisplay();
      moveUp();
      return;
    }
  }
}

function moveUp() {
  if (craneY > -1400) {
    craneY -= speed;
    draw();
    requestAnimationFrame(moveUp);
  }
}
