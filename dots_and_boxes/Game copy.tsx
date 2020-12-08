import React from 'react';
import {View} from 'react-native';
import {GameModule, GameProps} from '../common/common';
import {getPossibleMoves, getStateScoreForIndex0} from './aiService';
import {BOARD_PHYSICAL_SIZE} from './components/consts';
import HorizontalView from './components/HorizontalView';
import VerticalView from './components/VerticalView';
import {createMove, getInitialState, IState, lineDirection} from './gameLogic';

const BOARD_SIZE = 4;

export default function getDotsAndBoxesGameModule(): GameModule<IState> {
  return {
    gameId: 'dotsandboxes',
    gameName: 'Dots and Boxes',
    initialState: getInitialState(),
    component: Game,
    getPossibleMoves: getPossibleMoves,
    getStateScoreForIndex0: getStateScoreForIndex0,
  };
}

const Game: React.FunctionComponent<GameProps<IState>> = ({
  move: {
    turnIndex,
    state: {board},
  },
  setMove,
  yourPlayerIndex,
}: GameProps<IState>) => {
  const rows = [];
  for (let i = 0; i < BOARD_SIZE - 1; i++) {
    rows.push(i);
  }

  function onLineSelect(row: number, col: number, direction: lineDirection) {
    if (turnIndex != yourPlayerIndex) {
      return;
    }
    try {
      const move = createMove(board, direction, row, col);
      setMove(move);
    } catch (e) {
      console.info('Cell is already full in position:', row, col);
    }
  }
  const horizontalLineSelect = (row: number, col: number) => onLineSelect(row, col, lineDirection.HORIZONTAL);
  const verticalLineSelect = (row: number, col: number) => onLineSelect(row, col, lineDirection.VERTICAL);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <View style={{height: BOARD_PHYSICAL_SIZE, width: BOARD_PHYSICAL_SIZE}}>
        {rows.map((row, key) => {
          return (
            <View key={key}>
              <HorizontalView {...{row, board}} onLineSelect={horizontalLineSelect} />
              <VerticalView {...{row, board}} onLineSelect={verticalLineSelect} />
            </View>
          );
        })}
        <HorizontalView row={BOARD_SIZE - 1} onLineSelect={horizontalLineSelect} board={board} />
      </View>
    </View>
  );
};
