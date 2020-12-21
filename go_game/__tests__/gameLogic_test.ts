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

test('Hint line 1', function () {
  const isOnline: boolean = isPosOnHintLine(0, 0, 'r1');
  const expectedBool = true;

  expect(deepEquals(isOnline, expectedBool)).toBe(true);
});

test('Hint line 2', function () {
  const isOnline: boolean = isPosOnHintLine(1, 0, 'r1');
  const expectedBool = false;

  expect(deepEquals(isOnline, expectedBool)).toBe(true);
});

test('Hint line 3', function () {
  const isOnline: boolean = isPosOnHintLine(0, 0, 'r2');
  const expectedBool = false;

  expect(deepEquals(isOnline, expectedBool)).toBe(true);
});

test('Hint line 4', function () {
  const isOnline: boolean = isPosOnHintLine(1, 0, 'r2');
  const expectedBool = true;

  expect(deepEquals(isOnline, expectedBool)).toBe(true);
});
