import {RiddlesLevel} from '../common/common';
import {Board, IState, RiddleData} from './gameLogic';

function r(riddleData: RiddleData, board: Board): IState {
  return {
    board: board,
    riddleData: riddleData,
  };
}

export const riddleLevels: RiddlesLevel<IState>[] = [
  {
    levelLocalizeId: 'MANCALA_LEVEL1',
    difficulty: 'EASY',
    maxMovesNum: 5,
    turnIndex: 0,
    riddles: [
      r('r1', [
        [0, 0, 0, 0, 2, 0, 0],
        [1, 0, 0, 0, 0, 0, 0],
      ]),
      r('r1', [
        [0, 0, 0, 0, 0, 1, 1],
        [1, 0, 0, 0, 0, 0, 0],
      ]),
      r('r1', [
        [0, 0, 0, 3, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0],
      ]),
    ],
  },
  {
    levelLocalizeId: 'MANCALA_LEVEL2',
    difficulty: 'EASY',
    maxMovesNum: 1,
    turnIndex: 0,
    riddles: [
      r('r1', [
        [0, 0, 0, 0, 1, 0, 0],
        [8, 0, 0, 0, 0, 0, 0],
      ]),
      r('r1', [
        [0, 0, 0, 2, 0, 0, 0],
        [8, 0, 0, 0, 0, 0, 0],
      ]),
      r('r1', [
        [0, 0, 0, 0, 1, 0, 3],
        [1, 1, 1, 0, 0, 0, 0],
      ]),
      r('r1', [
        [2, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 9, 0, 0, 1],
      ]),
    ],
  },
  {
    levelLocalizeId: 'MANCALA_LEVEL3',
    difficulty: 'EASY',
    maxMovesNum: 1,
    turnIndex: 0,
    riddles: [
      r('r1', [
        [0, 0, 0, 0, 0, 1, 40],
        [0, 2, 0, 1, 1, 0, 3],
      ]),
      r('r1', [
        [0, 0, 0, 0, 1, 1, 40],
        [0, 0, 0, 0, 0, 1, 5],
      ]),
      r('r1', [
        [0, 0, 0, 0, 2, 0, 40],
        [0, 1, 0, 1, 1, 0, 3],
      ]),
    ],
  },
];
