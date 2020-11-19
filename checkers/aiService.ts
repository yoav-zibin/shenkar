import {IAlphaBetaLimits, alphaBetaDecision} from '../common/alphaBetaService';
import {IMove, deepClone} from '../common/common';
import {
  Board,
  IState,
  MiniMove,
  BoardDelta,
  createMove,
  getInitialBoard,
  CONSTANTS,
  getKind,
  getColor,
  getWinner,
  hasMandatoryJumps,
  getJumpMoves,
  getSimpleMoves,
  isOwnColor,
  createMiniMove,
} from './gameLogic';

/** *********************************************************************
 * Heuristic part
 **********************************************************************/

/**
 * Get the square value.
 * For man, the value is 5.
 * For man which close to be crowned (1 simple move), the value is 7.
 * For crown, the value is 10.
 *
 * @param square the square info. e.g. 'WMAN', 'BCRO'.
 * @param squareIndex the square index.
 * @returns {number} the square value.
 */
function getSquareValue(square: string, row: number, col: number): number {
  if (getKind(square) === CONSTANTS.MAN) {
    if (getColor(square) === CONSTANTS.WHITE) {
      // White
      if (row === 1) {
        // Closed to be crowned
        return 7;
      }
      return 5;
    }

    // Black
    if (col === CONSTANTS.ROW - 2) {
      // Closed to be crowned
      return 7;
    }
    return 5;
  }

  if (getKind(square) === CONSTANTS.KING) {
    // It's a crown
    return 10;
  }

  // Empty square
  return 0;
}

/**
 * Get the board value.
 *
 * @param board the game API board.
 * @param turnIndex 0 represents the black player and 1
 *        represents the white player.
 * @returns {*} the board value.
 */
function getStateValue(board: Board, turnIndex: number): number {
  let stateValue = 0;
  // For different position of the board, there's a different weight.
  const boardWeight: number[][] = [
    [0, 4, 0, 4, 0, 4, 0, 4],
    [4, 0, 3, 0, 3, 0, 3, 0],
    [0, 3, 0, 2, 0, 2, 0, 4],
    [4, 0, 2, 0, 1, 0, 3, 0],
    [0, 3, 0, 1, 0, 2, 0, 4],
    [4, 0, 2, 0, 2, 0, 3, 0],
    [0, 3, 0, 3, 0, 3, 0, 4],
    [4, 0, 4, 0, 4, 0, 4, 0],
  ];
  let cell: string;
  let squareValue: number;
  let row: number;
  let col: number;

  const winner = getWinner(board, turnIndex);

  if (winner === CONSTANTS.WHITE) {
    return Number.MIN_VALUE;
  }

  if (winner === CONSTANTS.BLACK) {
    return Number.MAX_VALUE;
  }

  for (row = 0; row < CONSTANTS.ROW; row += 1) {
    for (col = 0; col < CONSTANTS.COLUMN; col += 1) {
      cell = board[row][col];

      if (cell !== CONSTANTS.LIGHT_SQUARE && cell !== CONSTANTS.DARK_SQUARE) {
        // Get the square value which equals to the square value
        // multiply the board weight.
        squareValue = getSquareValue(cell, row, col) * boardWeight[row][col];

        if (getColor(cell) === CONSTANTS.BLACK) {
          // BLACK
          stateValue += squareValue;
        } else {
          // WHITE
          stateValue -= squareValue;
        }
      }
    }
  }

  return stateValue;
}

/**
 * Get the state score for player 0, a simple wrapper function
 */
function getStateScoreForIndex0(move: IMove<IState>, turnIndex: number): number {
  // getStateValue return the score for player 1.
  return -getStateValue(move.state.board, turnIndex);
}

function addMegaJumpMoves(allPossibleMoves: MiniMove[][], board: Board, turnIndex: number, from: BoardDelta) {
  const possibleMoves = getJumpMoves(board, from, turnIndex);
  for (const possibleMove of possibleMoves) {
    const miniMove: MiniMove[] = [];
    let currentPos = from;
    let nextPos = possibleMove;
    let currentBoard = board;
    // Finishing the jump if there are still mandatory jumps.
    do {
      const iMove = createMiniMove(currentBoard, currentPos, nextPos, turnIndex);
      miniMove.push({fromDelta: currentPos, toDelta: nextPos});
      // If the turn changes, then there are no more mandatory jumps
      if (iMove.turnIndex !== turnIndex) break;
      // We need to make another jump: update currentBoard, currentPos, nextPos
      currentBoard = iMove.state.board;
      currentPos = nextPos;
      // Just take the first possible jump move for that jumping piece
      nextPos = getJumpMoves(currentBoard, nextPos, turnIndex)[0];
      // eslint-disable-next-line no-constant-condition
    } while (true);
    allPossibleMoves.push(miniMove);
  }
}
/**
 * Get all possible moves.
 */
function getAllMoves(board: Board, turnIndex: number): MiniMove[][] {
  const allPossibleMoves: MiniMove[][] = [];

  const hasMandatoryJump = hasMandatoryJumps(board, turnIndex);

  // Check each square of the board
  for (let row = 0; row < CONSTANTS.ROW; row += 1) {
    for (let col = 0; col < CONSTANTS.COLUMN; col += 1) {
      if (isOwnColor(turnIndex, board[row][col].substr(0, 1))) {
        const delta = {row: row, col: col};
        if (hasMandatoryJump) {
          addMegaJumpMoves(allPossibleMoves, board, turnIndex, delta);
        } else {
          // If there's no mandatory jump,
          // then check the possible simple move
          const possibleMoves = getSimpleMoves(board, delta, turnIndex);
          for (const possibleMove of possibleMoves) {
            allPossibleMoves.push([{fromDelta: delta, toDelta: possibleMove}]);
          }
        }
      }
    }
  }

  return allPossibleMoves;
}

/**
 * Get the next state which is extracted from the move operations.
 */
function getNextStates(move: IMove<IState>, playerIndex: number): IMove<IState>[] {
  const board: Board = move.state.board;
  const allPossibleMoveDeltas: MiniMove[][] = getAllMoves(board, playerIndex);
  const allPossibleMoves: IMove<IState>[] = [];

  for (let i = 0; i < allPossibleMoveDeltas.length; i++) {
    allPossibleMoves[i] = createMove(deepClone(board), allPossibleMoveDeltas[i], playerIndex);
  }

  return allPossibleMoves;
}

/** *********************************************************************
 * Service part...
 **********************************************************************/

/**
 * Returns the move that the computer player should do for the given board.
 * alphaBetaLimits is an object that sets a limit on the alpha-beta search,
 * and it has either a millisecondsLimit or maxDepth field:
 * millisecondsLimit is a time limit, and maxDepth is a depth limit.
 */
export function createComputerMove(
  board: Board,
  playerIndex: number,
  alphaBetaLimits: IAlphaBetaLimits
): IMove<IState> {
  const move: IMove<IState> = {
    state: {board: board ? board : getInitialBoard(), boardBeforeMove: getInitialBoard(), miniMoves: []},
    endMatchScores: null,
    turnIndex: playerIndex,
  };
  return alphaBetaDecision(
    move,
    playerIndex,
    getNextStates,
    getStateScoreForIndex0,
    // If you want to see debugging output in the console, then pass
    // getDebugStateToString instead of null
    null,
    // getDebugStateToString,
    alphaBetaLimits
  );
}
