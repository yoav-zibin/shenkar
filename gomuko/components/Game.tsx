import React from 'react';
import {Animated, StyleSheet, TouchableWithoutFeedback, View, Image, ImageBackground, ViewStyle} from 'react-native';

import {GameModule, GameProps} from '../../common/common';

import {createMove, IState, getInitialState, checkRiddleData} from '../gameLogic';
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
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    padding: 150,
    flexDirection: 'row',
    flex: 1,
    resizeMode: 'cover',
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
    width: '11.11%',
    height: '100%',
    padding: 0,
    margin: 0,
  },
  pieceImage: {
    marginTop: '0%',
    marginLeft: '0%',
    width: '100%',
    height: '100%',
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
  kuroKun: {
    position: 'absolute',
    height: 250,
    width: 250,
    bottom: -90,
  },
});

export default function getGomokuGameModule(): GameModule<IState> {
  return {
    gameId: 'gomoku',
    gameLocalizeId: 'GOMOKU_GAME_NAME',
    initialState: getInitialState(),
    component: GomokuComponent,
    riddleLevels,
    getPossibleMoves,
    getStateScoreForIndex0,
    checkRiddleData,
  };
}

const GomokuComponent: React.FunctionComponent<GameProps<IState>> = (props: GameProps<IState>) => {
  const {move, setMove, yourPlayerIndex, showHint} = props;
  const {turnIndex, state} = move;
  const {riddleData, board, delta, riddleWin} = state;

  const animValue = new Animated.Value(0);
  React.useEffect(() => {
    if (delta) {
      Animated.timing(animValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [animValue]);

  function clickedOn(row: number, col: number) {
    if (turnIndex != yourPlayerIndex) {
      return;
    }
    try {
      const move = createMove(state.board, {row, col}, 0, riddleWin, riddleData);
      setMove(move);
    } catch (e) {
      console.info('Cell is already full in position:', row, col);
    }
  }

  const rows = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const cols = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  let hintLine = null;
  if (showHint && riddleData) {
    let style: ViewStyle = {};
    if (riddleData.startsWith('r')) {
      style = {...styles.hintLineRow};
      const row = Number(riddleData.charAt(1));
      style.top = 100 / 6.1 + row * (100 / 9) + '%';
    } else throw new Error('Illegal riddleData=' + riddleData);
    hintLine = <View style={style} />;
  }

  function getPiece(r: number, c: number) {
    if (board[r][c] == '') return null;
    return (
      <Animated.View
        style={{
          // opacity: animValue,
          transform: [{scale: delta && delta.row == r && delta.col == c ? animValue : 1}],
        }}>
        <Image
          style={styles.pieceImage}
          source={board[r][c] == 'B' ? require('../imgs/blackStone.png') : require('../imgs/whiteStone.png')}
        />
      </Animated.View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.fixedRatio}>
        <ImageBackground style={styles.image} source={require('../imgs/backgroundJapan1.jpg')}>
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
          <Image style={styles.kuroKun} source={require('../imgs/Kuro_Kun.png')} />
        </ImageBackground>

        {hintLine}
      </View>
    </View>
  );
};
