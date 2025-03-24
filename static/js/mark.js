class Mark {
    constructor() {
        this.availableMarks = {
            'X1': true, 'X2': true, 'X3': true, 'X4': true, 'X5': true, 'X6': true, // Xマーク6個
            'O1': true, 'O2': true, 'O3': true, 'O4': true, 'O5': true, 'O6': true  // Oマーク6個
        };
        this.selectedMarks = [];  // 現在選ばれているマークを記録
    }

    // マークを選択する
    selectMark(mark) {
        if (this.selectedMarks.length >= 12) {
            alert("すべてのマークが選択されました！");
            return false; // すべてのマークが選ばれた場合、選べない
        }
        
        if (this.availableMarks[mark]) {
            this.selectedMarks.push(mark);
            this.availableMarks[mark] = false;  // 選択されたマークは利用不可に
            return true;
        } else {
            alert("このマークは使用済みです！");
            return false;
        }
    }

    // まだ選択されていないマークが残っているかどうか
    hasAvailableMarks() {
        return Object.values(this.availableMarks).includes(true);
    }

    // 現在選ばれているマークを取得
    getSelectedMarks() {
        return this.selectedMarks;
    }
}

export default Mark;
