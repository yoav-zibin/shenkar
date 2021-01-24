import {IMove, deepClone} from '../common/common';

export type Board = number[][];
export interface BoardDelta {
  player: number;
  cell: number;
}

export type RiddleData = 'r1';
export interface IState {
  board: Board;
  delta?: BoardDelta;
  riddleData?: RiddleData;
}

export function checkRiddleData(): boolean {
  return false;
}

export const ROWS = 2;
export const COLS = 6;
export const BASE_INDEX = 6;
export const PLAYER1_INDEX = 0;
export const PLAYER2_INDEX = 1;

/** Returns the initial TicTacToe board, which is a ROWSxCOLS matrix containing ''. */
export function getInitialBoard(): Board {
  const board: Board = [];
  for (let i = 0; i < ROWS; i++) {
    board[i] = [];
    for (let j = 0; j < COLS; j++) {
      board[i][j] = 4;
    }
  }
  board[PLAYER1_INDEX][BASE_INDEX] = 0;
  board[PLAYER2_INDEX][BASE_INDEX] = 0;
  return board;
}

export function getInitialState(): IState {
  return {board: getInitialBoard()};
}

function getWinner(board: Board): string {
  let player1RowSum = 0;
  let player2RowSum = 0;
  for (let i = 0; i < COLS; i++) {
    player1RowSum += board[PLAYER1_INDEX][i];
    player2RowSum += board[PLAYER2_INDEX][i];
  }

  if (player1RowSum !== 0 && player2RowSum !== 0) {
    return '';
  }
  // player 1 row is empty
  if (player1RowSum === 0) {
    board[PLAYER2_INDEX][BASE_INDEX] += player2RowSum;
  }
  // player 2 row is empty
  if (player2RowSum === 0) {
    board[PLAYER1_INDEX][BASE_INDEX] += player1RowSum;
  }

  if (board[PLAYER1_INDEX][BASE_INDEX] > board[PLAYER2_INDEX][BASE_INDEX]) {
    return '1';
  }
  if (board[PLAYER1_INDEX][BASE_INDEX] < board[PLAYER2_INDEX][BASE_INDEX]) return '2';

  return '3';
}

function getMoves(board: Board, player: number, cell: number) {
  const numOfStones = board[player][cell]; // number of stone to distrubute in next cells
  let currCell = cell + 1; // the current cell we want to add a stone to (init with the cell the player chose + 1)
  let currPlayer = player; // the player row we want to add a stone to in currCell position

  const movesArray: number[][] = [];
  movesArray[0] = []; // which player row of
  movesArray[1] = []; // which cell
  let movesCounter = 0;
  // while we still have stone to destribute continue
  while (movesCounter != numOfStones) {
    // if the current cell we are talking about is between 0 - 5
    // (that means we are still talking about the current player and we do not need to switch)
    if (0 <= currCell && currCell < 6) {
      movesArray[0][movesCounter] = currPlayer;
      movesArray[1][movesCounter] = currCell;
      currCell++;
      movesCounter++;
    } else if (currCell === 6) {
      if (player === currPlayer) {
        movesArray[0][movesCounter] = currPlayer;
        movesArray[1][movesCounter] = currCell;
        currCell++;
        movesCounter++;
      } else {
        currCell++;
      }
    } else if (currCell === 7) {
      currCell = 0;
      currPlayer = currPlayer === 0 ? 1 : 0;
    }
  }
  return movesArray;
}
function makeMove(board: Board, player: number, cell: number): [Board, boolean] {
  const movesArray: number[][] = getMoves(board, player, cell);
  const numOfMoves = movesArray[0].length;
  let extraMove = false;
  for (let i = 0; i < numOfMoves; i++) {
    board[movesArray[0][i]][movesArray[1][i]]++;
  }
  if (
    board[movesArray[0][numOfMoves - 1]][movesArray[1][numOfMoves - 1]] === 1 &&
    movesArray[1][numOfMoves - 1] !== 6 &&
    movesArray[0][numOfMoves - 1] === player
  ) {
    // a case where the last stone is put in an empty hole on your side
    const oponentIndex = player === 0 ? 1 : 0;
    const oponentCellToTake = 5 - movesArray[1][numOfMoves - 1];
    board[player][BASE_INDEX] = board[player][BASE_INDEX] + 1 + board[oponentIndex][oponentCellToTake];
    board[oponentIndex][oponentCellToTake] = 0;
    board[movesArray[0][numOfMoves - 1]][movesArray[1][numOfMoves - 1]] = 0;
  }
  if (movesArray[1][numOfMoves - 1] === 6) {
    // case where the lat stone was in the players base
    extraMove = true;
  }
  board[player][cell] = 0;

  return [board, extraMove];
}

function clearBoard(board: Board) {
  for (let i = 0; i < COLS; i++) {
    board[PLAYER1_INDEX][i] = 0;
    board[PLAYER2_INDEX][i] = 0;
  }
  return board;
}
/**
 * Returns the move that should be performed when player
 * with index turnIndexBeforeMove makes a move in cell row X col.
 */
export function createMove(
  stateBeforeMove: IState | null,
  player: number,
  cell: number,
  turnIndexBeforeMove: number
): IMove<IState> {
  if (!stateBeforeMove) {
    stateBeforeMove = getInitialState();
  }
  const board: Board = stateBeforeMove.board;
  if (player != turnIndexBeforeMove) {
    throw new Error('a player can only choose a hole from his row !');
  }
  if (board[player][cell] === 0) {
    throw new Error('One can only make a move in an  non empty hole!');
  }
  let winner: string = getWinner(board);
  if (winner !== '') {
    throw new Error('Can only make a move if the game is not over!');
  }
  const boardCloan = deepClone(board);
  const [boardAfterMove, hasExtraMove] = makeMove(boardCloan, player, cell);
  winner = getWinner(boardAfterMove);
  let endMatchScores: number[] | null;
  let turnIndex: number;

  if (winner !== '') {
    // Game over.
    // clear board
    clearBoard(boardAfterMove);
    turnIndex = -1;
    endMatchScores = winner === '1' ? [1, 0] : winner === '2' ? [0, 1] : [0, 0];
  } else {
    // Game continues. Now it's the opponent's turn (the turn switches from 0 to 1 and 1 to 0).
    if (hasExtraMove) {
      turnIndex = player;
      endMatchScores = null;
    } else {
      turnIndex = 1 - turnIndexBeforeMove;
      endMatchScores = null;
    }
  }
  const delta: BoardDelta = {player: player, cell: cell};
  const state: IState = {delta: delta, board: boardAfterMove};
  return {
    endMatchScores: endMatchScores,
    turnIndex: turnIndex,
    state: state,
  };
}

export function createInitialMove(): IMove<IState> {
  return {endMatchScores: null, turnIndex: 0, state: getInitialState()};
}
