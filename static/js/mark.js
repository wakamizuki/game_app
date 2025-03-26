class Mark {
    constructor(name, player, size) {
        this.name = name; // マーク名 (例: 'X1', 'O2')
        this.player = player; // プレイヤー ('X' または 'O')
        this.size = size; // サイズ ('SMALL', 'MIDDLE', 'LARGE')
        this.available = true; // 利用可能かどうか
    }

    _canSelect() {
        return this.available;
    }

    // マークを選択状態にする
    select() {
        if (!this._canSelect()) {
            throw new Error('このマークは選択できません！');
        }
        this.available = false;
        return this;
    }

    equals(other) {
        return (
            other instanceof Mark &&
            this.name === other.name &&
            this.player === other.player &&
            this.size === other.size
        );
    }

    // 空のマークインスタンス（ゲーム開始前やセルが空いている場合）
    static get Empty() {
        return new Mark('EMPTY', '_', 'NOTHING'); // 空マークを返す
    }
}

export default Mark;
