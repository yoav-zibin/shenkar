function decodeStringHelper(ystring: string) {
  const totalLength: number = ystring.length;

  const startt: number = ystring.search('\\[');
  if (startt == -1) {
    return ystring;
  }
  let e: number = ystring.search('\\]');
  e++;

  const times: number = parseInt(ystring[startt - 1]);

  const strBeforeBracket: string = ystring.slice(0, startt - 1);

  const strAfterBracket: string = ystring.slice(e, totalLength);

  const strBetweenBrakcets: string = ystring.slice(startt + 1, e - 1);

  let arr33: string = '';

  for (let i: number = 0; i < times; i++) {
    arr33 += strBetweenBrakcets;
  }

  const finalArr: string = strBeforeBracket + arr33 + strAfterBracket;

  return finalArr;
}

export function decodeString(y2string: string) {
  // console.log('\nPlease enter a encoded string :\n');
  // console.log(y2string);
  let ystring = y2string;

  let startt: number = ystring.search('\\[');
  while (startt !== -1) {
    ystring = decodeStringHelper(ystring);

    startt = ystring.search('\\[');
  }

  return ystring;
}
