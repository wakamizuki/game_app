import Board from '../static/js/board';
import Mark from '../static/js/mark';
import Player from '../static/js/player';

describe('Board Class', () => {
    test('指定したセルにマークを配置できる', () => {
        const board = new Board();
        const mark = new Mark('X1', 'X', 'SMALL');
        board.placeMarkOnBoard(0, 0, mark);
        expect(board.boardUpper[0][0]).toEqual(mark);
    });

    test('すでにマークが配置されているセルには、同等以下の大きさのマークを配置できない', () => {
        const board = new Board();
        const mark1 = new Mark('X1', 'X', 'SMALL');
        const mark2 = new Mark('O1', 'O', 'SMALL');
        board.placeMarkOnBoard(0, 0, mark1);
        expect(() => board.placeMarkOnBoard(0, 0, mark2)).toThrowError();
    });

    test('相手のマークが配置されているセルでも、大きいマークなら配置できる', () => {
        const board = new Board();
        const mark1 = new Mark('X1', 'X', 'SMALL');
        const mark2 = new Mark('O3', 'O', 'MIDDLE');
        board.placeMarkOnBoard(0, 0, mark1);
        expect(() => board.placeMarkOnBoard(0, 0, mark2)).not.toThrowError();
    });

    test('自分のマークが配置されているセルでも、大きいマークなら配置できる', () => {
        const board = new Board();
        const mark1 = new Mark('X1', 'X', 'SMALL');
        const mark2 = new Mark('X3', 'X', 'MIDDLE');
        board.placeMarkOnBoard(0, 0, mark1);
        expect(() => board.placeMarkOnBoard(0, 0, mark2)).not.toThrowError();
    });

    test('勝者がいない場合は null を返す', () => {
        const board = new Board();
        expect(board.checkWinner()).toBeNull();
    });

    test('横一列に同じプレイヤーが持つマークが並んでいる場合は勝者が決まる', () => {
        const board = new Board();
        const mark = new Mark('X1', 'X', 'SMALL');
        const mark2 = new Mark('X2', 'X', 'SMALL');
        const mark3 = new Mark('X3', 'X', 'MIDDLE');
        const winner = mark.player;
        board.placeMarkOnBoard(0, 0, mark);
        board.placeMarkOnBoard(0, 1, mark2);
        board.placeMarkOnBoard(0, 2, mark3);
        expect(board.checkWinner()).toEqual(winner);
    });

    test('縦一列に同じプレイヤーが持つマークが並んでいる場合は勝者が決まる', () => {
        const board = new Board();
        const mark = new Mark('X1', 'X', 'SMALL');
        const mark2 = new Mark('X2', 'X', 'SMALL');
        const mark3 = new Mark('X3', 'X', 'MIDDLE');
        const winner = mark.player;
        board.placeMarkOnBoard(0, 0, mark);
        board.placeMarkOnBoard(1, 0, mark2);
        board.placeMarkOnBoard(2, 0, mark3);
        expect(board.checkWinner()).toEqual(winner);
    });

    test('斜め一列に同じプレイヤーが持つマークが並んでいる場合は勝者が決まる', () => {
        const board = new Board();
        const mark = new Mark('X1', 'X', 'SMALL');
        const mark2 = new Mark('X2', 'X', 'SMALL');
        const mark3 = new Mark('X3', 'X', 'MIDDLE');
        const winner = mark.player;
        board.placeMarkOnBoard(0, 0, mark);
        board.placeMarkOnBoard(1, 1, mark2);
        board.placeMarkOnBoard(2, 2, mark3);
        expect(board.checkWinner()).toEqual(winner);
    });

    test('横一列に異なるプレイヤーが持つマークが並んでいる場合は勝者が決まらない', () => {
        const board = new Board();
        const mark = new Mark('X1', 'X', 'SMALL');
        const mark2 = new Mark('O1', 'O', 'SMALL');
        const mark3 = new Mark('X2', 'X', 'SMALL');
        board.placeMarkOnBoard(0, 0, mark);
        board.placeMarkOnBoard(0, 1, mark2);
        board.placeMarkOnBoard(0, 2, mark3);
        expect(board.checkWinner()).toBeNull();
    });

    test('横一列に空のマークがある場合は勝者が決まらない', () => {
        const board = new Board();
        const mark = new Mark('X1', 'X', 'SMALL');
        const mark2 = new Mark('X2', 'X', 'SMALL');
        board.placeMarkOnBoard(0, 0, mark);
        board.placeMarkOnBoard(0, 2, mark2);
        expect(board.checkWinner()).toBeNull();
    });

    test('Board[row][col]に自分のマークが配置されている場合、remove可能', () => {
        const board = new Board();
        const mark = new Mark('X1', 'X', 'SMALL');
        board.placeMarkOnBoard(0, 0, mark);
        const currentPlayer = new Player('X');
        expect(() =>
            board.removeMyMarkFromBoard(0, 0, currentPlayer)
        ).not.toThrowError();
    });

    test('Board[row][col]が空の場合、removeできない', () => {
        const board = new Board();
        const currentPlayer = new Player('X');
        expect(() =>
            board.removeMyMarkFromBoard(0, 0, currentPlayer)
        ).toThrowError();
    });

    test('Board[row][col]が相手のマークの場合、removeできない', () => {
        const board = new Board();
        const mark = new Mark('O1', 'O', 'SMALL');
        board.placeMarkOnBoard(0, 0, mark);
        const currentPlayer = new Player('X');
        expect(() =>
            board.removeMyMarkFromBoard(0, 0, currentPlayer)
        ).toThrowError();
    });
});
