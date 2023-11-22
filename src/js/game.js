const board = document.getElementById('game-board');

// Initialize the board
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
        // If you have an AI opponent, you might want to add its move here as well
        // Or handle it through an AJAX request to a backend
    }
}


initBoard();