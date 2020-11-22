import {AiService, IMove} from './common';

export interface IAlphaBetaLimits {
  millisecondsLimit?: number;
  maxDepth?: number;
}

const debugAlphaBetaService = false;

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
  return alphaBetaDecision(
    startingState,
    turnIndex,
    aiService.getPossibleMoves,
    aiService.getStateScoreForIndex0,
    alphaBetaLimits
  );
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
 * Return Number.POSITIVE_INFINITY is player index 0 is definitely winning,
 * and Number.NEGATIVE_INFINITY if player index 0 is definitely losing.
 *
 * alphaBetaLimits is an object that sets a limit on the alpha-beta search,
 * and it has either a millisecondsLimit or maxDepth field:
 * millisecondsLimit is a time limit, and maxDepth is a depth limit.
 */
export function alphaBetaDecision<T>(
  startingState: T,
  playerIndex: number,
  getPossibleMoves: (state: T, playerIndex: number) => IMove<T>[],
  getStateScoreForIndex0: (state: T, playerIndex: number) => number,
  alphaBetaLimits: IAlphaBetaLimits
): IMove<T> {
  const move = alphaBetaDecisionMayReturnNull(
    startingState,
    playerIndex,
    getPossibleMoves,
    getStateScoreForIndex0,
    alphaBetaLimits
  );
  if (move) {
    return move;
  }
  // We run out of time, but we have to return a non-null move (no matter what).
  return getPossibleMoves(startingState, playerIndex)[0];
}

function alphaBetaDecisionMayReturnNull<T>(
  startingState: T,
  playerIndex: number,
  getPossibleMoves: (state: T, playerIndex: number) => IMove<T>[],
  getStateScoreForIndex0: (state: T, playerIndex: number) => number,
  alphaBetaLimits: IAlphaBetaLimits
): IMove<T> | null {
  // Checking input
  if (!startingState || !getPossibleMoves || !getStateScoreForIndex0) {
    throw new Error('startingState or getPossibleMoves or getStateScoreForIndex0 is null/undefined');
  }
  if (playerIndex !== 0 && playerIndex !== 1) {
    throw new Error('playerIndex must be either 0 or 1');
  }
  if (!alphaBetaLimits.millisecondsLimit && !alphaBetaLimits.maxDepth) {
    throw new Error('alphaBetaLimits must have either millisecondsLimit or maxDepth');
  }

  const millisecondsLimit = alphaBetaLimits.millisecondsLimit
    ? // 400 milliseconds is the max time (otherwise the app feels unresponsive).
      Math.min(400, alphaBetaLimits.millisecondsLimit)
    : 0;

  const startTime = new Date().getTime(); // used for the time limit
  if (alphaBetaLimits.maxDepth) {
    return getScoreForIndex0(
      startingState,
      playerIndex,
      getPossibleMoves,
      getStateScoreForIndex0,
      alphaBetaLimits,
      startTime,
      0,
      Number.NEGATIVE_INFINITY,
      Number.POSITIVE_INFINITY
    ).bestState;
  }
  // For time limits (without maxDepth), we do iterative deepening (A* search).
  if (debugAlphaBetaService) {
    console.log('Doing iterative-deepeninh (A*) until we run out of time or find a certain win/lose move.');
  }
  let maxDepth = 1;
  let bestState: IMove<T> | null = null;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    if (debugAlphaBetaService) {
      console.log('Alpha-beta search until maxDepth=' + maxDepth);
    }
    const nextBestStateAndScore = getScoreForIndex0(
      startingState,
      playerIndex,
      getPossibleMoves,
      getStateScoreForIndex0,
      {maxDepth: maxDepth, millisecondsLimit: millisecondsLimit},
      startTime,
      0,
      Number.NEGATIVE_INFINITY,
      Number.POSITIVE_INFINITY
    );
    const nextBestScore = nextBestStateAndScore.bestScore;
    const nextBestState = nextBestStateAndScore.bestState;
    if (nextBestScore === Number.POSITIVE_INFINITY || nextBestScore === Number.NEGATIVE_INFINITY) {
      const isWin = nextBestScore === (playerIndex === 0 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY);
      console.log('Discovered that AI is going to ' + (isWin ? 'win' : 'lose') + ' with maxDepth=' + maxDepth);
      if (debugAlphaBetaService) {
        console.log('Best state is ', nextBestState);
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
        console.log(
          'Run out of time when maxDepth=' +
            maxDepth +
            ', so returning the best state for maxDepth=' +
            (maxDepth === 1 ? 1 : maxDepth - 1)
        );
      } else {
        console.log(
          'Run out of half the time when maxDepth=' + maxDepth + ', so no point of exploring the next depth.'
        );
      }
      if (debugAlphaBetaService) {
        console.log('Best state is ', result);
      }
      return result;
    }
    bestState = nextBestState;
    maxDepth++;
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

function getScoreForIndex0<T>(
  startingState: T,
  playerIndex: number,
  getPossibleMoves: (state: T, playerIndex: number) => IMove<T>[],
  getStateScoreForIndex0: (state: T, playerIndex: number) => number,
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
      console.log('Run out of time, just quitting from this traversal.');
    }
    return {bestScore: 0, bestState: null}; // This traversal is "ruined" anyway because we ran out of time.
  }
  if (depth === alphaBetaLimits.maxDepth) {
    bestScore = getStateScoreForIndex0(startingState, playerIndex);
    if (debugAlphaBetaService) {
      console.log('Max depth reached, score is ' + bestScore);
    }
    return {bestScore: bestScore, bestState: null};
  }
  const moves = getPossibleMoves(startingState, playerIndex);
  if (debugAlphaBetaService) {
    console.log('startingState=', startingState, ' has ' + moves.length + ' next states');
  }
  if (moves.length === 0) {
    bestScore = getStateScoreForIndex0(startingState, playerIndex);
    if (debugAlphaBetaService) {
      console.log('Terminal state, score is ' + bestScore);
    }
    return {bestScore: bestScore, bestState: null};
  }
  for (let i = 0; i < moves.length; i++) {
    const move = moves[i];
    const endMatchScores = move.endMatchScores;
    let scoreForIndex0: number;
    if (endMatchScores) {
      if (move.turnIndex != -1) {
        throw new Error('When game ends with endMatchScores=' + endMatchScores + ' you must set turnIndex to -1');
      }
      scoreForIndex0 =
        endMatchScores[0] > endMatchScores[1]
          ? Number.POSITIVE_INFINITY
          : endMatchScores[0] < endMatchScores[1]
          ? Number.NEGATIVE_INFINITY
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
        getPossibleMoves,
        getStateScoreForIndex0,
        alphaBetaLimits,
        startTime,
        depth + 1,
        alpha,
        beta
      ).bestScore;
    }

    if (debugAlphaBetaService) {
      console.log('Score of ', move, ' is ', scoreForIndex0);
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
    console.log('Best next state for playerIndex ' + playerIndex + ' is ', bestState, ' with score of ' + bestScore);
  }
  return {bestScore: bestScore ? bestScore : 0, bestState: bestState};
}
