import {movingAvg} from '../yoav_zibin';

test('movingAvg of empty arr', () => {
  expect(movingAvg(5, [])).toEqual([]);
});

test('movingAvg of sets of 1 element', () => {
  expect(movingAvg(1, [1,2,3,4,5,6])).toEqual([1,2,3,4,5,6]);
});

test('movingAvg of 6 numbers', () => {
  expect(movingAvg(5, [1,2,3,4,5,6])).toEqual([1,1.5,2,2.5,3,4]);
});

test('movingAvg of 3 numbers', () => {
  expect(movingAvg(5, [1,2,3])).toEqual([1,1.5,2]);
});