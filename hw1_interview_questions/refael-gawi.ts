/*
 * Refael Gawi 301050365
 * Given an encoded string, return its decoded string.
 * The encoding rule is: k[encoded_string], where the encoded_string inside the square brackets
 * is being repeated exactly k times. Note that k is guaranteed to be a positive integer.
 * You may assume that the input string is always valid; No extra white spaces, square brackets are well-formed, etc.
 * Furthermore, you may assume that the original data does not contain any digits
 * and that digits are only for those repeat numbers, k. For example, there won't be input like 3a or 2[4].
 */

function calcTimesStr(str: string, openBracketIndex: number) {
  let timesStr = str[openBracketIndex - 1];
  for (let numberStartIndex: number = openBracketIndex - 2; numberStartIndex >= 0; numberStartIndex--) {
    if (str[numberStartIndex] >= '0' && str[numberStartIndex] <= '9') {
      timesStr = str[numberStartIndex] + timesStr;
    } else {
      break;
    }
  }

  return timesStr;
}

function decodeStringHelper(str: string) {
  const firstClosingBracketIndex: number = str.indexOf(']');
  let openBracketIndex: number;
  for (openBracketIndex = firstClosingBracketIndex - 1; openBracketIndex >= 0; openBracketIndex--) {
    if (str[openBracketIndex] === '[') {
      break;
    }
  }

  const timesStr: string = calcTimesStr(str, openBracketIndex);
  const times: number = +timesStr;
  const timesStrLength = timesStr.length;

  const strBeforeBracket: string = str.slice(0, openBracketIndex - timesStrLength);

  const strAfterBracket: string = str.slice(firstClosingBracketIndex + 1, str.length);

  const strBetweenBrakcets: string = str.slice(openBracketIndex + 1, firstClosingBracketIndex);

  let temp: string = '';

  for (let a: number = 0; a < times; a++) {
    temp += strBetweenBrakcets;
  }

  const finalArr: string = `${strBeforeBracket}${temp}${strAfterBracket}`;

  return finalArr;
}

export function decodeString(str: string) {
  let tempStr = str;

  let firstBracket: number = tempStr.indexOf('[');
  while (firstBracket !== -1) {
    tempStr = decodeStringHelper(tempStr);

    firstBracket = tempStr.indexOf('[');
  }

  return tempStr;
}
