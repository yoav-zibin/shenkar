import {GestureResponderEvent} from 'react-native';
import {EndMatchScores} from './common';

// For now, humans plays first, and then the AI.
export const HUMAN_TURN_INDEX = 0;
export const AI_TURN_INDEX = 1;

export enum GameResult {
  NO_RESULT = -1,
  HUMAN_WON,
  AI_WON,
  TIE,
}

export function getGameResult(endMatchScores: EndMatchScores) {
  if (!endMatchScores) return GameResult.NO_RESULT;
  if (endMatchScores[HUMAN_TURN_INDEX] == endMatchScores[AI_TURN_INDEX]) return GameResult.TIE;
  if (endMatchScores[HUMAN_TURN_INDEX] < endMatchScores[AI_TURN_INDEX]) return GameResult.AI_WON;
  return GameResult.HUMAN_WON;
}

export function getRelativeTouchLocation(e: GestureResponderEvent) {
  let {locationX, locationY} = e.nativeEvent;
  if (locationX == undefined) {
    // on web we have offsetX, offsetY
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const nativeE = e.nativeEvent as any;
    locationX = nativeE.offsetX;
    locationY = nativeE.offsetY;
  }
  return {locationX, locationY};
}
