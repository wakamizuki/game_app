import Mark from './mark.js';
class MarkManager {
    constructor() {
        this.MARKS = [
            new Mark('X1', 'X', 'SMALL'),
            new Mark('X2', 'X', 'SMALL'),
            new Mark('X3', 'X', 'MIDDLE'),
            new Mark('X4', 'X', 'MIDDLE'),
            new Mark('X5', 'X', 'LARGE'),
            new Mark('X6', 'X', 'LARGE'),
            new Mark('O1', 'O', 'SMALL'),
            new Mark('O2', 'O', 'SMALL'),
            new Mark('O3', 'O', 'MIDDLE'),
            new Mark('O4', 'O', 'MIDDLE'),
            new Mark('O5', 'O', 'LARGE'),
            new Mark('O6', 'O', 'LARGE'),
        ];
    }

    // マークを選択する
    selectMark(name) {
        const mark = this.MARKS.find((m) => m.name === name);
        if (!mark) {
            throw new Error(`マーク ${name} は存在しません！`);
        }

        if (!mark.select()) {
            return false;
        }

        return true;
    }

    // 指定プレイヤーの利用可能なマークを取得する
    getAvailableMarks(player) {
        return this.MARKS.filter(
            (mark) => mark.player === player && mark.isAvailable()
        );
    }

    // 全ての選択済みマークを取得する
    getSelectedMarks() {
        return this.MARKS.filter((mark) => !mark.isAvailable());
    }

    // 全てのマークが選択済みかを確認
    areAllMarksSelected() {
        return this.MARKS.every((mark) => !mark.isAvailable());
    }
}

export default MarkManager;
