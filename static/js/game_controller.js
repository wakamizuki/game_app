import Game from './game.js';
import Board from './board.js';
import MarkManager from './mark_manager.js';
import Notification from './notification.js';


export default class GameController {
    constructor() {
        this.game = new Game();
    }
    
    handleStart() {
        this.game = new Game();
        this.boards = new Board();
        this.markManager = new MarkManager();
        this.notification = new Notification();
        this.game.startGame();
        document.getElementById('current-player').textContent =
            `現在のプレイヤー: ${this.game._currentPlayer.getMark()}`;
    }

    handleMarkSelection(markId, updateMarkSelectionUI) {
        if(!(this.game.isGameStarted())){
            alert('ゲームを開始してください！');
            return;
        }
        try{
            const currentPlayer = this.game.getCurrentPlayer();
            this.markManager.selectMark(markId, currentPlayer);
            updateMarkSelectionUI(this.markManager.getMARKS());
        }catch(e){
            alert(e.message);
            return;
        }
    }

    handleCellClick(row, col, updateBoardUI) {
        if (!this.game.isGameStarted()) {
            alert('ゲームを開始してください！');
            return;
        }
        try{
            const currentSelectedMark = this.markManager.getCurrentSelectedMark();
            this.boards.placeMarkOnBoard(row, col, currentSelectedMark);
            this.markManager.resetMark();
            updateBoardUI(this.boards.boardUpper, this.game.getCurrentPlayer().getMark());
            this._checkAndHandleGameEnd();
        }catch(e){
            alert(e.message);
            return;
        };
    }

    // ゲーム終了の確認と処理
    _checkAndHandleGameEnd() {
        const winner = this.boards.checkWinner();
        if (winner) {
            this.notification.show(`${winner}の勝利！`);
            alert(`${winner}の勝利！`);
            this.game.endGame(); // ゲームを終了
        } else{
            this.game.switchPlayer();
            document.getElementById('current-player').textContent =
                `現在のプレイヤー: ${this.game.getCurrentPlayer().getMark()}`;
        }
    }

}
