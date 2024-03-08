$(document).ready(function() {
    let lastHole;
    let timeLeft;
    let score = 0;
    let countdownTimer;
    let moleTimer;

    function randomTime(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }

    function randomHole($holes) {
        const idx = Math.floor(Math.random() * $holes.length);
        const hole = $holes.eq(idx);
        if (hole[0] === lastHole) {
            return randomHole($holes);
        }
        lastHole = hole[0];
        return hole;
    }

    function showMole() {
        const time = randomTime(3000, 5000);
        const $hole = randomHole($('.mole-hole'));
        const $mole = $hole.find('img');
        $mole.attr('src', './images/image_processing20200410-20919-1qpatno.png').addClass('up');
        setTimeout(() => {
            $mole.removeClass('up');
        }, time);
    }

    function startGame() {
        let btnText = $('#start-button').text()
        $('#start-button').text("Started")
        $('#score').text(0);
        score = 0;
        timeLeft = parseInt($('#game-time').val());
        $('#time-left').text(timeLeft);
        
        if (countdownTimer) clearInterval(countdownTimer);
        if (moleTimer) clearInterval(moleTimer);

        moleTimer = setInterval(showMole, 3000);

        countdownTimer = setInterval(() => {
            timeLeft--;
            $('#time-left').text(timeLeft);
            if (timeLeft <= 0) {
                $('#gameOverSound')[0].play()
                $('#start-button').text( "Start Game")
                clearInterval(countdownTimer);
                clearInterval(moleTimer);
                alert(`Time's up! Your final score is ${score}`);

            }
        }, 1000);
    }

    $('.mole').click(function() {
        $('#whackSound')[0].play();
        $(this).attr('src', './images/dead-beaver.png');
        score++;
        setTimeout(() => {
            $(this).removeClass('up');
        }, 3000);
        $('#score').text(score);
    });

    $('#start-button').click(startGame);
});
