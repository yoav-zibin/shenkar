import {RiddlesLevel} from '../common/common';
import {Board, IState, MiniMove, RiddleData} from './gameLogic';

function r(riddleData: RiddleData, board: Board, miniMoves: MiniMove[]): IState {
  return {
    board: board,
    miniMoves: miniMoves,
    riddleData: riddleData,
  };
}

export const riddleLevels: RiddlesLevel<IState>[] = [
  {
    levelLocalizeId: 'CHECKERS_LEVEL1',
    difficulty: 'EASY',
    maxMovesNum: 1,
    turnIndex: 0,
    riddles: [
      r(
        's1',
        [
          ['--', 'BM', '--', 'BM', '--', 'BM', '--', 'BM'],
          ['BM', '--', 'BM', '--', 'BM', '--', 'BM', '--'],
          ['--', 'BM', '--', 'DS', '--', 'BM', '--', 'BM'],
          ['DS', '--', 'BM', '--', 'DS', '--', 'DS', '--'],
          ['--', 'WM', '--', 'DS', '--', 'DS', '--', 'DS'],
          ['DS', '--', 'WM', '--', 'WM', '--', 'WM', '--'],
          ['--', 'WM', '--', 'WM', '--', 'WM', '--', 'WM'],
          ['WM', '--', 'WM', '--', 'WM', '--', 'WM', '--'],
        ],
        [
          /* minimoves */
        ]
      ),
    ],
  },
  {
    levelLocalizeId: 'CHECKERS_LEVEL2',
    difficulty: 'MEDIUM',
    maxMovesNum: 1,
    turnIndex: 1,
    riddles: [
      r(
        's2',
        [
          ['--', 'BM', '--', 'BM', '--', 'BM', '--', 'BM'],
          ['BM', '--', 'BM', '--', 'BM', '--', 'BM', '--'],
          ['--', 'BM', '--', 'BM', '--', 'BM', '--', 'BM'],
          ['DS', '--', 'DS', '--', 'DS', '--', 'DS', '--'],
          ['--', 'DS', '--', 'DS', '--', 'DS', '--', 'DS'],
          ['WM', '--', 'WM', '--', 'WM', '--', 'WM', '--'],
          ['--', 'WM', '--', 'WM', '--', 'WM', '--', 'WM'],
          ['WM', '--', 'WM', '--', 'WM', '--', 'WM', '--'],
        ],
        [
          /* minimoves */
        ]
      ),
    ],
  },
  {
    levelLocalizeId: 'CHECKERS_LEVEL3',
    maxMovesNum: 3,
    difficulty: 'HARD',
    turnIndex: 0,
    riddles: [
      r(
        's3',
        [
          ['--', 'BM', '--', 'BM', '--', 'BM', '--', 'BM'],
          ['BM', '--', 'BM', '--', 'BM', '--', 'BM', '--'],
          ['--', 'BM', '--', 'BM', '--', 'BM', '--', 'BM'],
          ['DS', '--', 'DS', '--', 'DS', '--', 'DS', '--'],
          ['--', 'DS', '--', 'DS', '--', 'DS', '--', 'DS'],
          ['WM', '--', 'WM', '--', 'WM', '--', 'WM', '--'],
          ['--', 'WM', '--', 'WM', '--', 'WM', '--', 'WM'],
          ['WM', '--', 'WM', '--', 'WM', '--', 'WM', '--'],
        ],
        [
          /* minimoves */
        ]
      ),
    ],
  },
];
