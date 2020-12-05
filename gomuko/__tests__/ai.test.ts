import {Board} from '../gameLogic/Board';
import {AI} from '../gameLogic/AI';
import {Opponent} from '../models/types';

describe('Gomuko AI tests', () => {
  it('AI Gen next move', () => {
    const board = new Board(5, Opponent.AI);
    const ai = new AI(board);
    const nextMove = ai.CalcNextMove(3);

    expect(nextMove).toHaveProperty('row');
    expect(nextMove).toHaveProperty('column');
  });
});
