import getTicTacToeGameModule from '../tictactoe/components/Game';
import {GameModule} from './common';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyGameModule = GameModule<any>;

const allGameModules: AnyGameModule[] = [getTicTacToeGameModule()];

export function getAllGameModules(): AnyGameModule[] {
  return allGameModules;
}

export function findGameModule<T>(gameId: string) {
  return allGameModules.find((module) => module.gameId == gameId) as GameModule<T>;
}
