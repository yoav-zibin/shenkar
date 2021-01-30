import React, {useState} from 'react';
import {localize} from '../../common/localize';
import {useStoreContext} from '../../common/store';
import {Animated, StyleSheet, TouchableWithoutFeedback, View, ImageBackground, Text, Dimensions} from 'react-native';
import {GameModule, GameProps} from '../../common/common';
import {
  Board,
  createMove,
  IState,
  getInitialState,
  checkRiddleData,
  PLAYER1_INDEX,
  PLAYER2_INDEX,
  BASE_INDEX,
} from '../gameLogic';
import {getPossibleMoves, getStateScoreForIndex0} from '../aiService';
import {riddleLevels} from '../riddles';
const window = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  boardImage: {
    flex: 1,
    resizeMode: 'cover',
    alignItems: 'center',
  },
  innerBoardContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  BoardRow: {
    flexDirection: 'row',
  },
  HolesContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  CellContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellText: {
    transform: [{rotate: '270deg'}],
    fontSize: 22,
    marginLeft: 3,
    marginRight: 3,
  },
  StonesOuterContainerHint: {
    borderColor: 'white',
    borderWidth: 1,
  },
  StonesOuterContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    borderRadius: 100,
    width: window.height / 12.8,
    height: window.height / 12.8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '4%',
    marginBottom: '4%',
    marginLeft: '2%',
    marginRight: '2%',
  },
  StonesInnerContainer: {
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  BaseHole: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    borderRadius: 100,
    width: window.width / 2.85,
    height: window.height / 17.92,
  },
  stone: {
    height: window.height / 12.8 / 7,
    width: window.height / 12.8 / 7,
    borderRadius: 20,
    margin: 1,
    backgroundColor: '#F6742B',
  },
  playerText: {
    fontSize: 28,
    color: 'white',
  },
  playerTextContainer: {
    justifyContent: 'center',
  },
  selectedPlayerText: {
    fontWeight: 'bold',
    color: '#9AE469',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 2,
  },
  BaseHoleText: {
    fontSize: 22,
    color: 'white',
    transform: [{rotate: '270deg'}],
  },
});
export function getMancalaModule(): GameModule<IState> {
  return {
    gameId: 'mancala',
    gameLocalizeId: 'MANCALA_GAME_NAME',
    initialState: getInitialState(),
    component: MancalaComponent,
    riddleLevels,
    getPossibleMoves,
    getStateScoreForIndex0,
    checkRiddleData,
  };
}

const MancalaComponent: React.FunctionComponent<GameProps<IState>> = (props: GameProps<IState>) => {
  const {move, setMove, yourPlayerIndex, showHint} = props;
  const {turnIndex, state} = move;
  const {board} = state;
  const [prevBoard, setPrevBoard] = useState<Board>();
  const {appState} = useStoreContext();
  const initOpacity = new Animated.Value(0);
  Animated.timing(initOpacity, {
    toValue: 1,
    duration: 1000,
    useNativeDriver: true,
  }).start();

  function clickedOn(playerRow: number, cell: number) {
    setPrevBoard(board);
    if (turnIndex != yourPlayerIndex) {
      return;
    }
    try {
      const move = createMove(state, playerRow, cell, turnIndex);
      setMove(move);
    } catch (e) {
      console.info('Cell is already full in position:', playerRow, cell);
    }
  }

  const cols = [0, 1, 2, 3, 4, 5];
  function getStones(playerRow: number, cell: number) {
    console.log('showHint', showHint);
    const doShowHint = showHint && playerRow === turnIndex && board[playerRow][cell] !== 0;
    const stones = [];
    let isDifferent = false;
    if (prevBoard) {
      isDifferent = prevBoard[playerRow][cell] !== board[playerRow][cell];
    }
    for (let i = 0; i < board[playerRow][cell]; i++) {
      if (isDifferent && i === board[playerRow][cell] - 1 && !doShowHint) {
        stones.push(<Animated.View style={[styles.stone, {opacity: initOpacity}]}></Animated.View>);
      } else {
        stones.push(<View style={styles.stone}></View>);
      }
    }
    return (
      <View style={styles.CellContainer}>
        {playerRow === 1 ? <Text style={styles.cellText}>{board[playerRow][cell]}</Text> : null}
        <View style={[styles.StonesOuterContainer, doShowHint ? styles.StonesOuterContainerHint : null]}>
          <View style={styles.StonesInnerContainer}>{stones}</View>
        </View>
        {playerRow === 0 ? <Text style={styles.cellText}>{board[playerRow][cell]}</Text> : null}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.boardImage} source={require('../imgs/wood2.png')}>
        <View style={styles.BaseHole}>
          <Text style={styles.BaseHoleText}>{board[PLAYER1_INDEX][BASE_INDEX]}</Text>
        </View>
        <View style={styles.innerBoardContainer}>
          <View style={styles.playerTextContainer}>
            <Text
              style={[
                styles.playerText,
                {transform: [{rotate: '90deg'}]},
                turnIndex === 1 ? styles.selectedPlayerText : null,
              ]}>
              {localize('PLAYER_2_TITLE', appState)}
            </Text>
          </View>
          <View style={styles.HolesContainer}>
            {cols.map((d) => (
              <View key={d} style={styles.BoardRow}>
                <TouchableWithoutFeedback key={d} onPress={() => clickedOn(1, d)}>
                  {getStones(1, d)}
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback key={d} onPress={() => clickedOn(0, 5 - d)}>
                  {getStones(0, 5 - d)}
                </TouchableWithoutFeedback>
              </View>
            ))}
          </View>
          <View style={styles.playerTextContainer}>
            <Text
              style={[
                styles.playerText,
                {transform: [{rotate: '270deg'}]},
                turnIndex === 0 ? styles.selectedPlayerText : null,
              ]}>
              {localize('PLAYER_1_TITLE', appState)}
            </Text>
            <View></View>
          </View>
        </View>
        <View style={styles.BaseHole}>
          <Text style={styles.BaseHoleText}>{board[PLAYER2_INDEX][BASE_INDEX]}</Text>
        </View>
      </ImageBackground>
    </View>
  );
};
