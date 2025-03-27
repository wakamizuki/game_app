import Mark from './mark.js';
class MarkManager {
    constructor() {
        this._MARKS = [
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
        this._markSelected = false;
        this._currentSelectedMark = null;
    }

    _isMarkSelected() {
        return this._markSelected;
    }

    selectMark(name, currentPlayer) {
        console.log('selectMark');
        console.log('currentPlayer:', currentPlayer);
        const mark = this._getMarkByName(name);

        if (this._isMarkSelected()) {
            throw new Error('マークはすでに選択されています！');
        }
        if (mark.player !== currentPlayer.getMark()) {
            throw new Error('自分のマークを選択してください！');
        }

        try {
            const selectedMark = mark.select();
            this._setCurrentSelectedMark(selectedMark);
            this._selectMark();
        } catch (error) {
            throw new Error(error);
        }
    }

    selectMarkFromBoard(name, currentPlayer) {
        const mark = this._getMarkByName(name);
        if (this._isMarkSelected()) {
            throw new Error('マークはすでに選択されています！');
        }
        if (mark.player !== currentPlayer.getMark()) {
            throw new Error('自分のマークを選択してください！');
        }
        this._setCurrentSelectedMark(mark);
        this._selectMark();
    }

    resetMark() {
        this._unselectMark();
        this._resetCurrentSelectedMark();
    }

    getMARKS() {
        return this._MARKS;
    }

    getCurrentSelectedMark() {
        if (!this._isMarkSelected()) {
            throw new Error('マークが選択されていません！');
        }
        return this._currentSelectedMark;
    }

    _getMarkByName(name) {
        const mark = this._MARKS.find((m) => m.name === name);
        if (!mark) {
            throw new Error(`マーク ${name} は存在しません！`);
        }
        return mark;
    }
    _selectMark() {
        this._markSelected = true;
    }

    _setCurrentSelectedMark(mark) {
        this._currentSelectedMark = mark;
    }

    _unselectMark() {
        this._markSelected = false;
    }

    _resetCurrentSelectedMark() {
        this._currentSelectedMark = null;
    }
}

export default MarkManager;
