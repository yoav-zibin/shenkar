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
    turnIndex: player.ONE,
    riddles: [
      r('h11', {
        paintedLinesAmount: 23,
        score: {
          PLAYER_1: 4,
          PLAYER_2: 4,
        },
        horizontalLines: [
          [false, true, true],
          [true, true, true],
          [true, true, true],
          [true, true, true],
        ],
        verticalLines: [
          [true, true, true, true],
          [true, true, true, true],
          [true, true, true, true],
        ],
        color: [
          [cellColor.NONE, cellColor.PLAYER_2, cellColor.PLAYER_2],
          [cellColor.PLAYER_2, cellColor.PLAYER_1, cellColor.PLAYER_1],
          [cellColor.PLAYER_2, cellColor.PLAYER_1, cellColor.PLAYER_1],
        ],
        cellPaintedLines: [
          [3, 4, 4],
          [4, 4, 4],
          [4, 4, 4],
        ],
        isGameOver: false,
        size: 3,
        turn: player.ONE,
      }),
      r('h12', {
        paintedLinesAmount: 23,
        score: {
          PLAYER_1: 4,
          PLAYER_2: 4,
        },
        horizontalLines: [
          [true, false, true],
          [true, true, true],
          [true, true, true],
          [true, true, true],
        ],
        verticalLines: [
          [true, true, true, true],
          [true, true, true, true],
          [true, true, true, true],
        ],
        color: [
          [cellColor.PLAYER_1, cellColor.NONE, cellColor.PLAYER_2],
          [cellColor.PLAYER_2, cellColor.PLAYER_1, cellColor.PLAYER_1],
          [cellColor.PLAYER_2, cellColor.PLAYER_1, cellColor.PLAYER_2],
        ],
        cellPaintedLines: [
          [4, 3, 4],
          [4, 4, 4],
          [4, 4, 4],
        ],
        isGameOver: false,
        size: 3,
        turn: player.ONE,
      }),
      r('h13', {
        paintedLinesAmount: 23,
        score: {
          PLAYER_1: 4,
          PLAYER_2: 4,
        },
        horizontalLines: [
          [true, true, false],
          [true, true, true],
          [true, true, true],
          [true, true, true],
        ],
        verticalLines: [
          [true, true, true, true],
          [true, true, true, true],
          [true, true, true, true],
        ],
        color: [
          [cellColor.PLAYER_1, cellColor.PLAYER_2, cellColor.NONE],
          [cellColor.PLAYER_2, cellColor.PLAYER_1, cellColor.PLAYER_1],
          [cellColor.PLAYER_2, cellColor.PLAYER_1, cellColor.PLAYER_2],
        ],
        cellPaintedLines: [
          [4, 4, 3],
          [4, 4, 4],
          [4, 4, 4],
        ],
        isGameOver: false,
        size: 3,
        turn: player.ONE,
      }),
      r('h21', {
        paintedLinesAmount: 23,
        score: {
          PLAYER_1: 3,
          PLAYER_2: 4,
        },
        horizontalLines: [
          [true, true, true],
          [false, true, true],
          [true, true, true],
          [true, true, true],
        ],
        verticalLines: [
          [true, true, true, true],
          [true, true, true, true],
          [true, true, true, true],
        ],
        color: [
          [cellColor.NONE, cellColor.PLAYER_2, cellColor.PLAYER_2],
          [cellColor.NONE, cellColor.PLAYER_1, cellColor.PLAYER_1],
          [cellColor.PLAYER_2, cellColor.PLAYER_1, cellColor.PLAYER_2],
        ],
        cellPaintedLines: [
          [3, 4, 4],
          [3, 4, 4],
          [4, 4, 4],
        ],
        isGameOver: false,
        size: 3,
        turn: player.ONE,
      }),
      r('h22', {
        paintedLinesAmount: 23,
        score: {
          PLAYER_1: 3,
          PLAYER_2: 4,
        },
        horizontalLines: [
          [true, true, true],
          [true, false, true],
          [true, true, true],
          [true, true, true],
        ],
        verticalLines: [
          [true, true, true, true],
          [true, true, true, true],
          [true, true, true, true],
        ],
        color: [
          [cellColor.PLAYER_1, cellColor.NONE, cellColor.PLAYER_2],
          [cellColor.PLAYER_2, cellColor.NONE, cellColor.PLAYER_1],
          [cellColor.PLAYER_2, cellColor.PLAYER_1, cellColor.PLAYER_2],
        ],
        cellPaintedLines: [
          [4, 3, 4],
          [4, 3, 4],
          [4, 4, 4],
        ],
        isGameOver: false,
        size: 3,
        turn: player.ONE,
      }),
      r('h31', {
        paintedLinesAmount: 23,
        score: {
          PLAYER_1: 3,
          PLAYER_2: 4,
        },
        horizontalLines: [
          [true, true, true],
          [true, true, true],
          [false, true, true],
          [true, true, true],
        ],
        verticalLines: [
          [true, true, true, true],
          [true, true, true, true],
          [true, true, true, true],
        ],
        color: [
          [cellColor.PLAYER_1, cellColor.PLAYER_2, cellColor.PLAYER_2],
          [cellColor.NONE, cellColor.PLAYER_1, cellColor.PLAYER_2],
          [cellColor.NONE, cellColor.PLAYER_1, cellColor.PLAYER_2],
        ],
        cellPaintedLines: [
          [4, 4, 4],
          [3, 4, 4],
          [3, 4, 4],
        ],
        isGameOver: false,
        size: 3,
        turn: player.ONE,
      }),
      r('h32', {
        paintedLinesAmount: 23,
        score: {
          PLAYER_1: 4,
          PLAYER_2: 3,
        },
        horizontalLines: [
          [true, true, true],
          [true, true, true],
          [true, false, true],
          [true, true, true],
        ],
        verticalLines: [
          [true, true, true, true],
          [true, true, true, true],
          [true, true, true, true],
        ],
        color: [
          [cellColor.PLAYER_1, cellColor.PLAYER_2, cellColor.PLAYER_1],
          [cellColor.PLAYER_2, cellColor.NONE, cellColor.PLAYER_1],
          [cellColor.PLAYER_2, cellColor.NONE, cellColor.PLAYER_1],
        ],
        cellPaintedLines: [
          [4, 4, 4],
          [4, 3, 4],
          [4, 3, 4],
        ],
        isGameOver: false,
        size: 3,
        turn: player.ONE,
      }),
      r('h33', {
        paintedLinesAmount: 23,
        score: {
          PLAYER_1: 3,
          PLAYER_2: 4,
        },
        horizontalLines: [
          [true, true, true],
          [true, true, true],
          [true, true, false],
          [true, true, true],
        ],
        verticalLines: [
          [true, true, true, true],
          [true, true, true, true],
          [true, true, true, true],
        ],
        color: [
          [cellColor.PLAYER_1, cellColor.PLAYER_2, cellColor.PLAYER_2],
          [cellColor.PLAYER_2, cellColor.PLAYER_1, cellColor.NONE],
          [cellColor.PLAYER_2, cellColor.PLAYER_1, cellColor.NONE],
        ],
        cellPaintedLines: [
          [4, 4, 4],
          [4, 4, 3],
          [4, 4, 3],
        ],
        isGameOver: false,
        size: 3,
        turn: player.ONE,
      }),
      r('h41', {
        paintedLinesAmount: 23,
        score: {
          PLAYER_1: 4,
          PLAYER_2: 4,
        },
        horizontalLines: [
          [true, true, true],
          [true, true, true],
          [true, true, true],
          [false, true, true],
        ],
        verticalLines: [
          [true, true, true, true],
          [true, true, true, true],
          [true, true, true, true],
        ],
        color: [
          [cellColor.PLAYER_1, cellColor.PLAYER_2, cellColor.PLAYER_2],
          [cellColor.PLAYER_2, cellColor.PLAYER_1, cellColor.PLAYER_1],
          [cellColor.NONE, cellColor.PLAYER_1, cellColor.PLAYER_2],
        ],
        cellPaintedLines: [
          [4, 4, 4],
          [4, 4, 4],
          [3, 4, 4],
        ],
        isGameOver: false,
        size: 3,
        turn: player.ONE,
      }),
      r('h43', {
        paintedLinesAmount: 23,
        score: {
          PLAYER_1: 4,
          PLAYER_2: 4,
        },
        horizontalLines: [
          [true, true, true],
          [true, true, true],
          [true, true, true],
          [true, true, false],
        ],
        verticalLines: [
          [true, true, true, true],
          [true, true, true, true],
          [true, true, true, true],
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
      r('v11', {
        paintedLinesAmount: 23,
        score: {
          PLAYER_1: 4,
          PLAYER_2: 4,
        },
        horizontalLines: [
          [true, true, true],
          [true, true, true],
          [true, true, true],
          [true, true, true],
        ],
        verticalLines: [
          [false, true, true, true],
          [true, true, true, true],
          [true, true, true, true],
        ],
        color: [
          [cellColor.NONE, cellColor.PLAYER_2, cellColor.PLAYER_2],
          [cellColor.PLAYER_2, cellColor.PLAYER_1, cellColor.PLAYER_1],
          [cellColor.PLAYER_2, cellColor.PLAYER_1, cellColor.PLAYER_1],
        ],
        cellPaintedLines: [
          [3, 4, 4],
          [4, 4, 4],
          [4, 4, 4],
        ],
        isGameOver: false,
        size: 3,
        turn: player.ONE,
      }),
      r('v12', {
        paintedLinesAmount: 23,
        score: {
          PLAYER_1: 3,
          PLAYER_2: 4,
        },
        horizontalLines: [
          [true, true, true],
          [true, true, true],
          [true, true, true],
          [true, true, true],
        ],
        verticalLines: [
          [true, false, true, true],
          [true, true, true, true],
          [true, true, true, true],
        ],
        color: [
          [cellColor.NONE, cellColor.NONE, cellColor.PLAYER_2],
          [cellColor.PLAYER_2, cellColor.PLAYER_1, cellColor.PLAYER_1],
          [cellColor.PLAYER_2, cellColor.PLAYER_1, cellColor.PLAYER_2],
        ],
        cellPaintedLines: [
          [3, 3, 4],
          [4, 4, 4],
          [4, 4, 4],
        ],
        isGameOver: false,
        size: 3,
        turn: player.ONE,
      }),
      r('v13', {
        paintedLinesAmount: 23,
        score: {
          PLAYER_1: 4,
          PLAYER_2: 3,
        },
        horizontalLines: [
          [true, true, true],
          [true, true, true],
          [true, true, true],
          [true, true, true],
        ],
        verticalLines: [
          [true, true, false, true],
          [true, true, true, true],
          [true, true, true, true],
        ],
        color: [
          [cellColor.PLAYER_1, cellColor.NONE, cellColor.NONE],
          [cellColor.PLAYER_2, cellColor.PLAYER_1, cellColor.PLAYER_1],
          [cellColor.PLAYER_2, cellColor.PLAYER_1, cellColor.PLAYER_2],
        ],
        cellPaintedLines: [
          [4, 3, 3],
          [4, 4, 4],
          [4, 4, 4],
        ],
        isGameOver: false,
        size: 3,
        turn: player.ONE,
      }),
      r('v14', {
        paintedLinesAmount: 23,
        score: {
          PLAYER_1: 4,
          PLAYER_2: 4,
        },
        horizontalLines: [
          [true, true, true],
          [true, true, true],
          [true, true, true],
          [true, true, true],
        ],
        verticalLines: [
          [true, true, true, false],
          [true, true, true, true],
          [true, true, true, true],
        ],
        color: [
          [cellColor.PLAYER_1, cellColor.PLAYER_2, cellColor.NONE],
          [cellColor.PLAYER_2, cellColor.PLAYER_1, cellColor.PLAYER_1],
          [cellColor.PLAYER_2, cellColor.PLAYER_1, cellColor.PLAYER_2],
        ],
        cellPaintedLines: [
          [4, 4, 3],
          [4, 4, 4],
          [4, 4, 4],
        ],
        isGameOver: false,
        size: 3,
        turn: player.ONE,
      }),
      r('v21', {
        paintedLinesAmount: 23,
        score: {
          PLAYER_1: 4,
          PLAYER_2: 4,
        },
        horizontalLines: [
          [true, true, true],
          [true, true, true],
          [true, true, true],
          [true, true, true],
        ],
        verticalLines: [
          [true, true, true, true],
          [false, true, true, true],
          [true, true, true, true],
        ],
        color: [
          [cellColor.PLAYER_1, cellColor.PLAYER_2, cellColor.PLAYER_2],
          [cellColor.NONE, cellColor.PLAYER_1, cellColor.PLAYER_1],
          [cellColor.PLAYER_2, cellColor.PLAYER_1, cellColor.PLAYER_2],
        ],
        cellPaintedLines: [
          [4, 4, 4],
          [3, 4, 4],
          [4, 4, 4],
        ],
        isGameOver: false,
        size: 3,
        turn: player.ONE,
      }),
      r('v23', {
        paintedLinesAmount: 23,
        score: {
          PLAYER_1: 3,
          PLAYER_2: 4,
        },
        horizontalLines: [
          [true, true, true],
          [true, true, true],
          [true, true, true],
          [true, true, true],
        ],
        verticalLines: [
          [true, true, true, true],
          [true, true, false, true],
          [true, true, true, true],
        ],
        color: [
          [cellColor.PLAYER_1, cellColor.PLAYER_2, cellColor.PLAYER_2],
          [cellColor.PLAYER_2, cellColor.NONE, cellColor.NONE],
          [cellColor.PLAYER_2, cellColor.PLAYER_1, cellColor.PLAYER_1],
        ],
        cellPaintedLines: [
          [4, 4, 4],
          [4, 3, 3],
          [4, 4, 4],
        ],
        isGameOver: false,
        size: 3,
        turn: player.ONE,
      }),
      r('v31', {
        paintedLinesAmount: 23,
        score: {
          PLAYER_1: 4,
          PLAYER_2: 4,
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
          [false, true, true, true],
        ],
        color: [
          [cellColor.PLAYER_1, cellColor.PLAYER_2, cellColor.PLAYER_2],
          [cellColor.PLAYER_2, cellColor.PLAYER_1, cellColor.PLAYER_1],
          [cellColor.NONE, cellColor.PLAYER_1, cellColor.PLAYER_2],
        ],
        cellPaintedLines: [
          [4, 4, 4],
          [4, 4, 4],
          [3, 4, 4],
        ],
        isGameOver: false,
        size: 3,
        turn: player.ONE,
      }),
      r('v32', {
        paintedLinesAmount: 23,
        score: {
          PLAYER_1: 3,
          PLAYER_2: 4,
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
          [true, false, true, true],
        ],
        color: [
          [cellColor.PLAYER_1, cellColor.PLAYER_2, cellColor.PLAYER_2],
          [cellColor.PLAYER_2, cellColor.PLAYER_1, cellColor.PLAYER_1],
          [cellColor.NONE, cellColor.NONE, cellColor.PLAYER_2],
        ],
        cellPaintedLines: [
          [4, 4, 4],
          [4, 4, 4],
          [3, 3, 4],
        ],
        isGameOver: false,
        size: 3,
        turn: player.ONE,
      }),
      r('v34', {
        paintedLinesAmount: 23,
        score: {
          PLAYER_1: 4,
          PLAYER_2: 4,
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
      r('v33', {
        paintedLinesAmount: 23,
        score: {
          PLAYER_1: 3,
          PLAYER_2: 4,
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
          [true, true, false, true],
        ],
        color: [
          [cellColor.PLAYER_1, cellColor.PLAYER_2, cellColor.PLAYER_2],
          [cellColor.PLAYER_2, cellColor.PLAYER_1, cellColor.PLAYER_1],
          [cellColor.PLAYER_2, cellColor.NONE, cellColor.NONE],
        ],
        cellPaintedLines: [
          [4, 4, 4],
          [4, 4, 4],
          [4, 3, 3],
        ],
        isGameOver: false,
        size: 3,
        turn: player.ONE,
      }),
    ],
  },
  // --------------------------------------------------------------------------------------------------------------
  // --------------------------------------------------------------------------------------------------------------
  // --------------------------------------------------------------------------------------------------------------
  // LEVEL 2
  // --------------------------------------------------------------------------------------------------------------
  // --------------------------------------------------------------------------------------------------------------
  // --------------------------------------------------------------------------------------------------------------
  {
    levelLocalizeId: 'DOTS_AND_BOXES_LEVEL2',
    difficulty: 'EASY',
    maxMovesNum: 1,
    turnIndex: player.ONE,
    riddles: [
      r('h11', {
        paintedLinesAmount: 23,
        score: {
          PLAYER_1: 4,
          PLAYER_2: 4,
        },
        horizontalLines: [
          [false, true, true],
          [true, true, true],
          [true, true, true],
          [true, true, true],
        ],
        verticalLines: [
          [true, true, true, true],
          [true, true, true, true],
          [true, true, true, true],
        ],
        color: [
          [cellColor.NONE, cellColor.PLAYER_2, cellColor.PLAYER_2],
          [cellColor.PLAYER_2, cellColor.PLAYER_1, cellColor.PLAYER_1],
          [cellColor.PLAYER_2, cellColor.PLAYER_1, cellColor.PLAYER_1],
        ],
        cellPaintedLines: [
          [3, 4, 4],
          [4, 4, 4],
          [4, 4, 4],
        ],
        isGameOver: false,
        size: 3,
        turn: player.ONE,
      }),
      r('h12', {
        paintedLinesAmount: 23,
        score: {
          PLAYER_1: 4,
          PLAYER_2: 4,
        },
        horizontalLines: [
          [true, false, true],
          [true, true, true],
          [true, true, true],
          [true, true, true],
        ],
        verticalLines: [
          [true, true, true, true],
          [true, true, true, true],
          [true, true, true, true],
        ],
        color: [
          [cellColor.PLAYER_1, cellColor.NONE, cellColor.PLAYER_2],
          [cellColor.PLAYER_2, cellColor.PLAYER_1, cellColor.PLAYER_1],
          [cellColor.PLAYER_2, cellColor.PLAYER_1, cellColor.PLAYER_2],
        ],
        cellPaintedLines: [
          [4, 3, 4],
          [4, 4, 4],
          [4, 4, 4],
        ],
        isGameOver: false,
        size: 3,
        turn: player.ONE,
      }),
      r('h13', {
        paintedLinesAmount: 23,
        score: {
          PLAYER_1: 4,
          PLAYER_2: 4,
        },
        horizontalLines: [
          [true, true, false],
          [true, true, true],
          [true, true, true],
          [true, true, true],
        ],
        verticalLines: [
          [true, true, true, true],
          [true, true, true, true],
          [true, true, true, true],
        ],
        color: [
          [cellColor.PLAYER_1, cellColor.PLAYER_2, cellColor.NONE],
          [cellColor.PLAYER_2, cellColor.PLAYER_1, cellColor.PLAYER_1],
          [cellColor.PLAYER_2, cellColor.PLAYER_1, cellColor.PLAYER_2],
        ],
        cellPaintedLines: [
          [4, 4, 3],
          [4, 4, 4],
          [4, 4, 4],
        ],
        isGameOver: false,
        size: 3,
        turn: player.ONE,
      }),
      r('h21', {
        paintedLinesAmount: 23,
        score: {
          PLAYER_1: 3,
          PLAYER_2: 4,
        },
        horizontalLines: [
          [true, true, true],
          [false, true, true],
          [true, true, true],
          [true, true, true],
        ],
        verticalLines: [
          [true, true, true, true],
          [true, true, true, true],
          [true, true, true, true],
        ],
        color: [
          [cellColor.NONE, cellColor.PLAYER_2, cellColor.PLAYER_2],
          [cellColor.NONE, cellColor.PLAYER_1, cellColor.PLAYER_1],
          [cellColor.PLAYER_2, cellColor.PLAYER_1, cellColor.PLAYER_2],
        ],
        cellPaintedLines: [
          [3, 4, 4],
          [3, 4, 4],
          [4, 4, 4],
        ],
        isGameOver: false,
        size: 3,
        turn: player.ONE,
      }),
    ],
  },
  // ----------------------------------------------------------------------------------------------------------------
  // ----------------------------------------------------------------------------------------------------------------
  // ----------------------------------------------------------------------------------------------------------------
  // LEVEL 3
  // ----------------------------------------------------------------------------------------------------------------
  // ----------------------------------------------------------------------------------------------------------------
  // ----------------------------------------------------------------------------------------------------------------
  {
    levelLocalizeId: 'DOTS_AND_BOXES_LEVEL3',
    maxMovesNum: 1,
    difficulty: 'MEDIUM',
    turnIndex: player.ONE,
    riddles: [
      r('h11', {
        paintedLinesAmount: 23,
        score: {
          PLAYER_1: 4,
          PLAYER_2: 4,
        },
        horizontalLines: [
          [false, true, true],
          [true, true, true],
          [true, true, true],
          [true, true, true],
        ],
        verticalLines: [
          [true, true, true, true],
          [true, true, true, true],
          [true, true, true, true],
        ],
        color: [
          [cellColor.NONE, cellColor.PLAYER_2, cellColor.PLAYER_2],
          [cellColor.PLAYER_2, cellColor.PLAYER_1, cellColor.PLAYER_1],
          [cellColor.PLAYER_2, cellColor.PLAYER_1, cellColor.PLAYER_1],
        ],
        cellPaintedLines: [
          [3, 4, 4],
          [4, 4, 4],
          [4, 4, 4],
        ],
        isGameOver: false,
        size: 3,
        turn: player.ONE,
      }),
      r('h12', {
        paintedLinesAmount: 23,
        score: {
          PLAYER_1: 4,
          PLAYER_2: 4,
        },
        horizontalLines: [
          [true, false, true],
          [true, true, true],
          [true, true, true],
          [true, true, true],
        ],
        verticalLines: [
          [true, true, true, true],
          [true, true, true, true],
          [true, true, true, true],
        ],
        color: [
          [cellColor.PLAYER_1, cellColor.NONE, cellColor.PLAYER_2],
          [cellColor.PLAYER_2, cellColor.PLAYER_1, cellColor.PLAYER_1],
          [cellColor.PLAYER_2, cellColor.PLAYER_1, cellColor.PLAYER_2],
        ],
        cellPaintedLines: [
          [4, 3, 4],
          [4, 4, 4],
          [4, 4, 4],
        ],
        isGameOver: false,
        size: 3,
        turn: player.ONE,
      }),
      r('h13', {
        paintedLinesAmount: 23,
        score: {
          PLAYER_1: 4,
          PLAYER_2: 4,
        },
        horizontalLines: [
          [true, true, false],
          [true, true, true],
          [true, true, true],
          [true, true, true],
        ],
        verticalLines: [
          [true, true, true, true],
          [true, true, true, true],
          [true, true, true, true],
        ],
        color: [
          [cellColor.PLAYER_1, cellColor.PLAYER_2, cellColor.NONE],
          [cellColor.PLAYER_2, cellColor.PLAYER_1, cellColor.PLAYER_1],
          [cellColor.PLAYER_2, cellColor.PLAYER_1, cellColor.PLAYER_2],
        ],
        cellPaintedLines: [
          [4, 4, 3],
          [4, 4, 4],
          [4, 4, 4],
        ],
        isGameOver: false,
        size: 3,
        turn: player.ONE,
      }),
      r('h21', {
        paintedLinesAmount: 23,
        score: {
          PLAYER_1: 3,
          PLAYER_2: 4,
        },
        horizontalLines: [
          [true, true, true],
          [false, true, true],
          [true, true, true],
          [true, true, true],
        ],
        verticalLines: [
          [true, true, true, true],
          [true, true, true, true],
          [true, true, true, true],
        ],
        color: [
          [cellColor.NONE, cellColor.PLAYER_2, cellColor.PLAYER_2],
          [cellColor.NONE, cellColor.PLAYER_1, cellColor.PLAYER_1],
          [cellColor.PLAYER_2, cellColor.PLAYER_1, cellColor.PLAYER_2],
        ],
        cellPaintedLines: [
          [3, 4, 4],
          [3, 4, 4],
          [4, 4, 4],
        ],
        isGameOver: false,
        size: 3,
        turn: player.ONE,
      }),
    ],
  },
  // ----------------------------------------------------------------------------------------------------------------
  // ----------------------------------------------------------------------------------------------------------------
  // ----------------------------------------------------------------------------------------------------------------
  // LEVEL 4
  // ----------------------------------------------------------------------------------------------------------------
  // ----------------------------------------------------------------------------------------------------------------
  // ----------------------------------------------------------------------------------------------------------------
  {
    levelLocalizeId: 'DOTS_AND_BOXES_LEVEL4',
    maxMovesNum: 1,
    difficulty: 'HARD',
    turnIndex: player.ONE,
    riddles: [
      r('h11', {
        paintedLinesAmount: 23,
        score: {
          PLAYER_1: 4,
          PLAYER_2: 4,
        },
        horizontalLines: [
          [false, true, true],
          [true, true, true],
          [true, true, true],
          [true, true, true],
        ],
        verticalLines: [
          [true, true, true, true],
          [true, true, true, true],
          [true, true, true, true],
        ],
        color: [
          [cellColor.NONE, cellColor.PLAYER_2, cellColor.PLAYER_2],
          [cellColor.PLAYER_2, cellColor.PLAYER_1, cellColor.PLAYER_1],
          [cellColor.PLAYER_2, cellColor.PLAYER_1, cellColor.PLAYER_1],
        ],
        cellPaintedLines: [
          [3, 4, 4],
          [4, 4, 4],
          [4, 4, 4],
        ],
        isGameOver: false,
        size: 3,
        turn: player.ONE,
      }),
      r('h12', {
        paintedLinesAmount: 23,
        score: {
          PLAYER_1: 4,
          PLAYER_2: 4,
        },
        horizontalLines: [
          [true, false, true],
          [true, true, true],
          [true, true, true],
          [true, true, true],
        ],
        verticalLines: [
          [true, true, true, true],
          [true, true, true, true],
          [true, true, true, true],
        ],
        color: [
          [cellColor.PLAYER_1, cellColor.NONE, cellColor.PLAYER_2],
          [cellColor.PLAYER_2, cellColor.PLAYER_1, cellColor.PLAYER_1],
          [cellColor.PLAYER_2, cellColor.PLAYER_1, cellColor.PLAYER_2],
        ],
        cellPaintedLines: [
          [4, 3, 4],
          [4, 4, 4],
          [4, 4, 4],
        ],
        isGameOver: false,
        size: 3,
        turn: player.ONE,
      }),
      r('h13', {
        paintedLinesAmount: 23,
        score: {
          PLAYER_1: 4,
          PLAYER_2: 4,
        },
        horizontalLines: [
          [true, true, false],
          [true, true, true],
          [true, true, true],
          [true, true, true],
        ],
        verticalLines: [
          [true, true, true, true],
          [true, true, true, true],
          [true, true, true, true],
        ],
        color: [
          [cellColor.PLAYER_1, cellColor.PLAYER_2, cellColor.NONE],
          [cellColor.PLAYER_2, cellColor.PLAYER_1, cellColor.PLAYER_1],
          [cellColor.PLAYER_2, cellColor.PLAYER_1, cellColor.PLAYER_2],
        ],
        cellPaintedLines: [
          [4, 4, 3],
          [4, 4, 4],
          [4, 4, 4],
        ],
        isGameOver: false,
        size: 3,
        turn: player.ONE,
      }),
      r('h21', {
        paintedLinesAmount: 23,
        score: {
          PLAYER_1: 3,
          PLAYER_2: 4,
        },
        horizontalLines: [
          [true, true, true],
          [false, true, true],
          [true, true, true],
          [true, true, true],
        ],
        verticalLines: [
          [true, true, true, true],
          [true, true, true, true],
          [true, true, true, true],
        ],
        color: [
          [cellColor.NONE, cellColor.PLAYER_2, cellColor.PLAYER_2],
          [cellColor.NONE, cellColor.PLAYER_1, cellColor.PLAYER_1],
          [cellColor.PLAYER_2, cellColor.PLAYER_1, cellColor.PLAYER_2],
        ],
        cellPaintedLines: [
          [3, 4, 4],
          [3, 4, 4],
          [4, 4, 4],
        ],
        isGameOver: false,
        size: 3,
        turn: player.ONE,
      }),
    ],
  },
];

// import {RiddlesLevel} from '../common/common';
// import {Board, cellColor, IState, player, RiddleData} from './gameLogic';

// function r(riddleData: RiddleData, board: Board): IState {
//   return {
//     board: board,
//     riddleData: riddleData,
//   };
// }

// export const riddleLevels: RiddlesLevel<IState>[] = [
//   {
//     levelLocalizeId: 'DOTS_AND_BOXES_LEVEL1',
//     difficulty: 'EASY',
//     maxMovesNum: 1,
//     turnIndex: player.ONE,
//     riddles: [
//       r('h11', {
//         paintedLinesAmount: 23,
//         score: {
//           PLAYER_1: 4,
//           PLAYER_2: 4,
//         },
//         horizontalLines: [
//           [false, true, true],
//           [true, true, true],
//           [true, true, true],
//           [true, true, true],
//         ],
//         verticalLines: [
//           [true, true, true, true],
//           [true, true, true, true],
//           [true, true, true, true],
//         ],
//         color: [
//           [cellColor.NONE, cellColor.PLAYER_2, cellColor.PLAYER_2],
//           [cellColor.PLAYER_2, cellColor.PLAYER_1, cellColor.PLAYER_1],
//           [cellColor.PLAYER_2, cellColor.PLAYER_1, cellColor.PLAYER_1],
//         ],
//         cellPaintedLines: [
//           [3, 4, 4],
//           [4, 4, 4],
//           [4, 4, 4],
//         ],
//         isGameOver: false,
//         size: 3,
//         turn: player.ONE,
//       }),
//       r('h12', {
//         paintedLinesAmount: 23,
//         score: {
//           PLAYER_1: 4,
//           PLAYER_2: 4,
//         },
//         horizontalLines: [
//           [true, false, true],
//           [true, true, true],
//           [true, true, true],
//           [true, true, true],
//         ],
//         verticalLines: [
//           [true, true, true, true],
//           [true, true, true, true],
//           [true, true, true, true],
//         ],
//         color: [
//           [cellColor.PLAYER_1, cellColor.NONE, cellColor.PLAYER_2],
//           [cellColor.PLAYER_2, cellColor.PLAYER_1, cellColor.PLAYER_1],
//           [cellColor.PLAYER_2, cellColor.PLAYER_1, cellColor.PLAYER_2],
//         ],
//         cellPaintedLines: [
//           [4, 3, 4],
//           [4, 4, 4],
//           [4, 4, 4],
//         ],
//         isGameOver: false,
//         size: 3,
//         turn: player.ONE,
//       }),
//       r('h13', {
//         paintedLinesAmount: 23,
//         score: {
//           PLAYER_1: 4,
//           PLAYER_2: 4,
//         },
//         horizontalLines: [
//           [true, true, false],
//           [true, true, true],
//           [true, true, true],
//           [true, true, true],
//         ],
//         verticalLines: [
//           [true, true, true, true],
//           [true, true, true, true],
//           [true, true, true, true],
//         ],
//         color: [
//           [cellColor.PLAYER_1, cellColor.PLAYER_2, cellColor.NONE],
//           [cellColor.PLAYER_2, cellColor.PLAYER_1, cellColor.PLAYER_1],
//           [cellColor.PLAYER_2, cellColor.PLAYER_1, cellColor.PLAYER_2],
//         ],
//         cellPaintedLines: [
//           [4, 4, 3],
//           [4, 4, 4],
//           [4, 4, 4],
//         ],
//         isGameOver: false,
//         size: 3,
//         turn: player.ONE,
//       }),
//       r('h21', {
//         paintedLinesAmount: 23,
//         score: {
//           PLAYER_1: 3,
//           PLAYER_2: 4,
//         },
//         horizontalLines: [
//           [true, true, true],
//           [false, true, true],
//           [true, true, true],
//           [true, true, true],
//         ],
//         verticalLines: [
//           [true, true, true, true],
//           [true, true, true, true],
//           [true, true, true, true],
//         ],
//         color: [
//           [cellColor.NONE, cellColor.PLAYER_2, cellColor.PLAYER_2],
//           [cellColor.NONE, cellColor.PLAYER_1, cellColor.PLAYER_1],
//           [cellColor.PLAYER_2, cellColor.PLAYER_1, cellColor.PLAYER_2],
//         ],
//         cellPaintedLines: [
//           [3, 4, 4],
//           [3, 4, 4],
//           [4, 4, 4],
//         ],
//         isGameOver: false,
//         size: 3,
//         turn: player.ONE,
//       }),
//       r('h22', {
//         paintedLinesAmount: 23,
//         score: {
//           PLAYER_1: 3,
//           PLAYER_2: 4,
//         },
//         horizontalLines: [
//           [true, true, true],
//           [true, false, true],
//           [true, true, true],
//           [true, true, true],
//         ],
//         verticalLines: [
//           [true, true, true, true],
//           [true, true, true, true],
//           [true, true, true, true],
//         ],
//         color: [
//           [cellColor.PLAYER_1, cellColor.NONE, cellColor.PLAYER_2],
//           [cellColor.PLAYER_2, cellColor.NONE, cellColor.PLAYER_1],
//           [cellColor.PLAYER_2, cellColor.PLAYER_1, cellColor.PLAYER_2],
//         ],
//         cellPaintedLines: [
//           [4, 3, 4],
//           [4, 3, 4],
//           [4, 4, 4],
//         ],
//         isGameOver: false,
//         size: 3,
//         turn: player.ONE,
//       }),
//       r('h31', {
//         paintedLinesAmount: 23,
//         score: {
//           PLAYER_1: 3,
//           PLAYER_2: 4,
//         },
//         horizontalLines: [
//           [true, true, true],
//           [true, true, true],
//           [false, true, true],
//           [true, true, true],
//         ],
//         verticalLines: [
//           [true, true, true, true],
//           [true, true, true, true],
//           [true, true, true, true],
//         ],
//         color: [
//           [cellColor.PLAYER_1, cellColor.PLAYER_2, cellColor.PLAYER_2],
//           [cellColor.NONE, cellColor.PLAYER_1, cellColor.PLAYER_2],
//           [cellColor.NONE, cellColor.PLAYER_1, cellColor.PLAYER_2],
//         ],
//         cellPaintedLines: [
//           [4, 4, 4],
//           [3, 4, 4],
//           [3, 4, 4],
//         ],
//         isGameOver: false,
//         size: 3,
//         turn: player.ONE,
//       }),
//       r('h32', {
//         paintedLinesAmount: 23,
//         score: {
//           PLAYER_1: 4,
//           PLAYER_2: 3,
//         },
//         horizontalLines: [
//           [true, true, true],
//           [true, true, true],
//           [true, false, true],
//           [true, true, true],
//         ],
//         verticalLines: [
//           [true, true, true, true],
//           [true, true, true, true],
//           [true, true, true, true],
//         ],
//         color: [
//           [cellColor.PLAYER_1, cellColor.PLAYER_2, cellColor.PLAYER_1],
//           [cellColor.PLAYER_2, cellColor.NONE, cellColor.PLAYER_1],
//           [cellColor.PLAYER_2, cellColor.NONE, cellColor.PLAYER_1],
//         ],
//         cellPaintedLines: [
//           [4, 4, 4],
//           [4, 3, 4],
//           [4, 3, 4],
//         ],
//         isGameOver: false,
//         size: 3,
//         turn: player.ONE,
//       }),
//       r('h33', {
//         paintedLinesAmount: 23,
//         score: {
//           PLAYER_1: 3,
//           PLAYER_2: 4,
//         },
//         horizontalLines: [
//           [true, true, true],
//           [true, true, true],
//           [true, true, false],
//           [true, true, true],
//         ],
//         verticalLines: [
//           [true, true, true, true],
//           [true, true, true, true],
//           [true, true, true, true],
//         ],
//         color: [
//           [cellColor.PLAYER_1, cellColor.PLAYER_2, cellColor.PLAYER_2],
//           [cellColor.PLAYER_2, cellColor.PLAYER_1, cellColor.NONE],
//           [cellColor.PLAYER_2, cellColor.PLAYER_1, cellColor.NONE],
//         ],
//         cellPaintedLines: [
//           [4, 4, 4],
//           [4, 4, 3],
//           [4, 4, 3],
//         ],
//         isGameOver: false,
//         size: 3,
//         turn: player.ONE,
//       }),
//       r('h41', {
//         paintedLinesAmount: 23,
//         score: {
//           PLAYER_1: 4,
//           PLAYER_2: 4,
//         },
//         horizontalLines: [
//           [true, true, true],
//           [true, true, true],
//           [true, true, true],
//           [false, true, true],
//         ],
//         verticalLines: [
//           [true, true, true, true],
//           [true, true, true, true],
//           [true, true, true, true],
//         ],
//         color: [
//           [cellColor.PLAYER_1, cellColor.PLAYER_2, cellColor.PLAYER_2],
//           [cellColor.PLAYER_2, cellColor.PLAYER_1, cellColor.PLAYER_1],
//           [cellColor.NONE, cellColor.PLAYER_1, cellColor.PLAYER_2],
//         ],
//         cellPaintedLines: [
//           [4, 4, 4],
//           [4, 4, 4],
//           [3, 4, 4],
//         ],
//         isGameOver: false,
//         size: 3,
//         turn: player.ONE,
//       }),
//       r('h43', {
//         paintedLinesAmount: 23,
//         score: {
//           PLAYER_1: 4,
//           PLAYER_2: 4,
//         },
//         horizontalLines: [
//           [true, true, true],
//           [true, true, true],
//           [true, true, true],
//           [true, true, false],
//         ],
//         verticalLines: [
//           [true, true, true, true],
//           [true, true, true, true],
//           [true, true, true, true],
//         ],
//         color: [
//           [cellColor.PLAYER_1, cellColor.PLAYER_2, cellColor.PLAYER_2],
//           [cellColor.PLAYER_2, cellColor.PLAYER_1, cellColor.PLAYER_1],
//           [cellColor.PLAYER_2, cellColor.PLAYER_1, cellColor.NONE],
//         ],
//         cellPaintedLines: [
//           [4, 4, 4],
//           [4, 4, 4],
//           [4, 4, 3],
//         ],
//         isGameOver: false,
//         size: 3,
//         turn: player.ONE,
//       }),
//       r('v11', {
//         paintedLinesAmount: 23,
//         score: {
//           PLAYER_1: 4,
//           PLAYER_2: 4,
//         },
//         horizontalLines: [
//           [true, true, true],
//           [true, true, true],
//           [true, true, true],
//           [true, true, true],
//         ],
//         verticalLines: [
//           [false, true, true, true],
//           [true, true, true, true],
//           [true, true, true, true],
//         ],
//         color: [
//           [cellColor.NONE, cellColor.PLAYER_2, cellColor.PLAYER_2],
//           [cellColor.PLAYER_2, cellColor.PLAYER_1, cellColor.PLAYER_1],
//           [cellColor.PLAYER_2, cellColor.PLAYER_1, cellColor.PLAYER_1],
//         ],
//         cellPaintedLines: [
//           [3, 4, 4],
//           [4, 4, 4],
//           [4, 4, 4],
//         ],
//         isGameOver: false,
//         size: 3,
//         turn: player.ONE,
//       }),
//       r('v12', {
//         paintedLinesAmount: 23,
//         score: {
//           PLAYER_1: 3,
//           PLAYER_2: 4,
//         },
//         horizontalLines: [
//           [true, true, true],
//           [true, true, true],
//           [true, true, true],
//           [true, true, true],
//         ],
//         verticalLines: [
//           [true, false, true, true],
//           [true, true, true, true],
//           [true, true, true, true],
//         ],
//         color: [
//           [cellColor.NONE, cellColor.NONE, cellColor.PLAYER_2],
//           [cellColor.PLAYER_2, cellColor.PLAYER_1, cellColor.PLAYER_1],
//           [cellColor.PLAYER_2, cellColor.PLAYER_1, cellColor.PLAYER_2],
//         ],
//         cellPaintedLines: [
//           [3, 3, 4],
//           [4, 4, 4],
//           [4, 4, 4],
//         ],
//         isGameOver: false,
//         size: 3,
//         turn: player.ONE,
//       }),
//       r('v13', {
//         paintedLinesAmount: 23,
//         score: {
//           PLAYER_1: 4,
//           PLAYER_2: 3,
//         },
//         horizontalLines: [
//           [true, true, true],
//           [true, true, true],
//           [true, true, true],
//           [true, true, true],
//         ],
//         verticalLines: [
//           [true, true, false, true],
//           [true, true, true, true],
//           [true, true, true, true],
//         ],
//         color: [
//           [cellColor.PLAYER_1, cellColor.NONE, cellColor.NONE],
//           [cellColor.PLAYER_2, cellColor.PLAYER_1, cellColor.PLAYER_1],
//           [cellColor.PLAYER_2, cellColor.PLAYER_1, cellColor.PLAYER_2],
//         ],
//         cellPaintedLines: [
//           [4, 3, 3],
//           [4, 4, 4],
//           [4, 4, 4],
//         ],
//         isGameOver: false,
//         size: 3,
//         turn: player.ONE,
//       }),
//       r('v14', {
//         paintedLinesAmount: 23,
//         score: {
//           PLAYER_1: 4,
//           PLAYER_2: 4,
//         },
//         horizontalLines: [
//           [true, true, true],
//           [true, true, true],
//           [true, true, true],
//           [true, true, true],
//         ],
//         verticalLines: [
//           [true, true, true, false],
//           [true, true, true, true],
//           [true, true, true, true],
//         ],
//         color: [
//           [cellColor.PLAYER_1, cellColor.PLAYER_2, cellColor.NONE],
//           [cellColor.PLAYER_2, cellColor.PLAYER_1, cellColor.PLAYER_1],
//           [cellColor.PLAYER_2, cellColor.PLAYER_1, cellColor.PLAYER_2],
//         ],
//         cellPaintedLines: [
//           [4, 4, 3],
//           [4, 4, 4],
//           [4, 4, 4],
//         ],
//         isGameOver: false,
//         size: 3,
//         turn: player.ONE,
//       }),
//       r('v21', {
//         paintedLinesAmount: 23,
//         score: {
//           PLAYER_1: 4,
//           PLAYER_2: 4,
//         },
//         horizontalLines: [
//           [true, true, true],
//           [true, true, true],
//           [true, true, true],
//           [true, true, true],
//         ],
//         verticalLines: [
//           [true, true, true, true],
//           [false, true, true, true],
//           [true, true, true, true],
//         ],
//         color: [
//           [cellColor.PLAYER_1, cellColor.PLAYER_2, cellColor.PLAYER_2],
//           [cellColor.NONE, cellColor.PLAYER_1, cellColor.PLAYER_1],
//           [cellColor.PLAYER_2, cellColor.PLAYER_1, cellColor.PLAYER_2],
//         ],
//         cellPaintedLines: [
//           [4, 4, 4],
//           [3, 4, 4],
//           [4, 4, 4],
//         ],
//         isGameOver: false,
//         size: 3,
//         turn: player.ONE,
//       }),
//       r('v23', {
//         paintedLinesAmount: 23,
//         score: {
//           PLAYER_1: 3,
//           PLAYER_2: 4,
//         },
//         horizontalLines: [
//           [true, true, true],
//           [true, true, true],
//           [true, true, true],
//           [true, true, true],
//         ],
//         verticalLines: [
//           [true, true, true, true],
//           [true, true, false, true],
//           [true, true, true, true],
//         ],
//         color: [
//           [cellColor.PLAYER_1, cellColor.PLAYER_2, cellColor.PLAYER_2],
//           [cellColor.PLAYER_2, cellColor.NONE, cellColor.NONE],
//           [cellColor.PLAYER_2, cellColor.PLAYER_1, cellColor.PLAYER_1],
//         ],
//         cellPaintedLines: [
//           [4, 4, 4],
//           [4, 3, 3],
//           [4, 4, 4],
//         ],
//         isGameOver: false,
//         size: 3,
//         turn: player.ONE,
//       }),
//       r('v31', {
//         paintedLinesAmount: 23,
//         score: {
//           PLAYER_1: 4,
//           PLAYER_2: 4,
//         },
//         horizontalLines: [
//           [true, true, true],
//           [true, true, true],
//           [true, true, true],
//           [true, true, true],
//         ],
//         verticalLines: [
//           [true, true, true, true],
//           [true, true, true, true],
//           [false, true, true, true],
//         ],
//         color: [
//           [cellColor.PLAYER_1, cellColor.PLAYER_2, cellColor.PLAYER_2],
//           [cellColor.PLAYER_2, cellColor.PLAYER_1, cellColor.PLAYER_1],
//           [cellColor.NONE, cellColor.PLAYER_1, cellColor.PLAYER_2],
//         ],
//         cellPaintedLines: [
//           [4, 4, 4],
//           [4, 4, 4],
//           [3, 4, 4],
//         ],
//         isGameOver: false,
//         size: 3,
//         turn: player.ONE,
//       }),
//       r('v32', {
//         paintedLinesAmount: 23,
//         score: {
//           PLAYER_1: 3,
//           PLAYER_2: 4,
//         },
//         horizontalLines: [
//           [true, true, true],
//           [true, true, true],
//           [true, true, true],
//           [true, true, true],
//         ],
//         verticalLines: [
//           [true, true, true, true],
//           [true, true, true, true],
//           [true, false, true, true],
//         ],
//         color: [
//           [cellColor.PLAYER_1, cellColor.PLAYER_2, cellColor.PLAYER_2],
//           [cellColor.PLAYER_2, cellColor.PLAYER_1, cellColor.PLAYER_1],
//           [cellColor.NONE, cellColor.NONE, cellColor.PLAYER_2],
//         ],
//         cellPaintedLines: [
//           [4, 4, 4],
//           [4, 4, 4],
//           [3, 3, 4],
//         ],
//         isGameOver: false,
//         size: 3,
//         turn: player.ONE,
//       }),
//       r('v34', {
//         paintedLinesAmount: 23,
//         score: {
//           PLAYER_1: 4,
//           PLAYER_2: 4,
//         },
//         horizontalLines: [
//           [true, true, true],
//           [true, true, true],
//           [true, true, true],
//           [true, true, true],
//         ],
//         verticalLines: [
//           [true, true, true, true],
//           [true, true, true, true],
//           [true, true, true, false],
//         ],
//         color: [
//           [cellColor.PLAYER_1, cellColor.PLAYER_2, cellColor.PLAYER_2],
//           [cellColor.PLAYER_2, cellColor.PLAYER_1, cellColor.PLAYER_1],
//           [cellColor.PLAYER_2, cellColor.PLAYER_1, cellColor.NONE],
//         ],
//         cellPaintedLines: [
//           [4, 4, 4],
//           [4, 4, 4],
//           [4, 4, 3],
//         ],
//         isGameOver: false,
//         size: 3,
//         turn: player.ONE,
//       }),
//       r('v33', {
//         paintedLinesAmount: 23,
//         score: {
//           PLAYER_1: 3,
//           PLAYER_2: 4,
//         },
//         horizontalLines: [
//           [true, true, true],
//           [true, true, true],
//           [true, true, true],
//           [true, true, true],
//         ],
//         verticalLines: [
//           [true, true, true, true],
//           [true, true, true, true],
//           [true, true, false, true],
//         ],
//         color: [
//           [cellColor.PLAYER_1, cellColor.PLAYER_2, cellColor.PLAYER_2],
//           [cellColor.PLAYER_2, cellColor.PLAYER_1, cellColor.PLAYER_1],
//           [cellColor.PLAYER_2, cellColor.NONE, cellColor.NONE],
//         ],
//         cellPaintedLines: [
//           [4, 4, 4],
//           [4, 4, 4],
//           [4, 3, 3],
//         ],
//         isGameOver: false,
//         size: 3,
//         turn: player.ONE,
//       }),
//     ],
//   },
//   // --------------------------------------------------------------------------------------------------------------
//   // --------------------------------------------------------------------------------------------------------------
//   // --------------------------------------------------------------------------------------------------------------
//   // LEVEL 2
//   // --------------------------------------------------------------------------------------------------------------
//   // --------------------------------------------------------------------------------------------------------------
//   // --------------------------------------------------------------------------------------------------------------
//   {
//     levelLocalizeId: 'DOTS_AND_BOXES_LEVEL2',
//     difficulty: 'EASY',
//     maxMovesNum: 2,
//     turnIndex: player.ONE,
//     riddles: [
//       r('h28', {
//         paintedLinesAmount: 22,
//         score: {
//           PLAYER_1: 2,
//           PLAYER_2: 4,
//         },
//         horizontalLines: [
//           [true, true, true],
//           [true, false, true],
//           [true, true, true],
//           [true, true, true],
//         ],
//         verticalLines: [
//           [true, true, true, true],
//           [true, false, true, true],
//           [true, true, true, true],
//         ],
//         color: [
//           [cellColor.PLAYER_1, cellColor.NONE, cellColor.PLAYER_2],
//           [cellColor.NONE, cellColor.NONE, cellColor.PLAYER_2],
//           [cellColor.PLAYER_2, cellColor.PLAYER_1, cellColor.PLAYER_2],
//         ],
//         cellPaintedLines: [
//           [4, 3, 4],
//           [3, 2, 4],
//           [4, 4, 4],
//         ],
//         isGameOver: false,
//         size: 3,
//         turn: player.ONE,
//       }),
//       r('h33', {
//         paintedLinesAmount: 22,
//         score: {
//           PLAYER_1: 1,
//           PLAYER_2: 4,
//         },
//         horizontalLines: [
//           [true, true, true],
//           [true, false, true],
//           [true, true, false],
//           [true, true, true],
//         ],
//         verticalLines: [
//           [true, true, true, true],
//           [true, true, true, true],
//           [true, true, true, true],
//         ],
//         color: [
//           [cellColor.PLAYER_1, cellColor.NONE, cellColor.PLAYER_2],
//           [cellColor.PLAYER_2, cellColor.NONE, cellColor.NONE],
//           [cellColor.PLAYER_2, cellColor.PLAYER_2, cellColor.NONE],
//         ],
//         cellPaintedLines: [
//           [4, 3, 4],
//           [4, 3, 3],
//           [4, 4, 3],
//         ],
//         isGameOver: false,
//         size: 3,
//         turn: player.ONE,
//       }),
//       r('h32', {
//         paintedLinesAmount: 22,
//         score: {
//           PLAYER_1: 2,
//           PLAYER_2: 4,
//         },
//         horizontalLines: [
//           [true, true, true],
//           [true, false, true],
//           [true, false, true],
//           [true, true, true],
//         ],
//         verticalLines: [
//           [true, true, true, true],
//           [true, true, true, true],
//           [true, true, true, true],
//         ],
//         color: [
//           [cellColor.PLAYER_1, cellColor.NONE, cellColor.PLAYER_2],
//           [cellColor.PLAYER_2, cellColor.NONE, cellColor.PLAYER_2],
//           [cellColor.PLAYER_2, cellColor.NONE, cellColor.PLAYER_1],
//         ],
//         cellPaintedLines: [
//           [4, 3, 4],
//           [4, 3, 4],
//           [4, 3, 4],
//         ],
//         isGameOver: false,
//         size: 3,
//         turn: player.ONE,
//       }),
//     ],
//   },
//   // ----------------------------------------------------------------------------------------------------------------
//   // ----------------------------------------------------------------------------------------------------------------
//   // ----------------------------------------------------------------------------------------------------------------
//   // LEVEL 3
//   // ----------------------------------------------------------------------------------------------------------------
//   // ----------------------------------------------------------------------------------------------------------------
//   // ----------------------------------------------------------------------------------------------------------------
//   {
//     levelLocalizeId: 'DOTS_AND_BOXES_LEVEL3',
//     maxMovesNum: 2,
//     difficulty: 'MEDIUM',
//     turnIndex: player.ONE,
//     riddles: [
//       r('h11', {
//         paintedLinesAmount: 22,
//         score: {
//           PLAYER_1: 3,
//           PLAYER_2: 4,
//         },
//         horizontalLines: [
//           [false, true, true],
//           [true, true, true],
//           [true, true, true],
//           [true, true, true],
//         ],
//         verticalLines: [
//           [true, false, true, true],
//           [true, true, true, true],
//           [true, true, true, true],
//         ],
//         color: [
//           [cellColor.NONE, cellColor.NONE, cellColor.PLAYER_2],
//           [cellColor.PLAYER_2, cellColor.PLAYER_1, cellColor.PLAYER_1],
//           [cellColor.PLAYER_2, cellColor.PLAYER_1, cellColor.PLAYER_2],
//         ],
//         cellPaintedLines: [
//           [2, 3, 4],
//           [4, 4, 4],
//           [4, 4, 4],
//         ],
//         isGameOver: false,
//         size: 3,
//         turn: player.ONE,
//       }),
//       r('h33', {
//         paintedLinesAmount: 22,
//         score: {
//           PLAYER_1: 3,
//           PLAYER_2: 4,
//         },
//         horizontalLines: [
//           [true, true, true],
//           [true, true, true],
//           [true, true, false],
//           [true, true, false],
//         ],
//         verticalLines: [
//           [true, true, true, true],
//           [true, true, true, true],
//           [true, true, true, true],
//         ],
//         color: [
//           [cellColor.PLAYER_2, cellColor.PLAYER_1, cellColor.PLAYER_2],
//           [cellColor.PLAYER_2, cellColor.PLAYER_1, cellColor.NONE],
//           [cellColor.PLAYER_2, cellColor.PLAYER_1, cellColor.NONE],
//         ],
//         cellPaintedLines: [
//           [4, 4, 4],
//           [4, 4, 3],
//           [4, 4, 2],
//         ],
//         isGameOver: false,
//         size: 3,
//         turn: player.ONE,
//       }),
//       r('h33', {
//         paintedLinesAmount: 22,
//         score: {
//           PLAYER_1: 3,
//           PLAYER_2: 4,
//         },
//         horizontalLines: [
//           [true, true, true],
//           [true, true, true],
//           [true, true, true],
//           [true, false, true],
//         ],
//         verticalLines: [
//           [true, true, true, true],
//           [true, true, true, true],
//           [true, false, true, true],
//         ],
//         color: [
//           [cellColor.PLAYER_2, cellColor.PLAYER_1, cellColor.PLAYER_2],
//           [cellColor.PLAYER_2, cellColor.PLAYER_1, cellColor.PLAYER_2],
//           [cellColor.NONE, cellColor.NONE, cellColor.PLAYER_1],
//         ],
//         cellPaintedLines: [
//           [4, 4, 4],
//           [4, 4, 4],
//           [3, 2, 4],
//         ],
//         isGameOver: false,
//         size: 3,
//         turn: player.ONE,
//       }),
//     ],
//   },
//   // ----------------------------------------------------------------------------------------------------------------
//   // ----------------------------------------------------------------------------------------------------------------
//   // ----------------------------------------------------------------------------------------------------------------
//   // LEVEL 4
//   // ----------------------------------------------------------------------------------------------------------------
//   // ----------------------------------------------------------------------------------------------------------------
//   // ----------------------------------------------------------------------------------------------------------------
//   {
//     levelLocalizeId: 'DOTS_AND_BOXES_LEVEL4',
//     maxMovesNum: 5,
//     difficulty: 'HARD',
//     turnIndex: player.ONE,
//     riddles: [
//       r('h13', {
//         paintedLinesAmount: 20,
//         score: {
//           PLAYER_1: 3,
//           PLAYER_2: 4,
//         },
//         horizontalLines: [
//           [true, true, false],
//           [true, true, false],
//           [true, true, true],
//           [true, true, true],
//         ],
//         verticalLines: [
//           [true, true, true, false],
//           [true, true, true, false],
//           [true, true, true, true],
//         ],
//         color: [
//           [cellColor.PLAYER_1, cellColor.PLAYER_2, cellColor.NONE],
//           [cellColor.PLAYER_2, cellColor.PLAYER_1, cellColor.NONE],
//           [cellColor.PLAYER_2, cellColor.PLAYER_1, cellColor.PLAYER_2],
//         ],
//         cellPaintedLines: [
//           [4, 4, 1],
//           [4, 4, 2],
//           [4, 4, 4],
//         ],
//         isGameOver: false,
//         size: 3,
//         turn: player.ONE,
//       }),
//     ],
//   },
// ];
