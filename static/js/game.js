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
        this.currentSelectedMark = null;
        this.notification = new Notification();
    }

    startGame() {
        this.gameStarted = true;
        alert('ゲームが開始されました！');
    }

    selectMark(markId, markManager) {
        if (this.currentPlayer.getMark() !== markId[0]) {
            alert('自分のマークを選択してください！');
            return false;
        }
        this.currentSelectedMark = markManager.MARKS.find(
            (mark) => mark.name === markId
        );
        if (!markManager.selectMark(markId)) {
            return false;
        }

        this.markSelected = true;
        this.notification.show(`${markId[0]} を選択しました！`);
        return true;
    }

    cellClick(row, col, board) {
        if (board.placeMark(row, col, this.currentSelectedMark)) {
            const winner = board.checkWinner();
            if (winner) {
                this.notification.show(`${winner}の勝利！`);
                alert(`${winner}の勝利！`);
                this.gameStarted = false;
            }

            this.lastPlayer = this.currentPlayer;
            this.currentPlayer =
                this.currentPlayer === this.playerX
                    ? this.playerO
                    : this.playerX;
            this.markSelected = false;
            this.currentSelectedMark = null;
            return true;
        } else {
            alert('このセルはすでに埋まっています！');
            return;
        }
    }
}

export default Game;
