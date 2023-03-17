const dollsContainer = document.querySelector('.dolls-container');
const dollsData = [
  { src: 'img/bomb.png', point: -10 },
  { src: 'img/doll1.png', point: 10 },
  { src: 'img/doll2.png', point: 20 },
  { src: 'img/doll3.png', point: 30 },
];
const dollCount = 21; // 인형 개수를 22로 변경
dollsContainer.style.flexWrap = 'wrap'; // flex-wrap을 wrap으로 설정
for (let i = dollCount - 1; i >= 0; i--) {
  const randomIndex = Math.floor(Math.random() * dollsData.length);
  const dollData = dollsData[randomIndex];
  const doll = document.createElement('img');
  doll.classList.add('doll');
  doll.src = dollData.src;
  doll.setAttribute('point', dollData.point);
  doll.style.transform = `rotate(${Math.floor(Math.random() * 360)}deg)`;
  const randomSize = Math.floor(Math.random() * 60) + 40;
  doll.style.width = `${randomSize}px`;
  doll.style.height = `${randomSize}px`;
  dollsContainer.prepend(doll);
}