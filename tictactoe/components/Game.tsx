import React from 'react';
import {StyleSheet, TouchableWithoutFeedback, View, Text, Image, ImageBackground} from 'react-native';

import {GameModule, GameProps} from '../../common/common';

import {createMove, ROWS, COLS, IState, getInitialState} from '../gameLogic';
import {getPossibleMoves, getStateScoreForIndex0} from '../aiService';

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
});

export default function getTicTacToeGameModule(): GameModule<IState> {
  return {
    gameId: 'tictactoe',
    gameName: 'TicTacToe',
    initialState: getInitialState(),
    component: TicTacToeComponent,
    getPossibleMoves: getPossibleMoves,
    getStateScoreForIndex0: getStateScoreForIndex0,
  };
}

const TicTacToeComponent: React.FunctionComponent<GameProps<IState>> = (props: GameProps<IState>) => {
  const {move, setMove, yourPlayerIndex} = props;
  const {turnIndex, state} = move;

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

  const allCircles: number[] = [];
  const allCrosses: number[] = [];
  const rows = [0, 1, 2];
  const cols = [0, 1, 2];
  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      const cell = state.board[i][j];
      const id = ROWS * i + j;
      if (cell == 'X') allCrosses.push(id);
      if (cell == 'O') allCircles.push(id);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.fixedRatio}>
        <ImageBackground style={styles.boardImage} source={require('../imgs/Board.png')}>
          <View style={styles.boardRowsContainer}>
            {rows.map((r) => (
              <View key={r} style={styles.boardCellsContainer}>
                {cols.map((c) => (
                  <TouchableWithoutFeedback key={c} onPress={() => clickedOn(r, c)}>
                    <View style={styles.boardCell}>
                      {state.board[r][c] != '' ? (
                        <Image
                          style={styles.pieceImage}
                          source={state.board[r][c] == 'X' ? require('../imgs/X.png') : require('../imgs/O.png')}
                        />
                      ) : null}
                    </View>
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
