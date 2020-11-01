import {minimumWindow} from '../Fadi_Atamny';

test('Minimum window substring test - Empty strings', () => {
  expect(minimumWindow('', '')).toEqual('');
});

test('Minimum window substring test - Empty Template', () => {
  expect(minimumWindow('ABCD', '')).toEqual('');
});

test('Minimum window substring test - Single Character', () => {
  expect(minimumWindow('a', 'a')).toEqual('a');
});

test('Minimum window substring test - Long String', () => {
  expect(minimumWindow('ADOBECODEBANC', 'ABC')).toEqual('BANC');
});

test('Minimum window substring test - Long String', () => {
  expect(minimumWindow('ASDFASDBADFGYRTWEHGRJFHGKSFGSDFWTREYZHVJ', 'ZSRQ')).toEqual(
    'ASDFASDBADFGYRTWEHGRJFHGKSFGSDFWTREYZHVJ'
  );
});

test('Minimum window substring test - Empty Long T', () => {
  expect(minimumWindow('ABCDEF', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ')).toEqual('');
});
