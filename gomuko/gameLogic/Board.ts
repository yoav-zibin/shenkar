import {AI} from './AI';
import {Cell, Player, CellValue, GameState, Opponent, Difficulty, RiddleState} from '../models/types';

export class Board {
  private readonly length: number = -1;
  private cells: number[][] = [];
  private finished = false;
  private turn: Player = Player.NONE;
  private winner: Player = Player.NONE;
  private emptyCellsCount = -1;
  private winnerCells: any[] = []; // eslint-disable-line
  private opponent: Opponent = Opponent.HUMAN;
  private difficulty: Difficulty = Difficulty.NOVICE;
  private playerColor: Player = Player.NONE;
  private ai: AI | null = null;
  private moveList: Cell[] = [];
  private riddle: RiddleState | null = null;

  // #region Events
  public onGameFinishedCallback: ((winner: Player) => void) | null = null;
  public onAIStartEndMove: ((thinking: boolean, cell: Cell | null) => void) | null = null;
  public onRiddleCheckEnd: ((correct: boolean, hint: string) => void) | null = null;
  // #endregion

  public constructor(
    length: number,
    riddle: RiddleState | null = null,
    opponent: Opponent = Opponent.HUMAN,
    difficulty = Difficulty.MEDIUM,
    color = Player.WHITE,
    turnStart = Player.WHITE
  ) {
    if (riddle) {
      this.riddle = riddle;
      this.difficulty = difficulty;
      this.InitRiddle(riddle);
    } else {
      this.riddle = null;
      this.length = length;
      this.cells = [];
      this.finished = false;
      this.turn = turnStart;
      this.winner = Player.NONE;
      this.winnerCells = [];
      this.emptyCellsCount = 0;
      this.opponent = opponent;
      this.difficulty = difficulty;
      this.playerColor = color;
      this.moveList = [];
      this.ai = null;

      if (opponent === Opponent.AI) this.ai = new AI(this);

      this.ResetBoard();
    }
  }

  public Clone(): Board {
    const copy = new Board(this.length);

    for (let i = 0; i < copy.length; i++) {
      for (let j = 0; j < copy.length; j++) {
        copy.cells[i][j] = copy.cells[i][j];
      }
    }
    copy.turn = copy.turn;
    copy.moveList = [...copy.moveList];
    copy.finished = copy.finished;
    copy.winner = copy.winner;
    copy.winnerCells = [...copy.winnerCells];
    copy.emptyCellsCount = copy.emptyCellsCount;
    copy.opponent = copy.opponent;
    copy.playerColor = copy.playerColor;

    return copy;
  }

  public ResetBoard(): void {
    this.cells = [];
    this.moveList = [];
    this.winnerCells = [];
    this.emptyCellsCount = this.length ^ 2;

    for (let i = 0; i < this.length; i++) {
      this.cells[i] = [];
      for (let j = 0; j < this.length; j++) {
        this.cells[i][j] = CellValue.EMPTY;
      }
    }
  }

  public InitRiddle(riddle: RiddleState | null): void {
    this.cells = [];
    this.moveList = [];
    this.winnerCells = [];
    this.emptyCellsCount = this.length ^ 2;

    for (let i = 0; i < this.length; i++) {
      this.cells[i] = [];
      for (let j = 0; j < this.length; j++) {
        this.cells[i][j] = riddle ? riddle.initialBoard[i][j] : CellValue.EMPTY;
      }
    }
  }

  public Play(cell: Cell, aiTurn = false): void {
    const {row, column} = cell;

    if (this.riddle) {
      this.CheckRiddleLogic(cell);
    }

    let color = this.turn;
    if (this.opponent === Opponent.AI)
      color = aiTurn ? (this.playerColor === Player.WHITE ? Player.BLACK : Player.WHITE) : this.playerColor;

    this.cells[row][column] = color;

    this.EndTurnLogic(cell, aiTurn);
  }

  private EndTurnLogic(cell: Cell, aiTurn: boolean): void {
    this.moveList.push(cell);
    this.emptyCellsCount--;
    this.CheckWinCondition(cell);
    this.SwitchTurns();

    if (!aiTurn && !this.finished && this.opponent === Opponent.AI) {
      setTimeout(() => {
        if (this.ai) {
          if (this.onAIStartEndMove) this.onAIStartEndMove(true, null);
          const difficulty: number = this.GetNumericDifficulty();
          const move: Cell = this.ai.CalcNextMove(difficulty);
          this.Play(move, true);
          if (this.onAIStartEndMove) this.onAIStartEndMove(false, move);
        }
      }, 1);
    }
  }

  private CheckRiddleLogic(cell: Cell) {
    if (this.onRiddleCheckEnd) {
      if (cell === this.riddle?.solutionMove) this.onRiddleCheckEnd(true, '');
      else this.onRiddleCheckEnd(false, this.riddle ? this.riddle.hint : '');
    }
  }

  // #region  Win Check
  private CheckWinCondition(cell: Cell) {
    if (this.CheckRow(cell) || this.CheckColumn(cell) || this.CheckDiagonal(cell)) {
      this.GameFinished(this.turn);
      return;
    }

    if (this.CheckDraw()) this.GameFinished(Player.NONE);
  }

  private CheckRow(cell: Cell): boolean {
    this.winnerCells = [cell];
    for (let i = cell.column + 1; i < this.length; i++) {
      if (this.cells[cell.row][i] === this.turn) {
        this.winnerCells.push({row: cell.row, column: i});
      } else break;
    }
    if (this.winnerCells.length >= 5) {
      return true;
    }

    for (let i = cell.column - 1; i >= 0; i--) {
      if (this.cells[cell.row][i] === this.turn) {
        this.winnerCells.push({row: cell.row, column: i});
      } else break;
    }
    if (this.winnerCells.length >= 5) {
      return true;
    }

    return false;
  }

  private CheckColumn(cell: Cell): boolean {
    this.winnerCells = [cell];
    for (let i = cell.row + 1; i < this.length; i++) {
      if (this.cells[i][cell.column] === this.turn) {
        this.winnerCells.push({row: i, column: cell.column});
      } else break;
    }
    if (this.winnerCells.length >= 5) return true;

    for (let i = cell.row - 1; i >= 0; i--) {
      if (this.cells[i][cell.column] === this.turn) {
        this.winnerCells.push({row: i, column: cell.column});
      } else break;
    }
    if (this.winnerCells.length >= 5) return true;

    return false;
  }

  private CheckDiagonal(cell: Cell): boolean {
    const max = (x: number, y: number) => {
      return x > y ? x : y;
    };

    // DIAG \
    this.winnerCells = [cell];
    for (let i = 1; i < max(this.length, this.length); i++) {
      if (cell.row + i >= this.length || cell.column + i >= this.length) {
        break;
      }
      if (this.cells[cell.row + i][cell.column + i] === this.turn) {
        this.winnerCells.push({row: cell.row + i, column: cell.column + i});
      } else break;
    }
    if (this.winnerCells.length >= 5) return true;

    for (let i = 1; i < max(this.length, this.length); i++) {
      if (cell.row - i < 0 || cell.column - i < 0) {
        break;
      }

      if (this.cells[cell.row - i][cell.column - i] === this.turn) {
        this.winnerCells.push({row: cell.row - i, column: cell.column - i});
      } else break;
    }
    if (this.winnerCells.length >= 5) return true;

    //  OTHER DIAG /
    this.winnerCells = [cell];
    for (let i = 1; i < max(this.length, this.length); i++) {
      if (cell.row - i < 0 || cell.column + i > this.length) {
        break;
      }

      if (this.cells[cell.row - i][cell.column + i] === this.turn) {
        this.winnerCells.push({row: cell.row - i, column: cell.column + i});
      } else break;
    }

    if (this.winnerCells.length >= 5) {
      return true;
    }

    for (let i = 1; i < max(this.length, this.length); i++) {
      if (cell.row + i >= this.length || cell.column - i < 0) {
        break;
      }

      if (this.cells[cell.row + i][cell.column - i] === this.turn) {
        this.winnerCells.push({row: cell.row + i, column: cell.column - i});
      } else break;
    }

    if (this.winnerCells.length >= 5) {
      return true;
    }

    return false;
  }

  private CheckDraw(): boolean {
    return this.emptyCellsCount === 0;
  }

  // #endregion

  // #region Utils
  private SwitchTurns() {
    this.turn = this.turn === Player.WHITE ? Player.BLACK : Player.WHITE;
  }

  private GetNumericDifficulty(): number {
    switch (this.difficulty) {
      case Difficulty.MEDIUM:
        return 4;
      case Difficulty.EXPERT:
        return 5;
      case Difficulty.NOVICE:
      default:
        return 3;
    }
  }

  public GameFinished(winner: Player): void {
    this.finished = true;
    this.winner = winner;
    if (this.onGameFinishedCallback) this.onGameFinishedCallback(winner);
  }

  public ResetGame(): void {
    this.finished = false;
    this.ResetBoard();
    this.winner = Player.NONE;
    this.turn = this.playerColor;
  }

  // #endregion

  // #region Setters Getters

  public GetGameState(): GameState {
    return {
      finished: this.finished,
      cells: [...this.cells],
      winner: this.winner,
      winnerCells: this.winnerCells,
      turn: this.turn,
      moveList: [...this.moveList],
    };
  }

  public GetLength(): number {
    return this.length;
  }

  public GetCells(): number[][] {
    return this.cells;
  }

  public GetEmptyCellCount(): number {
    return this.emptyCellsCount;
  }

  public SetWinner(winner: Player): void {
    this.winner = winner;
  }

  public SetOpponent(opponent: Opponent): void {
    this.opponent = opponent;
  }

  public SetDifficulty(difficulty: Difficulty): void {
    this.difficulty = difficulty;
  }

  public SetPlayerColor(playerColor: Player): void {
    this.playerColor = playerColor;
  }

  // #endregion
}
