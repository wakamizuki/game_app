import Mark from '../static/js/mark.js';

describe('Mark Class', () => {
    test('一度選択されたマークは2度と選択できない', () => {
        const mark = new Mark('X1', 'X', 'SMALL');
        expect(mark._canSelect()).toBe(true);

        mark.select();

        expect(mark._canSelect()).toBe(false);
        expect(() => mark.select()).toThrowError(Error);
    });

    test('マークの比較', () => {
        const mark1 = new Mark('X1', 'X', 'SMALL');
        const mark2 = new Mark('X1', 'X', 'SMALL');
        const mark3 = new Mark('O1', 'O', 'MIDDLE');

        expect(mark1.equals(mark2)).toBe(true);
        expect(mark1.equals(mark3)).toBe(false);
    });
});
