import React, {useState} from 'react';
import {GestureResponderEvent, TouchableWithoutFeedback, View} from 'react-native';

import Circle from './Circle';
import Cross from './Cross';
import PromptArea from '../../common/PromptArea';
import {AI_TURN_INDEX, getGameResult, getRelativeTouchLocation} from '../../common/common';

import {StyleSheet} from 'react-native';
import {createMove, createInitialMove, ROWS, COLS} from '../gameLogic';
import {findComputerMove} from '../aiService';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  board: {
    width: 312,
    height: 312,
    borderWidth: 3,
    borderColor: '#000',
  },
  line: {
    position: 'absolute',
    width: 3,
    height: 306,
    backgroundColor: '#000',
    transform: [{translateX: 100}],
  },
});

export const CENTER_POINTS = [
  {x: 10, y: 10},
  {x: 113, y: 10},
  {x: 213, y: 10},
  {x: 10, y: 113},
  {x: 113, y: 113},
  {x: 213, y: 113},
  {x: 10, y: 213},
  {x: 113, y: 213},
  {x: 213, y: 213},
];

export const AREAS = [
  {startX: 3, startY: 3, endX: 103, endY: 103, row: 0, col: 0},
  {startX: 106, startY: 3, endX: 206, endY: 103, row: 0, col: 1},
  {startX: 209, startY: 3, endX: 309, endY: 103, row: 0, col: 2},
  {startX: 3, startY: 106, endX: 103, endY: 206, row: 1, col: 0},
  {startX: 106, startY: 106, endX: 206, endY: 206, row: 1, col: 1},
  {startX: 209, startY: 106, endX: 309, endY: 206, row: 1, col: 2},
  {startX: 3, startY: 209, endX: 103, endY: 309, row: 2, col: 0},
  {startX: 106, startY: 209, endX: 206, endY: 309, row: 2, col: 1},
  {startX: 209, startY: 209, endX: 309, endY: 309, row: 2, col: 2},
];

export default function TicTacToeGame() {
  const [gameState, setGameState] = useState(createInitialMove());
  const {endMatchScores, turnIndex, state} = gameState;

  if (turnIndex == AI_TURN_INDEX && !endMatchScores) {
    // do AI move
    setGameState(findComputerMove(gameState));
  }

  function restart() {
    setGameState(createInitialMove());
  }

  function boardClickHandler(e: GestureResponderEvent) {
    if (endMatchScores || turnIndex == AI_TURN_INDEX) {
      return;
    }

    const {locationX, locationY} = getRelativeTouchLocation(e);
    const area = AREAS.find(
      (d) => locationX >= d.startX && locationX <= d.endX && locationY >= d.startY && locationY <= d.endY
    );
    if (!area) {
      return;
    }
    try {
      const move = createMove(state, area.row, area.col, turnIndex);
      setGameState(move);
    } catch (e) {
      console.info('Cell is already full in position:', area);
    }
  }

  const allCircles: number[] = [];
  const allCrosses: number[] = [];

  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      const cell = state.board[i][j];
      const id = ROWS * i + j;
      if (cell == 'X') allCrosses.push(id);
      if (cell == 'O') allCircles.push(id);
    }
  }
  const idOfLastCell = state.delta ? ROWS * state.delta.row + state.delta.col : -1;

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={(e) => boardClickHandler(e)}>
        <View style={styles.board}>
          <View style={styles.line} />
          <View
            style={[
              styles.line,
              {
                width: 3,
                height: 306,
                transform: [{translateX: 200}],
              },
            ]}
          />
          <View
            style={[
              styles.line,
              {
                width: 306,
                height: 3,
                transform: [{translateY: 100}],
              },
            ]}
          />
          <View
            style={[
              styles.line,
              {
                width: 306,
                height: 3,
                transform: [{translateY: 200}],
              },
            ]}
          />
          {allCircles.map((d, i) => (
            <Circle
              key={i}
              xTranslate={CENTER_POINTS[d].x}
              yTranslate={CENTER_POINTS[d].y}
              color={d == idOfLastCell ? 'deepskyblue' : ''}
            />
          ))}
          {allCrosses.map((d, i) => (
            <Cross
              key={i}
              xTranslate={CENTER_POINTS[d].x}
              yTranslate={CENTER_POINTS[d].y}
              color={d == idOfLastCell ? 'deepskyblue' : ''}
            />
          ))}
        </View>
      </TouchableWithoutFeedback>
      <PromptArea result={getGameResult(endMatchScores)} onRestart={() => restart()} />
    </View>
  );
}
