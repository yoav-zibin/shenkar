import {IMove, deepClone, deepEquals} from '../common/common';

export type Board = string[][]; // 'B' is black, 'W' is white, '' is empty
export interface BoardDelta {
  row: number;
  col: number;
}
export type RiddleData = 'r1' | 'r2' | 'r3' | 'r4' | 'r5';
export enum Difficulty {
  NOVICE = 3,
  MEDIUM = 4,
  EXPERT = 5,
}

export interface IState {
  board: Board;
  boardBeforeMove: Board;
  delta: BoardDelta | null; // [-1,-1] means a pass.
  passes: number;
  deadBoard: boolean[][] | null;
  difficulty: Difficulty;
  riddleData?: RiddleData;
  riddleWin?: number[];
  riddleWon?: boolean;
}

function isPosOnHintLine(row: number, col: number, hint: RiddleData) {
  switch (hint) {
    case 'r1':
      return row == 0;
    case 'r2':
      return row == 1;
    case 'r3':
      return row == 2;
    case 'r4':
      return row == 3;
    case 'r5':
      return row == 4;
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
export function createComputerMove(board: Board, passes: number, turnIndexBeforeMove: number) {
  const possibleMoves: IMove<IState>[] = [];
  const dim = board.length;
  for (let i = 0; i < dim; i++) {
    for (let j = 0; j < dim; j++) {
      const delta = {row: i, col: j};
      try {
        const testmove = createMove(board, passes, null, delta, turnIndexBeforeMove);
        possibleMoves.push(testmove);
      } catch (e) {
        // cell in that position was full
      }
    }
  }
  try {
    const delta = {row: -1, col: -1};
    const testmove = createMove(board, passes, null, delta, turnIndexBeforeMove);
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

export function createMove(
  board: Board,
  passes: number,
  deadBoard: boolean[][] | null,
  delta: BoardDelta,
  turnIndexBeforeMove: number,
  riddleWin?: number[],
  riddleData?: RiddleData
): IMove<IState> {
  if (!passes) passes = 0;

  const setnumBefore = getboardNum(board, turnIndexBeforeMove);

  const boardAfterMove = copyObject(board);
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
    // //////////////////////////
    // //////////////////////////
    // //////////////////////////
    // //////////////////////////
    // //////////////////////////
    // //////////////////////////

    boardAfterMove[row][col] = turnIndexBeforeMove === 0 ? 'B' : 'W';
    checkWinCondition(boardAfterMove, row, col, turnIndexBeforeMove === 0 ? 'B' : 'W');
    passesAfterMove = 0; // if a move is made, passes is reset
  }

  const setnumAfter = getboardNum(boardAfterMove, turnIndexBeforeMove);

  if (setnumAfter <= setnumBefore && passes === passesAfterMove) throw Error('you can not suicide.');

  if (deepEquals(board, boardAfterMove) && passes === passesAfterMove)
    throw Error('don’t allow a move that brings the game back to stateBeforeMove.');

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
      deadBoard: deadBoard,
      riddleWon: riddleWon,
      difficulty: Difficulty.NOVICE,
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
    difficulty: Difficulty.NOVICE,
  };
}

// #region  Win Check
function checkWinCondition(board: string[][], row: number, col: number, playerColor: string): boolean {
  if (
    checkRow(board, row, col, playerColor) ||
    checkColumn(board, row, col, playerColor) ||
    checkDiagonal(board, row, col, playerColor)
  ) {
    gameFinished(playerColor);
    return true;
  }
  // gameFinished("no one");
  return false;
  // if (checkDraw()) gameFinished("no one");
}

function checkRow(board: string[][], row: number, col: number, playerColor: string): boolean {
  const winnerCells = [];
  for (let i = col + 1; i < 9; i++) {
    if (board[row][i] === playerColor) {
      winnerCells.push({row: row, column: i});
    } else break;
  }
  if (winnerCells.length == 5) {
    return true;
  }

  for (let i = col - 1; i >= 0; i--) {
    if (board[row][i] === playerColor) {
      winnerCells.push({row: row, column: i});
    } else break;
  }
  if (winnerCells.length == 5) {
    return true;
  }

  return false;
}

function checkColumn(board: string[][], row: number, col: number, playerColor: string): boolean {
  const winnerCells = [];
  for (let i = row + 1; i < 9; i++) {
    if (board[i][col] === playerColor) {
      winnerCells.push({row: i, column: col});
    } else break;
  }
  if (winnerCells.length == 5) return true;

  for (let i = row - 1; i >= 0; i--) {
    if (board[i][col] === playerColor) {
      winnerCells.push({row: i, column: col});
    } else break;
  }
  if (winnerCells.length == 5) return true;

  return false;
}

function checkDiagonal(board: string[][], row: number, col: number, playerColor: string): boolean {
  // DIAG \
  let winnerCells = [];
  for (let i = 1; i < 9; i++) {
    if (row + i >= 9 || col + i >= 9) {
      break;
    }
    if (board[row + i][col + i] === playerColor) {
      winnerCells.push({row: row + i, column: col + i});
    } else break;
  }
  if (winnerCells.length == 5) return true;

  for (let i = 1; i < 9; i++) {
    if (row - i < 0 || col - i < 0) {
      break;
    }

    if (board[row - i][col - i] === playerColor) {
      winnerCells.push({row: row - i, column: col - i});
    } else break;
  }
  if (winnerCells.length == 5) return true;

  //  OTHER DIAG /
  winnerCells = [];
  for (let i = 1; i < 9; i++) {
    if (row - i < 0 || col + i > 9) {
      break;
    }

    if (board[row - i][col + i] === playerColor) {
      winnerCells.push({row: row - i, column: col + i});
    } else break;
  }

  if (winnerCells.length == 5) {
    return true;
  }

  for (let i = 1; i < 9; i++) {
    if (row + i >= 9 || col - i < 0) {
      break;
    }

    if (board[row + i][col - i] === playerColor) {
      winnerCells.push({row: row + i, column: col - i});
    } else break;
  }

  if (winnerCells.length == 5) {
    return true;
  }

  return false;
}

function gameFinished(playerColor: string): boolean {
  alert(playerColor + ' won');
  return true;
}

// Check the board for a win

// function checkHorizontal(board: {[x: string]: unknown[]}, row: string | number, col: number, color: unknown) {
//   const sameColors = [[row, col]];
//   let i;
//   for (i = 1; i < 9; i++) {
//     if (col + i < 9 && board[row][col + i] === color) {
//       sameColors[sameColors.length] = [row, col + i];
//     } else {
//       break;
//     }
//   }
//   for (i = 1; i < 9; i++) {
//     if (col - i >= 0 && board[row][col - i] === color) {
//       sameColors[sameColors.length] = [row, col - i];
//     } else {
//       break;
//     }
//   }
//   return sameColors;
// }
// function checkBackSlash(board: unknown[][], row: number, col: number, color: unknown) {
//   const sameColors = [[row, col]];
//   let i;
//   for (i = 1; i < 9; i++) {
//     if (col + i < 9 && row + i < 9 && board[row + i][col + i] === color) {
//       sameColors[sameColors.length] = [row + i, col + i];
//     } else {
//       break;
//     }
//   }
//   for (i = 1; i < 9; i++) {
//     if (col - i >= 0 && row - i >= 0 && board[row - i][col - i] === color) {
//       sameColors[sameColors.length] = [row - i, col - i];
//     } else {
//       break;
//     }
//   }
//   return sameColors;
// }
// function checkForwardSlash(board: {[x: string]: unknown}[], row: number, col: number, color: unknown) {
//   const sameColors = [[row, col]];
//   let i;
//   for (i = 1; i < 9; i++) {
//     if (col - i >= 0 && row + i < 9 && board[row + i][col - i] === color) {
//       sameColors[sameColors.length] = [row + i, col - i];
//     } else {
//       break;
//     }
//   }
//   for (i = 1; i < 9; i++) {
//     if (col + i < 9 && row - i >= 0 && board[row - i][col + i] === color) {
//       sameColors[sameColors.length] = [row - i, col + i];
//     } else {
//       break;
//     }
//   }
//   return sameColors;
// }
// function checkVertical(board: {[x: string]: unknown}[], row: number, col: string | number, color: unknown) {
//   const sameColors = [[row, col]];
//   let i;
//   for (i = 1; i < 9; i++) {
//     if (row + i < 9 && board[row + i][col] === color) {
//       sameColors[sameColors.length] = [row + i, col];
//     } else {
//       break;
//     }
//   }
//   for (i = 1; i < 9; i++) {
//     if (row - i >= 0 && board[row - i][col] === color) {
//       sameColors[sameColors.length] = [row - i, col];
//     } else {
//       break;
//     }
//   }
//   return sameColors;
// }

// /** Return the winner (either 'X' or 'O') or '' if there is no winner. */
// // function getWinner(winningSequence: string | any[]){
// // 	if(winningSequence.length > 0){
// // 		return winningSequence[0];
// // 	}
// // 	else{
// // 		return '';
// // 	}
// // }
// // This method check the four directions to see if any has a connecting sequence that has a length
// // exactly equal to five, if yes, return the winning color and sequence
// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// const getWinningSequence = (board: any, row: any, col: any, color: any) => {
//   // eslint-disable-next-line
//   // let winningSeuqnece: any[] = [];
//   if ((checkHorizontal(board, row, col, color)).length === 5) {
//     return true;
//   }
//   if ((checkVertical(board, row, col, color)).length === 5) {
//     return true;
//   }
//   if ((checkBackSlash(board, row, col, color)).length === 5) {
//     return true;
//   }
//   if ((checkForwardSlash(board, row, col, color)).length === 5) {
//     return true;
//   }
//   return false;
// };
// // /** Returns true if the game ended in a tie because there are no empty cells. */
// // // function isTie(board: string[][]) {
// // // let i;
// // // let j;
// // // for (i = 0; i < 10; i++) {
// // // for (j = 0; j < 10; j++) {
// // // if (board[i][j] === '') {
// // // // If there is an empty cell then we do not have a tie.
// // // return false;
// // // }
// // // }
// // // }
// // // // No empty cells --> tie!
// // // return true;
// // // }
