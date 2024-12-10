let gameBoard = document.getElementById('game-board');
let gridSize = 5;
let gameState = [];

function generatePuzzle() {
    // Initialize the grid state
    for (let i = 0; i < gridSize; i++) {
        gameState[i] = [];
        for (let j = 0; j < gridSize; j++) {
            gameState[i][j] = false; // All cells start as "off"
        }
    }

    // Randomly toggle squares to make the puzzle solvable
    let clickCount = Math.floor(Math.random() * 10) + 10; // Random number of clicks
    for (let i = 0; i < clickCount; i++) {
        let row = Math.floor(Math.random() * gridSize);
        let col = Math.floor(Math.random() * gridSize);
        toggleSquare(row, col); // Simulate a click
    }

    // Add event listeners for user interactions
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            let square = gameBoard.rows[i].cells[j];
            square.addEventListener('click', () => {
                toggleSquare(i, j); // Toggle the clicked square
                if (isSolved()) {
                    window.alert('You win!');
                }
            });
        }
    }
}

// Toggle the state of a square and its neighbors
function toggleSquare(row, col) {
    // Toggle the clicked square
    gameState[row][col] = !gameState[row][col];
    updateSquare(row, col);

    // Toggle the neighbors
    let neighbors = [
        [-1, 0], [1, 0], [0, -1], [0, 1]
    ];
    neighbors.forEach(([dx, dy]) => {
        let newRow = row + dx;
        let newCol = col + dy;
        if (newRow >= 0 && newRow < gridSize && newCol >= 0 && newCol < gridSize) {
            gameState[newRow][newCol] = !gameState[newRow][newCol];
            updateSquare(newRow, newCol);
        }
    });
}

// Update the square's appearance based on its state
function updateSquare(row, col) {
    let square = gameBoard.rows[row].cells[col];
    if (gameState[row][col]) {
        square.classList.add('is-off');
    } else {
        square.classList.remove('is-off');
    }
}

// Check if the puzzle is solved (all squares are off)
function isSolved() {
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            if (!gameState[i][j]) {
                return false; // If any square is not off, the puzzle is not solved
            }
        }
    }
    return true; // All squares are off
}

generatePuzzle();
