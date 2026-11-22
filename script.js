const gameBoard = (function () {

    let gameBoard = ["", "", "", "", "", "", "", "", ""];

    const getGameboard = () => gameBoard;
    const setGameboard = (i, mark) => {
        if (gameBoard[i] == "") {
            gameBoard[i] = mark;
            return true;
        }
        else {
            return false;
        }
    };
    const resetGameboard = () => gameBoard = ["", "", "", "", "", "", "", "", ""];

    return { getGameboard, setGameboard, resetGameboard };


})();

function createPlayer(name, mark) {
    const getName = () => name;
    const getMark = () => mark;
    return { getName, getMark };
}

const winningTiles = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [2, 4, 6], [0, 4, 8]];

const gameController = (function () {

    let statusMessage = "Press on Start to start the game!";
    let player1, player2, activePlayer;
    let gameOver = false;

    function startGame(name1, name2) {
        player1 = createPlayer(name1 || "Player 1", "X");
        player2 = createPlayer(name2 || "Player 2", "O");
        activePlayer = player1;
        gameOver = false;
        gameBoard.resetGameboard();
        statusMessage = "Its now " + activePlayer.getName() + " turn.";
    }

    function switchTurn() {
        if (activePlayer == player1) {
            activePlayer = player2;
        } else {
            activePlayer = player1;
        }
    }

    function checkWin() {
        const thereIsAWinner = winningTiles.some(([a, b, c]) => {
            return gameBoard.getGameboard()[a] !== "" && gameBoard.getGameboard()[a] === gameBoard.getGameboard()[b] && gameBoard.getGameboard()[a] === gameBoard.getGameboard()[c];
        });
        return thereIsAWinner;
    }

    function isDraw() {
        for (let i = 0; i < gameBoard.getGameboard().length; i++) {
            if (gameBoard.getGameboard()[i] == "") {
                return false;
            }
        }
        return true;
    }

    function play(index) {
        if (gameOver) {
            statusMessage = "The game is over!";
            return;
        }

        if (!gameOver && gameBoard.setGameboard(index, activePlayer.getMark())) {

            if (checkWin()) {
                statusMessage = "Winner is " + activePlayer.getName();
                gameOver = true;
                return gameOver;
            } else if (isDraw()) {
                statusMessage = "Its draw";
                gameOver = true;
                return gameOver;
            } else {
                switchTurn();
                statusMessage = "Its now " + activePlayer.getName() + " turn.";
            }

        } else {
            statusMessage = "That tile is already picked. Choose another one.";
        }
        return gameOver;

    }

    const getStatusMessage = () => statusMessage;

    return { play, getStatusMessage, startGame };

})();

const cdiv = document.querySelector(".placeForTiles");

const displayController = (function () {
    const startBtn = document.querySelector('button[name="start"]');
    const statusMsg = document.createElement("p");
    statusMsg.classList.add("p");

    function getNames() {
        let p1 = document.querySelector('input[name="player1"]').value.trim();
        let p2 = document.querySelector('input[name="player2"]').value.trim();
        if (p1 !== "") {
            p1 = document.querySelector('input[name="player1"]').value.trim();
        } else {
            p1 = "Player 1";
        }
        if (p2 !== "") {
            p2 = document.querySelector('input[name="player2"]').value.trim();
        } else {
            p2 = "Player 2";
        }
        return { p1, p2 };
    }

    function display() {

        cdiv.replaceChildren();
        const currentGameboard = gameBoard.getGameboard();

        //this is from Array.prototype.forEach, mark (could be name whatever) is always whats stored on that position,
        //index (could be named whatever) is always the index of that element in the array
        //and there could be 3rd argument here but i didnt need it
        currentGameboard.forEach((mark, index) => {

            let button = document.createElement("button");
            button.classList.add("tile");
            button.textContent = mark;
            button.style.fontSize = "30px";

            button.addEventListener("click", () => {
                gameController.play(index);
                display();
            });

            cdiv.appendChild(button);

        });

        statusMsg.textContent = gameController.getStatusMessage();
        statusMsg.style.textAlign = "center";
        //with this im adding statusMsg variable after the cdiv element
        cdiv.insertAdjacentElement("afterend", statusMsg);

    }


    function buttonPressed() {
        startBtn.addEventListener("click", () => {
            const { p1, p2 } = getNames();
            gameController.startGame(p1, p2);
            display();
        });
    }

    function init() {
        display();
        buttonPressed();
    }

    return { init };

})();


displayController.init();