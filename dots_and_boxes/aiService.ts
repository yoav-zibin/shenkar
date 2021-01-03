import {AiService, IMove} from '../common/common';
import {IState, createMove, getInitialState, lineDirection} from './gameLogic';

export function getPossibleMoves(state: IState): IMove<IState>[] {
  const possibleMoves: IMove<IState>[] = [];
  const size = state.board.size;
  for (let i = 0; i < size + 1; i++) {
    for (let j = 0; j < size; j++) {
      try {
        const move = createMove(state.board, lineDirection.HORIZONTAL, i, j);
        possibleMoves.push(move);
      } catch (e) {
        //console.log(`ERROR int 'getPossibleMoves': [${i},${j}]: ${e}`);
      }
    }
  }
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size + 1; j++) {
      try {
        possibleMoves.push(createMove(state.board, lineDirection.VERTICAL, i, j));
      } catch (e) {
        //console.log(`ERROR int 'getPossibleMoves': [${i},${j}]: ${e}`);
      }
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
