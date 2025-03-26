// Board.js
import Mark from './mark.js';

class Board {
    constructor() {
        // ボードの初期状態を空の Mark インスタンスで埋める
        this.boardUpper = [
            [Mark.Empty, Mark.Empty, Mark.Empty],
            [Mark.Empty, Mark.Empty, Mark.Empty],
            [Mark.Empty, Mark.Empty, Mark.Empty],
        ];
        this.boardCenter = [
            [Mark.Empty, Mark.Empty, Mark.Empty],
            [Mark.Empty, Mark.Empty, Mark.Empty],
            [Mark.Empty, Mark.Empty, Mark.Empty],
        ];
        this.boardLower = [
            [Mark.Empty, Mark.Empty, Mark.Empty],
            [Mark.Empty, Mark.Empty, Mark.Empty],
            [Mark.Empty, Mark.Empty, Mark.Empty],
        ];
    }

    _canPlaceMark(row, col, mark) {
        const currentMark = this.boardUpper[row][col];
        console.log('markと現在の一番上にあるマーク:', mark, currentMark);
        return mark.isBiggerThan(currentMark);
    }

    _shiftMarkDown(row, col, mark) {
        this.boardLower[row][col] = this.boardCenter[row][col];
        this.boardCenter[row][col] = this.boardUpper[row][col];
        this.boardUpper[row][col] = mark;
    }

    // Mark インスタンスを受け取って、ボードの指定位置に配置
    placeMarkOnBoard(row, col, mark) {
        // その場所が空いている場合にマークを配置
        console.log(
            this.boardUpper[row][col],
            Mark.Empty,
            this.boardUpper[row][col].equals(Mark.Empty),
            this.boardUpper[row][col] == Mark.Empty
        );
        if (!this._canPlaceMark(row, col, mark)) {
            throw new Error(
                'そのセルはすでに埋まっているか、選択したマークよりも大きいマークが配置されています！'
            );
        }
        this._shiftMarkDown(row, col, mark);
        this.boardUpper[row][col] = mark; // Mark インスタンスを配置
        console.log(`Mark placed at (${row}, ${col}): ${mark.name}`);
        return this;
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
            const markA = this.boardUpper[a[0]][a[1]];
            const markB = this.boardUpper[b[0]][b[1]];
            const markC = this.boardUpper[c[0]][c[1]];

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
}

export default Board;
