import {deepClone} from '../../common/common';
import * as aiService from '../aiService';
import * as gameLogic from '../gameLogic';
import {cellColor} from '../gameLogic';

describe('aiService', function () {
  it('case1: getPossibleMoves returns three possible move', function () {
    const state = gameLogic.getInitialState();
    const boardBeforeLastMove = deepClone(state.board);
    boardBeforeLastMove.paintedLinesAmount = 21;
    boardBeforeLastMove.score = {
      PLAYER_1: 4,
      PLAYER_2: 0,
    };
    boardBeforeLastMove.horizontalLines = [
      [true, true, true],
      [true, true, true],
      [false, true, true],
      [true, true, true],
    ];
    boardBeforeLastMove.verticalLines = [
      [true, true, false, true],
      [true, true, true, true],
      [true, true, true, false],
    ];
    boardBeforeLastMove.color = [
      [cellColor.PLAYER_1, cellColor.NONE, cellColor.NONE],
      [cellColor.NONE, cellColor.PLAYER_1, cellColor.PLAYER_1],
      [cellColor.NONE, cellColor.PLAYER_1, cellColor.NONE],
    ];
    boardBeforeLastMove.cellPaintedLines = [
      [4, 3, 3],
      [3, 4, 4],
      [3, 4, 3],
    ];

    const delta = {
      direction: gameLogic.lineDirection.VERTICAL,
      row: 2,
      col: 3,
    };
    const possibleMoves = aiService.getPossibleMoves({board: boardBeforeLastMove, delta});
    expect(possibleMoves.length).toBe(3);
  });

  it('case2: getPossibleMoves returns 0 possible move', function () {
    const state = gameLogic.getInitialState();
    const boardBeforeLastMove = deepClone(state.board);
    boardBeforeLastMove.paintedLinesAmount = 24;
    boardBeforeLastMove.score = {
      PLAYER_1: 5,
      PLAYER_2: 4,
    };
    boardBeforeLastMove.horizontalLines = [
      [true, true, true],
      [true, true, true],
      [true, true, true],
      [true, true, true],
    ];
    boardBeforeLastMove.verticalLines = [
      [true, true, true, true],
      [true, true, true, true],
      [true, true, true, true],
    ];
    boardBeforeLastMove.color = [
      [cellColor.PLAYER_1, cellColor.PLAYER_1, cellColor.PLAYER_2],
      [cellColor.PLAYER_2, cellColor.PLAYER_1, cellColor.PLAYER_1],
      [cellColor.PLAYER_2, cellColor.PLAYER_1, cellColor.PLAYER_2],
    ];
    boardBeforeLastMove.cellPaintedLines = [
      [4, 4, 4],
      [4, 4, 4],
      [4, 4, 4],
    ];

    const delta = {
      direction: gameLogic.lineDirection.VERTICAL,
      row: 2,
      col: 3,
    };
    const possibleMoves = aiService.getPossibleMoves({board: boardBeforeLastMove, delta});
    expect(possibleMoves.length).toBe(0);
  });

  it('case3: getPossibleMoves returns 24 possible move', function () {
    const state = gameLogic.getInitialState();
    const boardBeforeLastMove = deepClone(state.board);
    boardBeforeLastMove.paintedLinesAmount = 0;
    boardBeforeLastMove.score = {
      PLAYER_1: 0,
      PLAYER_2: 0,
    };
    boardBeforeLastMove.horizontalLines = [
      [false, false, false],
      [false, false, false],
      [false, false, false],
      [false, false, false],
    ];
    boardBeforeLastMove.verticalLines = [
      [false, false, false, false],
      [false, false, false, false],
      [false, false, false, false],
    ];
    boardBeforeLastMove.color = [
      [cellColor.NONE, cellColor.NONE, cellColor.NONE],
      [cellColor.NONE, cellColor.NONE, cellColor.NONE],
      [cellColor.NONE, cellColor.NONE, cellColor.NONE],
    ];
    boardBeforeLastMove.cellPaintedLines = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];

    const delta = {
      direction: gameLogic.lineDirection.VERTICAL,
      row: 2,
      col: 3,
    };
    const possibleMoves = aiService.getPossibleMoves({board: boardBeforeLastMove, delta});
    expect(possibleMoves.length).toBe(24);
  });
});
