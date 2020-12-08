import {RiddlesLevel} from '../common/common';
import {Board, cellColor, IState, player, RiddleData} from './gameLogic';

function r(riddleData: RiddleData, board: Board): IState {
  return {
    board: board,
    riddleData: riddleData,
  };
}

export const riddleLevels: RiddlesLevel<IState>[] = [
  {
    levelLocalizeId: 'DOTS_AND_BOXES_LEVEL1',
    difficulty: 'EASY',
    maxMovesNum: 1,
    turnIndex: 0,
    riddles: [
      r('h11', {
        paintedLinesAmount: 23,
        score: {
          PLAYER_1: 4,
          PLAYER_2: 0,
        },
        horizontalLines: [
          [true, true, true],
          [true, true, true],
          [true, true, true],
          [true, true, true],
        ],
        verticalLines: [
          [true, true, true, true],
          [true, true, true, true],
          [true, true, true, false],
        ],
        color: [
          [cellColor.PLAYER_1, cellColor.PLAYER_2, cellColor.PLAYER_2],
          [cellColor.PLAYER_2, cellColor.PLAYER_1, cellColor.PLAYER_1],
          [cellColor.PLAYER_2, cellColor.PLAYER_1, cellColor.NONE],
        ],
        cellPaintedLines: [
          [4, 4, 4],
          [4, 4, 4],
          [4, 4, 3],
        ],
        isGameOver: false,
        size: 3,
        turn: player.ONE,
      }),
    ],
  },
  {
    levelLocalizeId: 'DOTS_AND_BOXES_LEVEL2',
    difficulty: 'EASY',
    maxMovesNum: 1,
    turnIndex: 0,
    riddles: [
      r('h11', {
        paintedLinesAmount: 23,
        score: {
          PLAYER_1: 4,
          PLAYER_2: 0,
        },
        horizontalLines: [
          [true, true, true],
          [true, true, true],
          [true, true, true],
          [true, true, true],
        ],
        verticalLines: [
          [true, true, true, true],
          [true, true, true, true],
          [true, true, true, false],
        ],
        color: [
          [cellColor.PLAYER_1, cellColor.PLAYER_2, cellColor.PLAYER_2],
          [cellColor.PLAYER_2, cellColor.PLAYER_1, cellColor.PLAYER_1],
          [cellColor.PLAYER_2, cellColor.PLAYER_1, cellColor.NONE],
        ],
        cellPaintedLines: [
          [4, 4, 4],
          [4, 4, 4],
          [4, 4, 3],
        ],
        isGameOver: false,
        size: 3,
        turn: player.ONE,
      }),
    ],
  },
  {
    levelLocalizeId: 'DOTS_AND_BOXES_LEVEL3',
    maxMovesNum: 1,
    difficulty: 'MEDIUM',
    turnIndex: 0,
    riddles: [
      r('h11', {
        paintedLinesAmount: 23,
        score: {
          PLAYER_1: 4,
          PLAYER_2: 0,
        },
        horizontalLines: [
          [true, true, true],
          [true, true, true],
          [true, true, true],
          [true, true, true],
        ],
        verticalLines: [
          [true, true, true, true],
          [true, true, true, true],
          [true, true, true, false],
        ],
        color: [
          [cellColor.PLAYER_1, cellColor.PLAYER_2, cellColor.PLAYER_2],
          [cellColor.PLAYER_2, cellColor.PLAYER_1, cellColor.PLAYER_1],
          [cellColor.PLAYER_2, cellColor.PLAYER_1, cellColor.NONE],
        ],
        cellPaintedLines: [
          [4, 4, 4],
          [4, 4, 4],
          [4, 4, 3],
        ],
        isGameOver: false,
        size: 3,
        turn: player.ONE,
      }),
    ],
  },
  {
    levelLocalizeId: 'DOTS_AND_BOXES_LEVEL4',
    maxMovesNum: 1,
    difficulty: 'MEDIUM',
    turnIndex: 0,
    riddles: [
      r('h11', {
        paintedLinesAmount: 23,
        score: {
          PLAYER_1: 4,
          PLAYER_2: 0,
        },
        horizontalLines: [
          [true, true, true],
          [true, true, true],
          [true, true, true],
          [true, true, true],
        ],
        verticalLines: [
          [true, true, true, true],
          [true, true, true, true],
          [true, true, true, false],
        ],
        color: [
          [cellColor.PLAYER_1, cellColor.PLAYER_2, cellColor.PLAYER_2],
          [cellColor.PLAYER_2, cellColor.PLAYER_1, cellColor.PLAYER_1],
          [cellColor.PLAYER_2, cellColor.PLAYER_1, cellColor.NONE],
        ],
        cellPaintedLines: [
          [4, 4, 4],
          [4, 4, 4],
          [4, 4, 3],
        ],
        isGameOver: false,
        size: 3,
        turn: player.ONE,
      }),
    ],
  },
];
