import confusingNumbers from '../avishai_nudelman';

test('confusing numbers between 1 to 1', () => {
  expect(confusingNumbers(1)).toEqual(0);
});

test('confusing numbers between 1 to 5', () => {
  expect(confusingNumbers(5)).toEqual(0);
});

test('confusing numbers between 1 to 6', () => {
  expect(confusingNumbers(6)).toEqual(1);
});

test('confusing numbers between 1 to 9', () => {
  expect(confusingNumbers(9)).toEqual(2);
});

test('confusing numbers between 1 to 19', () => {
  expect(confusingNumbers(19)).toEqual(4);
});

test('confusing numbers between 1 to 70', () => {
  expect(confusingNumbers(69)).toEqual(9);
});
