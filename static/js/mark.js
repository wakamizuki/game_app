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
            alert(`${this.name} はすでに選択されています！`);
            return false;
        }
        this.available = false;
        return true;
    }

    // 利用可能かどうかを返す
    isAvailable() {
        return this.available;
    }
}

export default Mark;
