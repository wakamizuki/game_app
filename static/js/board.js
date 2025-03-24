// Board.js
import Mark from './mark.js';

class Board {
    constructor() {
        // ボードの初期状態を空の Mark インスタンスで埋める
        this.board = [
            [Mark.Empty, Mark.Empty, Mark.Empty],
            [Mark.Empty, Mark.Empty, Mark.Empty],
            [Mark.Empty, Mark.Empty, Mark.Empty],
        ];
    }

    // Mark インスタンスを受け取って、ボードの指定位置に配置
    placeMark(row, col, mark) {
        // その場所が空いている場合にマークを配置
        console.log(
            this.board[row][col],
            Mark.Empty,
            this.board[row][col].equals(Mark.Empty),
            this.board[row][col] == Mark.Empty
        );
        if (this.board[row][col].equals(Mark.Empty)) {
            this.board[row][col] = mark; // Mark インスタンスを配置
            console.log(`Mark placed at (${row}, ${col}): ${mark.name}`);
            return true;
        }
        return false; // すでに埋まっている場合は失敗
    }

    // 勝者を判定
    checkWinner() {
        const winPatterns = [
            [
                [0, 0],
                [0, 1],
                [0, 2],
            ],
            [
                [1, 0],
                [1, 1],
                [1, 2],
            ],
            [
                [2, 0],
                [2, 1],
                [2, 2],
            ],
            [
                [0, 0],
                [1, 0],
                [2, 0],
            ],
            [
                [0, 1],
                [1, 1],
                [2, 1],
            ],
            [
                [0, 2],
                [1, 2],
                [2, 2],
            ],
            [
                [0, 0],
                [1, 1],
                [2, 2],
            ],
            [
                [0, 2],
                [1, 1],
                [2, 0],
            ],
        ];

        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            const markA = this.board[a[0]][a[1]];
            const markB = this.board[b[0]][b[1]];
            const markC = this.board[c[0]][c[1]];

            // すべてのマークが同じプレイヤーで、空でない場合
            if (
                !markA.equals(Mark.Empty) && // 空でない
                markA.player === markB.player && // 同じプレイヤーか
                markB.player === markC.player
            ) {
                return markA.player; // 勝者のプレイヤーを返す
            }
        }
        return null; // 勝者なし
    }

    // 現在のボードを表示（デバッグ用）
    displayBoard() {
        this.board.forEach((row) => {
            console.log(row.map((mark) => mark.name).join(' | '));
        });
    }
}

export default Board;
