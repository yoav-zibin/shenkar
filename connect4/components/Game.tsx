import React, {useState} from 'react';
import {StyleSheet, TouchableWithoutFeedback, View, Image, ImageBackground, ViewStyle, Switch} from 'react-native';
import {GameModule, GameProps} from '../../common/common';

import {createMove, IState, getInitialState, checkRiddleData} from '../gameLogic';
import {getPossibleMoves, getStateScoreForIndex0} from '../aiService';
import {riddleLevels} from '../riddles';

const hintLineColor = 'green';

const styles = StyleSheet.create({
  // See how to have a square component using aspectRatio=1
  // https://reactnative.fun/2017/06/21/ratio/
  fixedRatio: {
    flex: 5,
    aspectRatio: 1,
  },
  container: {
    position: 'relative',
    margin: 10,
    flex: 1,
    borderRadius: 50,
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
    justifyContent: 'space-between',
    padding: 0,
    margin: 0,
  },
  boardCellsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    padding: 0,
    marginBottom: 5,
  },
  boardCell: {
    width: '12%',
    height: '100%',
    backgroundColor: 'blue',
    padding: 0,
    marginTop: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  pieceImage: {
    marginLeft: '17%',
    marginRight: '10%',
  },
  hintLineCol: {
    position: 'absolute',
    width: 8,
    height: '66%',
    bottom: 0,
    backgroundColor: hintLineColor,
  },
  hintLineCol2: {
    position: 'absolute',
    width: 8,
    height: '66%',
    backgroundColor: hintLineColor,
  },
  hintLineCol1: {
    position: 'absolute',
    width: 8,
    marginTop: '17%',
    height: '50%',
    backgroundColor: hintLineColor,
  },
  hintLineRow: {
    position: 'absolute',
    width: '57%',
    height: 8,
    backgroundColor: hintLineColor,
  },
  hintLineRow2: {
    position: 'absolute',
    width: '57%',
    height: 8,
    alignSelf: 'flex-end',
    backgroundColor: hintLineColor,
  },
  hintLineRow3: {
    position: 'absolute',
    width: '57%',
    height: 8,
    marginLeft: '12%',
    backgroundColor: hintLineColor,
  },
  hintLineDiagonal1: {
    position: 'absolute',
    width: 8,
    height: '70%',
    backgroundColor: hintLineColor,
    transform: [{rotate: '135deg'}],
    left: '55%',
    bottom: 0,
  },
  hintLineDiagonal2: {
    position: 'absolute',
    width: 8,
    height: '70%',
    backgroundColor: hintLineColor,
    transform: [{rotate: '43deg'}],
    left: '28%',
    bottom: 0,
  },
  hintLineDiagonal3: {
    position: 'absolute',
    width: 8,
    height: '70%',
    backgroundColor: hintLineColor,
    transform: [{rotate: '138deg'}],
    left: '30%',
  },
  hintLineDiagonal4: {
    position: 'absolute',
    width: 8,
    height: '70%',
    backgroundColor: hintLineColor,
    transform: [{rotate: '43deg'}],
    left: '70%',
    bottom: 0,
  },
  hintLineDiagonal5: {
    position: 'absolute',
    width: 8,
    height: '70%',
    backgroundColor: hintLineColor,
    transform: [{rotate: '43deg'}],
    left: '70%',
    marginTop: '10%',
  },
  bottomContainer: {
    flex: 1,
    position: 'absolute',
    justifyContent: 'flex-end',
    top: '10%',
  },
});

export function getConnect4Module(): GameModule<IState> {
  return {
    gameId: 'connect4',
    gameLocalizeId: 'CONNECT4_GAME_NAME',
    initialState: getInitialState(),
    component: connect4Component,
    riddleLevels,
    getPossibleMoves,
    getStateScoreForIndex0,
    checkRiddleData,
  };
}

const connect4Component: React.FunctionComponent<GameProps<IState>> = (props: GameProps<IState>) => {
  const {move, setMove, yourPlayerIndex, showHint} = props;
  const {turnIndex, state} = move;
  const {riddleData} = state;

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

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

  const rows = [0, 1, 2, 3, 4, 5];
  const cols = [0, 1, 2, 3, 4, 5, 6];
  let hintLine = null;
  if (showHint && riddleData) {
    let style: ViewStyle = {};
    if (riddleData.includes('r')) {
      style = {...styles.hintLineRow};
      const col = Number(riddleData.charAt(2));
      const row = 6 - Number(riddleData.charAt(0));
      if (row == 1) {
        style.top = 100 - row * 10 + '%';
      } else {
        if (row == 2) {
          style.top = 100 - row * 13 + '%';
        }
        if (row == 3) {
          style.top = 100 - row * 14.5 + '%';
        }
        if (row == 4) {
          style.top = 100 - row * 15 + '%';
        }
        if (row == 5) {
          style.top = 100 - row * 15.4 + '%';
        }
        if (row == 6) {
          style.top = 100 - row * 15.5 + '%';
        }
      }
      style.left = col * 15 + '%';
    } else if (riddleData.startsWith('r2')) {
      style = {...styles.hintLineRow2};
      style.top = 100 / 1.1 + '%';
    } else if (riddleData.startsWith('r4')) {
      style = {...styles.hintLineRow3};
      style.top = '40%';
    } else if (riddleData.includes('c')) {
      const row = 6 - Number(riddleData.charAt(0));
      const col = Number(riddleData.charAt(2));
      if (row == 1) {
        style = {...styles.hintLineCol};
      }
      if (row == 6) {
        style = {...styles.hintLineCol2};
      }
      if (row == 5) {
        style = {...styles.hintLineCol1};
      }
      style.left = col * 15 + 5 + '%';
    } else if (riddleData == 'd1') {
      style = styles.hintLineDiagonal2;
    } else if (riddleData == 'd2') {
      style = styles.hintLineDiagonal1;
    } else if (riddleData == 'd3') {
      style = styles.hintLineDiagonal3;
    } else if (riddleData == 'd4') {
      style = styles.hintLineDiagonal4;
    } else if (riddleData == 'd5') {
      style = styles.hintLineDiagonal5;
    } else throw new Error('Illegal riddleData=' + riddleData);
    hintLine = <View style={style} />;
  }
  return (
    <View style={styles.container}>
      <View style={styles.fixedRatio}>
        <ImageBackground style={styles.boardImage} source={require('../imgs/connect_board.png')}>
          <View style={styles.boardRowsContainer}>
            {rows.map((r) => (
              <View key={r} style={styles.boardCellsContainer}>
                {cols.map((c) =>
                  r == 5 || state.board[r + 1][c] != ' ' ? (
                    <TouchableWithoutFeedback key={c} onPress={() => clickedOn(r, c)}>
                      <View style={styles.boardCell}>
                        <Image
                          style={styles.pieceImage}
                          source={
                            state.board[r][c] != 'Y' && state.board[r][c] != 'R' && isEnabled == true
                              ? require('../imgs/touch.png')
                              : null
                          }
                        />
                        {state.board[r][c] != ' ' ? (
                          <Image
                            style={styles.pieceImage}
                            source={state.board[r][c] == 'Y' ? require('../imgs/p1.png') : require('../imgs/p2.png')}
                          />
                        ) : null}
                      </View>
                    </TouchableWithoutFeedback>
                  ) : (
                    <View style={styles.boardCell}>
                      {state.board[r][c] != ' ' ? (
                        <Image
                          style={styles.pieceImage}
                          source={state.board[r][c] == 'Y' ? require('../imgs/p1.png') : require('../imgs/p2.png')}
                        />
                      ) : null}
                    </View>
                  )
                )}
              </View>
            ))}
          </View>
        </ImageBackground>
        {hintLine}
      </View>
      <View style={styles.bottomContainer}>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
    </View>
  );
};
