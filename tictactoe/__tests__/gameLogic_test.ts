import {IMove, deepEquals, createInitialMove} from '../../common/common';
import {Board, IState, createMove, getInitialState} from '../gameLogic';

const X_TURN = 0;
const O_TURN = 1;
const NO_ONE_TURN = -1;
const NO_ONE_WINS: number[] | null = null;
const X_WIN_SCORES = [1, 0];
const O_WIN_SCORES = [0, 1];
const TIE_SCORES = [0, 0];

function expectException(turnIndexBeforeMove: number, boardBeforeMove: Board, row: number, col: number): void {
  const stateBeforeMove: IState | null = boardBeforeMove ? {board: boardBeforeMove, delta: null} : null;
  // We expect an exception to be thrown :)
  let didThrowException = false;
  try {
    createMove(stateBeforeMove, row, col, turnIndexBeforeMove);
  } catch (e) {
    didThrowException = true;
  }
  if (!didThrowException) {
    throw new Error("We expect an illegal move, but createMove didn't throw any exception!");
  }
}

function expectMove(
  turnIndexBeforeMove: number,
  boardBeforeMove: Board | null,
  row: number,
  col: number,
  boardAfterMove: Board,
  turnIndexAfterMove: number,
  endMatchScores: number[] | null
): void {
  const expectedMove: IMove<IState> = {
    turnIndex: turnIndexAfterMove,
    endMatchScores: endMatchScores,
    state: {board: boardAfterMove, delta: {row: row, col: col}},
  };
  const stateBeforeMove: IState | null = boardBeforeMove ? {board: boardBeforeMove, delta: null} : null;
  const move: IMove<IState> = createMove(stateBeforeMove, row, col, turnIndexBeforeMove);
  expect(deepEquals(move, expectedMove)).toBe(true);
}

test('Initial move', function () {
  const move: IMove<IState> = createInitialMove(getInitialState());
  const expectedMove: IMove<IState> = {
    turnIndex: X_TURN,
    endMatchScores: NO_ONE_WINS,
    state: {
      board: [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
      ],
      delta: null,
    },
  };
  expect(deepEquals(move, expectedMove)).toBe(true);
});

test('placing X in 0x0 from initial state', function () {
  expectMove(
    X_TURN,
    null,
    0,
    0,
    [
      ['X', '', ''],
      ['', '', ''],
      ['', '', ''],
    ],
    O_TURN,
    NO_ONE_WINS
  );
});

test('placing O in 0x1 after X placed X in 0x0', function () {
  expectMove(
    O_TURN,
    [
      ['X', '', ''],
      ['', '', ''],
      ['', '', ''],
    ],
    0,
    1,
    [
      ['X', 'O', ''],
      ['', '', ''],
      ['', '', ''],
    ],
    X_TURN,
    NO_ONE_WINS
  );
});

test('placing an O in a non-empty position is illegal', function () {
  expectException(
    O_TURN,
    [
      ['X', '', ''],
      ['', '', ''],
      ['', '', ''],
    ],
    0,
    0
  );
});

test('cannot move after the game is over', function () {
  expectException(
    O_TURN,
    [
      ['X', 'O', ''],
      ['X', 'O', ''],
      ['X', '', ''],
    ],
    2,
    1
  );
});

test('placing O in 2x1', function () {
  expectMove(
    O_TURN,
    [
      ['O', 'X', ''],
      ['X', 'O', ''],
      ['X', '', ''],
    ],
    2,
    1,
    [
      ['O', 'X', ''],
      ['X', 'O', ''],
      ['X', 'O', ''],
    ],
    X_TURN,
    NO_ONE_WINS
  );
});

test('X wins by placing X in 2x0', function () {
  expectMove(
    X_TURN,
    [
      ['X', 'O', ''],
      ['X', 'O', ''],
      ['', '', ''],
    ],
    2,
    0,
    [
      ['X', 'O', ''],
      ['X', 'O', ''],
      ['X', '', ''],
    ],
    NO_ONE_TURN,
    X_WIN_SCORES
  );
});

test('O wins by placing O in 1x1', function () {
  expectMove(
    O_TURN,
    [
      ['X', 'X', 'O'],
      ['X', '', ''],
      ['O', '', ''],
    ],
    1,
    1,
    [
      ['X', 'X', 'O'],
      ['X', 'O', ''],
      ['O', '', ''],
    ],
    NO_ONE_TURN,
    O_WIN_SCORES
  );
});

test('the game ties when there are no more empty cells', function () {
  expectMove(
    X_TURN,
    [
      ['X', 'O', 'X'],
      ['X', 'O', 'O'],
      ['O', 'X', ''],
    ],
    2,
    2,
    [
      ['X', 'O', 'X'],
      ['X', 'O', 'O'],
      ['O', 'X', 'X'],
    ],
    NO_ONE_TURN,
    TIE_SCORES
  );
});

test('placing X outside the board (in 0x3) is illegal', function () {
  expectException(
    X_TURN,
    [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ],
    0,
    3
  );
});
