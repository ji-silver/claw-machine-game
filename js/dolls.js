// canvas요소로 인형, 크레인 화면에 그리기
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

import { dollData } from "./crane.js";

//dolls 배열 객체에 뽑을 수 있는 인형 종류와 점수 정의
export const dolls = [
  { src: "./img/bomb.png", point: -100 },
  { src: "./img/doll1.png", point: 10 },
  { src: "./img/doll2.png", point: 20 },
  { src: "./img/doll3.png", point: 30 },
];

// 인형 그리기
export function drawDolls() {
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
export async function placeDolls(count, padding) {
  const containerWidth = canvas.width;
  const containerHeight = canvas.height;
  const dollHeight = 150;
  const dollWidth = 90;
  const dollsPerRow = Math.floor(containerWidth / (dollWidth * 1.5 + padding));
  const rowCount = Math.ceil(count / dollsPerRow);
  const space =
    (containerWidth -
      dollsPerRow * dollWidth * 1.5 -
      (dollsPerRow - 1) * padding) /
    2;
  const promises = []; // Promise 배열 선언
  for (let i = 0; i < count; i++) {
    const row = Math.floor(i / dollsPerRow);
    const col = i % dollsPerRow;
    const x = space + col * (dollWidth * 1.5 + padding);
    const y = containerHeight - (row + 1) * (dollHeight + padding);
    const randomDoll = dolls[Math.floor(Math.random() * dolls.length)];
    const angle = Math.random() * 360;
    const dollImage = new Image();
    const promise = new Promise((resolve) => {
      // Promise 생성
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
        resolve(); // Promise resolve
      };
    });
    dollImage.src = randomDoll.src;
    promises.push(promise); // Promise 배열에 추가
  }
  await Promise.all(promises); // 모든 Promise가 resolve될 때까지 대기
  drawDolls(); // 인형 그리기 함수 호출
}
