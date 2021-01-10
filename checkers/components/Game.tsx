import React from 'react';

import {StyleSheet, TouchableWithoutFeedback, View, Image, ImageBackground, Text} from 'react-native';
import {GameModule, GameProps} from '../../common/common';
import {localize} from '../../common/localize';
import {useStoreContext} from '../../common/store';

import {
  IState,
  getInitialState,
  checkRiddleData,
  isOwnColor,
  getColor,
  BoardDelta,
  getAllPossibleMoves,
  createMiniMove,
} from '../gameLogic';
import {getPossibleMoves, getStateScoreForIndex0} from '../aiService';
import {riddleLevels} from '../riddles';

let allPossibleMoves: BoardDelta[] = [];
let selectedMovingPiece: BoardDelta;
let pieceIsSelected = false;

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
  const {appState} = useStoreContext();
  const {move, setMove, showHint} = props;
  const {turnIndex, state} = move;
  const {riddleData, board /* miniMoves */} = state;

  let hint: boolean | null = false;
  let rowHint: boolean | null = false;
  let ridRow: number;
  let ridCol: number;

  if (showHint && riddleData) {
    if (riddleData.length == 1) {
      ridRow = parseInt(riddleData[0], 10);
      rowHint = true;
    } else {
      ridRow = parseInt(riddleData[0], 10);
      ridCol = parseInt(riddleData[1], 10);
      hint = true;
    }
  } else {
    rowHint = false;
    hint = false;
  }

  function showPossibleMoves() {
    allPossibleMoves.forEach((element) => {
      board[element.row][element.col] = 'SH';
    });
    setMove(move);
  }
  function removeSHFromBoard() {
    allPossibleMoves.forEach((element) => {
      board[element.row][element.col] = 'DS';
    });
  }

  function clickedOn(row: number, col: number) {
    if (riddleData && hint) {
      board[ridRow][ridCol] = 'WM';
    }
    if (riddleData && rowHint) {
      for (let i = 0; i < 7; i += 2) {
        board[ridRow][i] = 'WM';
      }
    }
    state.error = null;
    try {
      if (pieceIsSelected) {
        pieceIsSelected = false;
        removeSHFromBoard();
        const toDelta = {col: col, row: row};
        const fromDelta = {col: selectedMovingPiece.col, row: selectedMovingPiece.row};
        const Nmove = createMiniMove(board, fromDelta, toDelta, turnIndex);
        setMove(Nmove);
      }
      if (isOwnColor(turnIndex, getColor(board[row][col]))) {
        pieceIsSelected = true;
        selectedMovingPiece = {col: col, row: row};
        allPossibleMoves = getAllPossibleMoves(board, selectedMovingPiece, turnIndex);
        showPossibleMoves();
      }
    } catch (e) {
      state.error = e.message;
      const errorUpdate = {endMatchScores: move.endMatchScores, turnIndex: move.turnIndex, state: move.state};
      state.error = localize(e.message, appState);
      console.log('error:', state.error, 'appstate:', appState);
      setMove(errorUpdate);
    }
  }

  const rows = [0, 1, 2, 3, 4, 5, 6, 7];
  const cols = [0, 1, 2, 3, 4, 5, 6, 7];

  function getPiece(r: number, c: number) {
    if (board[r][c] == '--') return null;
    if (board[r][c] == 'DS') return null;
    let piece;
    if (hint) {
      board[ridRow][ridCol] = 'WMH';
    }
    if (rowHint) {
      for (let i = 0; i < 7; i += 2) {
        board[ridRow][i] = 'WMH';
      }
    }
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
      case 'WK': {
        piece = require('../imgs/white_cro.png');
        break;
      }
      case 'WMH': {
        piece = require('../imgs/white_man_hint.png');
        break;
      }
      case 'SH': {
        piece = require('../imgs/green_square.jpeg');
        break;
      }
    }

    return <Image style={styles.pieceImage} source={piece} />;
  }
  return (
    <ImageBackground
      source={require('../imgs/back.jpg')}
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
      imageStyle={{opacity: 0.8}}>
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
          <View style={styles.bottomView}>{<Text style={styles.text}>{state.error}</Text>}</View>
        </View>
      </View>
    </ImageBackground>
  );
};
