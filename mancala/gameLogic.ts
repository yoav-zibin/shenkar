import {IMove, deepClone} from '../common/common';

export type Board = number[][];
export interface BoardDelta {
  player: number;
  cell: number;
}
export interface IState {
  board: Board;
  delta: BoardDelta | null;
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
   for (let j = 0; j < COLS ; j++) {
     board[i][j] = 4;
   }
 }
 board[PLAYER1_INDEX][BASE_INDEX] = 0
 board[PLAYER2_INDEX][BASE_INDEX] = 0
 return board;
}

export function getInitialState(): IState {
  return {board: getInitialBoard(), delta: null};
}

/**
 * Returns true if the game ended in a tie because there are no empty cells.
 * E.g., isTie returns true for the following board:
 *     [['X', 'O', 'X'],
 *      ['X', 'O', 'O'],
 *      ['O', 'X', 'X']]
 */
function isTie(board: Board): boolean {
 if (board[PLAYER1_INDEX][BASE_INDEX] === board[PLAYER2_INDEX][BASE_INDEX]){
    return true;
 }
 return false
}

/**
 * Return the winner (either 'X' or 'O') or '' if there is no winner.
 * The board is a matrix of size 3x3 containing either 'X', 'O', or ''.
 * E.g., getWinner returns 'X' for the following board:
 *     [['X', 'O', ''],
 *      ['X', 'O', ''],
 *      ['X', '', '']]
 */
function getWinner(board: Board): string {
  let player1RowSum:number = 0;
  let player2RowSum:number = 0;
  for(let i = 0; i < COLS - 1 ; i++){
    player1RowSum += board[PLAYER1_INDEX][i];
    player2RowSum += board[PLAYER2_INDEX][i];
  }

  if(player1RowSum !== 0 && player2RowSum !== 0){
    return ''
  }
  //player 1 row is empty
  if(player1RowSum === 0){
    board[PLAYER2_INDEX][BASE_INDEX] += player2RowSum;
  }
  //player 2 row is empty
  if(player2RowSum === 0){
    board[PLAYER1_INDEX][BASE_INDEX] += player1RowSum;
  }
  
if(board[PLAYER1_INDEX][BASE_INDEX] > board[PLAYER2_INDEX][BASE_INDEX]){
      return '1'
  }
    else return '2'
  
}

function getMoves(board:Board, player: number, cell:number){
  const numOfStones = board[player][cell];
  let currCell = cell + 1;
  let currPlayer = player;
  let movesArray: number[][] = [];
  movesArray[0] = [];
  movesArray[1] = [];
  let movesCounter = 0;
  while(movesCounter != numOfStones){
    if( 0 <= currCell && currCell < 6){
        movesArray[0][movesCounter] = currPlayer;
        movesArray[1][movesCounter] = currCell;
        currCell++;
        movesCounter++;
    }else if (currCell === 6){
      if(player === currPlayer){
        movesArray[0][movesCounter] = currPlayer;
        movesArray[1][movesCounter] = currCell;
        currCell++;
        movesCounter++;
      }else{
        currCell++;
      }
    }else if (currCell === 7){
      currCell = 0;
      currPlayer = currPlayer === 0 ? 1 : 0;
    }
  }
  return movesArray;
}
function makeMove(board:Board, player:number, cell:number):[Board, boolean]{
  let movesArray: number[][] = getMoves(board, player, cell);
  let numOfMoves = movesArray[0].length;
  let extraMove: boolean = false
  for(let i = 0; i< numOfMoves; i++){
    board[movesArray[0][i]][movesArray[1][i]]++;
  }
  if(board[movesArray[0][numOfMoves - 1]][movesArray[1][numOfMoves - 1]] === 1){
    // a case where the last stone is put in an empty hole 
    let oponentIndex = player === 0 ? 1 : 0;
    board[player][BASE_INDEX] = board[player][BASE_INDEX] + 1 + board[oponentIndex][movesArray[1][numOfMoves - 1]]
    board[oponentIndex][movesArray[1][numOfMoves - 1]] = 0;
    board[movesArray[0][numOfMoves - 1]][movesArray[1][numOfMoves - 1]] = 0
  }
  if(movesArray[1][numOfMoves - 1] === 6){
    // case where the lat stone was in the players base
    extraMove = true
  }
  board[player][cell] = 0;

  return [board , extraMove]
}
/**
 * Returns the move that should be performed when player
 * with index turnIndexBeforeMove makes a move in cell row X col.
 */
export function createMove(stateBeforeMove: IState | null, player: number, cell: number, turnIndexBeforeMove: number): IMove<IState> {
  if (!stateBeforeMove) {
    stateBeforeMove = getInitialState();
  }
  const board: Board = stateBeforeMove.board;
  if (board[player][cell] === 0) {
    throw new Error('One can only make a move in an  non empty hole!');
  }
  if (getWinner(board) !== '' || isTie(board)) {
    throw new Error('Can only make a move if the game is not over!');
  }
  const [boardAfterMove, hasExtraMove] = makeMove(board, player, cell)
  const winner = getWinner(boardAfterMove);
  let endMatchScores: number[] | null;
  let turnIndex: number;
  if (winner !== '' || isTie(boardAfterMove)) {
    // Game over.
    turnIndex = -1;
    endMatchScores = winner === 'X' ? [1, 0] : winner === 'O' ? [0, 1] : [0, 0];
  } else {
    // Game continues. Now it's the opponent's turn (the turn switches from 0 to 1 and 1 to 0).
    if(hasExtraMove){
      turnIndex = player;
      endMatchScores = null;
    }
    else{
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
