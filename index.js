const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// 인형 이미지 생성
const dolls = [
  { src: "img/bomb.png", point: -50 },
  { src: "img/doll1.png", point: 10 },
  { src: "img/doll2.png", point: 20 },
  { src: "img/doll3.png", point: 30 },
];

placeDolls(35, 15); // 인형 배치 함수 호출

// 인형 그리기
function drawDoll(x, y, src, height, padding) {
  const dollImage = new Image();
  dollImage.src = src;
  const angle = Math.random() * 360; // 랜덤한 각도 생성
  dollImage.onload = function () {
    const ratio = dollImage.width / dollImage.height; // 이미지 비율 계산
    const width = height * ratio; // 비율에 따라 너비 계산
    ctx.save(); // 변형 전의 상태 저장
    ctx.translate(x + width / 2, y + height / 2); // 좌표 중심으로 이동
    ctx.rotate((angle * Math.PI) / 180); // 랜덤한 각도만큼 회전
    ctx.drawImage(dollImage, -width / 2, -height / 2, width, height);
    ctx.restore(); // 변형 전의 상태로 복원
  };
}

function placeDolls(count, padding) {
  const containerWidth = canvas.width; // 캔버스 너비
  const containerHeight = canvas.height; // 캔버스 높이
  const dollHeight = 120; // 인형 높이
  const dollWidth = 80; // 인형 너비
  // 한 줄에 배치할 인형의 수 계산
  const dollsPerRow = Math.floor(containerWidth / (dollWidth * 1.5 + padding));
  // 필요한 줄 수 계산
  const rowCount = Math.ceil(count / dollsPerRow);
  // 인형들 사이의 간격 계산
  const space =
    (containerWidth -
      dollsPerRow * dollWidth * 1.5 -
      (dollsPerRow - 1) * padding) /
    2;
  // 인형 배치
  for (let i = 0; i < count; i++) {
    const row = Math.floor(i / dollsPerRow); // 현재 인형이 속한 줄
    const col = i % dollsPerRow; // 현재 인형이 속한 열
    const x = space + col * (dollWidth * 1.5 + padding); // 인형 x 좌표
    const y = containerHeight - (row + 1) * (dollHeight + padding); // 인형 y 좌표
    const randomDoll = dolls[Math.floor(Math.random() * dolls.length)]; // 랜덤 인형 선택
    drawDoll(x, y, randomDoll.src, dollHeight, padding); // 인형 그리기
  }
}

const craneImage = new Image();
craneImage.src = "./img/crane.png";

// game__crane 이미지의 초기 위치값
let craneX = 0;
let craneY = -700;

// 키보드 이벤트 리스너 추가
let dx = 0;
let dy = 0;

document.addEventListener("keydown", function (event) {
  switch (event.keyCode) {
    case 37: // 왼쪽 화살표
      dx = -10;
      break;
    case 39: // 오른쪽 화살표
      dx = 10;
      break;
    case 32: // 스페이스바
      dy = 10;
      break;
  }
});

document.addEventListener("keyup", function (event) {
  switch (event.keyCode) {
    case 37: // 왼쪽 화살표
    case 39: // 오른쪽 화살표
      dx = 0;
      break;
  }
});

function moveCrane() {
  ctx.clearRect(craneX, craneY, 200, 1100);
  craneX += dx;
  craneY += dy;

  // 화면 밖으로 나가지 않도록 제한
  if (craneX < 0) craneX = 0;
  if (craneX > canvas.width - 200) craneX = canvas.width - 200;
  if (craneY < -1000) craneY = -1000;
  if (craneY > 0) craneY = 0;
  // 크레인 이미지 그리기
  ctx.drawImage(craneImage, craneX, craneY, 200, 1100);

  // 다음 프레임을 그리기 위해 requestAnimationFrame 호출
  requestAnimationFrame(moveCrane);
}

// 크레인 이미지 로드 후에 moveCrane 함수 호출
craneImage.onload = function () {
  moveCrane();
};
