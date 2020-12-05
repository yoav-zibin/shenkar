import {IMove, deepEquals, createInitialMove} from '../../common/common';
import {Board, IState, createMove, getInitialState} from '../gameLogic';

const RED_TURN = 0;
const BLUE_TURN = 1;
const NO_ONE_WINS: number[] | null = null;
const NO_ONE_TURN = -1;
const B_WIN_SCORES = [0, 1];
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
  console.log(move);
  console.log(move.state.board);
  console.log(expectedMove);
  console.log(expectedMove.state.board);
  expect(deepEquals(move, expectedMove)).toBe(true);
}

test('Initial move', function () {
  const move: IMove<IState> = createInitialMove(getInitialState());
  const expectedMove: IMove<IState> = {
    turnIndex: RED_TURN,
    endMatchScores: NO_ONE_WINS,
    state: {
      board: [
        [' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' '],
      ],
      delta: null,
    },
  };
  expect(deepEquals(move, expectedMove)).toBe(true);
});
test('placing X in 0x0 from initial state', function () {
  expectMove(
    RED_TURN,
    null,
    0,
    0,
    [
      ['Y', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' '],
    ],
    BLUE_TURN,
    NO_ONE_WINS
  );
});
test('cannot move after the game is over', function () {
  expectException(
    BLUE_TURN,
    [
      [' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', 'R', 'R', ' ', ' '],
      ['Y', 'Y', 'Y', 'Y', 'R', ' ', ' '],
    ],
    2,
    1
  );
});

test('placing O in 0R1 after R placed R in 0R0', function () {
  expectMove(
    BLUE_TURN,
    [
      [' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' '],
      ['Y', ' ', ' ', ' ', ' ', ' ', ' '],
    ],
    5,
    1,
    [
      [' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' '],
      ['Y', 'R', ' ', ' ', ' ', ' ', ' '],
    ],
    RED_TURN,
    NO_ONE_WINS
  );
});
test('placing O in 2x1', function () {
  expectMove(
    BLUE_TURN,
    [
      [' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' '],
      ['Y', ' ', ' ', ' ', ' ', ' ', ' '],
      ['Y', 'R', ' ', ' ', ' ', ' ', ' '],
      ['R', 'Y', ' ', ' ', ' ', ' ', ' '],
    ],
    3,
    1,
    [
      [' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' '],
      ['Y', 'R', ' ', ' ', ' ', ' ', ' '],
      ['Y', 'R', ' ', ' ', ' ', ' ', ' '],
      ['R', 'Y', ' ', ' ', ' ', ' ', ' '],
    ],
    RED_TURN,
    NO_ONE_WINS
  );
});
test('O wins by placing O in 1x1', function () {
  expectMove(
    BLUE_TURN,
    [
      [' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', 'R', 'Y', ' ', ' ', ' '],
      [' ', 'R', 'R', 'Y', ' ', ' ', ' '],
      ['R', 'Y', 'Y', 'Y', ' ', ' ', ' '],
    ],
    2,
    3,
    [
      [' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', 'R', ' ', ' ', ' '],
      [' ', ' ', 'R', 'Y', ' ', ' ', ' '],
      [' ', 'R', 'R', 'Y', ' ', ' ', ' '],
      ['R', 'Y', 'Y', 'Y', ' ', ' ', ' '],
    ],
    NO_ONE_TURN,
    B_WIN_SCORES
  );
});
test('placing X outside the board (in 0x3) is illegal', function () {
  expectException(
    RED_TURN,
    [
      [' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ', ' ', ' '],
    ],
    0,
    7
  );
});
test('the game ties when there are no more empty cells', function () {
  expectMove(
    BLUE_TURN,
    [
      ['R', 'Y', 'Y', ' ', 'Y', 'R', 'Y'],
      ['Y', 'Y', 'R', 'Y', 'R', 'R', 'R'],
      ['Y', 'Y', 'R', 'R', 'Y', 'Y', 'Y'],
      ['R', 'R', 'Y', 'R', 'Y', 'R', 'R'],
      ['Y', 'R', 'Y', 'R', 'Y', 'Y', 'R'],
      ['R', 'Y', 'R', 'Y', 'R', 'Y', 'R'],
    ],
    0,
    3,
    [
      ['R', 'Y', 'Y', 'R', 'Y', 'R', 'Y'],
      ['Y', 'Y', 'R', 'Y', 'R', 'R', 'R'],
      ['Y', 'Y', 'R', 'R', 'Y', 'Y', 'Y'],
      ['R', 'R', 'Y', 'R', 'Y', 'R', 'R'],
      ['Y', 'R', 'Y', 'R', 'Y', 'Y', 'R'],
      ['R', 'Y', 'R', 'Y', 'R', 'Y', 'R'],
    ],
    NO_ONE_TURN,
    TIE_SCORES
  );
});
