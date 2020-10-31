// pull score from localStorage
const score = localStorage.getItem('score');
// display on screen
const showScore = document.getElementById("showScore");
showScore.innerText = score;