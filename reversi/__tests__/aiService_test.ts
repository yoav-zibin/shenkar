import {aiService} from '../aiService';
import {checkAiService} from '../../common/utilsForTests';
// import {Board, IState, getInitialBoard} from '../gameLogic';
// import {IMove, deepEquals} from '../../common/common';
// import {createComputerMove} from '../../common/alphaBetaService';
import {deepEquals} from '../../common/common';
import {getPossibleMoves} from '../aiService';

describe('aiService', () => {
  // function createComMove(board: Board, turnIndex: number): IMove<IState> {
  //   const state: IState = {board: board ? board : getInitialBoard()};
  //   return createComputerMove(state, turnIndex, {maxDepth: 1}, aiService);
  // }

  it('checkAiService', () => {
    checkAiService(aiService);
  });

  it('getPossibleMoves returns exactly one cell', () => {
    const board = [
      ['W', 'B', 'B', 'B', 'B', 'B', 'B', 'B'],
      ['W', 'B', 'B', 'B', 'B', 'B', 'B', 'B'],
      ['W', 'W', 'B', 'B', 'B', 'B', 'B', 'B'],
      ['B', 'B', 'W', 'B', 'W', 'W', 'B', 'B'],
      ['B', 'W', 'B', 'W', 'W', 'B', 'W', 'B'],
      ['B', 'B', 'W', 'B', 'W', 'B', 'W', 'B'],
      ['B', 'B', 'B', 'B', 'B', 'B', 'B', 'W'],
      ['W', 'W', 'W', 'W', 'W', 'B', '', ''],
    ];
    const possibleMoves = getPossibleMoves({board}, 0); // B
    expect(possibleMoves.length).toBe(1);
    expect(deepEquals(possibleMoves[0].state.delta, {row: 7, col: 7})).toBe(true);
  });
});
