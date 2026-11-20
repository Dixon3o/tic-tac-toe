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