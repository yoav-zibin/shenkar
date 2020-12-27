import {Dimensions} from 'react-native';

export const BOARD_PHYSICAL_SIZE = Dimensions.get('window').width - 20;
export const DOT_PHYSICAL_SIZE = 20;
export const DOT_PHYSICAL_MARGIN = 0;
export const getLineSize = (boardSize: number) =>
  (BOARD_PHYSICAL_SIZE - DOT_PHYSICAL_SIZE * boardSize) / (boardSize - 1);
export const FillColor = {
  empty: 'transparent',
  player1: '#DD6B4D',
  player2: '#8627FF',
};
