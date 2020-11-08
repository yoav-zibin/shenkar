import {revers} from '../ayman_Wahbani';

test('revers of empty str', () => {
  expect(revers('')).toEqual('');
});

test('revers of sets of one char in str', () => {
  expect(revers('a')).toEqual('a');
});

test('revers of Long string', () => {
  expect(revers('aymanwahbani')).toEqual('inabhawnamya');
});
