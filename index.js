function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
  const dollsContainer = document.querySelector('#dolls-container');
  const dolls = Array.from(dollsContainer.querySelectorAll('img'));
  const shuffledDolls = shuffle(dolls);
  
  dollsContainer.innerHTML = '';
  shuffledDolls.forEach(doll => {
    doll.style.transform = `rotate(${Math.floor(Math.random() * 360)}deg)`;
    doll.style.transformOrigin = 'center';
    dollsContainer.appendChild(doll);
  });