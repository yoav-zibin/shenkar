import {IMove, deepEquals} from '../../common/common';
import {Board, IState, getInitialBoard} from '../gameLogic';
import {aiService} from '../aiService';
import {createComputerMove} from '../../common/alphaBetaService';
import {checkAiService} from '../../common/utilsForTests';

describe('aiService', function () {
  function createComMove(board: Board, turnIndex: number): IMove<IState> {
    const state: IState = {board: board ? board : getInitialBoard(), boardBeforeMove: getInitialBoard(), miniMoves: []};
    return createComputerMove(state, turnIndex, {maxDepth: 1}, aiService);
  }

  it('checkAiService', () => {
    checkAiService(aiService);
  });

  it('returns a legal regular move', function () {
    const boardBeforeMove: Board = [
      ['--', 'DS', '--', 'DS', '--', 'DS', '--', 'BM'],
      ['DS', '--', 'DS', '--', 'DS', '--', 'DS', '--'],
      ['--', 'DS', '--', 'DS', '--', 'DS', '--', 'DS'],
      ['WM', '--', 'DS', '--', 'DS', '--', 'DS', '--'],
      ['--', 'DS', '--', 'DS', '--', 'DS', '--', 'DS'],
      ['DS', '--', 'DS', '--', 'DS', '--', 'DS', '--'],
      ['--', 'DS', '--', 'DS', '--', 'DS', '--', 'DS'],
      ['DS', '--', 'DS', '--', 'DS', '--', 'DS', '--'],
    ];
    const move = createComMove(boardBeforeMove, 0);
    const expectedMove: IMove<IState> = {
      state: {
        board: [
          ['--', 'DS', '--', 'DS', '--', 'DS', '--', 'BM'],
          ['DS', '--', 'DS', '--', 'DS', '--', 'DS', '--'],
          ['--', 'WM', '--', 'DS', '--', 'DS', '--', 'DS'],
          ['DS', '--', 'DS', '--', 'DS', '--', 'DS', '--'],
          ['--', 'DS', '--', 'DS', '--', 'DS', '--', 'DS'],
          ['DS', '--', 'DS', '--', 'DS', '--', 'DS', '--'],
          ['--', 'DS', '--', 'DS', '--', 'DS', '--', 'DS'],
          ['DS', '--', 'DS', '--', 'DS', '--', 'DS', '--'],
        ],
        boardBeforeMove: boardBeforeMove,
        miniMoves: [{fromDelta: {row: 3, col: 0}, toDelta: {row: 2, col: 1}}],
      },
      endMatchScores: null,
      turnIndex: 1,
    };
    expect(deepEquals(move, expectedMove)).toBe(true);
  });

  it('returns a legal jump (mega) move', function () {
    const boardBeforeMove: Board = [
      ['--', 'DS', '--', 'DS', '--', 'DS', '--', 'BM'],
      ['DS', '--', 'DS', '--', 'DS', '--', 'WM', '--'],
      ['--', 'DS', '--', 'DS', '--', 'DS', '--', 'DS'],
      ['DS', '--', 'DS', '--', 'DS', '--', 'WM', '--'],
      ['--', 'DS', '--', 'DS', '--', 'DS', '--', 'DS'],
      ['DS', '--', 'DS', '--', 'DS', '--', 'WM', '--'],
      ['--', 'DS', '--', 'DS', '--', 'DS', '--', 'DS'],
      ['DS', '--', 'DS', '--', 'DS', '--', 'DS', '--'],
    ];
    const move = createComMove(boardBeforeMove, 1);
    const expectedMove: IMove<IState> = {
      state: {
        board: [
          ['--', 'DS', '--', 'DS', '--', 'DS', '--', 'DS'],
          ['DS', '--', 'DS', '--', 'DS', '--', 'DS', '--'],
          ['--', 'DS', '--', 'DS', '--', 'DS', '--', 'DS'],
          ['DS', '--', 'DS', '--', 'DS', '--', 'DS', '--'],
          ['--', 'DS', '--', 'DS', '--', 'DS', '--', 'DS'],
          ['DS', '--', 'DS', '--', 'DS', '--', 'DS', '--'],
          ['--', 'DS', '--', 'DS', '--', 'BM', '--', 'DS'],
          ['DS', '--', 'DS', '--', 'DS', '--', 'DS', '--'],
        ],
        boardBeforeMove: boardBeforeMove,
        miniMoves: [
          {fromDelta: {row: 0, col: 7}, toDelta: {row: 2, col: 5}},
          {fromDelta: {row: 2, col: 5}, toDelta: {row: 4, col: 7}},
          {fromDelta: {row: 4, col: 7}, toDelta: {row: 6, col: 5}},
        ],
      },
      endMatchScores: [0, 1],
      turnIndex: -1,
    };
    expect(deepEquals(move, expectedMove)).toBe(true);
  });

  it('Another mega move', function () {
    const boardBeforeMove: Board = [
      ['--', 'DS', '--', 'DS', '--', 'DS', '--', 'DS'],
      ['BM', '--', 'BM', '--', 'DS', '--', 'DS', '--'],
      ['--', 'DS', '--', 'DS', '--', 'DS', '--', 'DS'],
      ['BM', '--', 'BM', '--', 'DS', '--', 'DS', '--'],
      ['--', 'WM', '--', 'BM', '--', 'DS', '--', 'DS'],
      ['DS', '--', 'BM', '--', 'DS', '--', 'BM', '--'],
      ['--', 'WM', '--', 'DS', '--', 'BM', '--', 'DS'],
      ['WM', '--', 'DS', '--', 'DS', '--', 'DS', '--'],
    ];
    const move = createComMove(boardBeforeMove, 1);
    const expectedMove: IMove<IState> = {
      state: {
        board: [
          ['--', 'DS', '--', 'DS', '--', 'DS', '--', 'DS'],
          ['BM', '--', 'BM', '--', 'DS', '--', 'DS', '--'],
          ['--', 'DS', '--', 'DS', '--', 'DS', '--', 'DS'],
          ['BM', '--', 'DS', '--', 'DS', '--', 'DS', '--'],
          ['--', 'DS', '--', 'BM', '--', 'DS', '--', 'DS'],
          ['DS', '--', 'BM', '--', 'DS', '--', 'BM', '--'],
          ['--', 'DS', '--', 'DS', '--', 'BM', '--', 'DS'],
          ['WM', '--', 'BK', '--', 'DS', '--', 'DS', '--'],
        ],
        boardBeforeMove: boardBeforeMove,
        miniMoves: [
          {fromDelta: {row: 3, col: 2}, toDelta: {row: 5, col: 0}},
          {fromDelta: {row: 5, col: 0}, toDelta: {row: 7, col: 2}},
        ],
      },
      endMatchScores: null,
      turnIndex: 0,
    };
    expect(deepEquals(move, expectedMove)).toBe(true);
  });
});
