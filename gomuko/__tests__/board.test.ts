import {Board} from '../gameLogic/Board';
import {Difficulty, Opponent, Player} from '../models/types';

describe('Gomuko Board tests', () => {
  it('Clone board works', () => {
    const board = new Board(5);
    expect(board.Clone()).toBeInstanceOf(Board);
  });

  it('Reset Board Works', () => {
    const board = new Board(5);
    board.ResetGame();
    const state = board.GetGameState();
    expect(state).toHaveProperty('winner', Player.NONE);
    expect(state).toHaveProperty('finished', false);
    expect(board.GetEmptyCellCount()).toBe(5 ^ 2);
  });

  it('Check Win States', () => {
    const board = new Board(5);
    board.GameFinished(Player.NONE);
    const state = board.GetGameState();
    expect(state).toHaveProperty('winner', Player.NONE);
    expect(state).toHaveProperty('finished', true);
  });

  it('Get Correct GameState', () => {
    const board = new Board(5, Opponent.AI, Difficulty.NOVICE, Player.WHITE, Player.BLACK);
    const state = board.GetGameState();
    expect(state).toHaveProperty('finished', false);
    expect(state).toHaveProperty('winner', Player.NONE);
    expect(state).toHaveProperty('turn', Player.BLACK);
    expect(state).toHaveProperty('moveList', []);
  });

  it('Move Cycle', () => {
    const board = new Board(5, Opponent.HUMAN, Difficulty.NOVICE);
    board.Play({row: 1, column: 1});

    const state = board.GetGameState();
    expect(state).toHaveProperty('moveList', [{row: 1, column: 1}]);
  });
});
