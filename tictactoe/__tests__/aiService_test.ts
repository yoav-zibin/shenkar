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
      ['O', 'O', 'X'],
      ['X', 'X', 'O'],
      ['O', 'X', ''],
    ];
    const possibleMoves = getPossibleMoves(createStateFromBoard(board), 0);
    expect(possibleMoves.length).toBe(1);
    expect(deepEquals(possibleMoves[0].state.delta, {row: 2, col: 2})).toBe(true);
  });

  it('X finds an immediate winning move', function () {
    const move = createComMove(
      [
        ['', '', 'O'],
        ['O', 'X', 'X'],
        ['O', 'X', 'O'],
      ],
      0,
      1
    );
    expect(deepEquals(move.state.delta, {row: 0, col: 1})).toBe(true);
  });

  it('X finds an immediate winning move in less than a second', function () {
    const move = createComputerMove(
      {
        board: [
          ['', '', 'O'],
          ['O', 'X', 'X'],
          ['O', 'X', 'O'],
        ],
        delta: null,
      },
      0,
      // at most 1 second for the AI to choose a move (but might be much quicker)
      {millisecondsLimit: 1000},
      aiService
    );
    expect(deepEquals(move.state.delta, {row: 0, col: 1})).toBe(true);
  });

  it('O finds an immediate winning move', function () {
    const move = createComMove(
      [
        ['', '', 'O'],
        ['O', 'X', 'X'],
        ['O', 'X', 'O'],
      ],
      1,
      1
    );
    expect(deepEquals(move.state.delta, {row: 0, col: 0})).toBe(true);
  });

  it('X prevents an immediate win', function () {
    const move = createComMove(
      [
        ['X', '', ''],
        ['O', 'O', ''],
        ['X', '', ''],
      ],
      0,
      2
    );
    expect(deepEquals(move.state.delta, {row: 1, col: 2})).toBe(true);
  });

  it('O prevents an immediate win', function () {
    const move = createComMove(
      [
        ['X', 'X', ''],
        ['O', '', ''],
        ['', '', ''],
      ],
      1,
      2
    );
    expect(deepEquals(move.state.delta, {row: 0, col: 2})).toBe(true);
  });

  it('O prevents another immediate win', function () {
    const move = createComMove(
      [
        ['X', 'O', ''],
        ['X', 'O', ''],
        ['', 'X', ''],
      ],
      1,
      2
    );
    expect(deepEquals(move.state.delta, {row: 2, col: 0})).toBe(true);
  });

  it('X finds a winning move that will lead to winning in 2 steps', function () {
    const move = createComMove(
      [
        ['X', '', ''],
        ['O', 'X', ''],
        ['', '', 'O'],
      ],
      0,
      3
    );
    expect(deepEquals(move.state.delta, {row: 0, col: 1})).toBe(true);
  });

  it('O finds a winning move that will lead to winning in 2 steps', function () {
    const move = createComMove(
      [
        ['', 'X', ''],
        ['X', 'X', 'O'],
        ['', 'O', ''],
      ],
      1,
      3
    );
    expect(deepEquals(move.state.delta, {row: 2, col: 2})).toBe(true);
  });

  it('O finds a cool winning move that will lead to winning in 2 steps', function () {
    const move = createComMove(
      [
        ['X', 'O', 'X'],
        ['X', '', ''],
        ['O', '', ''],
      ],
      1,
      3
    );
    expect(deepEquals(move.state.delta, {row: 2, col: 1})).toBe(true);
  });

  it('O finds the wrong move due to small depth', function () {
    const move = createComMove(
      [
        ['X', '', ''],
        ['', '', ''],
        ['', '', ''],
      ],
      1,
      3
    );
    expect(deepEquals(move.state.delta, {row: 0, col: 1})).toBe(true);
  });

  it('O finds the correct move when depth is big enough', function () {
    const move = createComMove(
      [
        ['X', '', ''],
        ['', '', ''],
        ['', '', ''],
      ],
      1,
      6
    );
    expect(deepEquals(move.state.delta, {row: 1, col: 1})).toBe(true);
  });

  it('X finds a winning move that will lead to winning in 2 steps part2', function () {
    const move = createComMove(
      [
        ['', '', ''],
        ['O', 'X', ''],
        ['', '', ''],
      ],
      0,
      5
    );
    expect(deepEquals(move.state.delta, {row: 0, col: 0})).toBe(true);
  });
});
