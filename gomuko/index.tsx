import {Board} from './gameLogic/Board';
import {Cell} from './models/types';

const game = new Board(5);

// eslint-disable-next-line
const play = (i: number, j: number) => {
  game.Play({row: i, column: j}, false);
};

game.onAIStartEndMove = (thinking: boolean, cell: Cell | null) => {
  console.log(`AI move end result - ${thinking} ${cell}`);
};
game.onGameFinishedCallback = (winner: Player) => {
  console.log(`Game Done end result - ${winner}`);
};
game.onRiddleCheckEnd = (correct: boolean, hint: string, triesLeft: number) => {
  console.log(`riddle check end result - ${correct} ${hint} ${triesLeft}`);
};

// eslint-disable-next-line
const boardState = game.GetGameState().cells;
