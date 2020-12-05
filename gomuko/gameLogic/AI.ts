import {Board} from './Board';
import {Cell} from '../models/types';

export class AI {
  public evaluationCount = 0;
  private board: Board;
  private winScore = 100000000;

  public constructor(board: Board) {
    this.board = board;
  }
  public GetWinScore(): number {
    return this.winScore;
  }

  public CalcNextMove(depth: number): Cell {
    let move: number[] = new Array<number>(2);
    let bestMove: number[] = this.SearchWinningMove(this.board);
    if (bestMove && bestMove.length > 0) {
      move[0] = bestMove[1];
      move[1] = bestMove[2];
    } else {
      bestMove = this.MiniMaxSearchAB(depth, this.board, true, -1.0, this.GetWinScore());
      if (bestMove[1] == null) {
        move = [];
      } else {
        move[0] = bestMove[1];
        move[1] = bestMove[2];
      }
    }

    this.evaluationCount = 0;

    return {row: move[0], column: move[1]};
  }

  // #region MinMax and move gen
  public EvaluateBoardForAI(board: Board, playersTurn: boolean): number {
    this.evaluationCount++;

    let playerScore: number = this.GetScore(board, false, playersTurn);
    const aiScore: number = this.GetScore(board, true, playersTurn);

    if (playerScore === 0) playerScore = 1.0;

    return aiScore / playerScore;
  }

  public GetScore(board: Board, ai: boolean, playersTurn: boolean): number {
    const cells: number[][] = board.GetCells();
    return (
      this.EvaluateHorizontal(cells, ai, playersTurn) +
      this.EvaluateVertical(cells, ai, playersTurn) +
      this.EvaluateDiagonal(cells, ai, playersTurn)
    );
  }

  // eslint-disable-next-line
  private MiniMaxSearchAB(depth: number, board: Board, max: boolean, alpha: number, beta: number): any[] {
    if (depth === 0) {
      return [this.EvaluateBoardForAI(board, !max), null, null];
    }

    const allPossibleMoves: number[][] = this.GenerateMoves();

    if (allPossibleMoves.length === 0) {
      return [this.EvaluateBoardForAI(board, !max), null, null];
    }

    // eslint-disable-next-line
    let bestMove: any[] = new Array<any>(3);

    if (max) {
      bestMove[0] = -1.0;
      for (const move of allPossibleMoves) {
        const dummyBoard = board.Clone();
        dummyBoard.Play({row: move[1], column: move[0]}, true);

        // eslint-disable-next-line
        const tempMove: any[] = this.MiniMaxSearchAB(depth - 1, dummyBoard, !max, alpha, beta);

        if (tempMove[0] > alpha) {
          alpha = tempMove[0];
        }
        if (tempMove[0] >= beta) {
          return tempMove;
        }
        if (tempMove[0] > bestMove[0]) {
          bestMove = tempMove;
          bestMove[1] = move[0];
          bestMove[2] = move[1];
        }
      }
    } else {
      bestMove[0] = 100000000.0;
      bestMove[1] = allPossibleMoves[0][0];
      bestMove[2] = allPossibleMoves[0][1];
      for (const move of allPossibleMoves) {
        const dummyBoard: Board = board.Clone();
        dummyBoard.Play({row: move[0], column: move[1]}, true);

        const tempMove = this.MiniMaxSearchAB(depth - 1, dummyBoard, !max, alpha, beta);

        if (tempMove[0] < beta) {
          beta = tempMove[0];
        }
        if (tempMove[0] <= alpha) {
          return tempMove;
        }
        if (tempMove[0] < bestMove[0]) {
          bestMove = tempMove;
          bestMove[1] = move[0];
          bestMove[2] = move[1];
        }
      }
    }
    return bestMove;
  }

  // eslint-disable-next-line
  private SearchWinningMove(board: Board): any[] {
    const allPossibleMoves = this.GenerateMoves();

    // eslint-disable-next-line
    const winningMove: any[] = new Array<any>(2);

    for (const move of allPossibleMoves) {
      this.evaluationCount++;
      const dummyBoard: Board = board.Clone();
      dummyBoard.Play({row: move[0], column: move[1]}, true);

      if (this.GetScore(dummyBoard, false, false) >= this.winScore) {
        winningMove[1] = move[0];
        winningMove[2] = move[1];
        return winningMove;
      }
    }
    return [];
  }

  private GenerateMoves(): number[][] {
    // eslint-disable-next-line
    const moveList: any[] = [];

    const boardSize: number = this.board.GetLength();
    const cells = this.board.GetCells();

    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        if (cells[i][j] > 0) continue;

        if (i > 0) {
          if (j > 0) {
            if (cells[i - 1][j - 1] > 0 || cells[i][j - 1] > 0) {
              moveList.push([i, j]);
              continue;
            }
          }
          if (j < boardSize - 1) {
            if (cells[i - 1][j + 1] > 0 || cells[i][j + 1] > 0) {
              moveList.push([i, j]);
              continue;
            }
          }
          if (cells[i - 1][j] > 0) {
            moveList.push([i, j]);
            continue;
          }
        }
        if (i < boardSize - 1) {
          if (j > 0) {
            if (cells[i + 1][j - 1] > 0 || cells[i][j - 1] > 0) {
              moveList.push([i, j]);
              continue;
            }
          }
          if (j < boardSize - 1) {
            if (cells[i + 1][j + 1] > 0 || cells[i][j + 1] > 0) {
              moveList.push([i, j]);
              continue;
            }
          }
          if (cells[i + 1][j] > 0) {
            moveList.push([i, j]);
            continue;
          }
        }
      }
    }

    return moveList;
  }
  // #endregion

  // #region Evaluations
  private EvaluateHorizontal(cells: number[][], ai: boolean, isPlayersTurn: boolean): number {
    let consecutive = 0;
    let blocks = 2;
    let score = 0;

    for (let i = 0; i < cells.length; i++) {
      for (let j = 0; j < cells[0].length; j++) {
        if (cells[i][j] === (!ai ? 2 : 1)) {
          consecutive++;
        } else if (cells[i][j] === 0) {
          if (consecutive > 0) {
            blocks--;
            score += this.GetConsecutiveSetScore(consecutive, blocks, !ai === isPlayersTurn);
            consecutive = 0;
            blocks = 1;
          } else {
            blocks = 1;
          }
        } else if (consecutive > 0) {
          score += this.GetConsecutiveSetScore(consecutive, blocks, !ai === isPlayersTurn);
          consecutive = 0;
          blocks = 2;
        } else {
          blocks = 2;
        }
      }
      if (consecutive > 0) {
        score += this.GetConsecutiveSetScore(consecutive, blocks, !ai === isPlayersTurn);
      }
      consecutive = 0;
      blocks = 2;
    }
    return score;
  }

  private EvaluateVertical(cells: number[][], ai: boolean, isPlayersTurn: boolean): number {
    let consecutive = 0;
    let blocks = 2;
    let score = 0;

    for (let j = 0; j < cells[0].length; j++) {
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < cells.length; i++) {
        if (cells[i][j] === (!ai ? 2 : 1)) {
          consecutive++;
        } else if (cells[i][j] === 0) {
          if (consecutive > 0) {
            blocks--;
            score += this.GetConsecutiveSetScore(consecutive, blocks, !ai === isPlayersTurn);
            consecutive = 0;
            blocks = 1;
          } else {
            blocks = 1;
          }
        } else if (consecutive > 0) {
          score += this.GetConsecutiveSetScore(consecutive, blocks, !ai === isPlayersTurn);
          consecutive = 0;
          blocks = 2;
        } else {
          blocks = 2;
        }
      }
      if (consecutive > 0) {
        score += this.GetConsecutiveSetScore(consecutive, blocks, !ai === isPlayersTurn);
      }
      consecutive = 0;
      blocks = 2;
    }
    return score;
  }

  private EvaluateDiagonal(cells: number[][], ai: boolean, isPlayersTurn: boolean): number {
    let consecutive = 0;
    let blocks = 2;
    let score = 0;
    // From bottom-left to top-right diagonally
    for (let k = 0; k <= 2 * (cells.length - 1); k++) {
      const iStart = Math.max(0, k - cells.length + 1);
      const iEnd = Math.min(cells.length - 1, k);
      for (let i = iStart; i <= iEnd; ++i) {
        const j = k - i;

        if (cells[i][j] === (!ai ? 2 : 1)) {
          consecutive++;
        } else if (cells[i][j] === 0) {
          if (consecutive > 0) {
            blocks--;
            score += this.GetConsecutiveSetScore(consecutive, blocks, !ai === isPlayersTurn);
            consecutive = 0;
            blocks = 1;
          } else {
            blocks = 1;
          }
        } else if (consecutive > 0) {
          score += this.GetConsecutiveSetScore(consecutive, blocks, !ai === isPlayersTurn);
          consecutive = 0;
          blocks = 2;
        } else {
          blocks = 2;
        }
      }
      if (consecutive > 0) {
        score += this.GetConsecutiveSetScore(consecutive, blocks, !ai === isPlayersTurn);
      }
      consecutive = 0;
      blocks = 2;
    }
    // From top-left to bottom-right diagonally
    for (let k = 1 - cells.length; k < cells.length; k++) {
      const iStart = Math.max(0, k);
      const iEnd = Math.min(cells.length + k - 1, cells.length - 1);
      for (let i = iStart; i <= iEnd; ++i) {
        const j = i - k;

        if (cells[i][j] === (!ai ? 2 : 1)) {
          consecutive++;
        } else if (cells[i][j] === 0) {
          if (consecutive > 0) {
            blocks--;
            score += this.GetConsecutiveSetScore(consecutive, blocks, !ai === isPlayersTurn);
            consecutive = 0;
            blocks = 1;
          } else {
            blocks = 1;
          }
        } else if (consecutive > 0) {
          score += this.GetConsecutiveSetScore(consecutive, blocks, !ai === isPlayersTurn);
          consecutive = 0;
          blocks = 2;
        } else {
          blocks = 2;
        }
      }
      if (consecutive > 0) {
        score += this.GetConsecutiveSetScore(consecutive, blocks, !ai === isPlayersTurn);
      }
      consecutive = 0;
      blocks = 2;
    }
    return score;
  }

  private GetConsecutiveSetScore(count: number, blocks: number, currentTurn: boolean): number {
    const winGuarantee = 1000000;
    if (blocks === 2 && count < 5) return 0;
    switch (count) {
      case 5: {
        return this.winScore;
      }
      case 4: {
        if (currentTurn) return winGuarantee;
        if (blocks === 0) return winGuarantee / 4;
        return 200;
      }
      case 3: {
        if (blocks === 0) {
          if (currentTurn) return 50000;
          return 200;
        }
        if (currentTurn) return 10;
        return 5;
      }
      case 2: {
        if (blocks === 0) {
          if (currentTurn) return 7;
          return 5;
        }
        return 3;
      }
      case 1: {
        return 1;
      }
    }
    return this.winScore * 2;
  }
  // #endregion
}
