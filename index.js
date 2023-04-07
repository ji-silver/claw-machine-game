const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

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
    const dollImage = new Image();
    dollImage.src = doll.src;
    const ratio = dollImage.width / dollImage.height;
    const width = doll.height * ratio;
    ctx.save();
    ctx.translate(doll.x + width / 2, doll.y + doll.height / 2);
    ctx.rotate((doll.angle * Math.PI) / 180);
    ctx.drawImage(dollImage, -width / 2, -doll.height / 2, width, doll.height);
    ctx.restore();
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
    dollImage.src = randomDoll.src;
    dollImage.onload = function () {
      const ratio = dollImage.width / dollImage.height;
      const width = dollHeight * ratio;
      ctx.save();
      ctx.translate(x + width / 2, y + dollHeight / 2);
      ctx.rotate((angle * Math.PI) / 180);
      ctx.drawImage(dollImage, -width / 2, -dollHeight / 2, width, dollHeight);
      ctx.restore();

      const doll = {
        x: x,
        y: y,
        angle: angle,
        src: randomDoll.src,
        point: randomDoll.point, // 인형의 point 값을 추가
        height: dollHeight,
        padding: padding,
      };
      dollData.push(doll);
    };
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

craneImage.onload = function () {
  ctx.drawImage(craneImage, craneX, craneY, craneWidth, craneHeight);
};

document.addEventListener("keydown", function (event) {
  switch (event.code) {
    case "ArrowLeft":
      craneX = Math.max(craneX - 10, 0);
      break;
    case "ArrowRight":
      craneX = Math.min(craneX + 10, canvas.width - craneWidth);
      break;
    case "Space":
      if (!isMovingDown) {
        isMovingDown = true;
        moveDown();
      }
      break;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawDolls();
  ctx.drawImage(craneImage, craneX, craneY, craneWidth, craneHeight);
});

function moveDown() {
  if (craneY + craneHeight < canvas.height) {
    craneY += speed;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawDolls();
    ctx.drawImage(craneImage, craneX, craneY, craneWidth, craneHeight);
    requestAnimationFrame(moveDown);
  } else {
    isMovingDown = false;
    const selectedDoll = dollData.find((doll) => {
      return (
        craneX + craneWidth / 2 >= doll.x &&
        craneX + craneWidth / 2 <= doll.x + doll.height &&
        craneY + craneHeight >= doll.y
      );
    });
    if (selectedDoll) {
      const index = dollData.indexOf(selectedDoll);
      dollData.splice(index, 1);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawDolls();
      ctx.drawImage(craneImage, craneX, craneY, craneWidth, craneHeight);
      console.log(
        `You got ${selectedDoll.src} for ${selectedDoll.point} points!`
      );
    } else {
      console.log("You missed!");
    }
  }
}
