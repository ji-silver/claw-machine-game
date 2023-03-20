const dollsContainer = document.querySelector('.game__dolls-container');

// 인형 배열 안 객체 생성
const dollsData = [
  {src: 'img/bomb.png', point: -10},
  {src: 'img/doll1.png', point: 10},
  {src: 'img/doll2.png', point: 20},
  {src: 'img/doll3.png', point: 30},
]

//인형 생성하기
function randomDolls(count) {
  for (let i = 0; i < count; i++) {
    const index = Math.floor(Math.random() * dollsData.length);
    const dollData = dollsData[index];

    const doll = document.createElement('img');
    doll.classList.add('doll');
    doll.src = dollData.src;
    doll.setAttribute('data-point', dollData.point);
    dollsContainer.appendChild(doll);

    // 랜덤 각도 설정
    doll.style.transform = `rotate(${Math.floor(Math.random() * 361)}deg)`;


  }
}

randomDolls(35); // 인형 개수 넘겨주기



