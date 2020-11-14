import {decodeString} from '../decode-string';

test('when the string is a it should return a', () => {
  expect(decodeString('a')).toEqual('a');
});

test('when the string is 3[a] it should return aaa', () => {
  expect(decodeString('3[a]')).toEqual('aaa');
});

test('when the string is 3[a]b it should return aaab', () => {
  expect(decodeString('3[a]b')).toEqual('aaab');
});

test('when the string is 3[ab] it should return ababab', () => {
  expect(decodeString('3[ab]')).toEqual('ababab');
});

test('when the string is 3[aa]2[b] it should return aaaaaabb', () => {
  expect(decodeString('3[aa]2[b]')).toEqual('aaaaaabb');
});

xtest('when the string is 3[a2[c] it should return accaccacc', () => {
  expect(decodeString('3[a2[c]]')).toEqual('accaccacc');
});
