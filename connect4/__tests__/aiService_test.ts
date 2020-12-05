import {IMove, deepEquals} from '../../common/common';
import {Board, IState} from '../gameLogic';
import {getPossibleMoves, aiService} from '../aiService';
import {createComputerMove} from '../../common/alphaBetaService';

describe('aiService', function () {
  function createStateFromBoard(board: Board): IState {
    return {board: board, delta: null};
  }

  function createComMove(board: Board, turnIndex: number, maxDepth: number): IMove<IState> {
    return createComputerMove(createStateFromBoard(board), turnIndex, {maxDepth: maxDepth}, aiService);
  }
  it('getPossibleMoves returns exactly one cell', function () {
    const board = [
      ['Y', 'Y', ' ', 'Y', 'Y', 'R', 'R'],
      ['Y', 'R', 'R', 'Y', 'R', 'R', 'R'],
      ['Y', 'Y', 'R', 'R', 'Y', 'Y', 'Y'],
      ['R', 'R', 'Y', 'R', 'Y', 'R', 'R'],
      ['Y', 'R', 'Y', 'R', 'Y', 'Y', 'R'],
      ['R', 'Y', 'R', 'Y', 'R', 'Y', 'R'],
    ];
    const possibleMoves = getPossibleMoves(createStateFromBoard(board), 0);
    expect(possibleMoves.length).toBe(1);
    expect(deepEquals(possibleMoves[0].state.delta, {row: 0, col: 2})).toBe(true);
  });
  it('X finds an immediate winning move', function () {
    const move = createComMove(
      [
        ['Y', 'Y', ' ', 'Y', 'Y', ' ', 'R'],
        ['Y', 'R', 'R', 'Y', 'R', 'R', 'R'],
        ['Y', 'Y', 'R', 'R', 'Y', 'Y', 'Y'],
        ['R', 'R', 'Y', 'R', 'Y', 'R', 'R'],
        ['Y', 'R', 'Y', 'R', 'Y', 'Y', 'R'],
        ['R', 'Y', 'R', 'Y', 'R', 'Y', 'R'],
      ],
      0,
      1
    );
    expect(deepEquals(move.state.delta, {row: 0, col: 2})).toBe(true);
  });

  it('X prevents an immediate win', function () {
    const move = createComMove(
      [
        [' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', 'Y'],
        ['R', 'R', 'R', ' ', 'Y', ' ', 'Y'],
      ],
      0,
      2
    );
    expect(deepEquals(move.state.delta, {row: 5, col: 3})).toBe(true);
  });
  it('B prevents another immediate win', function () {
    const move = createComMove(
      [
        [' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' '],
        ['R', 'R', ' ', ' ', 'Y', 'Y', 'Y'],
      ],
      1,
      2
    );
    expect(deepEquals(move.state.delta, {row: 5, col: 3})).toBe(true);
  });
});
