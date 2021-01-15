import {ROWS, COLS, createMove, IState, getInitialState, checkRiddleData} from '../gameLogic';
import {GameModule, GameProps, randomElement} from '../../common/common';
import {riddleLevels} from '../riddles';
import {getPossibleMoves, getStateScoreForIndex0} from '../aiService';
import React, {useState} from 'react';
import {Animated, StyleSheet, TouchableWithoutFeedback, View, Image, ImageBackground} from 'react-native';

import {Dimensions} from 'react-native';

// 16  = padding // 48 for bottom menu
const AVAILABLE_WIDTH = Dimensions.get('window').width - 16;
const AVAILABLE_HEIGHT = Dimensions.get('window').height - 48 - 16 - 100;

const BOARD_PHYSICAL_SIZE = Math.min(AVAILABLE_WIDTH, AVAILABLE_HEIGHT);
const CELL_SIZE = BOARD_PHYSICAL_SIZE / ROWS;

const hintLineColor = 'green';

const styles = StyleSheet.create({
  // See how to have a square component using aspectRatio=1
  // https://reactnative.fun/2017/06/21/ratio/
  fixedRatio: {
    height: '100%',
    width: '100%',
    flex: 1,
    aspectRatio: 1,
  },
  container: {
    margin: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boardImage: {
    height: BOARD_PHYSICAL_SIZE,
    width: BOARD_PHYSICAL_SIZE,
    margin: 8,
    // width: '100%',
    // height: '100%'
    // resizeMode: 'stretch',
  },
  boardRowsContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'space-around',
    padding: 0,
    margin: 0,
  },
  boardCellsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-around',
    padding: 0,
    margin: 0,
  },
  boardCell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    padding: 0,
    margin: 0,
  },
  pieceImage: {
    margin: '7px',
    width: CELL_SIZE - 14,
    height: CELL_SIZE - 14,
  },
  hintLineCol: {
    position: 'absolute',
    width: 8,
    height: '100%',
    backgroundColor: hintLineColor,
  },
  hintLineRow: {
    // position: 'absolute',
    width: 100,
    height: 10,
    backgroundColor: hintLineColor,
  },
  hintLineDiagonal1: {
    position: 'absolute',
    width: 8,
    height: '100%',
    backgroundColor: hintLineColor,
    transform: [{rotate: '135deg'}],
    left: '50%',
  },
  hintLineDiagonal2: {
    position: 'absolute',
    width: 8,
    height: '100%',
    backgroundColor: hintLineColor,
    transform: [{rotate: '45deg'}],
    left: '50%',
  },
});

function getIntegersTill(number: number): number[] {
  const res: number[] = [];
  for (let i = 0; i < number; i++) {
    res.push(i);
  }
  return res;
}

export const rows = getIntegersTill(ROWS);
export const cols = getIntegersTill(COLS);

export function getReversiGameModule(): GameModule<IState> {
  return {
    gameId: 'reversi',
    gameLocalizeId: 'REVERSI_GAME_NAME',
    initialState: getInitialState(),
    component: ReversiComponent,
    riddleLevels,
    getPossibleMoves,
    getStateScoreForIndex0,
    checkRiddleData,
  };
}

const ReversiComponent: React.FunctionComponent<GameProps<IState>> = (props: GameProps<IState>) => {
  const {move, setMove, yourPlayerIndex} = props;
  const {turnIndex, state} = move;
  const {board, delta} = state;
  const [boardHeight, setBoardHeight] = useState(300);
  console.log('Render Reversi delta=', delta, boardHeight);

  const animValue = new Animated.Value(0);
  Animated.timing(animValue, {
    toValue: 1,
    duration: 500,
    useNativeDriver: true,
  }).start();

  function clickedOn(row: number, col: number) {
    if (turnIndex != yourPlayerIndex) {
      return;
    }
    try {
      const move = createMove(board, row, col, turnIndex);
      setMove(move);
    } catch (e) {
      console.info('Cell is already full in position:', row, col);
    }
  }

  const rows = [0, 1, 2, 3, 4, 5, 6, 7];
  const cols = [0, 1, 2, 3, 4, 5, 6, 7];

  function getAnimationStyle(r: number) {
    const whatToAnimate = randomElement(['opacity', 'translateY', 'scale']);
    switch (whatToAnimate) {
      case 'opacity':
        return {opacity: animValue};
      case 'scale':
        return {transform: [{scale: animValue}]};
      default: {
        const rowHeight = boardHeight / ROWS;
        const startYPosition = -rowHeight * (r + 1);
        return {
          transform: [
            {
              translateY: animValue.interpolate({
                inputRange: [0, 1],
                outputRange: [startYPosition, 0],
              }),
            },
          ],
        };
      }
    }
  }

  function getPiece(r: number, c: number) {
    if (!board) {
      return null;
    }

    if (board[r][c] == '') return null;
    const shouldAnimate = delta && delta.row == r && delta.col == c;
    const animStyle = shouldAnimate ? getAnimationStyle(r) : {};

    return (
      <Animated.View style={animStyle}>
        <Image
          style={styles.pieceImage}
          source={board[r][c] == 'B' ? require('../imgs/pieceBlack.png') : require('../imgs/pieceWhite.png')}
        />
      </Animated.View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.fixedRatio} onLayout={(event) => setBoardHeight(event.nativeEvent.layout.height)}>
        <ImageBackground style={styles.boardImage} source={require('../imgs/board.jpg')}>
          <View style={styles.boardRowsContainer}>
            {rows.map((r) => (
              <View key={r} style={styles.boardCellsContainer}>
                {cols.map((c) => (
                  <TouchableWithoutFeedback key={c} onPress={() => clickedOn(r, c)}>
                    <View style={styles.boardCell}>{getPiece(r, c)}</View>
                  </TouchableWithoutFeedback>
                ))}
              </View>
            ))}
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};
