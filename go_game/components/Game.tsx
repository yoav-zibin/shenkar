import {Animated, StyleSheet, TouchableWithoutFeedback, View, Image, ImageBackground, ViewStyle} from 'react-native';

import {GameModule, GameProps} from '../../common/common';

import {createMove, IState, getInitialState, checkRiddleData} from '../gameLogic';
import {getPossibleMoves, getStateScoreForIndex0} from '../aiService';
import {riddleLevels, riddleHints} from '../riddles';

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
  hintLineDot: {
    position: 'absolute',
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: hintLineColor,
  },
});

export default function getGoGameModule(): GameModule<IState> {
  return {
    gameId: 'go',
    gameLocalizeId: 'GO_GAME_NAME',
    initialState: getInitialState(),
    component: GoComponent,
    riddleLevels,
    getPossibleMoves,
    getStateScoreForIndex0,
    checkRiddleData,
  };
}

const GoComponent: React.FunctionComponent<GameProps<IState>> = (props: GameProps<IState>) => {
  const {move, setMove, yourPlayerIndex, showHint} = props;
  const {turnIndex, state} = move;
  const {riddleData, board, delta, riddleWin} = state;
  console.log('Render Go delta=', delta);

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
      const move = createMove(state.board, 0, null, {row, col}, 0, null, riddleWin, riddleData);
      setMove(move);
    } catch (e) {
      console.info('Cell is already full in position:', row, col);
    }
  }

  const rows = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const cols = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  let hintDot = null;
  if (showHint && riddleData) {
    let style: ViewStyle = {};
    if (riddleData.startsWith('r')) {
      style = {...styles.hintLineDot};
      const {row, col} : { row: number; col: number } = riddleHints(riddleData);
      style.top = 100 / 7.9 + (row-1) * (100 / 9) + '%';
      style.left = 100 / 7.9 + (col-1) * (100 / 9) + '%';
    } else throw new Error('Illegal riddleData=' + riddleData);
    // hintDot = <View style={style}/>
    hintDot = <View style={style} pointerEvents="none"/>
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
        {hintDot}
      </View>
    </View>
  );
};
