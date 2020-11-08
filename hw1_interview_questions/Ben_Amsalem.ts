const findClosingBracket = (input: string, startIndex: number = 0): number => {
  let numOfLeftBrackets: number = 0;
  let numOfRightBrackets: number = 0;
  let i: number = startIndex - 1;
  do {
    if (i >= input.length) {
      break; // exception invalid format
    }
    ++i;
    switch (input[i]) {
      case '[':
        ++numOfLeftBrackets;
        break;
      case ']':
        ++numOfRightBrackets;
        break;
      default:
        break;
    }
  } while (numOfLeftBrackets !== numOfRightBrackets);
  return i;
};
const decompressor = (input: string): string => {
  let i: number;
  let numOfRepeats: number = 0;
  let output: string = '';
  for (i = 0; i < input.length; ++i) {
    if (input[i].match(/[0-9]/g)) {
      numOfRepeats = numOfRepeats * 10 + parseInt(input[i]);
      continue;
    }
    if (input[i] === '[') {
      const closingIndex: number = findClosingBracket(input, i); // find the index of the closing bracket
      const start: number = i + 1;
      const end: number = closingIndex === start ? closingIndex + 1 : closingIndex;
      output += decompressor(input.substring(start, end)).repeat(numOfRepeats || 1); // recursive call
      i = closingIndex >= input.length ? input.length : closingIndex; // set i to the next index
      numOfRepeats = 0; // set numOfRepeats to be aware to limits
      continue;
    }
    output += input[i];
  }

  return output;
};
export default decompressor;
