// Making a move either ends the game (then <endMatchScores> must be set)
// or the game continues (then <turnIndex> must be set, which determines which player plays next).
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
  getStateScoreForIndex0(state: T, turnIndex: number): number;
}

export interface GameProps<T> {
  move: IMove<T>;
  setMove: (state: IMove<T>) => void;
  yourPlayerIndex: number;
}
export interface GameModule<T> extends AiService<T> {
  gameId: string;
  gameName: string;
  component: React.FunctionComponent<GameProps<T>>;
}

export function createInitialMove<T>(state: T): IMove<T> {
  return {endMatchScores: null, turnIndex: 0, state};
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
