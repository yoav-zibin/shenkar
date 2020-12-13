import {deepClone, IMove} from '../common/common';

export enum lineDirection {
  HORIZONTAL,
  VERTICAL,
}
export enum player {
  ONE,
  TWO,
}

export const cellColor = {
  NONE: 'transparent',
  PLAYER_1: '#3B5998',
  PLAYER_2: '#DD6B4D',
};

export interface Board {
  isGameOver: boolean;
  turn: player;
  horizontalLines: boolean[][];
  verticalLines: boolean[][];
  color: string[][]; // color/occupier of each cell/box
  cellPaintedLines: number[][]; // sum of all filled edges for each cell
  paintedLinesAmount: number;
  score: {
    PLAYER_1: number;
    PLAYER_2: number;
  };
  // 3 reflects board of 3x3 board (9 dots in total), 4 reflects board of 4x4 board (16 dots in total), etc.
  size: number;
}

interface BoardDelta {
  direction: lineDirection;
  row: number;
  col: number;
}

export interface IState {
  board: Board;
  delta?: BoardDelta | null;
  riddleData?: RiddleData;
}

export type RiddleData =
  | 'h11'
  | 'h12'
  | 'h13'
  | 'h21'
  | 'h22'
  | 'h23'
  | 'h31'
  | 'h32'
  | 'h33'
  | 'h41'
  | 'h42'
  | 'h43'
  | 'v11'
  | 'v12'
  | 'v13'
  | 'v14'
  | 'v21'
  | 'v22'
  | 'v23'
  | 'v24'
  | 'v31'
  | 'v32'
  | 'v33'
  | 'v34';

function isPosOnHintRow(direction: lineDirection, row: number, hint: RiddleData) {
  switch (hint) {
    case 'h11':
      return direction === lineDirection.HORIZONTAL && row === 0;
  }
}

function isPosOnHintCol(direction: lineDirection, col: number, hint: RiddleData) {
  switch (hint) {
    case 'v11':
      return direction === lineDirection.HORIZONTAL && col === 0;
  }
}

export function checkRiddleData(state: IState, turnIndex: number, firstMoveSolutions: IMove<IState>[]): boolean {
  const {riddleData} = state;
  return !riddleData
    ? false
    : firstMoveSolutions.some(
        (firstMove) =>
          firstMove.state.delta &&
          isPosOnHintRow(firstMove.state.delta.direction, firstMove.state.delta.row, riddleData) &&
          isPosOnHintCol(firstMove.state.delta.direction, firstMove.state.delta.col, riddleData)
      );
}

/** Returns the initial Dots_and_Boxes board */
function createMetrix<T>(rowsize: number, colsize: number, initialFill: T): T[][] {
  const arr = [];
  for (let i = 0; i < rowsize; i++) {
    const temp = [];
    for (let j = 0; j < colsize; j++) {
      temp.push(initialFill);
    }
    arr.push(temp);
  }
  return arr;
}

export function getInitialBoard(boardSize = 3): Board {
  const board = <Board>{};
  board.size = boardSize;
  board.isGameOver = false;
  board.turn = player.ONE;
  board.score = {
    PLAYER_1: 0,
    PLAYER_2: 0,
  };
  board.horizontalLines = createMetrix(board.size + 1, board.size, false);
  board.verticalLines = createMetrix(board.size, board.size + 1, false);
  board.color = createMetrix(board.size, board.size, cellColor.NONE);
  board.cellPaintedLines = createMetrix(board.size, board.size, 0);
  board.paintedLinesAmount = 0;
  return board;
}

export function getInitialState(): IState {
  return {board: getInitialBoard(), delta: null};
}

//  helper function for debugging
export function printBoard(board: Board): void {
  if (!board) {
    console.log('board is undefined');
  } else {
    const {
      isGameOver,
      turn,
      score,
      paintedLinesAmount,
      horizontalLines,
      verticalLines,
      size,
      cellPaintedLines,
      color,
    } = board;
    const linesToEnd = (size ** 2 + size) * 2;
    console.log(`isGameOver=${isGameOver}`);
    console.log(`turn=${turn}`);
    console.log(`score1=${score.PLAYER_1}`);
    console.log(`score2=${score.PLAYER_2}`);
    console.log(`paintedLines: ${paintedLinesAmount}/${linesToEnd}`);
    printBoardItem(horizontalLines, size + 1, size);
    printBoardItem(verticalLines, size, size + 1);
    printBoardItem(cellPaintedLines, size, size);
    printBoardItem(color, size, size);
  }
}

export function printBoardItem<T>(item: T[][], rowSize: number, colSize: number) {
  if (item) {
    let output = '';
    output += 'color: [';
    for (let i = 0; i < rowSize; ++i) {
      output += '[';
      for (let j = 0; j < colSize; ++j) {
        output += item[i][j] + ', ';
      }
      output += ']';
    }
    output += ']';
    console.log(output);
  }
}

export function printDelta(delta: BoardDelta) {
  let deltaOutput = '';
  deltaOutput = delta.direction + ':' + delta.row + 'x' + delta.col;
  console.log(deltaOutput);
}

export function updateBoard(board: Board, direction: lineDirection, row: number, col: number): Board {
  const updatedBoard: Board = deepClone(board);
  let switchTurn = true;

  if (direction === lineDirection.HORIZONTAL) {
    updatedBoard.horizontalLines[row][col] = true;
    if (row > 0) {
      if (handleLinePaint(updatedBoard, row - 1, col) === false) {
        switchTurn = false;
      }
    }
    if (row < updatedBoard.size) {
      if (handleLinePaint(updatedBoard, row, col) === false) {
        switchTurn = false;
      }
    }
  } else {
    updatedBoard.verticalLines[row][col] = true;
    if (col > 0) {
      if (handleLinePaint(updatedBoard, row, col - 1) === false) {
        switchTurn = false;
      }
    }
    if (col < updatedBoard.size) {
      if (handleLinePaint(updatedBoard, row, col) === false) {
        switchTurn = false;
      }
    }
  }
  updatedBoard.turn = switchTurn ? 1 - updatedBoard.turn : updatedBoard.turn;
  updatedBoard.paintedLinesAmount++;
  const linesToEnd = (board.size + 1) ** 2 + 2 * (board.size + 1);
  if (updatedBoard.paintedLinesAmount === linesToEnd) {
    updatedBoard.isGameOver = true;
    updatedBoard.turn = -1;
  }

  return updatedBoard;
}

export function handleLinePaint(updatedBoard: Board, row: number, col: number): boolean {
  let switchTurn = true;
  if (updatedBoard.cellPaintedLines[row][col] === 3) {
    updatedBoard.color[row][col] = player.ONE ? cellColor.PLAYER_1 : cellColor.PLAYER_2;
    updatedBoard.turn === player.ONE ? updatedBoard.score.PLAYER_1++ : updatedBoard.score.PLAYER_2++;
    switchTurn = false;
  }
  updatedBoard.cellPaintedLines[row][col] += 1;
  return switchTurn;
}

export function positionIsntFree(board: Board, direction: lineDirection, row: number, col: number): boolean {
  const conditionOne = direction === lineDirection.HORIZONTAL && board.horizontalLines[row][col] === true;
  const conditionTwo = direction === lineDirection.VERTICAL && board.verticalLines[row][col] === true;
  return conditionOne || conditionTwo;
}

export function moveIsIllegal(boardSize: number, direction: lineDirection, row: number, col: number): boolean {
  const verticallyIllegal =
    direction === lineDirection.VERTICAL && (row < 0 || row >= boardSize || (col < 0 && col > boardSize));
  const horizontallyIllegal =
    direction === lineDirection.HORIZONTAL && (row < 0 || row > boardSize || col < 0 || col >= boardSize);
  return verticallyIllegal || horizontallyIllegal;
}

export function createMove(board: Board, direction: lineDirection, row: number, col: number): IMove<IState> {
  if (!board) {
    board = getInitialBoard();
  }
  if (moveIsIllegal(board.size, direction, row, col)) {
    throw new Error('Move is illegal. Either row or column are out of bounds.');
  }
  if (positionIsntFree(board, direction, row, col)) {
    throw new Error('One can only make a move in an empty position!');
  }
  if (board.isGameOver) {
    throw new Error('Can only make a move if the game is not over!');
  }

  const updatedBoard: Board = updateBoard(board, direction, row, col);

  const endMatchScores = updatedBoard.isGameOver ? [updatedBoard.score.PLAYER_1, updatedBoard.score.PLAYER_2] : null;

  const delta: BoardDelta = {direction, row, col};
  console.log('endMatchScores', endMatchScores);
  return {
    endMatchScores,
    turnIndex: updatedBoard.turn,
    state: {
      board: updatedBoard,
      delta,
    },
  };
}
