import {AiService, IMove} from '../common/common';
import {IState, createMove, ROWS, COLS, getInitialState} from './gameLogic';

export function getPossibleMoves(state: IState, turnIndex: number): IMove<IState>[] {
  const possibleMoves: IMove<IState>[] = [];
  const listRowNum: number[] = new Array(7);
  for (let i = 0; i < listRowNum.length; i++) {
    listRowNum[i] = -1;
  }
  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      if ((state.board[i][j] === 'Y' || state.board[i][j] === 'R') && i != 0 && listRowNum[j] === -1) {
        listRowNum[j] = 1;
        if (state.board[i - 1][j] === ' ') {
          possibleMoves.push(createMove(state, i - 1, j, turnIndex));
        }
      } else {
        if (state.board[i][j] === ' ' && i === ROWS - 1 && listRowNum[j] === -1) {
          listRowNum[j] = 1;
          possibleMoves.push(createMove(state, i, j, turnIndex));
        }
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
