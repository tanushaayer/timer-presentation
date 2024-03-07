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
let moleTimer;

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

// function showMole() {
//     const time = randomTime(600, 1000); // Adjust mole up time if necessary
//     const hole = randomHole(holes);
//     hole.children[0].classList.add('up');
//     setTimeout(() => {
//         hole.children[0].classList.remove('up');
//     }, time);
// }

function showMole() {
    const time = randomTime(3000, 5000); // Adjust mole up time if necessary
    const hole = randomHole(holes);
    const mole = hole.querySelector('img');
    mole.src = './images/image_processing20200410-20919-1qpatno.png'; // Reset to live beaver image
    mole.classList.add('up');
    setTimeout(() => {
        mole.classList.remove('up');
    }, time);
}



function startGame() {
    scoreBoard.textContent = 0;
    score = 0;
    timeLeft = parseInt(gameTimeInput.value);
    timeLeftDisplay.textContent = timeLeft;
    
    // Clear any existing timers
    if (countdownTimer) clearInterval(countdownTimer);
    if (moleTimer) clearInterval(moleTimer);

    moleTimer = setInterval(showMole, 3000); // Adjust interval as needed

    countdownTimer = setInterval(() => {
        timeLeft--;
        timeLeftDisplay.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(countdownTimer);
            clearInterval(moleTimer);
            alert(`Time's up! Your final score is ${score}`);
        }
    }, 1000);
}

// function whack(e) {
//     if (!e.isTrusted) return; // Cheater detection
//     score++;
//     this.classList.remove('up');
//     scoreBoard.textContent = score;
// }
function whack(e) {
    if (!e.isTrusted) return; // Cheater detection
    this.src = './images/dead-beaver.png'; // Change to dead beaver image
    score++;
    setTimeout(() => {
        this.classList.remove('up'); // Hide mole after a delay to show dead beaver
    }, 3000); // Short delay to allow player to see the change
    scoreBoard.textContent = score;
}

moles.forEach(mole => mole.addEventListener('click', whack));
startButton.addEventListener('click', startGame);
