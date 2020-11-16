import {decodeString} from '../refael-gawi';

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

test('when the string is cc3[aa]2[b] it should return ccaaaaaabb', () => {
  expect(decodeString('cc3[aa]2[b]')).toEqual('ccaaaaaabb');
});

test('when the string is 3[a2[c]] it should return accaccacc', () => {
  expect(decodeString('3[a2[c]]')).toEqual('accaccacc');
});

test('when the string is cc3[aa]2[b3[z]] it should return ccaaaaaabzzzbzzz', () => {
  expect(decodeString('cc3[aa]2[b3[z]]')).toEqual('ccaaaaaabzzzbzzz');
});

test('when the string is 2[2[2[a]]] it should return aaaaaaaa', () => {
  expect(decodeString('2[2[2[a]]]')).toEqual('aaaaaaaa');
});

test('when the string is 2[2[2[a]b]] it should return aabaabaabaab', () => {
  expect(decodeString('2[2[2[a]b]]')).toEqual('aabaabaabaab');
});

test('when the string is 2[2[2[a]b]3[H]]abc it should return aabaabHHHaabaabHHHabc', () => {
  expect(decodeString('2[2[2[a]b]3[H]]abc')).toEqual('aabaabHHHaabaabHHHabc');
});

test('when the string is 10[a] it should return aaaaaaaaaa', () => {
  expect(decodeString('10[a]')).toEqual('aaaaaaaaaa');
});

test('when the string is 10[a]10[b] it should return aaaaaaaaaabbbbbbbbbb', () => {
  expect(decodeString('10[a]10[b]')).toEqual('aaaaaaaaaabbbbbbbbbb');
});

test('when the string is c10[a] it should return caaaaaaaaaa', () => {
  expect(decodeString('c10[a]')).toEqual('caaaaaaaaaa');
});

test('when the string is c10[ab]v it should return cababababababababababv', () => {
  expect(decodeString('c10[ab]v')).toEqual('cababababababababababv');
});
