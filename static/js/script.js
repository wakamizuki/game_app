import GameController from './game_controller.js';

const gameController = new GameController();
const BOARD_SIZE = 3;

// ゲーム開始ボタン
document.getElementById('start-game-btn').addEventListener('click', () => {
    gameController.handleStart();
    resetBoardUI();
    resetMarkSelectionUI();
});

// マーク選択イベント
document.querySelectorAll('.mark-cell').forEach((cell) => {
    cell.addEventListener('click', (e) => {
        const markName = e.target.id.split('-')[1];
        gameController.handleMarkSelection(
            markName,
            updateMarkSelectionUI,
            updateBoardUI
        );
    });
});

// セルクリック（例）
document.querySelectorAll('.board-cell').forEach((cell, index) => {
    cell.addEventListener('click', () => {
        const row = Math.floor(index / BOARD_SIZE);
        const col = index % BOARD_SIZE;
        console.log(row, col);
        gameController.handleCellClick(
            row,
            col,
            updateMarkSelectionUI,
            updateBoardUI
        );
    });
});

// マークUIの更新
function updateMarkSelectionUI(MARKS) {
    MARKS.forEach((mark) => {
        const cell = document.getElementById(`mark-${mark.name}`);
        if (mark._canSelect()) {
            cell.classList.remove('selected');
        } else {
            cell.classList.add('selected');
        }
    });
}

// ボードUIの更新
function updateBoardUI(boardState, currentPlayer) {
    console.log(boardState);
    boardState.forEach((row, rowIndex) => {
        row.forEach((mark, colIndex) => {
            console.log(rowIndex, colIndex, mark);
            const cellIndex = rowIndex * BOARD_SIZE + colIndex;
            const cell = document.getElementById(`cell-${cellIndex}`);
            // cell.textContent = mark;  // マークを表示
            // X と O に対応するクラスを追加
            if (mark.player === 'X') {
                cell.classList.add('x');
                cell.classList.remove('o');
            } else if (mark.player === 'O') {
                cell.classList.add('o');
                cell.classList.remove('x');
            } else {
                cell.classList.remove('x', 'o');
            }
            // サイズのクラスを設定
            if (mark.size === 'SMALL') {
                cell.classList.add('small');
                cell.classList.remove('middle', 'large');
            } else if (mark.size === 'MIDDLE') {
                cell.classList.add('middle');
                cell.classList.remove('small', 'large');
            } else if (mark.size === 'LARGE') {
                cell.classList.add('large');
                cell.classList.remove('small', 'middle');
            } else {
                cell.classList.remove('small', 'middle', 'large');
            }
        });
    });
    document.getElementById('current-player').textContent =
        `現在のプレイヤー: ${currentPlayer}`;
}

// ボードをリセット
function resetBoardUI() {
    document.querySelectorAll('.board-cell').forEach((cell) => {
        cell.textContent = ''; // セルをクリア
        cell.classList.remove('x', 'o');
    });
}

//　マークのリセット
function resetMarkSelectionUI() {
    document.querySelectorAll('.mark-cell').forEach((cell) => {
        cell.classList.remove('selected');
        cell.removeAttribute('disabled');
    });
}
