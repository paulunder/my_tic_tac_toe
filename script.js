

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