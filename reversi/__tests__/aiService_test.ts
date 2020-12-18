import {aiService} from '../aiService';
import {checkAiService} from '../../common/utilsForTests';
import {Board, IState, getInitialBoard} from '../gameLogic';
import {IMove, deepEquals} from '../../common/common';
import {createComputerMove} from '../../common/alphaBetaService';
import {getPossibleMoves} from '../aiService';

describe('aiService', () => {
  function createComMove(board: Board, turnIndex: number, maxDepth: number): IMove<IState> {
    const state: IState = {board: board ? board : getInitialBoard()};
    return createComputerMove(state, turnIndex, {maxDepth}, aiService);
  }

  it('checkAiService', () => {
    checkAiService(aiService);
  });

  describe('getPossibleMoves', () => {
    describe('one possible move', () => {
      it('getPossibleMoves returns exactly one cell for Black', () => {
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

      it('getPossibleMoves returns exactly one cell for White', () => {
        const board = [
          ['B', 'B', 'B', 'B', 'B', 'B', 'B', 'B'],
          ['W', 'B', 'B', 'B', 'B', 'B', 'B', 'B'],
          ['W', 'W', 'B', 'W', 'B', 'B', 'B', 'B'],
          ['B', 'B', 'W', 'B', 'W', 'W', 'B', 'B'],
          ['B', 'W', 'B', 'W', 'W', 'B', 'W', 'B'],
          ['B', 'B', 'W', 'B', 'W', 'B', 'W', 'B'],
          ['B', 'B', 'B', 'B', 'B', 'B', 'W', 'W'],
          ['W', 'W', 'W', 'W', 'W', 'B', '', ''],
        ];
        const possibleMoves = getPossibleMoves({board}, 1); // W
        expect(possibleMoves.length).toBe(1);
        expect(deepEquals(possibleMoves[0].state.delta, {row: 7, col: 6})).toBe(true);
      });
    });

    describe('two possible moves', () => {
      it('getPossibleMoves returns exactly two cell for White', () => {
        const board = [
          ['', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', ''],
          ['', '', 'B', 'B', '', '', '', ''],
          ['', '', '', 'B', 'W', '', '', ''],
          ['', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', ''],
        ];
        const possibleMoves = getPossibleMoves({board}, 1); // W
        expect(possibleMoves.length).toBe(2);
        expect(deepEquals(possibleMoves[0].state.delta, {row: 2, col: 2})).toBe(true);
        expect(deepEquals(possibleMoves[1].state.delta, {row: 4, col: 2})).toBe(true);
      });

      it('getPossibleMoves returns exactly two cell for Black', () => {
        const board = [
          ['', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', ''],
          ['', '', 'W', 'W', '', '', '', ''],
          ['', '', '', 'W', 'B', '', '', ''],
          ['', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', ''],
        ];
        const possibleMoves = getPossibleMoves({board}, 0); // B
        expect(possibleMoves.length).toBe(2);
        expect(deepEquals(possibleMoves[0].state.delta, {row: 2, col: 2})).toBe(true);
        expect(deepEquals(possibleMoves[1].state.delta, {row: 4, col: 2})).toBe(true);
      });
    });

    describe('no moves', () => {
      it('getPossibleMoves returns no moves for White', () => {
        const board = [
          ['', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', ''],
          ['W', 'W', 'W', 'W', 'B', 'B', 'B', 'B'],
          ['', '', 'W', '', '', '', 'B', ''],
          ['', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', ''],
        ];
        const possibleMoves = getPossibleMoves({board}, 1); // W
        expect(possibleMoves.length).toBe(0);
      });

      it('getPossibleMoves returns no moves for Black', () => {
        const board = [
          ['', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', ''],
          ['W', 'W', 'W', 'W', 'B', 'B', 'B', 'B'],
          ['', '', 'W', '', '', '', 'B', ''],
          ['', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', ''],
        ];
        const possibleMoves = getPossibleMoves({board}, 0); // B
        expect(possibleMoves.length).toBe(0);
      });
    });
  });

  describe('computer move', () => {
    it('B finds an immediate winning move in less than a second', function () {
      const move = createComputerMove(
        {
          board: [
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', 'B', 'B', 'B', 'W', 'W', ''],
            ['', '', '', 'B', '', '', 'B', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
          ],
        },
        0,
        // at most 1 second for the AI to choose a move (but might be much quicker)
        {millisecondsLimit: 1000},
        aiService
      );
      expect(deepEquals(move.state.delta, {row: 3, col: 7})).toBe(true);
    });

    it('W finds an immediate winning move', function () {
      const move = createComMove(
        [
          ['', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', ''],
          ['', '', 'B', 'B', 'B', 'W', '', ''],
          ['', '', '', 'W', '', '', '', ''],
          ['', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', ''],
        ],
        1,
        1
      );
      expect(deepEquals(move.state.delta, {row: 3, col: 1})).toBe(true);
    });

    it('B prevents an immediate win', function () {
      const move = createComMove(
        [
          ['', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', ''],
          ['W', 'W', 'B', 'B', 'W', 'W', '', ''],
          ['', '', '', 'W', '', '', '', ''],
          ['', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', ''],
        ],
        0,
        2
      );
      expect(deepEquals(move.state.delta, {row: 5, col: 3})).toBe(true);
    });

    it('W prevents an immediate win', function () {
      const move = createComMove(
        [
          ['', '', '', '', '', '', '', ''],
          ['', '', '', 'B', '', '', '', ''],
          ['', '', '', 'B', '', '', '', ''],
          ['', '', 'B', 'W', 'B', 'B', 'B', 'B'],
          ['', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', ''],
        ],
        1,
        2
      );
      expect(deepEquals(move.state.delta, {row: 0, col: 3})).toBe(true);
    });

    it('W prevents another immediate win', function () {
      const move = createComMove(
        [
          ['', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', ''],
          ['', '', 'B', '', '', '', '', ''],
          ['', '', 'B', 'W', 'B', 'B', 'B', 'B'],
          ['', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', ''],
        ],
        1,
        2
      );
      expect(deepEquals(move.state.delta, {row: 1, col: 1})).toBe(true);
    });

    it('B finds a winning move that will lead to winning in 2 steps', function () {
      const move = createComMove(
        [
          ['B', 'B', 'B', 'B', 'B', 'B', 'B', 'B'],
          ['B', 'B', 'B', 'B', 'B', 'B', 'B', 'B'],
          ['W', 'W', 'B', 'W', 'B', 'B', 'B', 'B'],
          ['B', 'B', 'W', 'B', 'W', 'W', 'B', 'B'],
          ['B', 'W', 'B', 'W', 'W', 'B', 'W', 'B'],
          ['B', 'B', 'W', 'B', 'W', 'B', 'W', 'B'],
          ['B', 'B', 'B', 'B', 'B', 'B', 'W', 'W'],
          ['B', 'W', 'W', 'W', 'W', '', '', ''],
        ],
        0,
        3
      );
      expect(deepEquals(move.state.delta, {row: 7, col: 5})).toBe(true);
    });

    it('W finds a winning move that will lead to winning in 2 steps', function () {
      const move = createComMove(
        [
          ['W', 'B', 'B', 'B', 'B', 'B', 'B', ''],
          ['W', 'B', 'B', 'B', 'B', 'B', 'W', 'B'],
          ['W', 'W', 'B', 'W', 'B', 'B', 'B', 'B'],
          ['W', 'B', 'W', 'W', 'W', 'W', 'W', 'B'],
          ['W', 'W', 'B', 'W', 'W', 'B', 'W', 'B'],
          ['W', 'B', 'W', 'B', 'W', 'B', 'W', 'B'],
          ['W', 'B', 'B', 'B', 'B', 'B', 'W', 'B'],
          ['W', 'W', 'W', 'W', 'W', '', '', 'B'],
        ],
        1,
        3
      );
      expect(deepEquals(move.state.delta, {row: 0, col: 7})).toBe(true);
    });

    it('W finds the wrong move due to small depth', function () {
      const move = createComMove(
        [
          ['', '', '', '', '', '', '', ''],
          ['B', 'B', '', '', 'B', '', '', ''],
          ['B', 'B', '', 'B', 'B', '', '', ''],
          ['B', 'B', 'B', 'B', '', '', '', ''],
          ['B', 'B', 'W', '', '', '', '', ''],
          ['B', 'B', '', '', '', '', '', ''],
          ['B', 'B', '', '', '', '', '', ''],
          ['', 'B', '', '', '', '', '', ''],
        ],
        1,
        1
      );
      expect(deepEquals(move.state.delta, {row: 1, col: 5})).toBe(true);
    });

    it('W finds the correct move when depth is big enough', function () {
      const move = createComMove(
        [
          ['', '', '', '', '', '', '', ''],
          ['B', 'B', '', '', 'B', '', '', ''],
          ['B', 'B', '', 'B', 'B', '', '', ''],
          ['B', 'B', 'B', 'B', '', '', '', ''],
          ['B', 'B', 'W', '', '', '', '', ''],
          ['B', 'B', '', '', '', '', '', ''],
          ['B', 'B', '', '', '', '', '', ''],
          ['', 'B', '', '', '', '', '', ''],
        ],
        1,
        4
      );
      expect(deepEquals(move.state.delta, {row: 2, col: 2})).toBe(true);
    });

    it('W prefer to eat only 1 instead of 2 for future plans', function () {
      const move = createComMove(
        [
          ['', '', '', '', '', '', '', ''],
          ['B', 'B', '', '', 'B', '', '', ''],
          ['B', 'B', 'W', 'B', 'B', '', '', ''],
          ['B', 'B', 'B', '', 'B', 'B', 'B', ''],
          ['B', 'B', '', '', '', 'B', 'B', ''],
          ['B', 'B', '', '', '', '', '', ''],
          ['B', 'B', '', '', '', '', '', ''],
          ['', 'B', '', '', '', '', '', ''],
        ],
        1,
        3
      );
      expect(deepEquals(move.state.delta, {row: 0, col: 0})).toBe(true);
    });

    it('B prefer to eat only 1 instead of 2 for future plans', function () {
      const move = createComMove(
        [
          ['', '', '', '', '', '', '', ''],
          ['W', 'W', '', '', 'W', '', '', ''],
          ['W', 'W', 'B', 'W', 'W', '', '', ''],
          ['W', 'W', '', '', 'W', 'W', '', ''],
          ['W', '', '', '', '', '', '', ''],
          ['W', '', '', '', '', '', '', ''],
          ['W', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', ''],
        ],
        0,
        3
      );
      expect(deepEquals(move.state.delta, {row: 0, col: 0})).toBe(true);
    });

    it('B prefer to eat only 1 instead of 3 for future plans', function () {
      const move = createComMove(
        [
          ['', '', '', '', '', '', '', ''],
          ['W', 'W', '', '', 'W', '', '', ''],
          ['W', 'W', 'B', 'W', 'W', 'W', '', ''],
          ['W', 'W', '', '', 'W', 'W', '', ''],
          ['W', '', '', '', '', '', '', ''],
          ['W', '', '', '', '', '', '', ''],
          ['W', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', ''],
        ],
        0,
        3
      );
      expect(deepEquals(move.state.delta, {row: 0, col: 0})).toBe(true);
    });

    it('W prefer to eat only 1 instead of 3 for future plans', function () {
      const move = createComMove(
        [
          ['', '', '', '', '', '', '', ''],
          ['B', 'B', '', '', 'B', '', '', ''],
          ['B', 'B', 'W', 'B', 'B', 'B', '', ''],
          ['B', 'B', 'B', '', 'B', 'B', 'B', ''],
          ['B', 'B', '', '', '', 'B', 'B', ''],
          ['B', 'B', '', '', '', '', '', ''],
          ['B', 'B', '', '', '', '', '', ''],
          ['', 'B', '', '', '', '', '', ''],
        ],
        1,
        3
      );
      expect(deepEquals(move.state.delta, {row: 0, col: 0})).toBe(true);
    });
  });
});
