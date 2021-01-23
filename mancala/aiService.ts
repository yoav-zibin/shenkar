import {AiService, IMove} from '../common/common';
import {IState, createMove, getInitialState} from './gameLogic';

export function getPossibleMoves(state: IState): IMove<IState>[] {
  const possibleMoves: IMove<IState>[] = [];
  for (let i = 0; i < 6; i++) {
    try {
      possibleMoves.push(createMove(state, 1, i, 1));
    } catch (e) {
      // The cell in that position was full.
    }
  }
  return possibleMoves;
}

export function getStateScoreForIndex0(): number {
  return 0;
}

export const aiService: AiService<IState> = {
  initialState: getInitialState(),
  getPossibleMoves,
  getStateScoreForIndex0,
};
