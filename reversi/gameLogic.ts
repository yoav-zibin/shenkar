import {IMove, EndMatchScores, deepClone, deepEquals} from '../common/common';

export interface IState {
  board?: Board;
  delta?: BoardDelta;
}

// declare type IMove = IOperation[];
/* interface IState {
  [index: string]: any;
}*/
export interface IIsMoveOk {
  move?: IMove<IState>;
  // TODO check
  turnIndexBeforeMove?: number;
  turnIndexAfterMove?: number;
  // TODO check
  stateBeforeMove?: IState;
  stateAfterMove?: IState;
  numberOfPlayers?: number;
  comment?: {
    en: string;
  };
}

export declare type Board = string[][];
// declare var board: Board;
export interface BoardDelta {
  row: number;
  col: number;
}

export interface ICoordinates {
  board: Board;
  row: number;
  col: number;
}

export interface IResult {
  count?: number;
  tempBoard?: Board;
  status?: boolean;
  winner?: string;
}

export interface IRowColComment {
  row: number;
  col: number;
  comment: string;
}

export interface IXY {
  x: string;
  y: string;
}

export interface ISetVisibility {
  key: string;
  visibleToPlayerIndexes?: number[];
}

export interface ISetRandomInteger {
  key: string;
  from: number;
  to: number;
}

export interface IDelete {
  key: string;
}

export interface IShuffle {
  keys: string[];
}

export interface ISetTurn {
  turnIndex: number;
}

export interface IEndMatch {
  endMatchScores: number[];
}

const maxRow = 7;
const maxCol = 7;

/**
 * check if a square is empty
 * @param coordinates
 * @returns {boolean}
 */
function isEmptySquare(coordinates: ICoordinates): boolean {
  if (coordinates.board[coordinates.row][coordinates.col] === '') {
    return true;
  }
  return false;
}

/**
 * desired Adj Piece
 * @param board
 * @param row
 * @param col
 * @param directions
 * @param colourOpponentPiece
 * @returns {boolean}
 */
function desiredAdjPiece(
  board: Board,
  row: number,
  col: number,
  directions: string[],
  colourOpponentPiece: string
): boolean {
  if (row > 0) {
    if (board[row - 1][col] === colourOpponentPiece) {
      directions.push('V1');
    }
  }

  if (row < 7) {
    if (board[row + 1][col] === colourOpponentPiece) {
      directions.push('V2');
    }
  }

  if (col > 0) {
    if (board[row][col - 1] === colourOpponentPiece) {
      directions.push('H1');
    }
  }

  if (col < 7) {
    if (board[row][col + 1] === colourOpponentPiece) {
      directions.push('H2');
    }
  }

  if (row > 0 && col > 0) {
    if (board[row - 1][col - 1] === colourOpponentPiece) {
      directions.push('D1');
    }
  }

  if (row > 0 && col < 7) {
    if (board[row - 1][col + 1] === colourOpponentPiece) {
      directions.push('D2');
    }
  }

  if (row < 7 && col < 7) {
    if (board[row + 1][col + 1] === colourOpponentPiece) {
      directions.push('D3');
    }
  }

  if (row < 7 && col > 0) {
    if (board[row + 1][col - 1] === colourOpponentPiece) {
      directions.push('D4');
    }
  }

  if (directions.length) {
    return true;
  }
  return false;
}

/**
 * sandwich
 * @param board
 * @param row
 * @param col
 * @param directions
 * @param colourPlayerPiece
 * @param colourOpponentPiece
 * @returns {*}
 */
function sandwich(
  board: Board,
  row: number,
  col: number,
  directions: string[],
  colourPlayerPiece: string,
  colourOpponentPiece: string
): IResult {
  let ct = 0;
  const tempBoard: Board = deepClone(board);
  for (let i = 0; i < directions.length; i++) {
    switch (directions[i]) {
      case 'V1': {
        let loc = -1;
        let flag = 1;

        for (let k = row - 1; k >= 0; k--) {
          if (board[k][col] === colourPlayerPiece) {
            loc = k;
            break;
          }
        }

        if (loc === -1) {
          break;
        }

        for (let k = row - 1; k > loc; k--) {
          if (board[k][col] !== colourOpponentPiece) {
            flag = 0;
            break;
          }
        }
        if (flag) {
          for (let k = row - 1; k > loc; k--) {
            tempBoard[k][col] = colourPlayerPiece;
          }
          tempBoard[row][col] = colourPlayerPiece;
          ct++;
        }

        break;
      }

      case 'V2': {
        let loc = -1;
        let flag = 1;

        for (let k = row + 1; k <= maxRow; k++) {
          if (board[k][col] === colourPlayerPiece) {
            loc = k;
            break;
          }
        }

        if (loc === -1) {
          break;
        }

        for (let k = row + 1; k < loc; k++) {
          if (board[k][col] !== colourOpponentPiece) {
            flag = 0;
            break;
          }
        }
        if (flag) {
          for (let k = row + 1; k < loc; k++) {
            tempBoard[k][col] = colourPlayerPiece;
          }
          tempBoard[row][col] = colourPlayerPiece;
          ct++;
        }

        break;
      }

      case 'H1': {
        let loc = -1;
        let flag = 1;

        for (let k = col - 1; k >= 0; k--) {
          if (board[row][k] === colourPlayerPiece) {
            loc = k;
            break;
          }
        }

        if (loc === -1) {
          break;
        }

        for (let k = col - 1; k > loc; k--) {
          if (board[row][k] !== colourOpponentPiece) {
            flag = 0;
            break;
          }
        }
        if (flag) {
          for (let k = col - 1; k > loc; k--) {
            tempBoard[row][k] = colourPlayerPiece;
          }
          tempBoard[row][col] = colourPlayerPiece;
          ct++;
        }

        break;
      }

      case 'H2': {
        let loc = -1;
        let flag = 1;

        for (let k = col + 1; k <= maxCol; k++) {
          if (board[row][k] === colourPlayerPiece) {
            loc = k;
            break;
          }
        }
        if (loc === -1) {
          break;
        }
        for (let k = col + 1; k < loc; k++) {
          if (board[row][k] !== colourOpponentPiece) {
            flag = 0;
            break;
          }
        }
        if (flag) {
          for (let k = col + 1; k < loc; k++) {
            tempBoard[row][k] = colourPlayerPiece;
          }
          tempBoard[row][col] = colourPlayerPiece;
          ct++;
        }
        break;
      }

      case 'D1': {
        let locRow = -1;
        let locCol = -1;
        let flag = 1;

        for (let k = row - 1, l = col - 1; k >= 0 && l >= 0; k--, l--) {
          if (board[k][l] === colourPlayerPiece) {
            locRow = k;
            locCol = l;
            break;
          }
        }

        if (locRow === -1) {
          break;
        }

        for (let k = row - 1, l = col - 1; k > locRow && l > locCol; k--, l--) {
          if (board[k][l] !== colourOpponentPiece) {
            flag = 0;
            break;
          }
        }
        if (flag) {
          for (let k = row - 1, l = col - 1; k > locRow && l > locCol; k--, l--) {
            tempBoard[k][l] = colourPlayerPiece;
          }
          tempBoard[row][col] = colourPlayerPiece;
          ct++;
        }
        break;
      }

      case 'D2': {
        let locRow = -1;
        let locCol = -1;
        let flag = 1;

        for (let k = row - 1, l = col + 1; k >= 0 && l <= maxCol; k--, l++) {
          if (board[k][l] === colourPlayerPiece) {
            locRow = k;
            locCol = l;
            break;
          }
        }

        if (locRow === -1) {
          break;
        }

        for (let k = row - 1, l = col + 1; k > locRow && l < locCol; k--, l++) {
          if (board[k][l] !== colourOpponentPiece) {
            flag = 0;
            break;
          }
        }
        if (flag) {
          for (let k = row - 1, l = col + 1; k > locRow && l < locCol; k--, l++) {
            tempBoard[k][l] = colourPlayerPiece;
          }
          tempBoard[row][col] = colourPlayerPiece;
          ct++;
        }

        break;
      }

      case 'D3': {
        let locRow = -1;
        let locCol = -1;
        let flag = 1;

        for (let k = row + 1, l = col + 1; k <= maxRow && l <= maxCol; k++, l++) {
          if (board[k][l] === colourPlayerPiece) {
            locRow = k;
            locCol = l;
            break;
          }
        }

        if (locRow === -1) {
          break;
        }

        for (let k = row + 1, l = col + 1; k < locRow && l < locCol; k++, l++) {
          if (board[k][l] !== colourOpponentPiece) {
            flag = 0;
            break;
          }
        }
        if (flag) {
          for (let k = row + 1, l = col + 1; k < locRow && l < locCol; k++, l++) {
            tempBoard[k][l] = colourPlayerPiece;
          }
          tempBoard[row][col] = colourPlayerPiece;
          ct++;
        }

        break;
      }

      case 'D4': {
        let locRow = -1;
        let locCol = -1;
        let flag = 1;

        for (let k = row + 1, l = col - 1; k <= maxRow && l >= 0; k++, l--) {
          if (board[k][l] === colourPlayerPiece) {
            locRow = k;
            locCol = l;
            break;
          }
        }

        if (locRow === -1) {
          break;
        }
        for (let k = row + 1, l = col - 1; k < locRow && l > locCol; k++, l--) {
          if (board[k][l] !== colourOpponentPiece) {
            flag = 0;
            break;
          }
        }
        if (flag) {
          for (let k = row + 1, l = col - 1; k < locRow && l > locCol; k++, l--) {
            tempBoard[k][l] = colourPlayerPiece;
          }
          tempBoard[row][col] = colourPlayerPiece;
          ct++;
        }

        break;
      }
    }
  }

  if (ct) {
    return {count: ct, tempBoard: tempBoard, status: true};
  }

  return {count: ct, status: false};
}

/**
 * createMove
 * @param board
 * @param row
 * @param col
 * @param turnIndexBeforeMove
 * @returns {*[]}
 */
export function createMove(
  board: Board | undefined,
  row: number,
  col: number,
  turnIndexBeforeMove: number | undefined
): IMove<IState> {
  // TODO check turnIndexBeforeMove: any
  if (board === undefined) {
    board = [
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', 'W', 'B', '', '', ''],
      ['', '', '', 'B', 'W', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', ''],
    ];
  }
  if (!isEmptySquare({board: board, row: row, col: col})) {
    throw new Error('One can only make a move in an empty position!');
  }
  const colourOpponentPiece: string = turnIndexBeforeMove === 0 ? 'W' : 'B';
  const directions: string[] = [];
  if (!desiredAdjPiece(board, row, col, directions, colourOpponentPiece)) {
    throw new Error("One can only make a move next to the opponent's piece!");
  }
  const colourPlayerPiece: string = turnIndexBeforeMove === 0 ? 'B' : 'W';
  const result = sandwich(board, row, col, directions, colourPlayerPiece, colourOpponentPiece);
  if (!result.status || !result.tempBoard) {
    throw new Error("One must sandwich opponent's pieces on every move!");
  }

  if (turnIndexBeforeMove === undefined) {
    throw new Error('CreateMove func should receive a value for turnIndexBeforeMove');
  }

  const boardAfterMove: Board = deepClone(board);
  boardAfterMove[row][col] = turnIndexBeforeMove === 0 ? 'B' : 'W';
  const end = gameOver(result.tempBoard);
  let endMatchScores: EndMatchScores = null;
  let turnIndex = -1;
  if (end.status) {
    endMatchScores = end.winner === 'B' ? [1, 0] : end.winner === 'W' ? [0, 1] : [0, 0];
  } else {
    const toBeOpponent: string = turnIndexBeforeMove == 0 ? 'W' : 'B';
    const currentPlayer: string = turnIndexBeforeMove == 0 ? 'B' : 'W';
    const turn = hasValidMoves(toBeOpponent, currentPlayer, result.tempBoard);
    if (turn) {
      turnIndex = 1 - turnIndexBeforeMove;
    } else {
      turnIndex = turnIndexBeforeMove;
    }
    // var nextToBeOpponent: string = turnIndexBeforeMove == 0 ? 0 : 1; // 0
    // var nextCurrentPlayer: string = turnIndexBeforeMove == 0 ? 1 : 0; // 1
    // var turn = hasValidMoves(nextCurrentPlayer, nextToBeOpponent, result.tempBoard);
    // if (turn) {
    //     turnIndex = 1 - turnIndexBeforeMove; // 1
    // }
    // else {
    //     turnIndex = turnIndexBeforeMove; // 0
    // }
  }

  return {
    turnIndex,
    endMatchScores,
    state: {
      board: result.tempBoard,
      delta: {
        row: row,
        col: col,
      },
    },
  };
}

/**
 * has Valid Moves
 * @param colourPlayerPiece
 * @param colourOpponentPiece
 * @param board
 * @returns {boolean}
 */
function hasValidMoves(colourPlayerPiece: string, colourOpponentPiece: string, board: Board): boolean {
  let flag = 0;
  for (let i = 0; i <= maxRow; i++) {
    for (let j = 0; j <= maxCol; j++) {
      if (!isEmptySquare({board: board, row: i, col: j})) {
        continue;
      }
      const directions: string[] = [];
      if (!desiredAdjPiece(board, i, j, directions, colourOpponentPiece)) {
        continue;
      }
      const result = sandwich(board, i, j, directions, colourPlayerPiece, colourOpponentPiece);
      if (!result.status) {
        continue;
      }
      if (result.count) {
        flag = 1;
        break;
      }
    }

    if (flag) {
      break;
    }
  }
  if (flag) {
    return true;
  }
  return false;
}

/**
 * check if the game is over
 * @param board
 * @returns {*}
 */
function gameOver(board: Board): IResult {
  let emptyCells = 0;
  let result: string;
  for (let i = 0; i <= maxRow; i++) {
    for (let j = 0; j <= maxCol; j++) {
      if (board[i][j] === '') {
        emptyCells++;
      }
    }
  }
  if (!emptyCells) {
    result = getWinner(board);
    return {winner: result, status: true};
  } else if (!hasValidMoves('W', 'B', board) && !hasValidMoves('B', 'W', board)) {
    result = getWinner(board);
    return {winner: result, status: true};
  }
  return {status: false};
}

/**
 * get Winner
 * @param board
 * @returns {*}
 */
function getWinner(board: Board): string {
  let wCount = 0;
  let bCount = 0;
  for (let i = 0; i <= maxRow; i++) {
    for (let j = 0; j <= maxCol; j++) {
      if (board[i][j] === 'W') {
        wCount++;
      } else if (board[i][j] === 'B') {
        bCount++;
      }
    }
  }
  if (wCount > bCount) {
    return 'W';
  } else if (bCount > wCount) {
    return 'B';
  }
  return 'T';
}

/**
 * check if a move is ok, find hacks
 * @param params
 * @returns {boolean}
 */
export function isMoveOk(params: IIsMoveOk): boolean {
  const turnIndexBeforeMove = params.turnIndexBeforeMove;
  const stateBeforeMove = params.stateBeforeMove;
  // TODO check
  if (!stateBeforeMove) return false;

  const board = stateBeforeMove.board;

  const move = params.move;
  // TODO check
  if (!move || !move.state || !move.state.delta) return false;

  try {
    const row = move.state.delta.row;
    const col = move.state.delta.col;
    const expectedMove = createMove(board, row, col, turnIndexBeforeMove);
    // return expectedMove;
    if (!deepEquals(move, expectedMove)) {
      return false;
    }
  } catch (e) {
    return false;
  }
  return true;
}

/**
 * exampleMoves
 * @param initTurnIndex
 * @param initState
 * @param arrayOfRowColComment
 * @returns {Array}
 */
function exampleMoves(initTurnIndex: number, initState: IState, arrayOfRowColComment: IRowColComment[]): IIsMoveOk {
  let state: IState = initState;
  let temp: IMove<IState>;
  let store: IIsMoveOk = {};
  let turnIndex: number | null = initTurnIndex;

  for (let i = 0; i < arrayOfRowColComment.length; i++) {
    const rowColComment = arrayOfRowColComment[i];

    temp = createMove(state.board, rowColComment.row, rowColComment.col, turnIndex);

    const stateAfterMove = {
      board: temp.state.board,
      delta: temp.state.delta,
    };

    store = {
      stateBeforeMove: state,
      stateAfterMove: stateAfterMove,
      turnIndexBeforeMove: turnIndex,
      // TODO check
      turnIndexAfterMove: temp.turnIndex,
      comment: {en: rowColComment.comment},
      move: temp,
    };

    turnIndex = temp.turnIndex;
    state = stateAfterMove;
  }
  return store;
}

/**
 * example Game
 * @returns {Array}
 */
export function exampleGame(): IIsMoveOk {
  return exampleMoves(
    0,
    {
      board: [
        ['', '', 'B', 'W', 'W', 'W', '', ''],
        ['', '', 'B', 'B', 'W', 'W', '', ''],
        ['W', 'W', 'B', 'W', 'W', 'W', 'B', 'B'],
        ['W', 'B', 'W', 'W', 'B', 'W', 'B', 'B'],
        ['W', 'W', 'B', 'W', 'B', 'B', 'B', 'B'],
        ['W', 'W', 'W', 'B', 'W', 'B', 'W', 'W'],
        ['', '', 'W', 'W', 'B', 'B', '', ''],
        ['', '', 'W', 'B', 'B', 'B', '', ''],
      ],
      delta: {row: 2, col: 0},
    },
    [
      {row: 0, col: 6, comment: 'Black plays on square (0,6)'},
      {row: 0, col: 1, comment: 'White plays on square (0,1)'},
      {row: 7, col: 1, comment: 'Black plays row 7, col 1'},
      {row: 6, col: 6, comment: 'Uh oh, white plays in x-Square'},
      {row: 7, col: 7, comment: 'Black captures bottom-left corner!'},
      {row: 6, col: 7, comment: 'White plays (6,7)'},
    ]
  );
}

/**
 * riddles
 * @returns {*[]}
 */
export function riddles() {
  return [
    exampleMoves(
      1,
      {
        board: [
          ['', '', 'B', 'W', 'W', 'W', 'B', ''],
          ['', 'B', 'B', 'B', 'W', 'W', 'W', ''],
          ['W', 'W', 'B', 'W', 'W', 'W', 'B', 'B'],
          ['W', 'B', 'W', 'W', 'B', 'W', 'B', 'B'],
          ['W', 'W', 'B', 'W', 'B', 'B', 'B', 'B'],
          ['W', 'W', 'W', 'B', 'W', 'B', 'W', 'W'],
          ['', '', 'W', 'W', 'B', 'B', '', ''],
          ['', '', 'W', 'B', 'B', 'B', '', ''],
        ],
        delta: {row: 2, col: 0},
      },
      [
        {row: 0, col: 0, comment: 'Where should White play to get an advantage on his next turn?'},
        {row: 6, col: 6, comment: 'Black plays row 6, col 6'},
        {row: 7, col: 7, comment: 'White captures diagonal!'},
      ]
    ),
    exampleMoves(
      0,
      {
        board: [
          ['', 'B', 'B', 'B', 'B', 'B', 'B', ''],
          ['', '', 'B', 'B', 'W', 'W', '', ''],
          ['W', 'W', 'B', 'W', 'W', 'W', 'B', 'B'],
          ['W', 'B', 'W', 'W', 'B', 'W', 'B', 'B'],
          ['W', 'W', 'B', 'W', 'B', 'B', 'B', 'B'],
          ['W', 'W', 'W', 'B', 'W', 'B', 'W', 'W'],
          ['', '', 'W', 'W', 'B', 'B', '', ''],
          ['', '', 'B', 'B', 'B', 'B', 'B', ''],
        ],
        delta: {row: 3, col: 0},
      },
      [
        {row: 7, col: 1, comment: 'Where should Black play to not give White an advantage on his next turn?'},
        {row: 1, col: 7, comment: 'White in (1,7)'},
      ]
    ),
  ];
}

/**
 * create Computer Move
 * @param board
 * @param turnIndexBeforeMove
 * @returns {*}
 */
export function createComputerMove(board: Board, turnIndexBeforeMove: number): IMove<IState> {
  const possibleMoves: IMove<IState>[] = [];
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      try {
        possibleMoves.push(createMove(board, i, j, turnIndexBeforeMove));
      } catch (e) {
        // invalid move, don't add it to the array.
      }
    }
  }
  const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
  return randomMove;
}

// angular.module('myApp', [ 'ngTouch', 'ui.bootstrap','gameServices'])
//   .factory('gameLogic', function() {
//   return {
//     createMove: gameLogic.createMove,
//     isMoveOk: gameLogic.isMoveOk,
//     exampleGame: gameLogic.exampleGame,
//     riddles: gameLogic.riddles,
//     createComputerMove: gameLogic.createComputerMove   };
// });
