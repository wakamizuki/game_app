class Notification {
    constructor() {
        this.notification = document.getElementById('notification');
        this.messageElement = document.getElementById('notification-message');
    }

    // 通知を表示するメソッド
    show(message) {
        console.log('通知を表示: ', message); // 確認用にログを表示
        this.messageElement.textContent = message;
        this.notification.classList.remove('hidden'); // hiddenクラスを削除
        this.notification.classList.add('visible'); // visibleクラスを追加
        // 3秒後に通知を非表示にする
        setTimeout(() => {
            this.notification.classList.remove('visible'); // visibleクラスを削除
            this.notification.classList.add('hidden'); // hiddenクラスを追加
        }, 3000); // 3秒後に非表示
    }
}
export default Notification;
