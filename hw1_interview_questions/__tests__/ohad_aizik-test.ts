import {longestConsecutive} from '../ohad_aizik';

test('longestConsecutive of empty array', () => {
  expect(longestConsecutive([])).toEqual(0);
});

test('longestConsecutive of 1 element array', () => {
<<<<<<< HEAD
    expect(longestConsecutive([1])).toEqual(1);
  });
=======
  expect(longestConsecutive([1])).toEqual(1);
});
>>>>>>> 5cf954f (eslint env: jest: true)

test('longestConsecutive of 1 element array with Duplicates', () => {
  expect(longestConsecutive([2, 2, 2, 2])).toEqual(1);
});

test('longestConsecutive of 11 elements array', () => {
  expect(longestConsecutive([1, 5, 40, 41, 2, 3, 42, 44, 4, 43, 39])).toEqual(6);
});

test('longestConsecutive of 11 elements array with Duplicates', () => {
  expect(longestConsecutive([1, 3, 6, 2, 4, 4, 9, 9, 7, 7, 1])).toEqual(4);
});
