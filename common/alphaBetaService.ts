import {AiService, IMove} from './common';

export interface IAlphaBetaLimits {
  millisecondsLimit?: number;
  maxDepth?: number;
}

const debugAlphaBetaService = false;
const MAX_ALLOWED_DEPTH = 100; // no point of looking more than 100 moves into the future.
export const MAX_ALLOWED_SCORE = 1000000000;
export const MIN_ALLOWED_SCORE = -1000000000;
export const MAX_SCORE = 1000000000 + MAX_ALLOWED_DEPTH;
export const MIN_SCORE = -1000000000 - MAX_ALLOWED_DEPTH;

function assertLegalScore(score: number) {
  if (score < MIN_ALLOWED_SCORE || score > MAX_ALLOWED_SCORE) {
    throw new Error('Illegal score=' + score + ', it must be between ' + MIN_ALLOWED_SCORE + ' - ' + MAX_ALLOWED_SCORE);
  }
}

/**
 * Returns the move that the computer player should do for the given state.
 * alphaBetaLimits is an object that sets a limit on the alpha-beta search,
 * and it has either a millisecondsLimit or maxDepth field:
 * millisecondsLimit is a time limit, and maxDepth is a depth limit.
 */
export function createComputerMove<T>(
  startingState: T,
  turnIndex: number,
  alphaBetaLimits: IAlphaBetaLimits,
  aiService: AiService<T>
): IMove<T> {
  // We use alpha-beta search, where the search states are TicTacToe moves.
  return alphaBetaDecision(startingState, turnIndex, aiService, alphaBetaLimits);
}

/**
 * Does alpha-beta search, starting from startingState,
 * where the first move is done by playerIndex (playerIndex is either 0 or 1),
 * then the next move is done by 1-playerIndex, etc.
 *
 * getPossibleMoves(state, playerIndex) should return an array of the following states
 * and if state is a terminal state it should return an empty array.
 *
 * getStateScoreForIndex0(state, playerIndex) should return a score for
 * the state as viewed by player index 0, i.e.,
 * if player index 0 is probably winning then the score should be high.
 * Return MAX_ALLOWED_SCORE is player index 0 is definitely winning,
 * and MIN_ALLOWED_SCORE if player index 0 is definitely losing.
 *
 * alphaBetaLimits is an object that sets a limit on the alpha-beta search,
 * and it has either a millisecondsLimit or maxDepth field:
 * millisecondsLimit is a time limit, and maxDepth is a depth limit.
 */
export function alphaBetaDecision<T>(
  startingState: T,
  playerIndex: number,
  aiService: AiService<T>,
  alphaBetaLimits: IAlphaBetaLimits
): IMove<T> {
  const move = alphaBetaDecisionMayReturnNull(startingState, playerIndex, aiService, alphaBetaLimits);
  if (move) {
    return move;
  }
  // We run out of time, but we have to return a non-null move (no matter what).
  return aiService.getPossibleMoves(startingState, playerIndex)[0];
}

function alphaBetaDecisionMayReturnNull<T>(
  startingState: T,
  playerIndex: number,
  aiService: AiService<T>,
  alphaBetaLimits: IAlphaBetaLimits
): IMove<T> | null {
  // Checking input
  if (!startingState || !aiService) {
    throw new Error('startingState or aiService is null/undefined');
  }
  if (playerIndex !== 0 && playerIndex !== 1) {
    throw new Error('playerIndex must be either 0 or 1');
  }

  const startTime = new Date().getTime(); // used for the time limit
  if (alphaBetaLimits.maxDepth) {
    return getScoreForIndex0(startingState, playerIndex, aiService, alphaBetaLimits, startTime, 0, MIN_SCORE, MAX_SCORE)
      .bestState;
  }
  if (!alphaBetaLimits.millisecondsLimit) {
    throw new Error('alphaBetaLimits must have either millisecondsLimit or maxDepth');
  }
  const millisecondsLimit = alphaBetaLimits.millisecondsLimit;
  // For time limits (without maxDepth), we do iterative deepening (A* search).
  if (debugAlphaBetaService) {
    // console.log('Doing iterative-deepeninh (A*) until we run out of time or find a certain win/lose move.');
  }
  let maxDepth = 1;
  let bestState: IMove<T> | null = null;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    if (debugAlphaBetaService) {
      // console.log('Alpha-beta search until maxDepth=' + maxDepth);
    }
    const nextBestStateAndScore = getScoreForIndex0(
      startingState,
      playerIndex,
      aiService,
      {maxDepth: maxDepth, millisecondsLimit: millisecondsLimit},
      startTime,
      0,
      MIN_SCORE,
      MAX_SCORE
    );
    const nextBestScore = nextBestStateAndScore.bestScore;
    const nextBestState = nextBestStateAndScore.bestState;
    if (nextBestScore === MAX_SCORE || nextBestScore === MIN_SCORE) {
      if (debugAlphaBetaService) {
        const isWin = nextBestScore === (playerIndex === 0 ? MAX_SCORE : MIN_SCORE);
        // console.log('Discovered that AI is going to ' + (isWin ? 'win' : 'lose') + ' with maxDepth=' + maxDepth);
        // console.log('Best state is ', nextBestState);
      }
      return nextBestState;
    }
    const isHalfTimePassed = isTimeout({millisecondsLimit: millisecondsLimit / 2}, startTime);
    const isAllTimePassed = isTimeout(alphaBetaLimits, startTime);
    if (isHalfTimePassed || isAllTimePassed) {
      // If we run out of half the time, then no point of starting a new search that
      // will most likely take more time than all previous searches.
      // It's more accurate to return the best state for the previous alpha-beta search
      // if we run out of time, because we finished traversing all
      // immediate children of the starting state.
      const result = !isAllTimePassed || maxDepth === 1 || !bestState ? nextBestState : bestState;
      if (isAllTimePassed) {
        if (debugAlphaBetaService) {
          // console.log(
          //   'Run out of time when maxDepth=' +
          //     maxDepth +
          //     ', so returning the best state for maxDepth=' +
          //     (maxDepth === 1 ? 1 : maxDepth - 1)
          // );
        }
      } else {
        if (debugAlphaBetaService) {
          // console.log(
          //   'Run out of half the time when maxDepth=' + maxDepth + ', so no point of exploring the next depth.'
          // );
        }
      }
      if (debugAlphaBetaService) {
        // console.log('Best state is ', result);
      }
      return result;
    }
    bestState = nextBestState;
    maxDepth++;
    if (maxDepth >= MAX_ALLOWED_DEPTH) {
      return nextBestState;
    }
  }
}

function isTimeout(alphaBetaLimits: IAlphaBetaLimits, startTime: number): boolean {
  return alphaBetaLimits.millisecondsLimit
    ? new Date().getTime() - startTime > alphaBetaLimits.millisecondsLimit
    : false;
}

interface ScoreState<T> {
  bestScore: number;
  bestState: IMove<T> | null;
}

function expandMovesTillNextTurn<T>(aiService: AiService<T>, moves: IMove<T>[], playerIndex: number) {
  const nextTurn = 1 - playerIndex;
  const okMove = (move: IMove<T>) => move.endMatchScores || move.turnIndex == nextTurn;

  if (moves.every(okMove)) return moves;

  const badMoves = moves.filter((m) => !okMove(m));
  const okMoves = moves.filter(okMove);
  while (badMoves.length > 0) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const badMove = badMoves.pop()!;
    const moves = aiService.getPossibleMoves(badMove.state, playerIndex);
    moves.forEach((m) => (okMove(m) ? okMoves.push(m) : badMoves.push(m)));
  }
  return okMoves;
}

function getScoreForIndex0<T>(
  startingState: T,
  playerIndex: number,
  aiService: AiService<T>,
  alphaBetaLimits: IAlphaBetaLimits,
  startTime: number,
  depth: number,
  alpha: number,
  beta: number
): ScoreState<T> {
  let bestScore: number | null = null;
  let bestState: IMove<T> | null = null;
  if (isTimeout(alphaBetaLimits, startTime)) {
    if (debugAlphaBetaService) {
      // console.log('Run out of time, just quitting from this traversal.');
    }
    return {bestScore: 0, bestState: null}; // This traversal is "ruined" anyway because we ran out of time.
  }
  if (depth === alphaBetaLimits.maxDepth) {
    bestScore = aiService.getStateScoreForIndex0(startingState, playerIndex);
    assertLegalScore(bestScore);
    if (debugAlphaBetaService) {
      // console.log('Max depth reached, score is ' + bestScore);
    }
    return {bestScore: bestScore, bestState: null};
  }
  const moves = aiService.getPossibleMoves(startingState, playerIndex);
  if (debugAlphaBetaService) {
    // console.log('startingState=', startingState, ' has ' + moves.length + ' next states');
  }
  if (moves.length === 0) {
    bestScore = aiService.getStateScoreForIndex0(startingState, playerIndex);
    assertLegalScore(bestScore);
    if (debugAlphaBetaService) {
      // console.log('Terminal state, score is ' + bestScore);
    }
    return {bestScore: bestScore, bestState: null};
  }
  for (const move of expandMovesTillNextTurn(aiService, moves, playerIndex)) {
    const endMatchScores = move.endMatchScores;
    let scoreForIndex0: number;
    if (endMatchScores) {
      if (move.turnIndex != -1) {
        throw new Error('When game ends with endMatchScores=' + endMatchScores + ' you must set turnIndex to -1');
      }
      // prefer to do as many moves as possible for riddles
      // (so the AI tries to block, even if it's going to lose)
      scoreForIndex0 =
        endMatchScores[0] > endMatchScores[1]
          ? MAX_SCORE - depth
          : endMatchScores[0] < endMatchScores[1]
          ? MIN_SCORE + depth
          : 0;
    } else {
      const nextTurnIndex = 1 - playerIndex;
      if (move.turnIndex != nextTurnIndex) {
        // getPossibleMoves must return moves that switch turns...
        throw new Error(
          'Call to getPossibleMoves with playerIndex=' +
            playerIndex +
            ' returned a state with turnIndex=' +
            move.turnIndex
        );
      }
      scoreForIndex0 = getScoreForIndex0(
        move.state,
        nextTurnIndex,
        aiService,
        alphaBetaLimits,
        startTime,
        depth + 1,
        alpha,
        beta
      ).bestScore;
    }

    if (debugAlphaBetaService) {
      // console.log('Score of ', move, ' is ', scoreForIndex0);
    }
    if (
      bestScore === null ||
      (playerIndex === 0 && scoreForIndex0 > bestScore) ||
      (playerIndex === 1 && scoreForIndex0 < bestScore)
    ) {
      bestScore = scoreForIndex0;
      bestState = move;
    }
    if (playerIndex === 0) {
      if (bestScore >= beta) {
        return {bestScore: bestScore, bestState: bestState};
      }
      alpha = Math.max(alpha, bestScore);
    } else {
      if (bestScore <= alpha) {
        return {bestScore: bestScore, bestState: bestState};
      }
      beta = Math.min(beta, bestScore);
    }
  }
  if (debugAlphaBetaService) {
    // console.log('Best next state for playerIndex ' + playerIndex + ' is ', bestState, ' with score of ' + bestScore);
  }
  return {bestScore: bestScore ? bestScore : 0, bestState: bestState};
}
