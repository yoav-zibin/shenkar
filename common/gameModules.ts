import getTicTacToeGameModule from '../tictactoe/components/Game';
import getGoGameModule from '../go_game/components/Game';
import getDotAndBoxesModule from '../dots_and_boxes/Game';

import {AnyGameModule} from './common';

const allGameModules: AnyGameModule[] = [getTicTacToeGameModule(), getGoGameModule(), getDotAndBoxesModule()];

export function getAllGameModules(): AnyGameModule[] {
  return allGameModules;
}

export function findGameModule(gameId: string | undefined): AnyGameModule | undefined {
  return allGameModules.find((module) => module.gameId == gameId);
}
