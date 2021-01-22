import {AiService, IMove} from '../common/common';
import {IState, createMove, ROWS, COLS, getInitialState, Board} from './gameLogic';

export function getPossibleMoves(state: IState, turnIndex: number): IMove<IState>[] {
  const possibleMoves: IMove<IState>[] = [];

  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      try {
        possibleMoves.push(createMove(state.board, i, j, turnIndex));
      } catch (e) {
        // The cell in that position was illegal (no sndwich / full).
      }
    }
  }

  return possibleMoves;
}

export function getStateScoreForIndex0(state: IState): number {
  // TODO: decide - getStateValue return the score for player 1.
  if (state.board === undefined) return 0;
  return getStateValue(state.board);
}

/**
 * Get the board value.
 *
 * @param board the game API board.
 * @returns {*} the board value.
 */
function getStateValue(board: Board): number {
  // For different position of the board, there's a different weight.
  const boardWeight: number[][] = [
    [8, 3, 4, 4, 4, 4, 3, 8],
    [3, 1, 1, 1, 1, 1, 1, 3],
    [4, 1, 3, 3, 3, 3, 1, 4],
    [4, 1, 3, 2, 2, 3, 1, 4],
    [4, 1, 3, 2, 2, 3, 1, 4],
    [4, 1, 3, 3, 3, 3, 1, 4],
    [3, 1, 1, 1, 1, 1, 1, 3],
    [8, 3, 4, 4, 4, 4, 3, 8],
  ];
  let cell: string;
  let score = 0;
  let row: number;
  let col: number;

  for (row = 0; row < ROWS; row += 1) {
    for (col = 0; col < COLS; col += 1) {
      cell = board[row][col];
      if (cell === 'B') {
        score += boardWeight[row][col];
      }

      if (cell === 'W') {
        score -= boardWeight[row][col];
      }
    }
  }

  return score;
}

export const aiService: AiService<IState> = {
  initialState: getInitialState(),
  getPossibleMoves,
  getStateScoreForIndex0,
};
