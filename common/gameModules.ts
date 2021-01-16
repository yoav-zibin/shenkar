import {getTicTacToeGameModule} from '../tictactoe/components/Game';
import getGoGameModule from '../go_game/components/Game';
import {getConnect4Module} from '../connect4/components/Game';
import {getCheckersGameModule} from '../checkers/components/Game';
import {AnyGameModule} from './common';

const allGameModules: AnyGameModule[] = [
  getCheckersGameModule(),
  getTicTacToeGameModule(),
  getGoGameModule(),
  getConnect4Module(),
];

export function getAllGameModules(): AnyGameModule[] {
  return allGameModules;
}

export function findGameModule(gameId: string | undefined): AnyGameModule {
  const currentGameModule = allGameModules.find((module) => module.gameId == gameId);
  if (!currentGameModule) throw new Error('Illegal gameId=' + gameId);
  return currentGameModule;
}
