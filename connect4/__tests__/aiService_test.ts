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
      ['B', 'R', 'R', ' ', 'R', 'B', 'R'],
      ['R', 'R', 'B', 'R', 'R', 'B', 'B'],
      ['R', 'B', 'B', 'R', 'B', 'B', 'B'],
      ['R', 'R', 'B', 'B', 'R', 'R', 'R'],
      ['B', 'B', 'R', 'B', 'R', 'B', 'B'],
      ['R', 'B', 'R', 'B', 'R', 'R', 'B'],
      ['B', 'R', 'B', 'R', 'B', 'R', 'B'],
    ];
    const possibleMoves = getPossibleMoves(createStateFromBoard(board), 0);
    expect(possibleMoves.length).toBe(1);
    expect(deepEquals(possibleMoves[0].state.delta, {row: 0, col: 3})).toBe(true);
  });
  it('X finds an immediate winning move', function () {
    const move = createComMove(
      [
        [' ', 'R', 'R', ' ', 'R', 'B', 'R'],
        ['R', 'R', 'B', 'R', 'R', 'B', 'B'],
        ['R', 'B', 'B', 'R', 'B', 'B', 'B'],
        ['R', 'R', 'B', 'B', 'R', 'R', 'R'],
        ['B', 'B', 'R', 'B', 'R', 'B', 'B'],
        ['R', 'B', 'R', 'B', 'R', 'R', 'B'],
        ['B', 'R', 'B', 'R', 'B', 'R', 'B'],
      ],
      0,
      1
    );
    expect(deepEquals(move.state.delta, {row: 0, col: 0})).toBe(true);
  });
  it('X prevents an immediate win', function () {
    const move = createComMove(
      [
        [' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', 'R'],
        ['B', 'B', 'B', ' ', 'R', ' ', 'R'],
      ],
      0,
      2
    );
    expect(deepEquals(move.state.delta, {row: 6, col: 3})).toBe(true);
  });
  it('B prevents another immediate win', function () {
    const move = createComMove(
      [
        [' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ', ' ', ' '],
        ['B', 'B', ' ', ' ', 'R', 'R', 'R'],
      ],
      1,
      2
    );
    console.log('move.state.delta');
    console.log(move.state.delta);
    expect(deepEquals(move.state.delta, {row: 6, col: 3})).toBe(true);
  });
});
