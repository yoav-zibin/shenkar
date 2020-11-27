import * as gameLogic from '../gameLogic';
import * as aiService from '../aiService';
import {IMove, deepClone, deepEquals} from '../../common/common';
import {cellColor, player, printBoard} from '../gameLogic';

describe('aiService', function () {
  it('case1: getPossibleMoves returns two move', function () {
    console.log('case1');
    const state = gameLogic.getInitialState();
    const boardBeforeLastMove = deepClone(state.board);
    boardBeforeLastMove.paintedLinesAmount = 23;
    boardBeforeLastMove.score = {
      PLAYER_1: 2,
      PLAYER_2: 6,
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
      [true, true, true, false],
    ];
    boardBeforeLastMove.color = [
      [cellColor.PLAYER_1, cellColor.PLAYER_1, cellColor.PLAYER_1],
      [cellColor.PLAYER_1, cellColor.PLAYER_1, cellColor.PLAYER_1],
      [cellColor.PLAYER_2, cellColor.PLAYER_1, cellColor.NONE],
    ];
    boardBeforeLastMove.cellPaintedLines = [
      [4, 4, 4],
      [4, 4, 4],
      [4, 4, 3],
    ];

    const delta = {
      direction: gameLogic.lineDirection.VERTICAL,
      row: 2,
      col: 3,
    };
    const possibleMoves = aiService.getPossibleMoves({board: boardBeforeLastMove, delta});
    const boardAfterLastMove = gameLogic.updateBoard(boardBeforeLastMove, gameLogic.lineDirection.VERTICAL, 2, 3);
    const expectedMove: IMove<gameLogic.IState> = {
      endMatchScores: [3, 6],
      state: {board: boardAfterLastMove, delta},
      turnIndex: 0,
    };
    // { set: { key: 'board', value: boardAfterLastMove } },
    // { set: { key: 'delta', value: { dir: 'hor', row: 3, col: 2 } } }];
    console.log(possibleMoves[0].state.board);
    console.log(expectedMove.state.board);
    expect(deepEquals(possibleMoves, [expectedMove])).toBe(true);
    // expect(possibleMoves.length).toBe(1);
  });
});
