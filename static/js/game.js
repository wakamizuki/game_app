import Player from './player.js';
import Notification from './notification.js';

class Game {
    constructor() {
        this.playerX = new Player('X');
        this.playerO = new Player('O');
        this.currentPlayer = this.playerO;
        this.lastPlayer = null;
        this.gameStarted = false;
        this.markSelected = false;
        this.notification = new Notification();
    }

    startGame() {
        this.gameStarted = true;
        alert("ゲームが開始されました！");
    }

    selectMark(playerMarkId, markManager) {
        const playerMark = playerMarkId[0];
        if (this.currentPlayer.getMark() !== playerMark) {
            alert("自分のマークを選択してください！");
            return false;
        }
        if(!markManager.selectMark(playerMarkId)) {
            return false;
        }
        this.markSelected = true;
        this.notification.show(`${playerMark} を選択しました！`);
        return true;
    }

    cellClick(row, col, board) {
        if (board.placeMark(row, col, this.currentPlayer.getMark())) {
            const winner = board.checkWinner();
            if (winner) {
                this.notification.show(`${winner}の勝利！`);
                alert(`${winner}の勝利！`);
                this.gameStarted = false;
            }

            this.lastPlayer = this.currentPlayer;
            this.currentPlayer = this.currentPlayer === this.playerX ? this.playerO : this.playerX;
            this.markSelected = false;
            return true
        } else {
            alert("このセルはすでに埋まっています！");
            return ;
        }
    }
}

export default Game;
