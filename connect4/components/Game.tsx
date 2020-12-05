import React from 'react';
import {StyleSheet, TouchableWithoutFeedback, View, Image, ImageBackground} from 'react-native';

import {GameModule, GameProps} from '../../common/common';

import {createMove, IState, getInitialState} from '../gameLogic';
import {getPossibleMoves, getStateScoreForIndex0} from '../aiService';
import {RiddleData, riddleLevels} from '../riddles';

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

export default function getConnect4GameModule(): GameModule<IState, RiddleData> {
  return {
    gameId: 'connect4',
    gameLocalizeId: 'CONNECT4_GAME_NAME',
    initialState: getInitialState(),
    component: connect4Component,
    riddleLevels,
    getPossibleMoves: getPossibleMoves,
    getStateScoreForIndex0: getStateScoreForIndex0,
  };
}

const connect4Component: React.FunctionComponent<GameProps<IState, RiddleData>> = (
  props: GameProps<IState, RiddleData>
) => {
  const {move, setMove, yourPlayerIndex, riddleData} = props;
  const {turnIndex, state} = move;
  console.log('Render TicTacToe props=', props);

  function clickedOn(row: number, col: number) {
    console.log(riddleLevels);
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
                            state.board[r][c] != 'Y' && state.board[r][c] != 'R' && riddleData == 'E'
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
      </View>
    </View>
  );
};
