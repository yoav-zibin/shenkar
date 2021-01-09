import {IMove, deepClone, deepEquals} from '../common/common';

export type Board = string[][];
export interface BoardDelta {
  row: number;
  col: number;
}
export interface MiniMove {
  fromDelta: BoardDelta;
  toDelta: BoardDelta;
}

export type RiddleData =
  | '0'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '01'
  | '03'
  | '05'
  | '07'
  | '10'
  | '12'
  | '14'
  | '16'
  | '21'
  | '23'
  | '25'
  | '27'
  | '30'
  | '32'
  | '34'
  | '36'
  | '41'
  | '43'
  | '45'
  | '47'
  | '50'
  | '52'
  | '54'
  | '56'
  | '61'
  | '63'
  | '65'
  | '67'
  | '70'
  | '72'
  | '74'
  | '76';

export interface IState {
  board: Board;
  boardBeforeMove?: Board;
  // The mini-moves (e.g., a move or a series of jumps) that led to the current board. For animation purposes.
  // All mini-moves are done by the same color (white/black).
  miniMoves?: MiniMove[];
  riddleData?: RiddleData;
  error?: string | null;
}

export const ENUM = {
  ILLEGAL_CODE: {
    ILLEGAL_MOVE: 'ILLEGAL_MOVE',
    ILLEGAL_SIMPLE_MOVE: 'ILLEGAL_SIMPLE_MOVE',
    ILLEGAL_JUMP_MOVE: 'ILLEGAL_JUMP_MOVE',
    ILLEGAL_DELTA: 'ILLEGAL_DELTA',
    ILLEGAL_COLOR_CHANGED: 'ILLEGAL_COLOR_CHANGED',
    ILLEGAL_CROWNED: 'ILLEGAL_CROWNED',
    ILLEGAL_UNCROWNED: 'ILLEGAL_UNCROWNED',
    ILLEGAL_IGNORE_MANDATORY_JUMP: 'ILLEGAL_IGNORE_MANDATORY_JUMP',
    ILLEGAL_SET_TURN: 'ILLEGAL_SET_TURN',
    ILLEGAL_END_MATCH_SCORE: 'ILLEGAL_END_MATCH_SCORE',
    ILLEGAL_CODE: 'ILLEGAL_CODE',
  },
  DIRECTION: {
    UP_LEFT: 'UP_LEFT',
    UP_RIGHT: 'UP_RIGHT',
    DOWN_LEFT: 'DOWN_LEFT',
    DOWN_RIGHT: 'DOWN_RIGHT',
  },
  MOVE_TYPE: {
    SIMPLE_MOVE: 'SIMPLE_MOVE',
    JUMP_MOVE: 'JUMP_MOVE',
  },
};

const ILLEGAL_CODE = ENUM.ILLEGAL_CODE;
const DIRECTION = ENUM.DIRECTION;
const MOVE_TYPE = ENUM.MOVE_TYPE;

export const CONSTANTS = {
  ROW: 8,
  // Since only the dark square may contain pieces, for both the
  // gameApiState and logicState, I only concern the dark squares.
  // Therefore the column is count to only 4.
  COLUMN: 8,
  LIGHT_SQUARE: '--',
  DARK_SQUARE: 'DS',
  BLACK_MAN: 'BM',
  BLACK_KING: 'BK',
  WHITE_MAN: 'WM',
  WHITE_KING: 'WK',
  BLACK: 'B',
  WHITE: 'W',
  MAN: 'M',
  KING: 'K',
  WHITE_INDEX: 0,
  BLACK_INDEX: 1,
};

/**
 * Get the color of the piece within the square.
 *
 * @param square the square of the board.
 * @returns string "B" if the piece is black, "W" if the piece is white,
 *          otherwise the square is empty.
 */
export function getColor(square: string): string {
  return square.substr(0, 1);
}

/**
 * Get the kind of the piece within the square.
 *
 * @param square the square of the board.
 * @returns string "M" if the piece is man, "K" if the piece is king or
 *                 crowned
 */
export function getKind(square: string): string {
  return square.substr(1);
}

/**
 * Check if the two deltas are the same.
 *
 * @param delta1
 * @param delta2
 * @returns {boolean}
 */
function isDeltaEqual(delta1: BoardDelta, delta2: BoardDelta): boolean {
  if (delta1.row !== delta2.row) {
    return false;
  }
  if (delta1.col !== delta2.col) {
    return false;
  }
  return true;
}

/**
 * Check if the move exists in the moves array
 *
 * @param moves all possible moves
 * @param move the move need to be checked
 * @returns {boolean} true if the move exists, otherwise false
 */
function doesContainMove(moves: BoardDelta[], move: BoardDelta): boolean {
  for (let i = 0; i < moves.length; i += 1) {
    if (isDeltaEqual(moves[i], move)) {
      return true;
    }
  }
  return false;
}

/**
 * Check whether the turn index matches the color of the moving or
 * jumping piece. In another word, check whether the player is operating
 * his/her own piece.
 *
 * @param turnIndex 1 represents the black player and 0
 *        represents the white player.
 * @param color the color of the moving or jumping piece.
 * @returns true if the index matches the color, otherwise false.
 */
export function isOwnColor(turnIndex: number, color: string): boolean {
  if (
    (turnIndex === CONSTANTS.BLACK_INDEX && color === CONSTANTS.BLACK) ||
    (turnIndex === CONSTANTS.WHITE_INDEX && color === CONSTANTS.WHITE)
  ) {
    return true;
  }
  return false;
}

/**
 * Check if the square index is legal
 * @param squareIndex the squareIndex need to be check
 * @returns true if legal, otherwise false
 */
function isDarkSquare(delta: BoardDelta): boolean {
  const row: number = delta.row;
  const col: number = delta.col;

  // The game board is 8*8 and the index of row and column start at 0
  // and end at 7
  if (row < 0 || row >= CONSTANTS.ROW || col < 0 || col >= CONSTANTS.COLUMN) {
    return false;
  }

  const isEvenRow = row % 2 === 0;
  const isEvenCol = col % 2 === 0;

  // Only dark square is able to hold a piece
  if ((!isEvenRow && isEvenCol) || (isEvenRow && !isEvenCol)) {
    return true;
  }

  return false;
}

/**
 * Check if it's a simple move according to the from and to delta.
 *
 * @param fromDelta from delta
 * @param toDelta to delta
 * @returns {boolean} true if it's simple move, otherwise false
 */
export function isSimpleMove(board: Board, fromDelta: BoardDelta, toDelta: BoardDelta): boolean {
  const square = board[fromDelta.row][fromDelta.col];

  if (getKind(square) === CONSTANTS.KING) {
    // If it's a king, it can move both forward and backward
    if (Math.abs(fromDelta.row - toDelta.row) === 1 && Math.abs(fromDelta.col - toDelta.col) === 1) {
      return true;
    }
  } else if (getColor(square) === CONSTANTS.BLACK) {
    // If it's not a black king, it can only move downwards.
    if (fromDelta.row - toDelta.row === -1 && Math.abs(fromDelta.col - toDelta.col) === 1) {
      return true;
    }
  } else if (getColor(square) === CONSTANTS.WHITE) {
    // If it's not a white king, it can only move upwards.
    if (fromDelta.row - toDelta.row === 1 && Math.abs(fromDelta.col - toDelta.col) === 1) {
      return true;
    }
  }
  return false;
}

/**
 * Check if it's a jump move according to the from and to coordinate.
 *
 * @param fromDelta from delta
 * @param toDelta to delta
 * @returns {boolean} true if it's jump move, otherwise false
 */
export function isJumpMove(board: Board, fromDelta: BoardDelta, toDelta: BoardDelta): boolean {
  const square = board[fromDelta.row][fromDelta.col];

  if (getKind(square) === CONSTANTS.KING) {
    // If it's a king, it can jump both forward and backward
    if (Math.abs(fromDelta.row - toDelta.row) === 2 && Math.abs(fromDelta.col - toDelta.col) === 2) {
      return true;
    }
  } else if (getColor(square) === CONSTANTS.BLACK) {
    // If it's not a black king, it can only jump downwards.
    if (fromDelta.row - toDelta.row === -2 && Math.abs(fromDelta.col - toDelta.col) === 2) {
      return true;
    }
  } else if (getColor(square) === CONSTANTS.WHITE) {
    // If it's not a white king, it can only jump upwards.
    if (fromDelta.row - toDelta.row === 2 && Math.abs(fromDelta.col - toDelta.col) === 2) {
      return true;
    }
  }

  return false;
}

/**
 * Check if the jump is valid. The piece can only jump over an
 * opponent piece and the destination square must be empty.
 *
 * @param fromSquare the player's piece which jumps
 * @param jumpedSquare the jumped (opponent) piece which is being
 *                     jumped over
 * @param toSquare the destination square
 * @returns true if the jump is valid, otherwise false
 */
function isValidJump(fromSquare: string, jumpedSquare: string, toSquare: string): boolean {
  return (
    jumpedSquare !== CONSTANTS.DARK_SQUARE &&
    fromSquare.substr(0, 1) !== jumpedSquare.substr(0, 1) &&
    toSquare === CONSTANTS.DARK_SQUARE
  );
}

/**
 * Check if the square is moving or jumping to the kings row
 *
 * @param toDelta the delta of the square moving to or jumping to
 * @param playerTurnIndex the player's turn index
 * @returns true if it enters the kings row, otherwise false.
 */
function hasMoveOrJumpToKingsRow(toDelta: BoardDelta, playerTurnIndex: number): boolean {
  // Check if the square can be crowned
  if (
    // For white square, it's moving or jumping to the first row
    (playerTurnIndex === CONSTANTS.WHITE_INDEX && toDelta.row === 0) ||
    // For black square, it's moving or jumping to the last row
    (playerTurnIndex === CONSTANTS.BLACK_INDEX && toDelta.row === CONSTANTS.ROW - 1)
  ) {
    return true;
  }

  return false;
}

/**
 * Get the to square delta (the destination of the move) according to
 * the move type and direction.
 *
 * @param fromDelta the from square (the square contains the piece
 *                        moved or jumped) delta.
 * @param moveType the move type of the move, either simple move or jump
 *                 move
 * @param direction the direction of the move, up-left, up-right,
 *                  down-left and down-right.
 * @returns {number} the to square delta.
 */
function getToDelta(fromDelta: BoardDelta, moveType: string, direction: string): BoardDelta {
  const toDelta: BoardDelta = {row: -1, col: -1};

  if (!isDarkSquare(fromDelta)) {
    throw new Error('Illegal from coordinate!!!');
  }

  switch (moveType) {
    case MOVE_TYPE.SIMPLE_MOVE:
      switch (direction) {
        case DIRECTION.UP_LEFT:
          toDelta.row = fromDelta.row - 1;
          toDelta.col = fromDelta.col - 1;
          break;
        case DIRECTION.UP_RIGHT:
          toDelta.row = fromDelta.row - 1;
          toDelta.col = fromDelta.col + 1;
          break;
        case DIRECTION.DOWN_LEFT:
          toDelta.row = fromDelta.row + 1;
          toDelta.col = fromDelta.col - 1;
          break;
        case DIRECTION.DOWN_RIGHT:
          toDelta.row = fromDelta.row + 1;
          toDelta.col = fromDelta.col + 1;
          break;
        default:
          throw new Error('Illegal direction!');
      }
      break;
    case MOVE_TYPE.JUMP_MOVE:
      switch (direction) {
        case DIRECTION.UP_LEFT:
          toDelta.row = fromDelta.row - 2;
          toDelta.col = fromDelta.col - 2;
          break;
        case DIRECTION.UP_RIGHT:
          toDelta.row = fromDelta.row - 2;
          toDelta.col = fromDelta.col + 2;
          break;
        case DIRECTION.DOWN_LEFT:
          toDelta.row = fromDelta.row + 2;
          toDelta.col = fromDelta.col - 2;
          break;
        case DIRECTION.DOWN_RIGHT:
          toDelta.row = fromDelta.row + 2;
          toDelta.col = fromDelta.col + 2;
          break;
        default:
          throw new Error(ILLEGAL_CODE.ILLEGAL_MOVE);
      }
      break;
    default:
      throw new Error(ILLEGAL_CODE.ILLEGAL_MOVE);
  }

  if (!isDarkSquare(toDelta)) {
    throw new Error(ILLEGAL_CODE.ILLEGAL_DELTA);
  }

  return toDelta;
}

/**
 * Get all possible upwards simple moves for a specific piece by its
 * square delta.
 *
 * @param board the game board
 * @param delta the delta of the square holds the piece
 * @return an array of all possible moves
 */
function getSimpleUpMoves(board: Board, delta: BoardDelta): BoardDelta[] {
  const moves: BoardDelta[] = [];
  let leftUpDelta: BoardDelta;
  let rightUpDelta: BoardDelta;

  // If the piece is in the first row, then there's no way to move
  // upwards.
  if (delta.row === 0) {
    return moves;
  }

  if (delta.row % 2 === 0) {
    // Even row

    // Check left up
    leftUpDelta = getToDelta(delta, MOVE_TYPE.SIMPLE_MOVE, DIRECTION.UP_LEFT);

    if (board[leftUpDelta.row][leftUpDelta.col] === CONSTANTS.DARK_SQUARE) {
      moves.push(leftUpDelta);
    }

    // Check right up
    // for the rightmost one, it can only move to the left up side.
    if (delta.col !== CONSTANTS.COLUMN - 1) {
      rightUpDelta = getToDelta(delta, MOVE_TYPE.SIMPLE_MOVE, DIRECTION.UP_RIGHT);
      if (board[rightUpDelta.row][rightUpDelta.col] === CONSTANTS.DARK_SQUARE) {
        moves.push(rightUpDelta);
      }
    }
  } else {
    // Odd row

    // Check left up
    // For the leftmost one, it can only move to the right up side
    if (delta.col !== 0) {
      leftUpDelta = getToDelta(delta, MOVE_TYPE.SIMPLE_MOVE, DIRECTION.UP_LEFT);
      if (board[leftUpDelta.row][leftUpDelta.col] === CONSTANTS.DARK_SQUARE) {
        moves.push(leftUpDelta);
      }
    }

    // Check right up
    rightUpDelta = getToDelta(delta, MOVE_TYPE.SIMPLE_MOVE, DIRECTION.UP_RIGHT);

    if (board[rightUpDelta.row][rightUpDelta.col] === CONSTANTS.DARK_SQUARE) {
      moves.push(rightUpDelta);
    }
  }

  return moves;
}

/**
 * Get all possible downwards simple moves for a specific piece by its
 * square delta.
 *
 * @param board the game board
 * @param delta the delta of the square holds the piece
 * @return an array of all possible moves
 */
function getSimpleDownMoves(board: Board, delta: BoardDelta): BoardDelta[] {
  const moves: BoardDelta[] = [];
  let leftDownDelta: BoardDelta;
  let rightDownDelta: BoardDelta;

  // If the piece is in the last row, then there's no way to move
  // downwards.
  if (delta.row === CONSTANTS.ROW - 1) {
    return moves;
  }

  if (delta.row % 2 === 0) {
    // Even row

    // Check left down
    leftDownDelta = getToDelta(delta, MOVE_TYPE.SIMPLE_MOVE, DIRECTION.DOWN_LEFT);

    if (board[leftDownDelta.row][leftDownDelta.col] === CONSTANTS.DARK_SQUARE) {
      moves.push(leftDownDelta);
    }

    // Check right down
    // for the rightmost one, it can only move to the left down side.
    if (delta.col !== CONSTANTS.COLUMN - 1) {
      rightDownDelta = getToDelta(delta, MOVE_TYPE.SIMPLE_MOVE, DIRECTION.DOWN_RIGHT);
      if (board[rightDownDelta.row][rightDownDelta.col] === CONSTANTS.DARK_SQUARE) {
        moves.push(rightDownDelta);
      }
    }
  } else {
    // Odd row

    // Check left down
    // For the leftmost one, it can only move to the right down side
    if (delta.col !== 0) {
      leftDownDelta = getToDelta(delta, MOVE_TYPE.SIMPLE_MOVE, DIRECTION.DOWN_LEFT);
      if (board[leftDownDelta.row][leftDownDelta.col] === CONSTANTS.DARK_SQUARE) {
        moves.push(leftDownDelta);
      }
    }

    // Check right down
    rightDownDelta = getToDelta(delta, MOVE_TYPE.SIMPLE_MOVE, DIRECTION.DOWN_RIGHT);

    if (board[rightDownDelta.row][rightDownDelta.col] === CONSTANTS.DARK_SQUARE) {
      moves.push(rightDownDelta);
    }
  }

  return moves;
}

/**
 * Calculate the jumped (opponent) square delta
 * @param fromDelta the first selected square delta.
 *                      (The one moving or jumping)
 * @param toDelta the second selected square delta.
 *                     (The destination)
 * @returns {row: row, col: col} the jumped (opponent) square delta
 */
export function getJumpedDelta(fromDelta: BoardDelta, toDelta: BoardDelta): BoardDelta {
  const jumpedDelta: BoardDelta = {row: -1, col: -1};

  if (!isDarkSquare(fromDelta) || !isDarkSquare(toDelta)) {
    throw new Error('Illegal coordinate!!!');
  }

  if (Math.abs(fromDelta.row - toDelta.row) === 2 && Math.abs(fromDelta.col - toDelta.col) === 2) {
    jumpedDelta.row = (fromDelta.row + toDelta.row) / 2;
    jumpedDelta.col = (fromDelta.col + toDelta.col) / 2;
  }

  return jumpedDelta;
}

/**
 * Get all possible upwards jump moves for a specific piece by its
 * square delta.
 *
 * @param board the game board
 * @param delta the delta of the square holds the piece
 * @return an array of all possible moves
 */
function getJumpUpMoves(board: Board, delta: BoardDelta): BoardDelta[] {
  const moves: BoardDelta[] = [];
  const fromDelta: BoardDelta = delta;
  const fromSquare: string = board[delta.row][delta.col];
  let jumpedDelta: BoardDelta;
  let jumpedSquare: string;
  let toDelta: BoardDelta;
  let toSquare: string;

  // If the piece is in either the first or the second row, then there's
  // no way to jump upwards.
  if (fromDelta.row < 2) {
    return moves;
  }

  // Check left first, for the leftmost one, it can only jump right
  // upwards.
  if (fromDelta.col > 1) {
    toDelta = getToDelta(delta, MOVE_TYPE.JUMP_MOVE, DIRECTION.UP_LEFT);
    jumpedDelta = getJumpedDelta(fromDelta, toDelta);

    toSquare = board[toDelta.row][toDelta.col];
    jumpedSquare = board[jumpedDelta.row][jumpedDelta.col];

    if (isValidJump(fromSquare, jumpedSquare, toSquare)) {
      moves.push(toDelta);
    }
  }

  // Check right, for the rightmost one, it can only jump left upwards.
  if (fromDelta.col < CONSTANTS.COLUMN - 2) {
    toDelta = getToDelta(delta, MOVE_TYPE.JUMP_MOVE, DIRECTION.UP_RIGHT);
    jumpedDelta = getJumpedDelta(fromDelta, toDelta);

    toSquare = board[toDelta.row][toDelta.col];
    jumpedSquare = board[jumpedDelta.row][jumpedDelta.col];

    if (isValidJump(fromSquare, jumpedSquare, toSquare)) {
      moves.push(toDelta);
    }
  }

  return moves;
}

/**
 * Get all possible downwards jump moves for a specific piece by its
 * square delta.
 *
 * @param board the game board
 * @param delta the delta of the square holds the piece
 * @return an array of all possible moves
 */
function getJumpDownMoves(board: Board, delta: BoardDelta): BoardDelta[] {
  const fromCoordinate: BoardDelta = delta;
  const fromSquare: string = board[delta.row][delta.col];
  let jumpedCoordinate: BoardDelta;
  let jumpedSquare: string;
  let toCoordinate: BoardDelta;
  let toSquare: string;
  const moves: BoardDelta[] = [];

  // If the piece is in the last two rows, then there's no way to jump
  // downwards.
  if (fromCoordinate.row > CONSTANTS.ROW - 3) {
    return moves;
  }

  // Check left first, for the leftmost one, it can only jump right
  // downwards.
  if (fromCoordinate.col > 1) {
    toCoordinate = getToDelta(delta, MOVE_TYPE.JUMP_MOVE, DIRECTION.DOWN_LEFT);
    jumpedCoordinate = getJumpedDelta(fromCoordinate, toCoordinate);

    toSquare = board[toCoordinate.row][toCoordinate.col];
    jumpedSquare = board[jumpedCoordinate.row][jumpedCoordinate.col];

    if (isValidJump(fromSquare, jumpedSquare, toSquare)) {
      moves.push(toCoordinate);
    }
  }

  // Check right, for the rightmost one, it can only jump left
  // downwards.
  if (fromCoordinate.col < CONSTANTS.COLUMN - 2) {
    toCoordinate = getToDelta(delta, MOVE_TYPE.JUMP_MOVE, DIRECTION.DOWN_RIGHT);
    jumpedCoordinate = getJumpedDelta(fromCoordinate, toCoordinate);

    toSquare = board[toCoordinate.row][toCoordinate.col];
    jumpedSquare = board[jumpedCoordinate.row][jumpedCoordinate.col];

    if (isValidJump(fromSquare, jumpedSquare, toSquare)) {
      moves.push(toCoordinate);
    }
  }

  return moves;
}

/**
 * Get all possible simple moves for a specific piece by its square
 * delta. If it is crowned, also check if it can move one step backward.
 *
 * @param board the game board
 * @param delta the delta of the square holds the piece
 * @param turnIndex 0 represents the black player and 1
 *        represents the white player.
 * @return an array of all possible moves.
 */
export function getSimpleMoves(board: Board, delta: BoardDelta, turnIndex: number): BoardDelta[] {
  let moves: BoardDelta[] = [];
  let tmpMoves: BoardDelta[] = [];
  const fromSquare: string = board[delta.row][delta.col];
  const color: string = fromSquare.substr(0, 1);
  const kind: string = fromSquare.substr(1);

  // Check whether it's the current player's piece first, if not, since
  // the player can not operate it, then no move will be available.
  if (isOwnColor(turnIndex, color)) {
    if (kind === CONSTANTS.KING) {
      // Check both direction moves
      tmpMoves = getSimpleUpMoves(board, delta);
      moves = moves.concat(tmpMoves);
      tmpMoves = getSimpleDownMoves(board, delta);
      moves = moves.concat(tmpMoves);
    } else if (color === CONSTANTS.WHITE) {
      tmpMoves = getSimpleUpMoves(board, delta);
      moves = moves.concat(tmpMoves);
    } else if (color === CONSTANTS.BLACK) {
      tmpMoves = getSimpleDownMoves(board, delta);
      moves = moves.concat(tmpMoves);
    }
  }

  return moves;
}

/**
 * Get all possible jump moves for a specific piece by its square delta.
 * If it is crowned, also check if it can jump one step backward.
 *
 * @param board the game board
 * @param delta the delta of the square holds the piece
 * @param turnIndex 0 represents the black player and 1
 *        represents the white player.
 * @return an array of all possible moves
 */
export function getJumpMoves(board: Board, delta: BoardDelta, turnIndex: number): BoardDelta[] {
  let moves: BoardDelta[] = [];
  let tmpMoves: BoardDelta[] = [];
  const fromSquare: string = board[delta.row][delta.col];
  const color: string = fromSquare.substr(0, 1);
  const kind: string = fromSquare.substr(1);
  // Check whether it's the current player's piece first, if not, since
  // the player can not operate it, then no move will be available.
  if (isOwnColor(turnIndex, color)) {
    if (kind === CONSTANTS.KING) {
      // Check both direction moves
      tmpMoves = getJumpUpMoves(board, delta);
      moves = moves.concat(tmpMoves);

      tmpMoves = getJumpDownMoves(board, delta);
      moves = moves.concat(tmpMoves);
    } else if (color === CONSTANTS.WHITE) {
      tmpMoves = getJumpUpMoves(board, delta);
      moves = moves.concat(tmpMoves);
    } else if (color === CONSTANTS.BLACK) {
      tmpMoves = getJumpDownMoves(board, delta);
      moves = moves.concat(tmpMoves);
    }
  }

  return moves;
}

/**
 * Get all possible moves for a specific piece by its square delta.
 *
 * @param board the game board.
 * @param delta the delta of the square holds the piece
 * @param turnIndex 0 represents the black player and 1
 *        represents the white player.
 * @return an array of all possible move.
 */
export function getAllPossibleMoves(board: Board, delta: BoardDelta, turnIndex: number): BoardDelta[] {
  let possibleMoves: BoardDelta[];

  // First get all possible jump moves.
  possibleMoves = getJumpMoves(board, delta, turnIndex);
  // If there's at least one jump move, then no need to check the simple
  // moves since jump move is mandatory.
  if (possibleMoves.length === 0) {
    possibleMoves = getSimpleMoves(board, delta, turnIndex);
  }

  return possibleMoves;
}

/**
 * Get the winner based on the current board.
 *
 * @param board the game board
 * @param turnIndex 0 represents the black player and 1
 *        represents the white player.
 * @returns string "B" if the piece is black, "W" if the piece is
 *                white, otherwise it's empty.
 */
export function getWinner(board: Board, turnIndex: number): string {
  let allPossibleMoves: BoardDelta[] = [];
  let hasWhite = false;
  let hasBlack = false;
  const coordinate: BoardDelta = {row: -1, col: -1};
  let row: number;
  let col: number;

  // Check whether there's any piece for both of the player
  for (row = 0; row < CONSTANTS.ROW; row += 1) {
    for (col = 0; col < CONSTANTS.COLUMN; col += 1) {
      if (getColor(board[row][col]) === CONSTANTS.WHITE) {
        hasWhite = true;
      } else if (getColor(board[row][col]) === CONSTANTS.BLACK) {
        hasBlack = true;
      }

      if (hasWhite === true && hasBlack === true) {
        // No need to check the rest
        break;
      }
    }
  }

  // White won because white player has no pieces
  if (hasWhite && !hasBlack) {
    return CONSTANTS.WHITE;
  }

  // Black won because black player has no pieces
  if (!hasWhite && hasBlack) {
    return CONSTANTS.BLACK;
  }

  // Get all the moves for the current turn player
  for (row = 0; row < CONSTANTS.ROW; row += 1) {
    for (col = 0; col < CONSTANTS.COLUMN; col += 1) {
      coordinate.row = row;
      coordinate.col = col;

      if (turnIndex === CONSTANTS.BLACK_INDEX) {
        allPossibleMoves = allPossibleMoves.concat(getAllPossibleMoves(board, coordinate, 1 - turnIndex));
      } else {
        // Get all white's moves
        allPossibleMoves = allPossibleMoves.concat(getAllPossibleMoves(board, coordinate, 1 - turnIndex));
      }
    }
  }

  if (allPossibleMoves.length === 0) {
    if (turnIndex === CONSTANTS.BLACK_INDEX) {
      // Black has no moves, so white wins!
      return CONSTANTS.BLACK;
    }
    return CONSTANTS.WHITE;
  }

  // No winner, the game is not ended.
  return '';
}

/**
 * Check if there's any mandatory jumps for the player.
 *
 * @returns true if there has, otherwise false.
 */
export function hasMandatoryJumps(board: Board, yourPlayerIndex: number): boolean {
  let possibleMoves: BoardDelta[] = [];
  const delta: BoardDelta = {row: -1, col: -1};
  let row: number;
  let col: number;

  for (row = 0; row < CONSTANTS.ROW; row += 1) {
    for (col = 0; col < CONSTANTS.COLUMN; col += 1) {
      delta.row = row;
      delta.col = col;
      possibleMoves = possibleMoves.concat(getJumpMoves(board, delta, yourPlayerIndex));
    }
  }
  return possibleMoves.length > 0;
}

/**
 * Get the expected operations for the selected squares (from and to
 * square deltas).
 *
 * @param board the game API state.
 * @param fromDelta the first selected square delta. (The one moving or
 *                  jumping)
 * @param toDelta the second selected square delta. (The destination)
 * @param turnIndexBeforeMove 0 represents the black player and 1
 *        represents the white player.
 * @returns {Array} operations
 */
export function createMiniMove(
  board: Board,
  fromDelta: BoardDelta,
  toDelta: BoardDelta,
  turnIndexBeforeMove: number
): IMove<IState> {
  if (!board) {
    board = getInitialBoard();
  } else {
    board = deepClone(board);
  }
  const originalBoard = deepClone(board);

  let isAJumpMove = false;
  let isASimpleMove = false;
  let possibleSimpleMoves: BoardDelta[];
  let jumpedCoord: BoardDelta;

  const originalKind = board[fromDelta.row][fromDelta.col].substr(1);

  if (!isDarkSquare(fromDelta) || !isDarkSquare(toDelta)) {
    throw new Error(ILLEGAL_CODE.ILLEGAL_DELTA);
  }

  if (isSimpleMove(board, fromDelta, toDelta)) {
    isASimpleMove = true;
  } else if (isJumpMove(board, fromDelta, toDelta)) {
    isAJumpMove = true;
  }

  if (isASimpleMove) {
    // Simple move
    // Check if there are any mandatory jumps.
    if (hasMandatoryJumps(board, turnIndexBeforeMove)) {
      // At least one jump move exists for the player, since jump move
      // is mandatory, the move is illegal.
      throw new Error(ILLEGAL_CODE.ILLEGAL_IGNORE_MANDATORY_JUMP);
    }

    // No mandatory jumps, then get all simple moves.
    possibleSimpleMoves = getSimpleMoves(board, fromDelta, turnIndexBeforeMove);

    // The move should exist in the possible simple moves.
    if (!doesContainMove(possibleSimpleMoves, toDelta)) {
      throw new Error(ILLEGAL_CODE.ILLEGAL_SIMPLE_MOVE);
    }
  } else if (isAJumpMove) {
    // Jump move
    const possibleJumpMoves = getJumpMoves(board, fromDelta, turnIndexBeforeMove);
    // The move should exist in the possible jump moves.
    if (!doesContainMove(possibleJumpMoves, toDelta)) {
      throw new Error(ILLEGAL_CODE.ILLEGAL_JUMP_MOVE);
    }
  } else {
    // Illegal move since it's not simple move nor jump move.
    throw new Error(ILLEGAL_CODE.ILLEGAL_MOVE);
  }

  if (isASimpleMove) {
    board[toDelta.row][toDelta.col] = board[fromDelta.row][fromDelta.col];
    board[fromDelta.row][fromDelta.col] = CONSTANTS.DARK_SQUARE;
  } else if (isAJumpMove) {
    jumpedCoord = getJumpedDelta(fromDelta, toDelta);
    board[toDelta.row][toDelta.col] = board[fromDelta.row][fromDelta.col];
    board[fromDelta.row][fromDelta.col] = CONSTANTS.DARK_SQUARE;
    board[jumpedCoord.row][jumpedCoord.col] = CONSTANTS.DARK_SQUARE;
  }

  const isToKingsRow = hasMoveOrJumpToKingsRow(toDelta, turnIndexBeforeMove);
  if (isToKingsRow) {
    if (getColor(board[toDelta.row][toDelta.col]) === CONSTANTS.BLACK) {
      board[toDelta.row][toDelta.col] = CONSTANTS.BLACK_KING;
    } else if (getColor(board[toDelta.row][toDelta.col]) === CONSTANTS.WHITE) {
      board[toDelta.row][toDelta.col] = CONSTANTS.WHITE_KING;
    }
  }
  const winner = getWinner(board, turnIndexBeforeMove);
  const playerHasMoreJumpMoves = isAJumpMove && getJumpMoves(board, toDelta, turnIndexBeforeMove).length > 0;
  let endMatchScores: number[] | null;
  let turnIndex: number;
  if (winner !== '' && !playerHasMoreJumpMoves) {
    // Has a winner
    // Game over.
    turnIndex = -1;
    endMatchScores = winner === CONSTANTS.WHITE ? [1, 0] : [0, 1];
  } else {
    // Game continues.
    endMatchScores = null;
    if (playerHasMoreJumpMoves) {
      if (!isToKingsRow || originalKind === CONSTANTS.KING) {
        // If the same piece can make any more jump moves and it does
        // not enter the kings row, then the next turn remains
        // unchanged.
        turnIndex = turnIndexBeforeMove;
      } else {
        // The piece can not make any more jump moves or it enters the
        // kings row
        turnIndex = 1 - turnIndexBeforeMove;
      }
    } else {
      // The next turn will be the next player's if it's a simple move.
      turnIndex = 1 - turnIndexBeforeMove;
    }
  }
  const state: IState = {
    miniMoves: [{fromDelta: fromDelta, toDelta: toDelta}],
    board: board,
    boardBeforeMove: originalBoard,
  };
  return {endMatchScores: endMatchScores, turnIndex: turnIndex, state: state};
}

export function createMove(board: Board | null, miniMoves: MiniMove[], turnIndexBeforeMove: number): IMove<IState> {
  if (!board) board = getInitialBoard();
  const originalBoard = deepClone(board);
  if (miniMoves.length === 0) throw new Error('Must have at least one mini-move');
  let megaMove: IMove<IState> | null = null;
  let lastMiniMove: MiniMove | null = null;
  for (const miniMove of miniMoves) {
    if (megaMove) {
      if (megaMove.turnIndex !== turnIndexBeforeMove) throw new Error('Mini-moves must be done by the same player');
    }
    if (lastMiniMove) {
      if (!deepEquals(lastMiniMove.toDelta, miniMove.fromDelta))
        throw new Error('Mini-moves must be done with the same piece');
    }
    lastMiniMove = miniMove;
    megaMove = createMiniMove(board, miniMove.fromDelta, miniMove.toDelta, turnIndexBeforeMove);
    board = deepClone(megaMove.state.board);
  }
  if (!megaMove) throw new Error('Impossible: we had at least one mini-move');
  megaMove.state.miniMoves = miniMoves;
  megaMove.state.boardBeforeMove = originalBoard;
  return megaMove;
}

export function getInitialState(): IState {
  return {miniMoves: [], board: getInitialBoard(), boardBeforeMove: getInitialBoard()};
}

/**
 * Return the initial board
 */
export function getInitialBoard(): Board {
  return [
    ['--', 'BM', '--', 'BM', '--', 'BM', '--', 'BM'],
    ['BM', '--', 'BM', '--', 'BM', '--', 'BM', '--'],
    ['--', 'BM', '--', 'BM', '--', 'BM', '--', 'BM'],
    ['DS', '--', 'DS', '--', 'DS', '--', 'DS', '--'],
    ['--', 'DS', '--', 'DS', '--', 'DS', '--', 'DS'],
    ['WM', '--', 'WM', '--', 'WM', '--', 'WM', '--'],
    ['--', 'WM', '--', 'WM', '--', 'WM', '--', 'WM'],
    ['WM', '--', 'WM', '--', 'WM', '--', 'WM', '--'],
  ];
}
// function isPosOnHintLine(row: number, col: number, hint: RiddleData) {
//   switch (hint) {
//     case 's1':
//       return row == 0;
//     case 's2':
//       return row == 1;
//     case 's3':
//       return row == 2;
//   }
// }
export function checkRiddleData(/* state: IState, turnIndex: number, firstMoveSolutions: IMove<IState>[] */): boolean {
  // const {riddleData} = state;
  // return !riddleData ? false : firstMoveSolutions.some((firstMove) => firstMove.state.miniMoves);
  return true;
}
