import Game from './game.js';
import Board from './board.js';
import MarkManager from './mark_manager.js';
import Notification from './notification.js';

// ゲーム進行状況を管理する Enum 的なオブジェクト
const GameStatus = Object.freeze({
    NOT_STARTED: 'NOT_STARTED', // ゲームが始まっていない
    FIRST_PLAYER_SELECT: 'FIRST_PLAYER_SELECT', // 先手がマークを選ぶターン
    FIRST_PLAYER_PLACE: 'FIRST_PLAYER_PLACE', // 先手がマークを置くターン
    SECOND_PLAYER_SELECT: 'SECOND_PLAYER_SELECT', // 後手がマークを選ぶターン
    SECOND_PLAYER_PLACE: 'SECOND_PLAYER_PLACE', // 後手がマークを置くターン
    GAME_OVER: 'GAME_OVER', // ゲームが終了した
});

export default class GameController {
    constructor() {
        this.game = new Game();
        this.GameStatus = GameStatus.NOT_STARTED;
    }

    handleStart() {
        this.game = new Game();
        this.boards = new Board();
        this.markManager = new MarkManager();
        this.notification = new Notification();
        this.game.startGame();
        this.GameStatus = GameStatus.FIRST_PLAYER_SELECT;
        document.getElementById('current-player').textContent =
            `現在のプレイヤー: ${this.game.getCurrentPlayer().getMark()}`;
    }

    handleMarkSelection(markName, updateMarkSelectionUI, updateBoardUI) {
        if (this.GameStatus === GameStatus.NOT_STARTED) {
            alert('ゲームを開始してください！');
            return;
        }
        if (
            this.GameStatus === GameStatus.FIRST_PLAYER_PLACE ||
            this.GameStatus === GameStatus.SECOND_PLAYER_PLACE
        ) {
            alert('マークを選択中です！');
            return;
        }

        try {
            const currentPlayer = this.game.getCurrentPlayer();
            this.markManager.selectMark(markName, currentPlayer);
            updateMarkSelectionUI(this.markManager.getMARKS());
            this.GameStatus =
                currentPlayer.getMark() === '0'
                    ? GameStatus.FIRST_PLAYER_PLACE
                    : GameStatus.SECOND_PLAYER_PLACE;
        } catch (e) {
            alert(e.message);
            return;
        }
    }

    async handleCellClick(row, col, updateMarkSelectionUI, updateBoardUI) {
        if (this.GameStatus === GameStatus.NOT_STARTED) {
            alert('ゲームを開始してください！');
            return;
        }
        if (
            this.GameStatus === GameStatus.FIRST_PLAYER_SELECT ||
            this.GameStatus === GameStatus.SECOND_PLAYER_SELECT
        ) {
            try {
                const currentPlayer = this.game.getCurrentPlayer();
                const removedMarkFromBoard = this.boards.removeMyMarkFromBoard(
                    row,
                    col,
                    currentPlayer
                );
                this.markManager.selectMarkFromBoard(
                    removedMarkFromBoard.name,
                    currentPlayer
                );
                // updateMarkSelectionUI(this.markManager.getMARKS());
                updateBoardUI(
                    this.boards.boardUpper,
                    this.game.getCurrentPlayer().getMark()
                );
                this.GameStatus =
                    currentPlayer.getMark() === '0'
                        ? GameStatus.FIRST_PLAYER_PLACE
                        : GameStatus.SECOND_PLAYER_PLACE;
            } catch (e) {
                alert(e.message);
                return;
            }
        } else if (
            this.GameStatus === GameStatus.FIRST_PLAYER_PLACE ||
            this.GameStatus === GameStatus.SECOND_PLAYER_PLACE
        ) {
            try {
                const currentSelectedMark =
                    this.markManager.getCurrentSelectedMark();
                this.boards.placeMarkOnBoard(row, col, currentSelectedMark);
                this.markManager.resetMark();
                await updateBoardUI(
                    this.boards.boardUpper,
                    this.game.getCurrentPlayer().getMark()
                );
                this._checkAndHandleGameEnd();
            } catch (e) {
                alert(e.message);
                return;
            }
        }
    }

    // ゲーム終了の確認と処理
    _checkAndHandleGameEnd() {
        const winner = this.boards.checkWinner();
        if (winner) {
            this.notification.show(`${winner}の勝利！`);
            alert(`${winner}の勝利！`);
            this.game.endGame(); // ゲームを終了
            this.GameStatus = GameStatus.NOT_STARTED;
        } else {
            this.game.switchPlayer();
            document.getElementById('current-player').textContent =
                `現在のプレイヤー: ${this.game.getCurrentPlayer().getMark()}`;
            this.GameStatus =
                this.game.getCurrentPlayer().getMark() === 'O'
                    ? GameStatus.FIRST_PLAYER_SELECT
                    : GameStatus.SECOND_PLAYER_SELECT;
        }
    }
}
