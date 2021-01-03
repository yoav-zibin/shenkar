// import {AiService, deepClone, IMove} from '../common/common';
// import {IState, createMove, getInitialState} from './gameLogic';

// export function getPossibleMoves(state: IState, turnIndex: number): IMove<IState>[] {
//   // if (state.riddleData) {
//   //   const solutions: IMove<IState>[] = [];

//   //   for (let i = 0; i < state.board.length; i++) {
//   //     for (let j = 0; j < state.board.length; j++) {
//   //       if (state.board[i][j] === '') solutions.push(
//   //         createMove(
//   //           state.board,
//   //           0,
//   //           null,
//   //           {col: j, row: i},
//   //           turnIndex,
//   //           state.riddleWin,
//   //           state.riddleData
//   //         )
//   //       );
//   //     }
//   //   }

//   //   return solutions;
//   // }

//   const moveList: IMove<IState>[] = [];
//   moveList.push(calcNextMove(state, turnIndex));
//   return moveList;
// }

// export const getStateScoreForIndex0 = (state: IState, turnIndex: number): number => {
//   let playerScore: number = getScore(state, false, turnIndex === 0);
//   const aiScore: number = getScore(state, true, turnIndex === 0);

//   if (playerScore === 0) playerScore = 1.0;

//   return aiScore / playerScore;
// };

// // #region min max algo
// const winScore = 100000000;

// export const calcNextMove = (state: IState, turnIndex: number): IMove<IState> => {
//   let move: number[] = new Array<number>(2);
//   let bestMove: number[] = searchWinningMove(state, turnIndex);
//   if (bestMove && bestMove.length > 0) {
//     move[0] = bestMove[0];
//     move[1] = bestMove[1];
//   } else {
//     bestMove = miniMaxSearchAB(state.difficulty, state, true, -1.0, winScore);
//     if (bestMove[1] == null) {
//       move = [];
//     } else {
//       move[0] = bestMove[1];
//       move[1] = bestMove[2];
//     }
//   }
//   return createMove(
//     state.board,
//     0,
//     null,
//     {col: move[0] !== undefined ? move[0] : -1, row: move[1] !== undefined ? move[1] : -1},
//     turnIndex,
//     state.riddleWin,
//     state.riddleData
//   );
// };

// export function genMoveList(state: IState, turnIndex: number): IMove<IState>[] {
//   // eslint-disable-next-line
//   const moveList: IMove<IState>[] = [];

//   const boardSize: number = state.board.length;
//   const cells = state.board;

//   for (let i = 0; i < state.board.length; i++) {
//     for (let j = 0; j < state.board.length; j++) {
//       if (cells[i][j] != '') continue;

//       if (i > 0) {
//         if (j > 0) {
//           if (cells[i - 1][j - 1] != '' || cells[i][j - 1] != '') {
//             const delta = {row: i, col: j};
//             moveList.push(createMove(state.board, 0, null, delta, turnIndex));
//             continue;
//           }
//         }
//         if (j < boardSize - 1) {
//           if (cells[i - 1][j + 1] != '' || cells[i][j + 1] != '') {
//             const delta = {row: i, col: j};
//             moveList.push(createMove(state.board, 0, null, delta, turnIndex, state.riddleWin, state.riddleData));
//             continue;
//           }
//         }
//         if (cells[i - 1][j] != '') {
//           const delta = {row: i, col: j};
//           moveList.push(createMove(state.board, 0, null, delta, turnIndex, state.riddleWin, state.riddleData));
//           continue;
//         }
//       }
//       if (i < boardSize - 1) {
//         if (j > 0) {
//           if (cells[i + 1][j - 1] != '' || cells[i][j - 1] != '') {
//             const delta = {row: i, col: j};
//             moveList.push(createMove(state.board, 0, null, delta, turnIndex, state.riddleWin, state.riddleData));
//             continue;
//           }
//         }
//         if (j < boardSize - 1) {
//           if (cells[i + 1][j + 1] != '' || cells[i][j + 1] != '') {
//             const delta = {row: i, col: j};
//             moveList.push(createMove(state.board, 0, null, delta, turnIndex, state.riddleWin, state.riddleData));
//             continue;
//           }
//         }
//         if (cells[i + 1][j] != '') {
//           const delta = {row: i, col: j};
//           moveList.push(createMove(state.board, 0, null, delta, turnIndex, state.riddleWin, state.riddleData));
//           continue;
//         }
//       }
//     }
//   }

//   return moveList;
// }

// const getScore = (state: IState, ai: boolean, playerTurn: boolean): number => {
//   const cells: string[][] = state.board;
//   return (
//     evaluateHorizontal(cells, ai, playerTurn) +
//     evaluateVertical(cells, ai, playerTurn) +
//     evaluateDiagonal(cells, ai, playerTurn)
//   );
// };

// // eslint-disable-next-line
// const miniMaxSearchAB = (depth: number, state: IState, max: boolean, alpha: number, beta: number): any[] => {
//   if (depth === 0) {
//     return [evaluateBoardForAI(state, !max), null, null];
//   }

//   const allPossibleMoves: IMove<IState>[] = genMoveList(state, max ? 0 : 1);

//   if (allPossibleMoves.length === 0) {
//     return [evaluateBoardForAI(state, !max), null, null];
//   }

//   // eslint-disable-next-line
//   let bestMove: any[] = new Array<any>(3);

//   if (max) {
//     bestMove[0] = -1.0;
//     for (const move of allPossibleMoves) {
//       const dummyBoard = deepClone(state);
//       if (move.state.delta) dummyBoard.board[move.state.delta?.row][move.state.delta?.col] = 'B';

//       // eslint-disable-next-line
//       const tempMove = miniMaxSearchAB(depth - 1, dummyBoard, !max, alpha, beta);

//       if (tempMove[0] > alpha) {
//         alpha = tempMove[0];
//       }
//       if (tempMove[0] >= beta) {
//         return tempMove;
//       }
//       if (tempMove[0] > bestMove[0]) {
//         bestMove = tempMove;
//         bestMove[1] = move.state.delta?.col;
//         bestMove[2] = move.state.delta?.row;
//       }
//     }
//   } else {
//     bestMove[0] = 100000000.0;
//     bestMove[1] = allPossibleMoves[0].state.delta?.col;
//     bestMove[2] = allPossibleMoves[0].state.delta?.row;
//     for (const move of allPossibleMoves) {
//       const dummyBoard = deepClone(state);
//       if (move.state.delta) dummyBoard.board[move.state.delta?.row][move.state.delta?.col] = 'W';

//       // eslint-disable-next-line
//       const tempMove = miniMaxSearchAB(depth - 1, dummyBoard, !max, alpha, beta);

//       if (tempMove[0] < beta) {
//         beta = tempMove[0];
//       }
//       if (tempMove[0] <= alpha) {
//         return tempMove;
//       }
//       if (tempMove[0] < bestMove[0]) {
//         bestMove = tempMove;
//         bestMove[1] = move.state.delta?.col;
//         bestMove[2] = move.state.delta?.row;
//       }
//     }
//   }
//   return bestMove;
// };

// // eslint-disable-next-line
// const searchWinningMove = (state: IState, turnIndex: number): any[] => {
//   const allPossibleMoves = genMoveList(state, turnIndex);

//   // eslint-disable-next-line
//   const winningMove: any[] = new Array<any>(2);

//   for (const move of allPossibleMoves) {
//     const dummyBoard = deepClone(state);
//     if (move.state.delta) dummyBoard.board[move.state.delta?.row][move.state.delta?.col] = 'B';

//     if (getScore(dummyBoard, false, false) >= winScore) {
//       winningMove[0] = move.state.delta?.col;
//       winningMove[1] = move.state.delta?.row;
//       return winningMove;
//     }
//   }
//   return [];
// };

// const evaluateBoardForAI = (state: IState, playersTurn: boolean): number => {
//   let playerScore: number = getScore(state, false, playersTurn);
//   const aiScore: number = getScore(state, true, playersTurn);

//   if (playerScore === 0) playerScore = 1.0;

//   return aiScore / playerScore;
// };

// const evaluateHorizontal = (cells: string[][], ai: boolean, isPlayersTurn: boolean): number => {
//   let consecutive = 0;
//   let blocks = 2;
//   let score = 0;

//   for (let i = 0; i < cells.length; i++) {
//     for (let j = 0; j < cells[0].length; j++) {
//       if (cells[i][j] === (!ai ? 'W' : 'B')) {
//         consecutive++;
//       } else if (cells[i][j] === '') {
//         if (consecutive > 0) {
//           blocks--;
//           score += getConsecutiveSetScore(consecutive, blocks, !ai === isPlayersTurn);
//           consecutive = 0;
//           blocks = 1;
//         } else {
//           blocks = 1;
//         }
//       } else if (consecutive > 0) {
//         score += getConsecutiveSetScore(consecutive, blocks, !ai === isPlayersTurn);
//         consecutive = 0;
//         blocks = 2;
//       } else {
//         blocks = 2;
//       }
//     }
//     if (consecutive > 0) {
//       score += getConsecutiveSetScore(consecutive, blocks, !ai === isPlayersTurn);
//     }
//     consecutive = 0;
//     blocks = 2;
//   }
//   return score;
// };

// const evaluateVertical = (cells: string[][], ai: boolean, isPlayersTurn: boolean): number => {
//   let consecutive = 0;
//   let blocks = 2;
//   let score = 0;

//   for (let j = 0; j < cells[0].length; j++) {
//     // tslint:disable-next-line: prefer-for-of
//     for (let i = 0; i < cells.length; i++) {
//       if (cells[i][j] === (!ai ? 'W' : 'B')) {
//         consecutive++;
//       } else if (cells[i][j] === '') {
//         if (consecutive > 0) {
//           blocks--;
//           score += getConsecutiveSetScore(consecutive, blocks, !ai === isPlayersTurn);
//           consecutive = 0;
//           blocks = 1;
//         } else {
//           blocks = 1;
//         }
//       } else if (consecutive > 0) {
//         score += getConsecutiveSetScore(consecutive, blocks, !ai === isPlayersTurn);
//         consecutive = 0;
//         blocks = 2;
//       } else {
//         blocks = 2;
//       }
//     }
//     if (consecutive > 0) {
//       score += getConsecutiveSetScore(consecutive, blocks, !ai === isPlayersTurn);
//     }
//     consecutive = 0;
//     blocks = 2;
//   }
//   return score;
// };

// const evaluateDiagonal = (cells: string[][], ai: boolean, isPlayersTurn: boolean): number => {
//   let consecutive = 0;
//   let blocks = 2;
//   let score = 0;
//   // From bottom-left to top-right diagonally
//   for (let k = 0; k <= 2 * (cells.length - 1); k++) {
//     const iStart = Math.max(0, k - cells.length + 1);
//     const iEnd = Math.min(cells.length - 1, k);
//     for (let i = iStart; i <= iEnd; ++i) {
//       const j = k - i;
//       if (cells[i][j] === (!ai ? 'W' : 'B')) {
//         consecutive++;
//       } else if (cells[i][j] === '') {
//         if (consecutive > 0) {
//           blocks--;
//           score += getConsecutiveSetScore(consecutive, blocks, !ai === isPlayersTurn);
//           consecutive = 0;
//           blocks = 1;
//         } else {
//           blocks = 1;
//         }
//       } else if (consecutive > 0) {
//         score += getConsecutiveSetScore(consecutive, blocks, !ai === isPlayersTurn);
//         consecutive = 0;
//         blocks = 2;
//       } else {
//         blocks = 2;
//       }
//     }
//     if (consecutive > 0) {
//       score += getConsecutiveSetScore(consecutive, blocks, !ai === isPlayersTurn);
//     }
//     consecutive = 0;
//     blocks = 2;
//   }
//   // From top-left to bottom-right diagonally
//   for (let k = 1 - cells.length; k < cells.length; k++) {
//     const iStart = Math.max(0, k);
//     const iEnd = Math.min(cells.length + k - 1, cells.length - 1);
//     for (let i = iStart; i <= iEnd; ++i) {
//       const j = i - k;

//       if (cells[i][j] === (!ai ? 'W' : 'B')) {
//         consecutive++;
//       } else if (cells[i][j] === '') {
//         if (consecutive > 0) {
//           blocks--;
//           score += getConsecutiveSetScore(consecutive, blocks, !ai === isPlayersTurn);
//           consecutive = 0;
//           blocks = 1;
//         } else {
//           blocks = 1;
//         }
//       } else if (consecutive > 0) {
//         score += getConsecutiveSetScore(consecutive, blocks, !ai === isPlayersTurn);
//         consecutive = 0;
//         blocks = 2;
//       } else {
//         blocks = 2;
//       }
//     }
//     if (consecutive > 0) {
//       score += getConsecutiveSetScore(consecutive, blocks, !ai === isPlayersTurn);
//     }
//     consecutive = 0;
//     blocks = 2;
//   }
//   return score;
// };

// const getConsecutiveSetScore = (count: number, blocks: number, currentTurn: boolean): number => {
//   const winGuarantee = 1000000;
//   if (blocks === 2 && count < 5) return 0;
//   switch (count) {
//     case 5: {
//       return winScore;
//     }
//     case 4: {
//       if (currentTurn) return winGuarantee;
//       if (blocks === 0) return winGuarantee / 4;
//       return 200;
//     }
//     case 3: {
//       if (blocks === 0) {
//         if (currentTurn) return 50000;
//         return 200;
//       }
//       if (currentTurn) return 10;
//       return 5;
//     }
//     case 2: {
//       if (blocks === 0) {
//         if (currentTurn) return 7;
//         return 5;
//       }
//       return 3;
//     }
//     case 1: {
//       return 1;
//     }
//   }
//   return winScore * 2;
// };
// // #endregion

// export const aiService: AiService<IState> = {
//   initialState: getInitialState(),
//   getPossibleMoves,
//   getStateScoreForIndex0,
// };

import {AiService, IMove} from '../common/common';
import {IState, createMove, getInitialState} from './gameLogic';

export function getPossibleMoves(state: IState, turnIndex: number): IMove<IState>[] {
  const possibleMoves: IMove<IState>[] = [];
  for (let i = 0; i < state.board.length; i++) {
    for (let j = 0; j < state.board.length; j++) {
      try {
        possibleMoves.push(
          createMove(state.board, 0, null, {col: j, row: i}, turnIndex, state.riddleWin, state.riddleData)
        );
      } catch (e) {
        // The cell in that position was full.
      }
    }
  }
  return possibleMoves;
}

export function getStateScoreForIndex0(): number {
  /* state: IState, turnIndex: number */
  return 0;
}

export const aiService: AiService<IState> = {
  initialState: getInitialState(),
  getPossibleMoves,
  getStateScoreForIndex0,
};
