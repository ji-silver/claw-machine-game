// canvas요소로 인형, 크레인 화면에 그리기
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const scoreDisplay = document.querySelector(".score_point");

// dolls 배열 객체에 뽑을 수 있는 인형 종류와 점수 정의
const dolls = [
  { src: "img/bomb.png", point: -50 },
  { src: "img/doll1.png", point: 10 },
  { src: "img/doll2.png", point: 20 },
  { src: "img/doll3.png", point: 30 },
];

const dollData = [];

// 인형 그리기
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

// 인형 배치하기
function placeDolls(count, padding) {
  const containerWidth = canvas.width;
  const containerHeight = canvas.height;
  const dollHeight = 120;
  const dollWidth = 80;
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
        point: randomDoll.point,
        height: dollHeight,
        padding: padding,
        image: dollImage,
        loaded: true,
      };
      dollData.push(doll); // 캔버스 초기화 시 초깃값 인형 정보 그대로 그리기
    };
    dollImage.src = randomDoll.src;
  }
}

// 인형 배치하기 (인형 개수, padding 값)
placeDolls(24, 15);

console.log(dollData);

const craneImage = new Image();
craneImage.src = "./img/crane.png";

const targetWidth = 200;

const aspectRatio = craneImage.naturalWidth / craneImage.naturalHeight;
const targetHeight = targetWidth / aspectRatio;

let craneX = 0;
let craneY = -1450;
const craneWidth = targetWidth;
const craneHeight = targetHeight;

let isMovingDown = false;
const speed = 10;

let totalPoints = 0;

craneImage.onload = function () {
  animate();
};

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawDolls();
  ctx.drawImage(craneImage, craneX, craneY, craneWidth, craneHeight);
}

let isMovingLeft = false;
let isMovingRight = false;

// 키보드로 크레인 조작하기
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
      } else {
        return;
      }
      break;
  }
});

function animate() {
  draw();
  requestAnimationFrame(animate);
  if (isMovingLeft) {
    craneX = Math.max(craneX - 10, 0);
  }
  if (isMovingRight) {
    craneX = Math.min(craneX + 10, canvas.width - craneWidth);
  }
}

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

function updateScoreDisplay() {
  scoreDisplay.textContent = totalPoints;
}

// 크레인 내려올 때 처리
function moveDown() {
  if (craneY + craneHeight < canvas.height) {
    craneY += speed;
    draw();
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
    isMovingDown = false;
    stopMoving();
    moveUp();
  }
}

function moveUp() {
  if (craneY > -1400) {
    craneY -= speed;
    draw();
    requestAnimationFrame(moveUp);
  } else {
    stopMoving();
  }
}

function stopMoving() {
  isMovingDown = false;
}
