import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Board} from '../gameLogic';
import {DOT_PHYSICAL_MARGIN, DOT_PHYSICAL_SIZE, getLineSize} from './consts';
import Dot from './Dot';
import Line from './Line';

interface HorizontalViewProps {
  row: number;
  onLineSelect: (row: number, col: number) => void;
  board: Board;
}
const HorizontalView = ({row, onLineSelect, board}: HorizontalViewProps) => {
  const LINE_PHYSICAL_SIZE = getLineSize(4);
  const size = DOT_PHYSICAL_SIZE;
  const margin = DOT_PHYSICAL_MARGIN;
  const width = LINE_PHYSICAL_SIZE;
  const height = DOT_PHYSICAL_SIZE;
  return (
    <View style={styles.container}>
      <Dot {...{size, margin}} />
      <Line {...{height, width}} onPress={() => onLineSelect(row, 0)} isMarked={board.horizontalLines[row][0]} />
      <Dot {...{size, margin}} />
      <Line {...{height, width}} onPress={() => onLineSelect(row, 1)} isMarked={board.horizontalLines[row][1]} />
      <Dot {...{size, margin}} />
      <Line {...{height, width}} onPress={() => onLineSelect(row, 2)} isMarked={board.horizontalLines[row][2]} />
      <Dot {...{size, margin}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default HorizontalView;
