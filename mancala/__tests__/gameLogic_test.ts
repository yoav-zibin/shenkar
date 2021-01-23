import {IMove, deepEquals, createInitialMove} from '../../common/common';
import {Board, IState, createMove, getInitialState} from '../gameLogic';

const PLAYER1_TURN = 0;
const PLAYER2_TURN = 1;
const NO_ONE_WINS: number[] | null = null;

function expectException(turnIndexBeforeMove: number, boardBeforeMove: Board, row: number, col: number): void {
  const stateBeforeMove: IState | null = boardBeforeMove ? {board: boardBeforeMove} : null;
  // We expect an exception to be thrown :)
  expect(() => createMove(stateBeforeMove, row, col, turnIndexBeforeMove)).toThrow(Error);
}

function expectMove(
  turnIndexBeforeMove: number,
  boardBeforeMove: Board | null,
  player: number,
  cell: number,
  boardAfterMove: Board,
  turnIndexAfterMove: number,
  endMatchScores: number[] | null
): void {
  const expectedMove: IMove<IState> = {
    turnIndex: turnIndexAfterMove,
    endMatchScores: endMatchScores,
    state: {board: boardAfterMove, delta: {player: player, cell: cell}},
  };
  const stateBeforeMove: IState | null = boardBeforeMove ? {board: boardBeforeMove} : null;
  const move: IMove<IState> = createMove(stateBeforeMove, player, cell, turnIndexBeforeMove);
  expect(deepEquals(move, expectedMove)).toBe(true);
}

test('Initial move', function () {
  const move: IMove<IState> = createInitialMove(getInitialState());
  const expectedMove: IMove<IState> = {
    turnIndex: PLAYER1_TURN,
    endMatchScores: NO_ONE_WINS,
    state: {
      board: [
        [4, 4, 4, 4, 4, 4, 0],
        [4, 4, 4, 4, 4, 4, 0],
      ],
    },
  };
  expect(deepEquals(move, expectedMove)).toBe(true);
});

test('player 1 making first move from first cell in initial state', function () {
  expectMove(
    PLAYER1_TURN,
    null,
    0,
    0,
    [
      [0, 5, 5, 5, 5, 4, 0],
      [4, 4, 4, 4, 4, 4, 0],
    ],
    PLAYER2_TURN,
    NO_ONE_WINS
  );
});

test('player 2 making first move from his second cell after player 1 move', function () {
  expectMove(
    PLAYER2_TURN,
    [
      [0, 5, 5, 5, 5, 4, 0],
      [4, 4, 4, 4, 4, 4, 0],
    ],
    1,
    0,
    [
      [0, 5, 5, 5, 5, 4, 0],
      [0, 5, 5, 5, 5, 4, 0],
    ],
    PLAYER1_TURN,
    NO_ONE_WINS
  );
});

test('a player can only choose a hole from his row', function () {
  expectException(
    PLAYER1_TURN,
    [
      [4, 4, 4, 4, 4, 4, 0],
      [4, 4, 4, 4, 4, 4, 0],
    ],
    1,
    0
  );
});
test('One can only make a move in an  non empty hole!', function () {
  expectException(
    PLAYER1_TURN,
    [
      [0, 5, 5, 5, 5, 4, 0],
      [4, 4, 4, 4, 4, 4, 0],
    ],
    0,
    0
  );
});
test('Can only make a move if the game is not over!', function () {
  expectException(
    PLAYER1_TURN,
    [
      [0, 0, 0, 0, 0, 0, 12],
      [0, 0, 0, 0, 0, 0, 36],
    ],
    0,
    0
  );
});
