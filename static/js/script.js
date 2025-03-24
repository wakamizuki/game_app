import GameController from './game_controller.js';

const gameController = new GameController();
const BOARD_SIZE = 3;

// ゲーム開始ボタン
document.getElementById("start-game-btn").addEventListener("click", () => {
    gameController.handleStart();
    resetBoardUI();
    resetMarkSelectionUI();

});

// マーク選択イベント
document.querySelectorAll('.mark-cell').forEach(cell => {
    cell.addEventListener('click', (e) => {
        const markId = e.target.id.split('-')[1];
        gameController.handleMarkSelection(markId, updateMarkSelection ); 
    });
});

// セルクリック（例）
document.querySelectorAll('.board-cell').forEach((cell, index) => {
    cell.addEventListener('click', () => {
        const row = Math.floor(index / BOARD_SIZE);
        const col = index % BOARD_SIZE;
        gameController.handleCellClick(row, col, updateBoard);
    });
});


// マークUIの更新
function updateMarkSelection(markStates) {
    for(const mark in markStates) {
        //連想配列になっている、　id="player-O1"というようになっている
        const markCell = document.getElementById(`player-${mark}`);
        if(markStates[mark]) {
            //markStates[mark]なら、選択可能である
            markCell.removeAttribute('disabled');
            markCell.classList.remove('selected');
        } else {
            console.log(mark, markStates[mark]);
            markCell.setAttribute('disabled', true);
            markCell.classList.add('selected');
        }
    }
}

// ボードUIの更新
function updateBoard(boardState, currentPlayer) {
    boardState.forEach((row, rowIndex) => {
        row.forEach((mark, colIndex) => {
            console.log(rowIndex, colIndex, mark);
            const cellIndex = rowIndex * BOARD_SIZE + colIndex;
            const cell = document.getElementById(`cell-${cellIndex}`);
            // cell.textContent = mark;  // マークを表示
            // X と O に対応するクラスを追加
            if (mark === 'X') {
                cell.classList.add('x');
                cell.classList.remove('o');
            } else if (mark === 'O') {
                cell.classList.add('o');
                cell.classList.remove('x');
            } else {
                cell.classList.remove('x', 'o');
            }
        });
    });
    document.getElementById("current-player").textContent = `現在のプレイヤー: ${currentPlayer}`;
}


// ボードをリセット
function resetBoardUI() {
    document.querySelectorAll('.board-cell').forEach(cell => {
        cell.textContent = '';  // セルをクリア
        cell.classList.remove('x', 'o');
    });
}

//　マークのリセット
function resetMarkSelectionUI() {
    document.querySelectorAll('.mark-cell').forEach(cell => {
        cell.classList.remove('selected');
        cell.removeAttribute('disabled');
    });
}
