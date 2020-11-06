import {matrixLongestIncreasinPath} from '../barak-daniel';

test('Longest increasing path in matrix', () => {
  expect(
    matrixLongestIncreasinPath(
      [
        [0, 1, 2, 3, 4, 5],
        [0, 0, 0, 0, 0, 0],
      ],
      2,
      6
    )
  ).toEqual(5);
});

test('Longest increasing path in matrix', () => {
  expect(
    matrixLongestIncreasinPath(
      [
        [0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0],
        [2, 0, 0, 0, 0, 0],
        [3, 0, 0, 0, 0, 0],
      ],
      4,
      6
    )
  ).toEqual(3);
});

test('Longest increasing path in matrix', () => {
  expect(
    matrixLongestIncreasinPath(
      [
        [0, 1, 2, 3],
        [0, 0, 0, 4],
      ],
      2,
      4
    )
  ).toEqual(4);
});

test('Longest increasing path in matrix', () => {
  expect(
    matrixLongestIncreasinPath(
      [
        [0, 1, 1],
        [1, 2, 1],
        [1, 3, 1],
        [1, 4, 5],
      ],
      4,
      3
    )
  ).toEqual(5);
});
