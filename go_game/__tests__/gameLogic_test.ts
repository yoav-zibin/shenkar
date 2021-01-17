import {IMove, deepEquals, createInitialMove} from '../../common/common';
import {Board, IState, createNewBoard, createNewBoardWithElement, getInitialState, isPosOnHintLine} from '../gameLogic';

test('Create Board', function () {
  const board: Board = createNewBoard(9);
  const expectedBoard: Board = [
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', '', ''],
  ];

  expect(deepEquals(board, expectedBoard)).toBe(true);
});

test('Create Board with element', function () {
  const board: Board = createNewBoardWithElement(9, 'T');
  const expectedBoard: Board = [
    ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T'],
    ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T'],
    ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T'],
    ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T'],
    ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T'],
    ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T'],
    ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T'],
    ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T'],
    ['T', 'T', 'T', 'T', 'T', 'T', 'T', 'T', 'T'],
  ];

  expect(deepEquals(board, expectedBoard)).toBe(true);
});

test('Initial move', function () {
  const move: IMove<IState> = createInitialMove(getInitialState());
  const expectedMove: IMove<IState> = {
    turnIndex: 0,
    endMatchScores: null,
    state: {
      board: [
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
      ],
      boardBeforeMove: [
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', ''],
      ],
      delta: {row: 0, col: 0},
      passes: 0,
      deadBoard: null,
      posJustCapturedForKo: null,
    },
  };
  expect(deepEquals(move, expectedMove)).toBe(true);
});

test('Hint Dot 1', function () {
  const isOnline: boolean = isPosOnHintLine(0, 4, 'r1');
  const expectedBool = true;

  expect(deepEquals(isOnline, expectedBool)).toBe(true);
});

test('Hint Dot 2', function () {
  const isOnline: boolean = isPosOnHintLine(1, 5, 'r2');
  const expectedBool = true;

  expect(deepEquals(isOnline, expectedBool)).toBe(true);
});

test('Hint Dot 3', function () {
  const isOnline: boolean = isPosOnHintLine(2, 5, 'r3');
  const expectedBool = true;

  expect(deepEquals(isOnline, expectedBool)).toBe(true);
});

test('Hint Dot 4', function () {
  const isOnline: boolean = isPosOnHintLine(3, 5, 'r4');
  const expectedBool = true;

  expect(deepEquals(isOnline, expectedBool)).toBe(true);
});

test('Hint Dot 5', function () {
  const isOnline: boolean = isPosOnHintLine(4, 4, 'r5');
  const expectedBool = true;

  expect(deepEquals(isOnline, expectedBool)).toBe(true);
});
