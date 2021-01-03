import React from 'react';
import {
  /* Animated, */ StyleSheet,
  TouchableWithoutFeedback,
  View,
  Text,
  Image,
  ImageBackground /* ViewStyle */,
} from 'react-native';

import {GameModule, GameProps} from '../../common/common';

import {
  // createMove,
  IState,
  getInitialState,
  checkRiddleData,
  getAllPossibleMoves,
  isOwnColor,
  createMiniMove,
  getColor,
} from '../gameLogic';
import {getPossibleMoves, getStateScoreForIndex0} from '../aiService';
import {riddleLevels} from '../riddles';
import {BoardDelta} from '../../tictactoe/gameLogic';

// const hintLineColor = 'green';

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
    width: '12.5%',
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
  bottomView: {
    height: 100,
  },
  text: {
    marginTop: 20,
    fontSize: 19,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default function getCheckersGameModule(): GameModule<IState> {
  return {
    gameId: 'checkers',
    gameLocalizeId: 'CHECKERS_GAME_NAME',
    initialState: getInitialState(),
    component: CheckersComponent,
    riddleLevels,
    getPossibleMoves,
    getStateScoreForIndex0,
    checkRiddleData,
  };
}

const CheckersComponent: React.FunctionComponent<GameProps<IState>> = (props: GameProps<IState>) => {
  const {move, setMove /* , yourPlayerIndex, showHint */} = props;
  const {turnIndex, state} = move;
  const {board /* riddleData, miniMoves */} = state;
  // console.log('Render Checkers miniMoves=', miniMoves);
  // let fromDelta: BoardDelta;
  let allPMoves: BoardDelta[] = [];
  let selectedMovingPiece: BoardDelta;

  function clickedOn(row: number, col: number) {
    try {
      for (const eachM of allPMoves) {
        if (eachM.row == row && eachM.col == col) {
          const toDelta = {col: col, row: row};
          const fromDelta = {col: selectedMovingPiece.col, row: selectedMovingPiece.row};
          const nextMove = createMiniMove(board, fromDelta, toDelta, turnIndex);
          setMove(nextMove);
        }
      }
      if (isOwnColor(turnIndex, getColor(board[row][col]))) {
        const fromDelta: BoardDelta = {col: col, row: row};
        selectedMovingPiece = {col: col, row: row};
        allPMoves = getAllPossibleMoves(board, fromDelta, turnIndex);
        console.log(allPMoves);
        if (allPMoves.length == 0) {
          console.log('No valid moves');
        }
      } else {
        allPMoves = [];
      }
    } catch (e) {
      console.log('printing error:', e.message);
      state.error = e.message;
      const errorUpdate = {endMatchScores: move.endMatchScores, turnIndex: move.turnIndex, state: move.state};
      setMove(errorUpdate);
    }
  }

  const rows = [0, 1, 2, 3, 4, 5, 6, 7];
  const cols = [0, 1, 2, 3, 4, 5, 6, 7];

  // let hintLine = null;

  function getPiece(r: number, c: number) {
    if (board[r][c] == '--') return null;
    if (board[r][c] == 'DS') return null;
    let piece;

    switch (board[r][c]) {
      case 'BM': {
        piece = require('../imgs/black_man.png');
        break;
      }
      case 'WM': {
        piece = require('../imgs/white_man.png');
        break;
      }
      case 'BK': {
        piece = require('../imgs/black_cro.png');
        break;
      }
      case 'WK':
        piece = require('../imgs/white_cro.png');
    }

    return <Image style={styles.pieceImage} source={piece} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.fixedRatio}>
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
        <View style={styles.bottomView}>
          <Text style={styles.text}>{state.error}</Text>
        </View>
      </View>
    </View>
  );
};
