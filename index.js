const dollsContainer = document.getElementById("dolls-container");

// 인형 이미지 경로 배열
const dollImages = ["./img/doll1.png", "./img/doll2.png", "./img/doll3.png", "./img/bomb.png"];


function RandomDolls() {

  dollsContainer.innerHTML = "";

  const dollCount = 36; // 인형 갯수

  for (let i = 0; i < dollCount; i++) { // 인형 생성하기
    const dollImg = document.createElement("img");

    dollImg.src = dollImages[Math.floor(Math.random() * dollImages.length)]; // 랜덤 생성

    dollImg.classList.add("dolls");
    dollsContainer.appendChild(dollImg);
  }
}

RandomDolls();