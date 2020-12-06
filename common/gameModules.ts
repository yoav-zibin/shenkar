import getTicTacToeGameModule from '../tictactoe/components/Game';
import getGoGameModule from '../go_game/components/Game';
import {AnyGameModule} from './common';

const allGameModules: AnyGameModule[] = [getTicTacToeGameModule(), getGoGameModule()];

export function getAllGameModules(): AnyGameModule[] {
  return allGameModules;
}

export function findGameModule(gameId: string | undefined): AnyGameModule | undefined {
  return allGameModules.find((module) => module.gameId == gameId);
}
