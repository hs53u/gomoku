const board = document.getElementById('game-board');
const gameState = Array(15).fill(null).map(() => Array(15).fill(null));

function initBoard() {
    for (let i = 0; i < 15; i++) {
        for (let j = 0; j < 15; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.addEventListener('click', () => makeMove(i, j));
            board.appendChild(cell);
        }
    }
}

function makeMove(row, col) {
    const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
    if (!cell.classList.contains('player-mark') && !cell.classList.contains('opponent-mark')) {
        cell.classList.add('player-mark');
        gameState[row][col] = 'player'; // Update the game state
        saveGameState();
    }
}

function saveGameState() {
    fetch('/api/games', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ gameState })
    })
    .then(response => response.json())
    .then(data => console.log('Game state saved:', data))
    .catch(error => console.error('Error saving game state:', error));
}

initBoard();
