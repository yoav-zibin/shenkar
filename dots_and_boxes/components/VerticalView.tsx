import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Board} from '../gameLogic';
import {DOT_PHYSICAL_SIZE, FillColor, getLineSize} from './consts';
import Line from './Line';
import Square from './Square';

interface VerticalViewProps {
  row: number;
  onLineSelect: (row: number, col: number) => void;
  board: Board;
}
const VerticalView = ({row, onLineSelect, board}: VerticalViewProps) => {
  const LINE_PHYSICAL_SIZE = getLineSize(4);
  const width = LINE_PHYSICAL_SIZE;
  const height = DOT_PHYSICAL_SIZE;
  return (
    <View style={styles.container}>
      <Line {...{height, width}} vertical onPress={() => onLineSelect(row, 0)} isMarked={board.verticalLines[row][0]} />
      <Square size={LINE_PHYSICAL_SIZE} fillColor={FillColor.player1} />
      <Line {...{height, width}} vertical onPress={() => onLineSelect(row, 1)} isMarked={board.verticalLines[row][1]} />
      <Square size={LINE_PHYSICAL_SIZE} fillColor={FillColor.player1} />
      <Line {...{height, width}} vertical onPress={() => onLineSelect(row, 2)} isMarked={board.verticalLines[row][2]} />
      <Square size={LINE_PHYSICAL_SIZE} fillColor={FillColor.player1} />
      <Line {...{height, width}} vertical onPress={() => onLineSelect(row, 3)} isMarked={board.verticalLines[row][4]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default VerticalView;
