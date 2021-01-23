import React, {useState} from 'react';
import {Animated, StyleSheet, TouchableWithoutFeedback, View, Image, ImageBackground, ViewStyle} from 'react-native';
import {GameModule, GameProps} from '../../common/common';

import {createMove, IState, getInitialState, checkRiddleData, ROWS, Board, p, COLS} from '../gameLogic';
import {getPossibleMoves, getStateScoreForIndex0} from '../aiService';
import {riddleLevels} from '../riddles';
import {BoardDelta} from '../../tictactoe/gameLogic';

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
    top: '5%',
  },
});
function getWinnerPo(board: Board) {
  console.log('dana');
  console.log(board);
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      if (
        p(y, x, board) !== '0' &&
        p(y, x, board) !== ' ' &&
        p(y, x, board) === p(y, x + 1, board) &&
        p(y, x, board) === p(y, x + 2, board) &&
        p(y, x, board) === p(y, x + 3, board)
      ) {
        const array1: BoardDelta[] = [
          {row: y, col: x},
          {row: y, col: x + 1},
          {row: y, col: x + 2},
          {row: y, col: x + 3},
        ];
        return array1;
      }
    }
  }
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      if (
        p(y, x, board) !== '0' &&
        p(y, x, board) !== ' ' &&
        p(y, x, board) === p(y + 1, x, board) &&
        p(y, x, board) === p(y + 2, x, board) &&
        p(y, x, board) === p(y + 3, x, board)
      ) {
        const array1: BoardDelta[] = [
          {row: y, col: x},
          {row: y + 1, col: x},
          {row: y + 2, col: x},
          {row: y + 3, col: x},
        ];
        return array1;
      }
    }
  }

  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      for (let d = -1; d <= 1; d += 2) {
        if (
          p(y, x, board) !== '0' &&
          p(y, x, board) !== ' ' &&
          p(y, x, board) === p((y + 1) * d, x + 1, board) &&
          p(y, x, board) === p((y + 2) * d, x + 2, board) &&
          p(y, x, board) === p((y + 3) * d, x + 3, board)
        ) {
          const array1: BoardDelta[] = [
            {row: y, col: x},
            {row: y + 1, col: x + 1},
            {row: y + 2, col: x + 2},
            {row: y + 3, col: x + 3},
          ];
          return array1;
        }
      }
    }
  }
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      for (let d = -1; d <= 1; d += 2) {
        if (
          p(y, x, board) !== '0' &&
          p(y, x, board) !== ' ' &&
          p(y, x, board) === p((y + 1) * d, x - 1, board) &&
          p(y, x, board) === p((y + 2) * d, x - 2, board) &&
          p(y, x, board) === p((y + 3) * d, x - 3, board)
        ) {
          const array1: BoardDelta[] = [
            {row: y, col: x},
            {row: y + 1, col: x - 1},
            {row: y + 2, col: x - 2},
            {row: y + 3, col: x - 3},
          ];
          return array1;
        }
      }
    }
  }
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      if (p(y, x, board) === ' ') {
        return null;
      }
    }
  }

  return null;
}
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
  const {riddleData, board, delta} = state;
  const [boardHeight, setBoardHeight] = useState(300);
  const animValue = new Animated.Value(0);
  Animated.timing(animValue, {
    toValue: 1,
    duration: 700,
    useNativeDriver: true,
  }).start();

  function clickedOn(row: number, col: number) {
    if (turnIndex != yourPlayerIndex) {
      return;
    }
    try {
      const move = createMove(state, getplace(col), col, turnIndex);

      setMove(move);
    } catch (e) {
      console.info('Cell is already full in position:', row, col);
    }
  }

  function getAnimationStyle(r: number) {
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
  function getplace(c: number) {
    let i = 5;
    while (i >= 0) {
      if (board[i][c] == ' ') {
        return i;
      }

      i--;
    }
    return -1;
  }

  function getAnimationStyleWin() {
    return {opacity: animValue};
  }
  function getPiece(r: number, c: number) {
    if (board[r][c] == ' ') return null;

    const ad: BoardDelta[] | null = getWinnerPo(state.board);
    const shouldAnimate = delta && delta.row == r && delta.col == c;
    const animStyle = shouldAnimate && ad == null ? getAnimationStyle(r) : ad != null ? getAnimationStyleWin() : {};

    if (ad != null) {
      if (
        (r == ad[0].row && c == ad[0].col) ||
        (r == ad[1].row && c == ad[1].col) ||
        (r == ad[2].row && c == ad[2].col) ||
        (r == ad[3].row && c == ad[3].col)
      ) {
        return (
          <Animated.View style={animStyle}>
            <Image
              style={styles.pieceImage}
              source={state.board[r][c] == 'Y' ? require('../imgs/p1.png') : require('../imgs/p2.png')}
            />
          </Animated.View>
        );
      } else {
        return (
          <Image
            style={styles.pieceImage}
            source={state.board[r][c] == 'Y' ? require('../imgs/p1.png') : require('../imgs/p2.png')}
          />
        );
      }
    }
    return (
      <Animated.View style={animStyle}>
        <Image
          style={styles.pieceImage}
          source={state.board[r][c] == 'Y' ? require('../imgs/p1.png') : require('../imgs/p2.png')}
        />
      </Animated.View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.fixedRatio} onLayout={(event) => setBoardHeight(event.nativeEvent.layout.height)}>
        <ImageBackground style={styles.boardImage} source={require('../imgs/connect_board.png')}>
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
