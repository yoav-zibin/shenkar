import React from 'react';
import {StyleSheet, TouchableWithoutFeedback, View, Image, ImageBackground, ViewStyle} from 'react-native';

import {GameModule, GameProps, IMove} from '../../common/common';

import {createMove, IState, getInitialState, RiddleData} from '../gameLogic';
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

function isPosOnHintLine(row: number, col: number, hint: RiddleData) {
  switch (hint) {
    case 'r1':
      return row == 0;
    case 'r2':
      return row == 1;
    case 'r3':
      return row == 2;
    case 'c1':
      return col == 0;
    case 'c2':
      return col == 1;
    case 'c3':
      return col == 2;
    case 'd1':
      return col == row;
    case 'd2':
      return col == 2 - row;
  }
}
function checkRiddleData(state: IState, turnIndex: number, firstMoveSolutions: IMove<IState>[]): boolean {
  const {riddleData} = state;
  return !riddleData
    ? false
    : firstMoveSolutions.some(
        (firstMove) =>
          firstMove.state.delta && isPosOnHintLine(firstMove.state.delta.row, firstMove.state.delta.col, riddleData)
      );
}

export default function getTicTacToeGameModule(): GameModule<IState> {
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
  const riddleData = state.riddleData;
  console.log('Render TicTacToe props=', props);

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
      const row = Number(riddleData.charAt(1)) - 1;
      style.top = 100 / 6 + row * (100 / 3) + '%';
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
        {hintLine}
      </View>
    </View>
  );
};
