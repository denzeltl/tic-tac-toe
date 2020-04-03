const resultScreen = document.querySelector(".result-overlay");
const result = document.querySelector(".result");
const restart = document.querySelector(".restart");
const board = document.querySelector(".board");
const grids = document.querySelectorAll(".grid");
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
let xTurn = true;

// Functions
startGame();

function handleClick(e) {
    const grid = e.target;
    const currentSign = xTurn ? "x" : "o";
    const oppositeSign = xTurn ? "o" : "x";

    placeMark(grid, currentSign);
    if (checkWinner(currentSign)) {
        endGame(false, currentSign);
    } else if (isDraw()) {
        endGame(true);
    } else {
        setHoverSign(oppositeSign);
        switchTurn();
    }
}

function placeMark(grid, currentSign) {
    grid.classList.add(currentSign);
}

function checkWinner(currentSign) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return grids[index].classList.contains(currentSign);
        });
    });
}

function isDraw() {
    return [...grids].every(grid => {
        return grid.classList.contains("x") || grid.classList.contains("o");
    });
}

function setHoverSign(oppositeSign) {
    board.className = "board";
    board.classList.add(oppositeSign);
}

function switchTurn() {
    xTurn = !xTurn;
}

function endGame(draw, currentSign) {
    grids.forEach(grid => {
        grid.removeEventListener("click", handleClick, {
            once: true
        });
    });

    if (draw) {
        result.textContent = `It's a Draw!`;
    } else {
        result.textContent = `${currentSign.toUpperCase()}'s Win!`;
    }

    setTimeout(() => {
        resultScreen.classList.remove("hidden");
    }, 1000);
}

function startGame() {
    grids.forEach(grid => {
        grid.addEventListener("click", handleClick, {
            once: true
        });
    });

    resultScreen.classList.add("hidden");
    board.className = "board x";
    grids.forEach(grid => {
        grid.className = "grid";
    });
}

// Events
restart.addEventListener("click", startGame);
