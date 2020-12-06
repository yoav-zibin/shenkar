import {IMove, deepClone, deepEquals} from '../common/common';

export type Board = string[][]; // 'B' is black, 'W' is white, '' is empty
export interface BoardDelta {
  row: number;
  col: number;
}
export type RiddleData = 'r1' | 'r2' | 'r3' | 'r4' | 'r5';
export interface IState {
  board: Board;
  boardBeforeMove: Board;
  delta: BoardDelta | null; // [-1,-1] means a pass.
  passes: number;
  deadBoard: boolean[][] | null;
  // For the rule of KO:
  // One may not capture just one stone,
  // if that stone was played on the previous move,
  // and that move also captured just one stone.
  posJustCapturedForKo: BoardDelta | null;
  riddleData?: RiddleData;
  riddleWin?: number[];
  riddleWon?: boolean;
}
type Points = number[][]; // A point (row,col) is represented as an array with 2 elements: [row,col].
type Sets = {white: Points[]; black: Points[]};

// function isPosOnHintLine(row: number, col: number, hint: RiddleData) {
//   switch (hint) {
//     case 'r1':
//       return row == 2;
//     case 'r2':
//       return row == 3;
//     case 'r3':
//       return row == 3;
//     case 'r4':
//       return row == 4;
//     case 'r5':
//       return row == 6;
//   }
// }

export function checkRiddleData(): // state: IState, turnIndex: number, firstMoveSolutions: IMove<IState>[]):
boolean {
  return true;
  // const {riddleData} = state;
  // return !riddleData
  //   ? false
  //   : firstMoveSolutions.some(
  //       (firstMove) =>
  //         firstMove.state.delta && isPosOnHintLine(firstMove.state.delta.row, firstMove.state.delta.col, riddleData)
  //     );
}

// returns a new [empty] weiqi board
// code adapted from: http://stackoverflow.com/questions/6495187/best-way-to-generate-empty-2d-array
export function createNewBoardWithElement<T>(dim: number, element: T): T[][] {
  let rows = dim;
  let cols = dim;
  const array: T[][] = [];
  const row: T[] = [];
  while (cols--) row.push(element);
  while (rows--) array.push(row.slice());
  return array;
}
export function createNewBoard(dim: number): Board {
  return createNewBoardWithElement(dim, '');
}

// returns copy of JS object
function copyObject<T>(object: T): T {
  return deepClone(object);
}

// Helper for getSets

function getWeb(color: string, row: number, col: number, board: Board, visited: Board): Points {
  const points: Points = [];
  const dim = board.length;

  function tryPoints(row: number, col: number) {
    points.push([row, col]);
    visited[row][col] = color;
    if (row - 1 >= 0 && visited[row - 1][col] === '' && board[row - 1][col] === color) {
      tryPoints(row - 1, col);
    }
    if (row + 1 < dim && visited[row + 1][col] === '' && board[row + 1][col] === color) {
      tryPoints(row + 1, col);
    }
    if (col + 1 < dim && visited[row][col + 1] === '' && board[row][col + 1] === color) {
      tryPoints(row, col + 1);
    }
    if (col - 1 >= 0 && visited[row][col - 1] === '' && board[row][col - 1] === color) {
      tryPoints(row, col - 1);
    }
  }

  tryPoints(row, col);
  return points;
}
// needed by evaluateBoard
// groups all contiguous stones as sets
export function getSets(board: Board): Sets {
  const dim = board.length;
  const visited = createNewBoard(dim);
  const setsX: Points[] = []; // black sets
  const setsO: Points[] = []; // white sets
  let row: number;
  let col: number;
  for (row = 0; row < dim; row++) {
    for (col = 0; col < dim; col++) {
      if (board[row][col] === 'B' && visited[row][col] === '') {
        setsX.push(getWeb('B', row, col, board, visited));
      } else if (board[row][col] === 'W' && visited[row][col] === '') {
        setsO.push(getWeb('W', row, col, board, visited));
      }
    }
  }
  return {black: setsX, white: setsO};
}

// Changes all arr locations in board to '' (empty)
function cleanBoard(board: Board, arr: Points) {
  const newboard = copyObject(board);
  for (let i = 0; i < arr.length; i++) {
    const row = arr[i][0];
    const col = arr[i][1];
    newboard[row][col] = '';
  }
  return newboard;
}

// For each set in forest, tries to find a liberty
// If no liberties, then the set is captured
function getLiberties(board: Board, forest: Points[]) {
  const dim = board.length;
  let boardAfterEval = copyObject(board);

  for (let i = 0; i < forest.length; i++) {
    let liberties = 0; // liberties found
    const tempset: Points = forest[i];
    for (let i2 = 0; i2 < tempset.length; i2++) {
      const row = tempset[i2][0];
      const col = tempset[i2][1];
      if (
        (row - 1 >= 0 && board[row - 1][col] === '') ||
        (row + 1 < dim && board[row + 1][col] === '') ||
        (col - 1 >= 0 && board[row][col - 1] === '') ||
        (col + 1 < dim && board[row][col + 1] === '')
      ) {
        liberties++;
        break;
      }
    }
    if (liberties === 0) {
      boardAfterEval = cleanBoard(boardAfterEval, tempset);
    }
  }
  return boardAfterEval;
}

// evaluates WEIQI board using union-find algorithm
function evaluateBoard(board: Board, turn: number) {
  const forest = getSets(board);
  const black = forest.black;
  const white = forest.white;

  // Iterate through the sets to find ones without liberties
  // First analyze the liberties of the opponent
  let boardAfterEval = getLiberties(board, turn === 0 ? white : black);
  boardAfterEval = getLiberties(boardAfterEval, turn === 0 ? black : white);

  return boardAfterEval;
}

function isBoardFull(board: Board) {
  const dim = board.length;
  for (let i = 0; i < dim; i++) {
    for (let j = 0; j < dim; j++) {
      if (!board[i][j]) return false;
    }
  }
  return true;
}

// returns a random move that the computer plays
export function createComputerMove(
  board: Board,
  passes: number,
  turnIndexBeforeMove: number,
  previousPosJustCapturedForKo: BoardDelta
) {
  const possibleMoves: IMove<IState>[] = [];
  const dim = board.length;
  for (let i = 0; i < dim; i++) {
    for (let j = 0; j < dim; j++) {
      const delta = {row: i, col: j};
      try {
        const testmove = createMove(board, passes, null, delta, turnIndexBeforeMove, previousPosJustCapturedForKo);
        possibleMoves.push(testmove);
      } catch (e) {
        // cell in that position was full
      }
    }
  }
  try {
    const delta = {row: -1, col: -1};
    const testmove = createMove(board, passes, null, delta, turnIndexBeforeMove, previousPosJustCapturedForKo);
    possibleMoves.push(testmove);
  } catch (e) {
    // Couldn't add pass as a move?
  }
  const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
  return randomMove;
}

/** Returns the number of pieces of the color for turnIndex. */
function getboardNum(board: Board, turnIndex: number): number {
  let sum = 0;
  const dim = board.length;
  const color = turnIndex ? 'W' : 'B';
  for (let i = 0; i < dim; i++) for (let j = 0; j < dim; j++) if (board[i][j] === color) sum++;
  return sum;
}
function getPosJustCapturedForKo(boardBeforeMove: Board, boardAfterMove: Board, turnIndex: number): BoardDelta | null {
  const oppositeColor = turnIndex ? 'B' : 'W';
  let result: BoardDelta | null = null;
  const dim = boardBeforeMove.length;
  for (let i = 0; i < dim; i++) {
    for (let j = 0; j < dim; j++) {
      if (boardBeforeMove[i][j] === oppositeColor && boardAfterMove[i][j] === '') {
        // We ate an opponent piece
        if (result === null) {
          result = {row: i, col: j};
        } else {
          return null; // we ate more than one piece
        }
      }
    }
  }
  return result;
}

export function createMove(
  board: Board,
  passes: number,
  deadBoard: boolean[][] | null,
  delta: BoardDelta,
  turnIndexBeforeMove: number,
  previousPosJustCapturedForKo: BoardDelta | null,
  riddleWin?: number[],
  riddleData?: RiddleData
): IMove<IState> {
  if (!passes) passes = 0;

  const setnumBefore = getboardNum(board, turnIndexBeforeMove);

  let boardAfterMove = copyObject(board);
  let passesAfterMove = passes;

  const row = delta.row;
  const col = delta.col;
  if (row === -1 && col === -1) {
    // delta of {-1, -1} indicates a pass (no move made)
    passesAfterMove++;
    if (passesAfterMove > 2) {
      throw Error('Exceeded number of possible passes.');
    }
  } else if (boardAfterMove[row][col] !== '') {
    // if space isn't '' then bad move
    throw Error('Space is not empty!');
  } else {
    // else make the move/change the board
    if (
      previousPosJustCapturedForKo &&
      previousPosJustCapturedForKo.row === row &&
      previousPosJustCapturedForKo.col === col
    ) {
      throw Error('KO!');
    }
    // bad delta should automatically throw error
    boardAfterMove[row][col] = turnIndexBeforeMove === 0 ? 'B' : 'W';
    passesAfterMove = 0; // if a move is made, passes is reset
    // evaluate board
    boardAfterMove = evaluateBoard(boardAfterMove, turnIndexBeforeMove);
  }

  const setnumAfter = getboardNum(boardAfterMove, turnIndexBeforeMove);

  if (setnumAfter <= setnumBefore && passes === passesAfterMove) throw Error('you can not suicide.');

  if (deepEquals(board, boardAfterMove) && passes === passesAfterMove)
    throw Error('don’t allow a move that brings the game back to stateBeforeMove.');

  const posJustCapturedForKo = getPosJustCapturedForKo(board, boardAfterMove, turnIndexBeforeMove);

  let endMatchScores: number[] | null = null;
  let turnIndexAfterMove = 1 - turnIndexBeforeMove;
  if (isBoardFull(boardAfterMove)) {
    endMatchScores = [-1, -1];
    turnIndexAfterMove = -1;
  }

  let riddleWon = false;
  if (riddleData) {
    if (riddleWin)
      if (riddleWin[0] == delta.row && riddleWin[1] == delta.col) {
        riddleWon = true;
        turnIndexAfterMove = -1;
        endMatchScores = [1, 0];
      }
  }

  return {
    endMatchScores: endMatchScores,
    turnIndex: turnIndexAfterMove,
    state: {
      board: boardAfterMove,
      boardBeforeMove: board,
      delta: delta,
      passes: passesAfterMove,
      posJustCapturedForKo: posJustCapturedForKo,
      deadBoard: deadBoard,
      riddleWon: riddleWon,
    },
  };
}

export function createEndMove(state: IState, endMatchScores: number[]): IMove<IState> {
  return {
    endMatchScores: endMatchScores,
    turnIndex: -1,
    state: state,
  };
}

export function getInitialState(): IState {
  return {
    board: createNewBoard(9),
    boardBeforeMove: createNewBoard(9),
    delta: {row: 0, col: 0},
    passes: 0,
    deadBoard: null,
    posJustCapturedForKo: null,
  };
}
