class Mark {
    constructor(name, player, size) {
        this.name = name; // マーク名 (例: 'X1', 'O2')
        this.player = player; // プレイヤー ('X' または 'O')
        this.size = size; // サイズ ('SMALL', 'MIDDLE', 'LARGE')
        this.available = true; // 利用可能かどうか
    }

    // マークを選択状態にする
    select() {
        if (!this.available) {
            alert(`${this.name} は使用済みです(ボード上に存在)！`);
            return false;
        }
        this.available = false;
        return true;
    }

    // 利用可能かどうかを返す
    isAvailable() {
        return this.available;
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
