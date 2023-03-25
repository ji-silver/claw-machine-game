const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// 인형 이미지 생성
const dolls = [
  { src: 'img/bomb.png', point: -50 },
  { src: 'img/doll1.png', point: 10 },
  { src: 'img/doll2.png', point: 20 },
  { src: 'img/doll3.png', point: 30 },
];

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

// 인형 배치
function placeDolls(count, padding) {
  const containerWidth = canvas.width;
  const containerHeight = canvas.height;
  const dollHeight = 120;
  const dollWidth = 80; // 인형의 너비

  // 인형 간격 계산
  const dollsPerRow = Math.floor(containerWidth / (dollWidth * 1.5 + padding)); // 인형의 너비를 이용하여 간격 계산
  const rowCount = Math.ceil(count / dollsPerRow);
  const space = (containerWidth - dollsPerRow * dollWidth * 1.5 - (dollsPerRow - 1) * padding) / 2;

  for (let i = 0; i < count; i++) {
    const row = Math.floor(i / dollsPerRow);
    const col = i % dollsPerRow;
    const x = space + col * (dollWidth * 1.5 + padding);
    const y = containerHeight - (row + 1) * (dollHeight + padding);
    const randomDoll = dolls[Math.floor(Math.random() * dolls.length)];
    drawDoll(x, y, randomDoll.src, dollHeight, padding);
  }
}

placeDolls(33, 15);
