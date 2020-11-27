import {AiService, IMove} from '../common/common';
import {IState, createMove, getInitialState, lineDirection} from './gameLogic';

export function getPossibleMoves(state: IState): IMove<IState>[] {
  const possibleMoves: IMove<IState>[] = [];
  const size = state.board.size;
  for (let i = 0; i < size + 1; i++) {
    for (let j = 0; j < size; j++) {
      try {
        possibleMoves.push(createMove(state.board, lineDirection.HORIZONTAL, i, j));
      } catch (e) {
        console.log(`ERROR int 'getPossibleMoves': ${e}`);
      }
    }
  }
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size + 1; j++) {
      try {
        possibleMoves.push(createMove(state.board, lineDirection.VERTICAL, i, j));
      } catch (e) {
        console.log(`ERROR int 'getPossibleMoves': ${e}`);
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

// function getStateScoreForIndex0(move: IMove<any>[], playerIndex: number): number {
//      //return move[1].set.value.score[0] - move[1].set.value.score[1];
//      if (move[0].endMatch) {
//           let endMatchScores = move[0].endMatch.endMatchScores;
//           return endMatchScores[0] > endMatchScores[1] ? Number.POSITIVE_INFINITY
//                : endMatchScores[0] < endMatchScores[1] ? Number.NEGATIVE_INFINITY
//                     : 0;
//      } else if (move[1].set) {
//           //console.log("%o", move[0]);
//           return move[1].set.value.score[0] - move[1].set.value.score[1];
//      }
//      return 0;
// }
