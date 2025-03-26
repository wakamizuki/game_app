import Game from '../static/js/game.js';
import Player from '../static/js/player.js';

jest.mock('../static/js/player'); // Playerクラスをモック化

describe('Game Class', () => {
    let game;
    global.alert = jest.fn();
    beforeEach(() => {
        game = new Game();
    });

    afterEach(() => {
        jest.clearAllMocks(); // モック状態をリセット
    });

    test('ゲーム開始状態の確認', () => {
        expect(game.isGameStarted()).toBe(false);
        game.startGame();
        expect(game.isGameStarted()).toBe(true);
    });

    test('ゲーム終了状態の確認', () => {
        game.startGame();
        game.endGame();
        expect(game.isGameStarted()).toBe(false);
    });

    test('プレイヤー切り替えの確認', () => {
        const initialPlayer = game.getCurrentPlayer();
        expect(initialPlayer).toEqual(game._playerO);

        game.switchPlayer();
        const switchedPlayer = game.getCurrentPlayer();
        expect(switchedPlayer).toEqual(game._playerX);
    });

    test('現在のプレイヤー取得の確認', () => {
        const currentPlayer = game.getCurrentPlayer();
        expect(Player).toHaveBeenCalled(); // Playerクラスが呼び出されたか確認
        expect(currentPlayer).toBeDefined();
    });

    test('勝者チェックの確認 (モック)', () => {
        const mockBoards = {
            checkWinner: jest.fn(() => 'X'),
        };

        const winner = game.checkWinner(mockBoards);
        expect(mockBoards.checkWinner).toHaveBeenCalled();
        expect(winner).toBe('X');
    });
});
