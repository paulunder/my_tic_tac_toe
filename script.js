// import confetti from 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.0.1';

const board = document.querySelector('.board');
const cells = document.querySelectorAll('.cell');
const message = document.querySelector('.message');
const playerRole = document.querySelector('.playerRole');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = Array.from(cells).indexOf(clickedCell);

    if (gameState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    clickedCell.style.backgroundColor = 'lightblue';

    checkResult();
    togglePlayer();
}

function checkResult() {
    let roundWon = false;
    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        const cellA = gameState[a];
        const cellB = gameState[b];
        const cellC = gameState[c];
        if (cellA === '' || cellB === '' || cellC === '') {
            continue;
        }
        if (cellA === cellB && cellB === cellC) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        message.textContent = `Player ${currentPlayer} wins!`;
        message.style.fontWeight = 'bold';
        message.style.fontSize = '30px';
        message.style.color = 'white';
        message.style.backgroundColor = '#4CAF50';
        message.style.padding = '10px';
        message.style.borderRadius = '5px';
        message.style.transition = 'all 0.5s';
        message.style.width = 'fit-content';
        message.style.marginLeft = 'auto';
        message.style.marginRight = 'auto';
        message.style.marginTop = '30px';
        message.style.marginBottom = '30px';
        playerRole.textContent = '';
        gameActive = false;
        animateWinningCells(
            winningCombinations[winningCombinations.findIndex(combination => {
                const [a, b, c] = combination;
                return gameState[a] === gameState[b] && gameState[b] === gameState[c];
            })
            ]
        );
        return;
    }

    if (!gameState.includes('')) {
        message.textContent = 'It\'s a tie!';
        gameActive = false;
        return;
    }
}

function togglePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    if (gameActive) {
        playerRole.textContent = `Player ${currentPlayer}'s turn`;
    } else {
        playerRole.textContent = '';
    }

}

function handleRestart() {
    message.textContent = `Player ${currentPlayer} wins!`;
    message.style.fontWeight = 'bold';
    message.style.fontSize = '30px';
    message.style.color = 'white';
    message.style.backgroundColor = '#ECECEC';
    message.style.padding = '0px';
    message.style.borderRadius = '0px';
    message.style.transition = 'all 0.5s';
    message.style.width = 'fit-content';
    message.style.marginLeft = 'auto';
    message.style.marginRight = 'auto';
    message.style.marginTop = '0px';
    message.style.marginBottom = '0px';
    gameActive = true;
    currentPlayer = 'X';
    playerRole.textContent = `Player ${currentPlayer}'s turn`;
    gameState = ['', '', '', '', '', '', '', '', ''];
    message.textContent = '';
    cells.forEach(cell => {
        cell.textContent = '';
        cell.style.backgroundColor = 'lightgray';
    });
}

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

function animateWinningCells(winningCells) {
    try {
        startConfetti();
    } catch (error) {
        console.log('Confetti not working');
    }
    winningCells.forEach(cellIndex => {
        const cell = cells[cellIndex];
        cell.classList.add('winning-cell');
        cell.animate([
            { transform: 'scale(1)', backgroundColor: 'lightgray' },
            { transform: 'scale(1.1)', backgroundColor: 'gold' },
            { transform: 'scale(1)', backgroundColor: 'gold' },
            { transform: 'scale(1.1)', backgroundColor: 'lightgray' },
            { transform: 'scale(1)', backgroundColor: 'lightgray' },
        ], {
            duration: 1000,
            iterations: 3,
            easing: 'ease-in-out',
        });
        setTimeout(() => {
            cell.classList.remove('winning-cell');
        }, 2000);
    });
}

//******************************************** */
// third party script - confetti.js - https://www.cssscript.com/confetti-falling-animation/

var maxParticleCount = 150; //set max confetti count
var particleSpeed = 2; //set the particle animation speed
var startConfetti; //call to start confetti animation
var stopConfetti; //call to stop adding confetti
var toggleConfetti; //call to start or stop the confetti animation depending on whether it's already running
var removeConfetti; //call to stop the confetti animation and remove all confetti immediately

(function () {
    startConfetti = startConfettiInner;
    stopConfetti = stopConfettiInner;
    toggleConfetti = toggleConfettiInner;
    removeConfetti = removeConfettiInner;
    var colors = ["DodgerBlue", "OliveDrab", "Gold", "Pink", "SlateBlue", "LightBlue", "Violet", "PaleGreen", "SteelBlue", "SandyBrown", "Chocolate", "Crimson"]
    var streamingConfetti = false;
    var animationTimer = null;
    var particles = [];
    var waveAngle = 0;

    function resetParticle(particle, width, height) {
        particle.color = colors[(Math.random() * colors.length) | 0];
        particle.x = Math.random() * width;
        particle.y = Math.random() * height - height;
        particle.diameter = Math.random() * 10 + 5;
        particle.tilt = Math.random() * 10 - 10;
        particle.tiltAngleIncrement = Math.random() * 0.07 + 0.05;
        particle.tiltAngle = 0;
        return particle;
    }

    function startConfettiInner() {
        var width = window.innerWidth;
        var height = window.innerHeight;
        window.requestAnimFrame = (function () {
            return window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function (callback) {
                    return window.setTimeout(callback, 16.6666667);
                };
        })();
        var canvas = document.getElementById("confetti-canvas");
        if (canvas === null) {
            canvas = document.createElement("canvas");
            canvas.setAttribute("id", "confetti-canvas");
            canvas.setAttribute("style", "position: fixed;display:block;z-index:999999;pointer-events:none;top:0;left:0;");
            document.body.appendChild(canvas);
            canvas.width = width;
            canvas.height = height;
            window.addEventListener("resize", function () {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }, true);
        }
        var context = canvas.getContext("2d");
        while (particles.length < maxParticleCount)
            particles.push(resetParticle({}, width, height));
        streamingConfetti = true;
        if (animationTimer === null) {
            (function runAnimation() {
                context.clearRect(0, 0, window.innerWidth, window.innerHeight);
                if (particles.length === 0)
                    animationTimer = null;
                else {
                    updateParticles();
                    drawParticles(context);
                    animationTimer = requestAnimFrame(runAnimation);
                }
            })();
        }
    }

    function stopConfettiInner() {
        streamingConfetti = false;
    }

    function removeConfettiInner() {
        stopConfetti();
        particles = [];
    }

    function toggleConfettiInner() {
        if (streamingConfetti)
            stopConfettiInner();
        else
            startConfettiInner();
    }

    function drawParticles(context) {
        var particle;
        var x;
        for (var i = 0; i < particles.length; i++) {
            particle = particles[i];
            context.beginPath();
            context.lineWidth = particle.diameter;
            context.strokeStyle = particle.color;
            x = particle.x + particle.tilt;
            context.moveTo(x + particle.diameter / 2, particle.y);
            context.lineTo(x, particle.y + particle.tilt + particle.diameter / 2);
            context.stroke();
        }
    }

    function updateParticles() {
        var width = window.innerWidth;
        var height = window.innerHeight;
        var particle;
        waveAngle += 0.01;
        for (var i = 0; i < particles.length; i++) {
            particle = particles[i];
            if (!streamingConfetti && particle.y < -15)
                particle.y = height + 100;
            else {
                particle.tiltAngle += particle.tiltAngleIncrement;
                particle.x += Math.sin(waveAngle);
                particle.y += (Math.cos(waveAngle) + particle.diameter + particleSpeed) * 0.5;
                particle.tilt = Math.sin(particle.tiltAngle) * 15;
            }
            if (particle.x > width + 20 || particle.x < -20 || particle.y > height) {
                if (streamingConfetti && particles.length <= maxParticleCount)
                    resetParticle(particle, width, height);
                else {
                    particles.splice(i, 1);
                    i--;
                }
            }
        }
    }
})();
//******************************************** */
