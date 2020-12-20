import {AiService, IMove} from '../common/common';
import {IState, createMove, getInitialState} from './gameLogic';

export function getPossibleMoves(state: IState, turnIndex: number): IMove<IState>[] {
  const possibleMoves: IMove<IState>[] = [];
  for (let i = 0; i < state.board.length; i++) {
    for (let j = 0; j < state.board.length; j++) {
      try {
        const delta = {row: i, col: j};
        // STILL WRONG! :
        if (state.board[i][j] == '')
          possibleMoves.push(
            createMove(state.board, 0, null, delta, turnIndex, null, state.riddleWin, state.riddleData)
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
