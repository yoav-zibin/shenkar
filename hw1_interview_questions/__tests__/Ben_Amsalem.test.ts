import decompressor from '../Ben_Amsalem';

test('one brackets - test decompressed', () => {
  expect(decompressor('10[a]')).toEqual('aaaaaaaaaa');
});

test('various brackets - test decompressed', () => {
  expect(decompressor('3[abc]4[ab]c')).toEqual('abcabcabcababababc');
});

test('cascaded brackets - test decompressed', () => {
  expect(decompressor('2[3[a]b]')).toEqual('aaabaaab');
});
