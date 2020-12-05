import {IMove, deepEquals, createInitialMove} from '../../common/common';
import {Board, IState, createNewBoard, getInitialState} from '../gameLogic';

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
