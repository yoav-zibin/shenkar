import {deepClone} from '../../common/common';
import * as aiService from '../aiService';
import * as gameLogic from '../gameLogic';
import {cellColor} from '../gameLogic';

describe('aiService', function () {
  it('case1: getPossibleMoves returns three possible move', function () {
    console.log('case1');
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
});
