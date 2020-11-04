import {isLongPressedName} from '../sharon_cohen';

test('Duplicate Letter', () => {
  expect(isLongPressedName('sharon', 'shaaron')).toEqual(true);
});

test('Diff Starting Letter', () => {
  expect(isLongPressedName('sharon', 'xharon')).toEqual(false);
});

test('Diff & Exta Letter At the end', () => {
  expect(isLongPressedName('sharon', 'sharont')).toEqual(false);
});
