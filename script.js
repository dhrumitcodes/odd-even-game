let parity = null;       // 'Odd' or 'Even'
let fingers = null;      // 1–5

let playerScore = 0;
let cpuScore = 0;

const gameArea = document.getElementById('gameArea');
const throwBtn = document.getElementById('throwBtn');

const playerScoreEl = document.getElementById('playerScore');
const cpuScoreEl    = document.getElementById('computerScore');

const resUserChoice  = document.getElementById('resUserChoice');
const resUserFingers = document.getElementById('resUserFingers');
const resCpuFingers  = document.getElementById('resCpuFingers');
const resSum         = document.getElementById('resSum');

const finalBox  = document.getElementById('finalResult');
const finalText = document.getElementById('finalText');

function selectParity(choice) {
  parity = choice;

  document.getElementById('btnOdd')
    .classList.toggle('active', choice === 'Odd');

  document.getElementById('btnEven')
    .classList.toggle('active', choice === 'Even');
}

function selectFingers(num) {
  fingers = num;

  document.querySelectorAll('.finger-btn').forEach((btn, i) => {
    btn.classList.toggle('active', i + 1 === num);
  });
}


function throwHands() {
  
  if (!parity) {
    showWarning('Pick ODD or EVEN first!');
    return;
  }

  if (!fingers) {
    showWarning('Select fingers!');
    return;
  }

  throwBtn.disabled = true;

  gameArea.classList.remove('shaking');
  gameArea.offsetHeight; // small trick to restart animation
  gameArea.classList.add('shaking');

  setTimeout(() => {
    const cpu = Math.floor(Math.random() * 5) + 1;
    const total = fingers + cpu;

    const isEven = total % 2 === 0;
    const resultParity = isEven ? 'Even' : 'Odd';

    const playerWon = resultParity === parity;

    resUserChoice.textContent  = parity;
    resUserFingers.textContent = fingers;
    resCpuFingers.textContent  = cpu;
    resSum.textContent         = `${total} (${resultParity})`;

    finalBox.classList.remove('win', 'lose');

    if (playerWon) {
      finalBox.classList.add('win');
      finalText.textContent = '🎉 You Win!';

      playerScore++;
      updateScore(playerScoreEl, playerScore);

    } else {
      finalBox.classList.add('lose');
      finalText.textContent = '💀 CPU Wins!';

      cpuScore++;
      updateScore(cpuScoreEl, cpuScore);
    }

    throwBtn.disabled = false;
  }, 550);
}

function updateScore(el, value) {
  el.textContent = value;

  el.classList.remove('score-pop');
  el.offsetHeight;
  el.classList.add('score-pop');

  el.addEventListener('animationend', () => {
    el.classList.remove('score-pop');
  }, { once: true });
}

function showWarning(msg) {
  finalBox.classList.remove('win', 'lose');

  finalText.textContent = `⚠️ ${msg}`;
  finalText.style.color = '#ffb300';

  setTimeout(() => {
    finalText.style.color = '';
  }, 1500);
}
gameArea.addEventListener('animationend', () => {
  gameArea.classList.remove('shaking');
});