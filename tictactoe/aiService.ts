import {IAlphaBetaLimits, alphaBetaDecision} from '../common/alphaBetaService';
import {IMove} from '../common/common';
import {IState, createMove, ROWS, COLS} from './gameLogic';

/** Returns the move that the computer player should do for the given state in move. */
export function findComputerMove(move: IMove<IState>): IMove<IState> {
  return createComputerMove(
    move,
    // at most 1 second for the AI to choose a move (but might be much quicker)
    {millisecondsLimit: 1000}
  );
}

/**
 * Returns all the possible moves for the given state and turnIndexBeforeMove.
 * Returns an empty array if the game is over.
 */
export function getPossibleMoves(state: IState, turnIndexBeforeMove: number): IMove<IState>[] {
  const possibleMoves: IMove<IState>[] = [];
  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      try {
        possibleMoves.push(createMove(state, i, j, turnIndexBeforeMove));
      } catch (e) {
        // The cell in that position was full.
      }
    }
  }
  return possibleMoves;
}

/**
 * Returns the move that the computer player should do for the given state.
 * alphaBetaLimits is an object that sets a limit on the alpha-beta search,
 * and it has either a millisecondsLimit or maxDepth field:
 * millisecondsLimit is a time limit, and maxDepth is a depth limit.
 */
export function createComputerMove(move: IMove<IState>, alphaBetaLimits: IAlphaBetaLimits): IMove<IState> {
  // We use alpha-beta search, where the search states are TicTacToe moves.
  return alphaBetaDecision(move, move.turnIndex, getNextStates, getStateScoreForIndex0, null, alphaBetaLimits);
}

function getStateScoreForIndex0(move: IMove<IState>, playerIndex: number): number {
  const endMatchScores = move.endMatchScores;
  if (endMatchScores) {
    return endMatchScores[0] > endMatchScores[1]
      ? Number.POSITIVE_INFINITY
      : endMatchScores[0] < endMatchScores[1]
      ? Number.NEGATIVE_INFINITY
      : 0;
  }
  return 0;
}

function getNextStates(move: IMove<IState>, playerIndex: number): IMove<IState>[] {
  return getPossibleMoves(move.state, playerIndex);
}
