import {Riddle, RiddlesLevel} from '../common/common';
import {Board, IState} from './gameLogic';

// The riddle data in TicTacToe just includes the hint,
// which is where to show the "line" hint: either on a row / col / diagonal.
// E.g., "r1" is:
// ['X', 'X', 'X'],
// ['', '', ''],
// ['', '', ''],
// And "d1" is:
// ['X', '', ''],
// ['', 'X', ''],
// ['', '', 'X'],
export type RiddleData = 'r1' | 'r2' | 'r3' | 'c1' | 'c2' | 'c3' | 'd1' | 'd2';

function r(riddleData: RiddleData, board: Board): Riddle<IState, RiddleData> {
  return {
    state: {
      board: board,
    },
    riddleData: riddleData,
  };
}

export const riddleLevels: RiddlesLevel<IState, RiddleData>[] = [
  {
    levelLocalizeId: 'TICTACTOE_LEVEL1',
    difficulty: 'EASY',
    maxMovesNum: 1,
    turnIndex: 0,
    riddles: [
      r('r1', [
        ['X', 'X', ''],
        ['', '', ''],
        ['', '', ''],
      ]),
      r('r2', [
        ['', '', ''],
        ['', 'X', 'X'],
        ['', '', ''],
      ]),
      r('r3', [
        ['', '', ''],
        ['', '', ''],
        ['X', '', 'X'],
      ]),
      r('c1', [
        ['X', '', ''],
        ['', '', ''],
        ['X', '', ''],
      ]),
      r('c2', [
        ['', '', ''],
        ['', 'X', ''],
        ['', 'X', ''],
      ]),
      r('c3', [
        ['', '', 'X'],
        ['', '', 'X'],
        ['', '', ''],
      ]),
      r('d1', [
        ['X', '', ''],
        ['', 'X', ''],
        ['', '', ''],
      ]),
      r('d2', [
        ['', '', ''],
        ['', 'X', ''],
        ['X', '', ''],
      ]),
      r('d2', [
        ['', '', 'X'],
        ['', '', ''],
        ['X', '', ''],
      ]),
      r('r2', [
        ['', '', ''],
        ['X', '', 'X'],
        ['', '', ''],
      ]),
      r('c3', [
        ['', '', 'X'],
        ['', 'O', 'X'],
        ['', '', ''],
      ]),
      r('r3', [
        ['O', '', 'O'],
        ['', '', ''],
        ['X', '', 'X'],
      ]),
      r('r1', [
        ['X', 'X', ''],
        ['', 'O', 'O'],
        ['', '', ''],
      ]),
      r('r2', [
        ['O', 'O', ''],
        ['X', 'X', ''],
        ['', '', ''],
      ]),
      r('c2', [
        ['', '', 'O'],
        ['O', 'X', 'X'],
        ['O', 'X', 'O'],
      ]),
    ],
  },
  {
    levelLocalizeId: 'TICTACTOE_LEVEL2',
    difficulty: 'EASY',
    maxMovesNum: 1,
    turnIndex: 1,
    riddles: [
      r('c3', [
        ['', '', 'O'],
        ['', '', ''],
        ['', '', 'O'],
      ]),
      r('d1', [
        ['', '', ''],
        ['', 'O', ''],
        ['', '', 'O'],
      ]),
      r('r1', [
        ['O', '', 'O'],
        ['', '', ''],
        ['', 'O', ''],
      ]),
      r('r1', [
        ['', 'O', 'O'],
        ['', 'X', ''],
        ['X', 'X', ''],
      ]),
      r('d1', [
        ['', '', ''],
        ['X', 'O', ''],
        ['X', 'X', 'O'],
      ]),
      r('d1', [
        ['', '', ''],
        ['', 'O', ''],
        ['', 'X', 'O'],
      ]),
      r('r1', [
        ['', 'O', 'O'],
        ['', 'X', 'X'],
        ['X', '', ''],
      ]),
      r('c2', [
        ['', 'O', 'X'],
        ['', '', 'X'],
        ['X', 'O', ''],
      ]),
      r('c2', [
        ['', 'O', 'X'],
        ['', '', 'X'],
        ['X', 'O', ''],
      ]),
      r('c1', [
        ['', '', 'O'],
        ['O', 'X', 'X'],
        ['O', 'X', 'O'],
      ]),
    ],
  },
  {
    levelLocalizeId: 'TICTACTOE_LEVEL3',
    maxMovesNum: 2,
    difficulty: 'MEDIUM',
    turnIndex: 0,
    riddles: [
      r('r2', [
        ['X', '', ''],
        ['O', '', 'O'],
        ['X', '', ''],
      ]),
      r('d2', [
        ['', 'X', ''],
        ['', 'O', 'X'],
        ['O', '', ''],
      ]),
      r('d1', [
        ['O', '', ''],
        ['', 'O', 'X'],
        ['X', '', ''],
      ]),
      r('r3', [
        ['X', '', ''],
        ['', '', 'X'],
        ['O', 'O', ''],
      ]),
      r('c2', [
        ['X', 'O', 'X'],
        ['', '', ''],
        ['', 'O', ''],
      ]),
      r('d2', [
        ['', 'X', ''],
        ['X', 'O', 'X'],
        ['O', 'X', ''],
      ]),
      r('d1', [
        ['O', 'X', ''],
        ['O', 'O', 'X'],
        ['X', '', ''],
      ]),
      r('r1', [
        ['O', 'O', ''],
        ['', 'X', ''],
        ['', '', 'X'],
      ]),
    ],
  },
  {
    levelLocalizeId: 'TICTACTOE_LEVEL4',
    maxMovesNum: 2,
    difficulty: 'HARD',
    turnIndex: 0,
    riddles: [
      r('r1', [
        ['X', '', ''],
        ['O', 'O', 'X'],
        ['', '', ''],
      ]),
      r('r1', [
        ['', 'X', ''],
        ['X', 'O', ''],
        ['', 'O', ''],
      ]),
      r('c1', [
        ['', '', ''],
        ['X', 'O', 'O'],
        ['', '', 'X'],
      ]),
      r('d2', [
        ['', '', 'X'],
        ['X', '', 'O'],
        ['', 'O', ''],
      ]),
    ],
  },
  {
    levelLocalizeId: 'TICTACTOE_LEVEL5',
    maxMovesNum: 3,
    difficulty: 'HARD',
    turnIndex: 0,
    riddles: [
      r('d1', [
        ['', '', ''],
        ['O', 'X', ''],
        ['', '', ''],
      ]),
      r('d2', [
        ['', '', ''],
        ['', 'X', ''],
        ['', 'O', ''],
      ]),
      r('d2', [
        ['', '', ''],
        ['', 'X', 'O'],
        ['', '', ''],
      ]),
      r('d1', [
        ['X', '', ''],
        ['O', '', ''],
        ['', '', ''],
      ]),
      r('d1', [
        ['X', '', ''],
        ['', '', ''],
        ['', 'O', ''],
      ]),
      r('d2', [
        ['O', '', 'X'],
        ['', '', ''],
        ['', '', ''],
      ]),
      r('d1', [
        ['', '', ''],
        ['', '', ''],
        ['O', '', 'X'],
      ]),
    ],
  },
];
