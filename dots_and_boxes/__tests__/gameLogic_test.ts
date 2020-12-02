import {IMove} from '../../common/common';
import * as gameLogic from '../gameLogic';

describe('In Dots_and_Boxes', function () {
  function expectMove(move: IMove<gameLogic.IState>, isIllegal: boolean): void {
    const {
      board: {size},
    } = move.state;
    if (move.state.delta) {
      // eslint-disable-next-line no-var
      var {direction, col, row} = move.state.delta;
    }
    expect(gameLogic.moveIsIllegal(size, direction, row, col)).toBe(isIllegal);
  }

  function expectMoveOk(move: IMove<gameLogic.IState>): void {
    expectMove(move, false);
  }

  // stage1: board's original state, cases when no one complete any cells
  it('YOU filling edge in hor:0x0 position from initial state is legal', function () {
    const board = gameLogic.getInitialBoard();
    const boardAfterMove = gameLogic.createMove(board, gameLogic.lineDirection.HORIZONTAL, 0, 0);
    expectMoveOk(boardAfterMove);
  });

  // stage2: board's original state, cases when no one complete any cells
  it('YOU filling edge in hor:0x0 position from initial state is illegal', function () {
    const board = gameLogic.getInitialBoard();
    // const boardAfterMove = gameLogic.createMove(board, gameLogic.lineDirection.HORIZONTAL, 6, 0);
    expect(() => gameLogic.createMove(board, gameLogic.lineDirection.HORIZONTAL, 6, 0)).toThrow(
      new Error('Move is illegal. Either row or column are out of bounds.')
    );
    // expectIllegalMove(boardAfterMove);
  });
});
