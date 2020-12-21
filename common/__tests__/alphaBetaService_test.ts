import {deepEquals, AiService} from '../common';
import {createComputerMove} from '../alphaBetaService';

describe('alphaBetaService', function () {
  it('expands moves until we reach the next player', function () {
    const state = 1;
    const aiService: AiService<number> = {
      initialState: 1,
      getPossibleMoves: (state) => {
        if (state == 1) {
          return [{endMatchScores: null, turnIndex: 0, state: 2}];
        }
        if (state == 2) {
          return [{endMatchScores: null, turnIndex: 1, state: 3}];
        }
        return [{endMatchScores: [0, 0], turnIndex: -1, state: 4}];
      },
      getStateScoreForIndex0: () => 0,
    };
    const move = createComputerMove(state, 0, {maxDepth: 1}, aiService);
    const expectedMove = {endMatchScores: null, turnIndex: 1, state: 3};
    expect(deepEquals(move, expectedMove)).toBe(true);
  });
});
