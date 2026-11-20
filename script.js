const gameBoard = (function() {

    let gameBoard = ["", "", "", "", "", "", "", "", ""];
    
    const getGameboard = () => gameBoard;
    const setGameboard = (i, mark) => {
        if(gameBoard[i] == ""){
            gameBoard[i] = mark;
            return true;
        }
        else{
            return false;
        }
    };
    const resetGameboard = () => gameBoard = ["", "", "", "", "", "", "", "", ""];

    return {getGameboard, setGameboard, resetGameboard};
    

})();

function createPlayer(name, mark){
    const getName = () => name;
    const getMark = () => mark;
    return {getName, getMark};
}

const winningTiles = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [2, 4, 6], [0, 4, 8]];

const gameController = (function() {

    const player1 = createPlayer("Player1", "X");
    const player2 = createPlayer("Player2", "O");
    let activePlayer = player1;

    function switchTurn(){
        if(activePlayer == player1){
            activePlayer = player2;
        }else{
            activePlayer = player1;
        }
    }

    function checkWin(){
        const thereIsAWinner = winningTiles.some(([a, b, c]) => {
            return gameBoard.getGameboard()[a] !== "" && gameBoard.getGameboard()[a] === gameBoard.getGameboard()[b] && gameBoard.getGameboard()[a] === gameBoard.getGameboard()[c];
        });
        return thereIsAWinner;
    }

    function isDraw(){
        for(let i = 0; i < gameBoard.getGameboard().length; i++){
            if(gameBoard.getGameboard()[i] == ""){
                return false;
            }
        }
        return true;
    }

    return {switchTurn, checkWin, isDraw};

})();