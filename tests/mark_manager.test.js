import Mark from '../static/js/mark.js';
import MarkManager from '../static/js/mark_manager.js';
import Player from '../static/js/player.js';

describe('MarkManager Class', () => {
    test('マークが選択していない状態でgetCurrentSelectedMarkを呼び出すとエラーが発生する', () => {
        const markManager = new MarkManager();
        expect(markManager._isMarkSelected()).toBe(false);
        expect(() => markManager.getCurrentSelectedMark()).toThrowError(Error);
    });

    test('マークが選択している状態でgetCurrentSelectedMarkを呼び出すと、選択されているマークが返される', () => {
        const markManager = new MarkManager();
        markManager.selectMark('X1', new Player('X'));
        let selectedMark = new Mark('X1', 'X', 'SMALL');
        selectedMark.select();
        expect(markManager.getCurrentSelectedMark()).toEqual(selectedMark);
    });

    test('マークが選択されていない状態でselectMarkを呼び出すとエラーが発生しない', () => {
        const markManager = new MarkManager();
        expect(markManager._isMarkSelected()).toBe(false);
        expect(() =>
            markManager.selectMark('X1', new Player('X'))
        ).not.toThrowError(Error);
    });

    test('マークが選択肢ている状態で、再度selectMarkを呼び出すとエラーが発生する', () => {
        const markManager = new MarkManager();
        expect(markManager._isMarkSelected()).toBe(false);
        markManager.selectMark('X1', new Player('X'));
        expect(markManager._isMarkSelected()).toBe(true);
        let selectedMark = new Mark('X1', 'X', 'SMALL');
        selectedMark.select();
        expect(markManager.getCurrentSelectedMark()).toEqual(selectedMark);
        expect(() =>
            markManager.selectMark('X1', new Player('X'))
        ).toThrowError(Error);
    });

    test('マークが選択されていない状態でresetMarkを呼び出すとエラーが発生しない', () => {
        const markManager = new MarkManager();
        expect(markManager._isMarkSelected()).toBe(false);
        expect(() => markManager.resetMark()).not.toThrowError(Error);
    });

    test('自分のマーク以外を選択しようとするとエラーが発生する', () => {
        const markManager = new MarkManager();
        const currentPlayer = new Player('X');
        expect(() => markManager.selectMark('O1', currentPlayer)).toThrowError(
            Error
        );
    });

    test('自分のマークを選択するとエラーが発生しない', () => {
        const markManager = new MarkManager();
        const currentPlayer = new Player('X');
        expect(() =>
            markManager.selectMark('X1', currentPlayer)
        ).not.toThrowError(Error);
    });

    test('存在しないMarkを選択しようとするとエラーが発生する', () => {
        const markManager = new MarkManager();
        const currentPlayer = new Player('X');
        expect(() => markManager.selectMark('X7', currentPlayer)).toThrowError(
            Error
        );
    });
});
