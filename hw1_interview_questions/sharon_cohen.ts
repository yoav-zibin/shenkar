// Your friend is typing his name into a keyboard.
// Sometimes, when typing a character c,
// the key might get long pressed,
// and the character will be typed 1 or more times.
// You examine the typed characters of the keyboard.
// Return True if it is possible that it was your friends name,
// with some characters (possibly none) being long pressed

export function isLongPressedName(name: string, typed: string): boolean {
  let np: number = 0;
  let tp: number = 0;
  while (np < name.length && tp < typed.length) {
    if (name[np] === typed[tp]) {
      np++;
      tp++;
    } else {
      if (tp >= 1 && typed[tp] === typed[tp - 1]) {
        tp++;
      } else {
        return false;
      }
    }
  }

  if (np != name.length) {
    return false;
  } else {
    while (tp < typed.length) {
      if (typed[tp] != typed[tp - 1]) {
        return false;
      }
      tp += 1;
    }
    return true;
  }
}
