import Game from './game.js';
import Board from './board.js';
import MarkManager from './mark_manager.js';

export default class GameController {
    constructor() {
        this.game = new Game();
    }

    handleStart() {
        this.game = new Game();
        this.board = new Board();
        this.markManager = new MarkManager();
        this.game.startGame();
        document.getElementById('current-player').textContent =
            `現在のプレイヤー: ${this.game.currentPlayer.getMark()}`;
    }

    handleMarkSelection(markId, updateMarkSelection) {
        if (!this.game.gameStarted) {
            alert('ゲームを開始してください！');
            return;
        }
        console.log(markId);
        if (this.game.markSelected) {
            alert('すでにマークを選択しています！');
            return;
        }
        if (this.game.selectMark(markId, this.markManager)) {
            updateMarkSelection(this.markManager.MARKS);
        }
    }

    handleCellClick(row, col, updateBoard) {
        if (!this.game.gameStarted) {
            alert('ゲームを開始してください！');
            return;
        }
        if (!this.game.markSelected) {
            alert('マークを選択してください！');
            return;
        }
        console.log(row, col);
        if (this.game.cellClick(row, col, this.board)) {
            updateBoard(this.board.board, this.game.currentPlayer.getMark());
        }
    }
}
