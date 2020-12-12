import {getTicTacToeGameModule} from '../tictactoe/components/Game';
import getGoGameModule from '../go_game/components/Game';
import {AnyGameModule} from './common';
import {getConnect4Module} from '../connect4/components/Game';

const allGameModules: AnyGameModule[] = [getTicTacToeGameModule(), getGoGameModule(), getConnect4Module()];

export function getAllGameModules(): AnyGameModule[] {
  return allGameModules;
}

export function findGameModule(gameId: string | undefined): AnyGameModule {
  const currentGameModule = allGameModules.find((module) => module.gameId == gameId);
  if (!currentGameModule) throw new Error('Illegal gameId=' + gameId);
  return currentGameModule;
}
