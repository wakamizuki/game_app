import Player from './player.js';

class Game {
    constructor() {
        this._playerX = new Player('X');
        this._playerO = new Player('O');
        this._currentPlayer = this._playerO;
        this._lastPlayer = null;
        this._gameStarted = false;
    }

    startGame() {
        this._gameStarted = true;
        alert('ゲームが開始されました！');
    }

    endGame() {
        this._gameStarted = false;
        alert('ゲームが終了しました！');
    }

    isGameStarted() {
        return this._gameStarted;
    }

    switchPlayer() {
        this._currentPlayer =
            this._currentPlayer === this._playerX
                ? this._playerO
                : this._playerX;
    }

    getCurrentPlayer() {
        return this._currentPlayer;
    }

    checkWinner(boards) {
        return boards.checkWinner();
    }
}

export default Game;
