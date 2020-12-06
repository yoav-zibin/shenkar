import {Player, RiddleState} from '../models/types';
import {Board} from './Board';

const r1: RiddleState = {
  hint: 'sample riddle',
  maxMoves: 2,
  solution: [[]],
  solutionMoves: [{row: 1, column: 1}],
  initialBoard: [[]],
  boardInstance: new Board(1),
  playerColor: Player.WHITE,
  aiMoves: [],
  maxTries: 2 * 2,
};

console.log(r1);
