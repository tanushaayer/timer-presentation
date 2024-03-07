const holes = document.querySelectorAll('.mole-hole');
const scoreBoard = document.getElementById('score');
const timeLeftDisplay = document.getElementById('time-left');
const gameTimeInput = document.getElementById('game-time');
const startButton = document.getElementById('start-button');
const moles = document.querySelectorAll('.mole');
let lastHole;
let timeLeft;
let score = 0;
let countdownTimer;

function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    if (hole === lastHole) {
        return randomHole(holes);
    }
    lastHole = hole;
    return hole;
}

function peep() {
    const time = randomTime(200, 1000); // time moles are up
    const hole = randomHole(holes);
    hole.children[0].classList.add('up');
    setTimeout(() => {
        hole.children[0].classList.remove('up');
        if (timeLeft > 0) peep();
    }, time);
}

function startGame() {
    timeLeft = parseInt(gameTimeInput.value);
    scoreBoard.textContent = 0;
    timeLeftDisplay.textContent = timeLeft;
    score = 0;
    peep();
    countdownTimer = setInterval(() => {
        timeLeft--;
        timeLeftDisplay.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(countdownTimer);
            alert(`Time's up! Your final score is ${score}`);
        }
    }, 1000);
}

function whack(e) {
    if(!e.isTrusted) return; // cheater!
    score++;
    this.classList.remove('up');
    scoreBoard.textContent = score;
}

moles.forEach(mole => mole.addEventListener('click', whack));
startButton.addEventListener('click', () => {
    // Prevent multiple games running at the same time
    if (countdownTimer) {
        clearInterval(countdownTimer);
    }
    startGame();
});
