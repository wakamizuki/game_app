import Player from './player.js';
import Board from './board.js';
import Mark from './mark.js';
import Notification from './notification.js';
class Game {
    constructor() {
        this.board = new Board();
        this.marks = new Mark();
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

    selectMark(playerMarkId) {
        const playerMark = playerMarkId[0];
        if (this.currentPlayer.getMark() !== playerMark) {
            alert("自分のマークを選択してください！");
            return false;
        }
        if(!this.marks.selectMark(playerMarkId)) {
            return false;
        }
        this.markSelected = true;
        this.notification.show(`${playerMark} を選択しました！`);
        return true;
    }

    cellClick(row, col) {
        if (this.board.placeMark(row, col, this.currentPlayer.getMark())) {
            const winner = this.board.checkWinner();
            if (winner) {
                this.notification.show(`${winner}の勝利！`);
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
