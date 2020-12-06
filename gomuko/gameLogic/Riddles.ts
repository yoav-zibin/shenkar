import {Player, RiddleState} from '../models/types';
import {Board} from './Board';

const r1: RiddleState = {
  hint: 'sample riddle',
  maxMoves: 2,
  solution: [[]],
  solutionMove: {row: 1, column: 1},
  initialBoard: [[]],
  boardInstance: new Board(1),
  playerColor: Player.WHITE,
};

console.log(r1);
