import { drawDolls, placeDolls } from "./dolls.js";
export const dollData = [];

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const scoreDisplay = document.querySelector(".score_point");

// 인형 배치하기 (인형 개수, padding 값)
placeDolls(24, 15);

// console.log(dollData);

// 크레인
const craneImage = new Image();
craneImage.src = "./img/crane.png";

const targetWidth = 200;
const aspectRatio = craneImage.naturalWidth / craneImage.naturalHeight;
const targetHeight = targetWidth / aspectRatio;

let craneX = 0;
let craneY = -1450;
const craneWidth = targetWidth;
const craneHeight = targetHeight;

craneImage.onload = function () {
  animate();
};

function drawCrane() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawDolls();
  ctx.drawImage(craneImage, craneX, craneY, craneWidth, craneHeight);
}

//
let isMovingDown = false;
let isMovingLeft = false;
let isMovingRight = false;
const speed = 10;

let totalPoints = 0;

document.addEventListener("keydown", function (event) {
  switch (event.key) {
    case "ArrowLeft":
      isMovingLeft = true;
      break;
    case "ArrowRight":
      isMovingRight = true;
      break;
    case " ":
      if (!isMovingDown) {
        isMovingDown = true;
        moveDown();
      }
      break;
  }
});

document.addEventListener("keyup", function (event) {
  switch (event.key) {
    case "ArrowLeft":
      isMovingLeft = false;
      break;
    case "ArrowRight":
      isMovingRight = false;
      break;
  }
});

function animate() {
  drawCrane();
  requestAnimationFrame(animate);
  if (isMovingLeft) {
    craneX = Math.max(craneX - speed, 0);
  }
  if (isMovingRight) {
    craneX = Math.min(craneX + speed, canvas.width - craneWidth);
  }
}

function moveDown() {
  if (craneY + craneHeight < canvas.height) {
    craneY += speed;
    drawCrane();
    const selectedDoll = dollData.find(
      (doll) =>
        craneX + craneWidth / 2 >= doll.x &&
        craneX + craneWidth / 2 <= doll.x + doll.height &&
        craneY + craneHeight >= doll.y
    );
    if (selectedDoll) {
      stopMoving();
      dollData.splice(dollData.indexOf(selectedDoll), 1);
      totalPoints += selectedDoll.point;
      updateScoreDisplay();
      moveUp();
      return;
    }
    requestAnimationFrame(moveDown);
  } else {
    stopMoving();
    moveUp();
  }
}

function moveUp() {
  if (craneY > -1400) {
    craneY -= speed;
    drawCrane();
    requestAnimationFrame(moveUp);
  } else {
    stopMoving();
  }
}

function stopMoving() {
  isMovingDown = false;
}

function updateScoreDisplay() {
  scoreDisplay.textContent = totalPoints;
}
