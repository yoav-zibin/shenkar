import {GestureResponderEvent} from 'react-native';

// Making a move either ends the game (then <endMatchScores> must be set)
// or the game continues (then <turnIndex> must be set, which determines which player plays next).
// Always set the <state> to be the state after making the move.

export type EndMatchScores = number[] | null;
export interface IMove<T> {
  // When the match ends: turnIndex is -1 and endMatchScores is an array of scores.
  // When the match is ongoing: turnIndex is a valid index and endMatchScores to null.
  endMatchScores: EndMatchScores; // either null or an array of length <numberOfPlayers>.
  turnIndex: number;

  // <state> is the state after making the move.
  // <state> can be any plain javscript object (POJO),
  // i.e., anything that can be serialized to json
  // (e.g., you can't have DOM elements, classes, or functions in IState).
  state: T;
}

// For now, humans plays first, and then the AI.
export const HUMAN_TURN_INDEX = 0;
export const AI_TURN_INDEX = 1;

export enum GameResult {
  NO_RESULT = -1,
  HUMAN_WON,
  AI_WON,
  TIE,
}

export function getGameResult(endMatchScores: EndMatchScores) {
  if (!endMatchScores) return GameResult.NO_RESULT;
  if (endMatchScores[HUMAN_TURN_INDEX] == endMatchScores[AI_TURN_INDEX]) return GameResult.TIE;
  if (endMatchScores[HUMAN_TURN_INDEX] < endMatchScores[AI_TURN_INDEX]) return GameResult.AI_WON;
  return GameResult.HUMAN_WON;
}

export function getRelativeTouchLocation(e: GestureResponderEvent) {
  let {locationX, locationY} = e.nativeEvent;
  if (locationX == undefined) {
    // on web we have offsetX, offsetY
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const nativeE = e.nativeEvent as any;
    locationX = nativeE.offsetX;
    locationY = nativeE.offsetY;
  }
  return {locationX, locationY};
}

export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

export function deepEquals<T>(x: T, y: T) {
  return deepEqualsAny(x, y);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function deepEqualsAny(x: any, y: any) {
  // remember that NaN === NaN returns false
  // and isNaN(undefined) returns true
  if (isNaN(x) && isNaN(y) && typeof x === 'number' && typeof y === 'number') {
    return true;
  }

  // Compare primitives and functions.
  // Check if both arguments link to the same object.
  // Especially useful on the step where we compare prototypes
  if (x === y) {
    return true;
  }

  // Works in case when functions are created in constructor.
  // Comparing dates is a common scenario. Another built-ins?
  // We can even handle functions passed across iframes
  if (
    (typeof x === 'function' && typeof y === 'function') ||
    (x instanceof Date && y instanceof Date) ||
    (x instanceof RegExp && y instanceof RegExp) ||
    (x instanceof String && y instanceof String) ||
    (x instanceof Number && y instanceof Number)
  ) {
    return x.toString() === y.toString();
  }

  // At last checking prototypes as good as we can
  if (!(x instanceof Object && y instanceof Object)) {
    return false;
  }

  if (x.constructor !== y.constructor) {
    return false;
  }

  if (x.prototype !== y.prototype) {
    return false;
  }
  for (const p in y) {
    if (!(p in x)) {
      return false;
    } else if (typeof y[p] !== typeof x[p]) {
      return false;
    }
  }
  for (const p in x) {
    if (!(p in y)) {
      return false;
    } else if (typeof y[p] !== typeof x[p]) {
      return false;
    }
  }
  for (const p in x) {
    if (typeof x[p] == 'object') {
      if (!deepEqualsAny(x[p], y[p])) {
        return false;
      }
    } else if (x[p] !== y[p]) {
      return false;
    }
  }
  return true;
}
