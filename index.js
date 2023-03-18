const dollsContainer = document.querySelector('.dolls-container');

// 인형 배열 안 객체 생성
const dollsData = [
  {src: 'img/bomb.png', point: -10},
  {src: 'img/doll1.png', point: 10},
  {src: 'img/doll2.png', point: 20},
  {src: 'img/doll3.png', point: 30},
]

function randomDolls(count) {
  for (let i = 0; i < count; i++) {
    const index = Math.floor(Math.random() * dollsData.length); // index 랜덤 생성
    const dollData = dollsData[index]; // dollsData 배열 안에 랜덤 index 넣기

    const doll = document.createElement('img');
    doll.classList.add('doll'); // 이미지에 doll class 넣기
    doll.src = dollData.src;
    doll.setAttribute('data-point', dollsData.point); // 포인트값 저장
    dollsContainer.appendChild(doll);

    doll.style.transform = `rotate(${Math.floor(Math.random() * 360)}deg)`; // 랜덤으로 각도 틀기

    const dollSize = Math.floor(Math.random() * 45) + 30; // 0 이상 44이하 정수 + 30 (30 이상 74이하)
    doll.style.width = `${dollSize}px`;
  }
}
randomDolls(35); // 인형 개수 넘겨주기



