import React, {useState} from 'react';
import {Animated, StyleSheet, TouchableWithoutFeedback, View, Image, ImageBackground, ViewStyle} from 'react-native';

import {GameModule, GameProps, randomElement} from '../../common/common';

import {createMove, IState, getInitialState, checkRiddleData, ROWS} from '../gameLogic';
import {getPossibleMoves, getStateScoreForIndex0} from '../aiService';
import {riddleLevels} from '../riddles';

const hintLineColor = 'green';

const styles = StyleSheet.create({
  // See how to have a square component using aspectRatio=1
  // https://reactnative.fun/2017/06/21/ratio/
  fixedRatio: {
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
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
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
    width: '33.3%',
    height: '100%',
    padding: 0,
    margin: 0,
  },
  pieceImage: {
    marginTop: '14%',
    marginLeft: '12%',
    width: '80%',
    height: '80%',
  },
  hintLineCol: {
    position: 'absolute',
    width: 8,
    height: '100%',
    backgroundColor: hintLineColor,
  },
  hintLineRow: {
    position: 'absolute',
    width: '100%',
    height: 8,
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

export function getTicTacToeGameModule(): GameModule<IState> {
  return {
    gameId: 'tictactoe',
    gameLocalizeId: 'TICTACTOE_GAME_NAME',
    initialState: getInitialState(),
    component: TicTacToeComponent,
    riddleLevels,
    getPossibleMoves,
    getStateScoreForIndex0,
    checkRiddleData,
  };
}

const TicTacToeComponent: React.FunctionComponent<GameProps<IState>> = (props: GameProps<IState>) => {
  const {move, setMove, yourPlayerIndex, showHint} = props;
  const {turnIndex, state} = move;
  const {riddleData, board, delta} = state;
  const [boardHeight, setBoardHeight] = useState(300);
  console.log('Render TicTacToe delta=', delta);

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
      const move = createMove(state, row, col, turnIndex);
      setMove(move);
    } catch (e) {
      console.info('Cell is already full in position:', row, col);
    }
  }

  const rows = [0, 1, 2];
  const cols = [0, 1, 2];

  let hintLine = null;
  if (showHint && riddleData) {
    let style: ViewStyle = {};
    if (riddleData.startsWith('r')) {
      style = {...styles.hintLineRow};
      // riddleData is either "r1", "r2", r3.
      // row is either 0, 1, 2
      const row = Number(riddleData.charAt(1)) - 1;
      style.top = 100 / (ROWS * 2) + row * (100 / ROWS) + '%';
    } else if (riddleData.startsWith('c')) {
      style = {...styles.hintLineCol};
      const col = Number(riddleData.charAt(1)) - 1;
      style.left = 100 / 6 + col * (100 / 3) + '%';
    } else if (riddleData == 'd1') {
      style = styles.hintLineDiagonal1;
    } else if (riddleData == 'd2') {
      style = styles.hintLineDiagonal2;
    } else throw new Error('Illegal riddleData=' + riddleData);
    hintLine = <View style={style} />;
  }

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
    if (board[r][c] == '') return null;
    const shouldAnimate = delta && delta.row == r && delta.col == c;
    const animStyle = shouldAnimate ? getAnimationStyle(r) : {};

    return (
      <Animated.View style={animStyle}>
        <Image
          style={styles.pieceImage}
          source={board[r][c] == 'X' ? require('../imgs/X.png') : require('../imgs/O.png')}
        />
      </Animated.View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.fixedRatio} onLayout={(event) => setBoardHeight(event.nativeEvent.layout.height)}>
        <ImageBackground style={styles.boardImage} source={require('../imgs/Board.png')}>
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
        {hintLine}
      </View>
    </View>
  );
};
