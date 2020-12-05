import getTicTacToeGameModule from '../tictactoe/components/Game';
import getConnect4GameModule from '../connect4/components/Game';
import {AnyGameModule} from './common';

const allGameModules: AnyGameModule[] = [
  getTicTacToeGameModule(),
  getConnect4GameModule(),
  // TODO: add your games.
];

export function getAllGameModules(): AnyGameModule[] {
  return allGameModules;
}

export function findGameModule(gameId: string | undefined): AnyGameModule | undefined {
  return allGameModules.find((module) => module.gameId == gameId);
}
