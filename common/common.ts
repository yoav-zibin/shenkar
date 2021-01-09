// Making a move either ends the game (then <endMatchScores> must be set)
// or the game continues (then <turnIndex> must be set, which determines which player plays next).

import {useEffect} from 'react';
import {LocalizeId} from './localize';
import {StyleSheet} from 'react-native';

// Always set the <state> to be the state after making the move.
export type EndMatchScores = number[] | null;
export interface IMove<T> {
  // When the match ends: turnIndex is -1 and endMatchScores is an array of scores.
  // When the match is ongoing: turnIndex is a valid index (0 or 1) and endMatchScores to null.
  endMatchScores: EndMatchScores; // either null or an array of length <numberOfPlayers>.
  turnIndex: number;

  // <state> is the state after making the move.
  // <state> can be any plain javscript object (POJO),
  // i.e., anything that can be serialized to json
  // (e.g., you can't have DOM elements, classes, or functions in IState).
  state: T;
}

export interface AiService<T> {
  initialState: T;
  // To make AI moves using alpha-beta search
  getPossibleMoves(state: T, turnIndex: number): IMove<T>[];
  // Max&min score are between -1B and 1B. (1000000000)
  getStateScoreForIndex0(state: T, turnIndex: number): number;
}

export interface GameProps<S> {
  move: IMove<S>;
  // The riddle/game ends when chosenMove.endMatchScore is not null
  // (The riddle was solved correctly if endMatchScore[yourPlayerIndex] is highest,
  // and wrongly otherwise.)
  setMove: (chosenMove: IMove<S>) => void;
  yourPlayerIndex: number;

  // For riddles: after some time that the user is stuck,
  // or if the user requests a hint,
  // we can show a hint.
  showHint: boolean;
}

export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';
export function secondsToShowHint(difficulty: Difficulty): number {
  switch (difficulty) {
    case 'EASY':
      return 10;
    case 'MEDIUM':
      return 20;
    case 'HARD':
      return 30;
  }
  throw new Error('illegal difficulty=' + difficulty);
}

export interface RiddlesLevel<S> {
  levelLocalizeId: LocalizeId;
  difficulty: Difficulty;
  riddles: S[];
  // How many moves can you make until the riddle is solved?
  // Let's do riddles with at most 5 moves (i.e., 3 moves by you and 2 by the AI opponent)
  useStoreContextmaxMovesNum: 1 | 2 | 3 | 4 | 5;
  turnIndex: number;
}

// Return true if the riddleData is correct
export type CheckRiddleData<S> = (state: S, turnIndex: number, firstMoveSolutions: IMove<S>[]) => boolean;

export interface GameModule<S> extends AiService<S> {
  gameId: string;
  gameLocalizeId: LocalizeId;
  riddleLevels: RiddlesLevel<S>[];
  checkRiddleData: CheckRiddleData<S>; // Used in a unit test checking the riddle data is correct.
  component: React.FunctionComponent<GameProps<S>>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyMove = IMove<any>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyGameModule = GameModule<any>;

export function createInitialMove<T>(state: T): IMove<T> {
  return {endMatchScores: null, turnIndex: 0, state};
}

export function randomElement<T>(arr: T[]) {
  if (arr.length == 0) throw new Error("Can't select random element from an empty arr");
  return arr[Math.floor(Math.random() * arr.length)];
}

export function toPrettyJson(obj: unknown) {
  return JSON.stringify(obj, null, 4);
}

export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

export function deepEquals<T>(x: T, y: T) {
  return deepEqualsAny(x, y);
}

export function useEffectToSetAndClearTimeout(callbackCallingTimeout: () => NodeJS.Timeout | number | null) {
  // see https://upmostly.com/tutorials/settimeout-in-react-components-using-hooks
  useEffect(() => {
    const timer = callbackCallingTimeout();
    if (timer) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return () => clearTimeout(timer as any);
    }
  });
}

export const commonStyles = StyleSheet.create({
  screen: {
    backgroundColor: 'rgb(250,250,250)',
    flex: 1,
  },
});

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
