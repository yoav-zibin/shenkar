import {AiService, IMove} from '../common/common';
import {IState, createMove, ROWS, COLS, getInitialState} from './gameLogic';

export function getPossibleMoves(state: IState, turnIndex: number): IMove<IState>[] {
  const possibleMoves: IMove<IState>[] = [];

  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      try {
        possibleMoves.push(createMove(state.board, i, j, turnIndex));
      } catch (e) {
        // The cell in that position was illegal (no sndwich / full).
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
