import {IMove, deepClone} from '../common/common';

export type Board = string[][];
export interface BoardDelta {
  row: number;
  col: number;
}

export type RiddleData =
  | 'd1'
  | 'd2'
  | 'd3'
  | 'd4'
  | 'd5'
  | '2r0'
  | '5r0'
  | '5r1'
  | '4r3'
  | '2r2'
  | '3r2'
  | '4r4'
  | '1r2'
  | '3r0'
  | '0r3'
  | '1r1'
  | '5r3'
  | '5c0'
  | '5c1'
  | '5c2'
  | '5c3'
  | '5c4'
  | '5c5'
  | '5c6'
  | '0c0'
  | '0c1'
  | '2r1'
  | '0c3'
  | '1c0'
  | '1c1'
  | '1c2';
export interface IState {
  board: Board;
  delta?: BoardDelta;
  riddleData?: RiddleData;
}

function isPosOnHintLine(row: number, col: number, hint: RiddleData) {
  const hitString = hint.toString();
  if (hitString.includes('d')) {
    return true;
  } else {
    const colFromStringNumber = Number(hitString.charAt(2));
    const rowFromStringNumber = Number(hitString.charAt(0));
    if (hitString.includes('r')) {
      if (rowFromStringNumber == row) {
        return true;
      } else {
        return false;
      }
    } else {
      if (colFromStringNumber == col) {
        return true;
      }
    }
  }
}

export function checkRiddleData(state: IState, turnIndex: number, firstMoveSolutions: IMove<IState>[]): boolean {
  const {riddleData} = state;
  return !riddleData
    ? false
    : firstMoveSolutions.some(
        (firstMove) =>
          firstMove.state.delta && isPosOnHintLine(firstMove.state.delta.row, firstMove.state.delta.col, riddleData)
      );
}

export const ROWS = 6;
export const COLS = 7;
export function getInitialState(): IState {
  return {board: getInitialBoard()};
}
/** Returns the initial Connect4 board, which is a ROWSxCOLS matrix containing ''. */
export function getInitialBoard(): Board {
  const board: Board = [];
  for (let i = 0; i < ROWS; i++) {
    board[i] = [];
    for (let j = 0; j < COLS; j++) {
      board[i][j] = ' ';
    }
  }
  return board;
}
function isGameOver(board: Board): boolean {
  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      if (board[i][j] === ' ') {
        // If there is an empty cell then we do not have a tie.
        return false;
      }
    }
  }
  // No empty cells, so we have a tie!
  return true;
}
function p(y: number, x: number, boardString: Board): string {
  if (boardString[5][0] == 'Y' && boardString[5][1] == 'Y' && boardString[5][2] == 'Y' && boardString[5][3] == 'Y') {
    // //console.log(y < 0 || x < 0 || y >= ROWS || x >= COLS ? '0' : boardString[y][x]);
  }
  return y < 0 || x < 0 || y >= ROWS || x >= COLS ? '0' : boardString[y][x];
}
function getWinner(board: Board): string {
  // loops through rows, columns, diagonals, etc

  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      if (
        p(y, x, board) !== '0' &&
        p(y, x, board) !== ' ' &&
        p(y, x, board) === p(y, x + 1, board) &&
        p(y, x, board) === p(y, x + 2, board) &&
        p(y, x, board) === p(y, x + 3, board)
      ) {
        return p(y, x, board);
      }
    }
  }
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      if (
        p(y, x, board) !== '0' &&
        p(y, x, board) !== ' ' &&
        p(y, x, board) === p(y + 1, x, board) &&
        p(y, x, board) === p(y + 2, x, board) &&
        p(y, x, board) === p(y + 3, x, board)
      ) {
        return p(y, x, board);
      }
    }
  }

  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      for (let d = -1; d <= 1; d += 2) {
        if (
          p(y, x, board) !== '0' &&
          p(y, x, board) !== ' ' &&
          p(y, x, board) === p((y + 1) * d, x + 1, board) &&
          p(y, x, board) === p((y + 2) * d, x + 2, board) &&
          p(y, x, board) === p((y + 3) * d, x + 3, board)
        ) {
          return p(y, x, board);
        }
      }
    }
  }
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      for (let d = -1; d <= 1; d += 2) {
        if (
          p(y, x, board) !== '0' &&
          p(y, x, board) !== ' ' &&
          p(y, x, board) === p((y + 1) * d, x - 1, board) &&
          p(y, x, board) === p((y + 2) * d, x - 2, board) &&
          p(y, x, board) === p((y + 3) * d, x - 3, board)
        ) {
          return p(y, x, board);
        }
      }
    }
  }
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      if (p(y, x, board) === ' ') {
        return ' ';
      }
    }
  }
  return ' ';
}
export function createMove(
  stateBeforeMove: IState | null,
  row: number,
  col: number,
  turnIndexBeforeMove: number
): IMove<IState> {
  if (!stateBeforeMove) {
    stateBeforeMove = getInitialState();
  }
  const board: Board = stateBeforeMove.board;

  if (board[row][col] !== ' ') {
    throw new Error('One can only make a move in an empty position!');
  }
  if (getWinner(board) !== ' ' || isGameOver(board)) {
    // console.log(board);
    throw new Error('Can only make a move if the game is not over!');
  }
  const boardAfterMove = deepClone(board);
  boardAfterMove[row][col] = turnIndexBeforeMove === 0 ? 'Y' : 'R';
  const winner = getWinner(boardAfterMove);
  let endMatchScores: number[] | null;
  let turnIndex: number;

  if (winner !== ' ' || isGameOver(boardAfterMove)) {
    // Game over.
    turnIndex = -1;
    endMatchScores = winner === 'Y' ? [1, 0] : winner === 'R' ? [0, 1] : [0, 0];
  } else {
    // Game continues. Now it's the opponent's turn (the turn switches from 0 to 1 and 1 to 0).
    turnIndex = 1 - turnIndexBeforeMove;
    endMatchScores = null;
  }
  const delta: BoardDelta = {row, col};
  const state: IState = {delta, board: boardAfterMove};
  return {
    endMatchScores,
    turnIndex,
    state,
  };
}
