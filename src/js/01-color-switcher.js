function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

let timer;

function changeColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}

function onStartClick(evt) {
  btnStartRef.disabled = true;
  btnStopRef.disabled = !btnStartRef.disabled;
  timer = setInterval(changeColor, 1000);
  changeColor();
}

function onStopClick(evt) {
  btnStartRef.disabled = false;
  btnStopRef.disabled = !btnStartRef.disabled;
  clearInterval(timer);
}

const btnStartRef = document.querySelector("[data-start]");
const btnStopRef = document.querySelector("[data-stop]");
btnStopRef.disabled = true;


btnStartRef.addEventListener('click', onStartClick);
btnStopRef.addEventListener('click', onStopClick);
