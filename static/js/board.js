class Board {
    constructor() {
        this.board = [
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
        ];
    }

    placeMark(row, col, mark) {
        if (this.board[row][col] === '') {
            this.board[row][col] = mark;
            console.log(`Mark placed at (${row}, ${col}): ${mark}`);
            return true;
        }
        return false;
    }

    checkWinner() {
        const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        const flatBoard = this.board.flat();

        for (let pattern of winPatterns) {
            if (
                flatBoard[pattern[0]] === flatBoard[pattern[1]] &&
                flatBoard[pattern[1]] === flatBoard[pattern[2]] &&
                flatBoard[pattern[0]] !== ''
            ) {
                return flatBoard[pattern[0]];
            }
        }
        return null;
    }
}

export default Board;
