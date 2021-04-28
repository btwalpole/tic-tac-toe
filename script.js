const gameBoard = (function() {
    let _gameBoardArray = ['','','','','','','','',''];
    let gridSquares = document.querySelectorAll("[data-index]");

    let setArrayMember = function(index, value) {
        _gameBoardArray[parseInt(index)] = value;
    }

    let render = function() {
        for (var i=0; i<gridSquares.length; i++) {
            gridSquares[i].innerHTML = _gameBoardArray[i];
        }
    }

    let clearGrid = function() {
        for (var i=0; i<_gameBoardArray.length; i++) {
            _gameBoardArray[i]='';
        }
        render();
    }

    let isWinner = function() {
        let grid = _gameBoardArray;

        if ((grid[0] === grid[1]) && (grid[0] === grid[2]) && !(grid[0] == '') ||
            (grid[3] == grid[4]) && (grid[3] == grid[5]) && !(grid[3] == '') || 
            (grid[6] == grid[7]) && (grid[6] == grid[8]) && !(grid[6] == '') || /*rows*/ 
            grid[0] == grid[3] && grid[0] == grid[6] && !(grid[0] == '') || 
            grid[1] == grid[4] && grid[1] == grid[7] && !(grid[1] == '') ||
            grid[2] == grid[5] && grid[2] == grid[8] && !(grid[2] == '')|| /*columns*/ 
            grid[0] == grid[4] && grid[0] == grid[8] && !(grid[0] == '') || grid[2] == grid[4] && grid[2] == grid[6] && !(grid[2] == '') /*diagonals*/) {
                console.log("We have a winner!!!"); 
                return true;
        } else {
            console.log('No winner yet');
            return false;
        }
    }

    return { setArrayMember, gridSquares, render, clearGrid, isWinner };
}) ();

const gameFlow = (function() {
    let playerXTurn = true;
    let turnCount = 0;
    let statusDiv = document.querySelector('.status');

    let init = function() {
        gameBoard.render();
        _bindSquares();
        _bindRestartButton();
    }

    let _bindSquares = function() {
        for (var i=0; i<gameBoard.gridSquares.length; i++) {
            gameBoard.gridSquares[i].addEventListener('click', _takeTurn);
        }
    }

    let _unBindSquares = function() {
        for (var i=0; i<gameBoard.gridSquares.length; i++) {
            gameBoard.gridSquares[i].removeEventListener('click', _takeTurn);
        }
    }

    let _bindRestartButton = function() {
        let button = document.querySelector('.restart');
        button.addEventListener('click', _restart);
    }

    let _restart = function() {
        gameBoard.clearGrid();
        _bindSquares();
        playerXTurn = true;
        _updateStatus();
        turnCount = 0;
        statusDiv.classList.remove('game-over');

    }

    let _takeTurn = function(event) { 
        let index = event.target.getAttribute("data-index");
        if (gameBoard.gridSquares[index].innerHTML == '') {
            turnCount++;
            console.log(turnCount);
            if(playerXTurn) {
                gameBoard.setArrayMember(index, 'X');
                gameBoard.render(); //updates whole board rather than one square, not super effiecient
                playerXTurn = false;
            } else {
                gameBoard.setArrayMember(index, 'O');
                gameBoard.render(); 
                playerXTurn = true;
            }
            if (gameBoard.isWinner()) {
                _endGame(true);
            } else if (turnCount == 9) {
                _endGame(false);
            } else {
                _updateStatus();
            }
        }
    }

    let _updateStatus = function() {
        if (playerXTurn) {
            statusDiv.innerHTML = 'Player X\'s Turn';
        } else {
            statusDiv.innerHTML = 'Player O\'s Turn';
        }
    }

    let _endGame = function(winner) {
        _unBindSquares();
        if(winner) {
            if (playerXTurn) {
                statusDiv.innerHTML = 'Player O Wins!!!';
            } else {
                statusDiv.innerHTML = 'Player X Wins!!!';
            }
        } else {
            statusDiv.innerHTML = 'It\s a draw......';
        }
        statusDiv.classList.add('game-over');
    }

    return { init };
}) ();

gameFlow.init();