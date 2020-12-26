import React from 'react';
import {
  /* Animated, */ StyleSheet,
  TouchableWithoutFeedback,
  View,
  Image,
  ImageBackground /* ViewStyle */,
} from 'react-native';

import {GameModule, GameProps} from '../../common/common';

import {
  createMove,
  IState,
  getInitialState,
  checkRiddleData /* createMiniMove, getAllPossibleMoves */,
} from '../gameLogic';
import {getPossibleMoves, getStateScoreForIndex0} from '../aiService';
import {riddleLevels} from '../riddles';
// import { BoardDelta } from '../../tictactoe/gameLogic';

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
  //   hintLineCol: {
  //     position: 'absolute',
  //     width: 8,
  //     height: '100%',
  //     backgroundColor: hintLineColor,
  //   },
  //   hintLineRow: {
  //     position: 'absolute',
  //     width: '100%',
  //     height: 8,
  //     backgroundColor: hintLineColor,
  //   },
  //   hintLineDiagonal1: {
  //     position: 'absolute',
  //     width: 8,
  //     height: '100%',
  //     backgroundColor: hintLineColor,
  //     transform: [{rotate: '135deg'}],
  //     left: '50%',
  //   },
  //   hintLineDiagonal2: {
  //     position: 'absolute',
  //     width: 8,
  //     height: '100%',
  //     backgroundColor: hintLineColor,
  //     transform: [{rotate: '45deg'}],
  //     left: '50%',
  //   },
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
  const {move, setMove, yourPlayerIndex /* showHint */} = props;
  const {turnIndex, state} = move;
  const {/* riddleData,*/ board, miniMoves} = state;
  // console.log('Render Checkers miniMoves=', miniMoves);

  function clickedOn(row: number, col: number) {
    console.log(turnIndex);
    console.log(yourPlayerIndex);
    if (turnIndex != yourPlayerIndex) {
      return;
    }

    // check IF it is a piece choose
    // IT HAS TO BE EXIST IN THE SQURE
    // IT HAS TO MUCH THE PLAYER HOW IT IS HIS TURV
    // if (miniMoves.length > 0) {
    //   const fromDelta: BoardDelta = { col: col, row: row };
    //   const allPMoves : BoardDelta[] = getAllPossibleMoves(board,fromDelta,turnIndex);

    // }

    try {
      const move = createMove(board, miniMoves, turnIndex);

      setMove(move);
    } catch (e) {
      console.info('Cell is already full in position:', row, col);
    }
  }

  const rows = [0, 1, 2, 3, 4, 5, 6, 7];
  const cols = [0, 1, 2, 3, 4, 5, 6, 7];

  // let hintLine = null;

  function getPiece(r: number, c: number) {
    if (board[r][c] == '--') return null;
    if (board[r][c] == 'DS') return null;
    return (
      <Image
        style={styles.pieceImage}
        source={board[r][c] == 'BM' ? require('../imgs/white_man.png') : require('../imgs/black_man.png')}
      />
    );
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
        {/* {hintLine} */}
      </View>
    </View>
  );
};

