import React from 'react';
import {Animated, StyleSheet, TouchableWithoutFeedback, View, ImageBackground, Text, Platform} from 'react-native';

import {GameModule, GameProps} from '../../common/common';

import {
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
const styles = StyleSheet.create({
  container: {
    margin: 10,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
  },

  line: {
    position: 'absolute',
    width: 3,
    height: 306,
    backgroundColor: '#000',
    transform: [{translateX: 100}],
  },
  boardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
  },
  GameContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  BoardContainer: {
    flexDirection: Platform.OS === 'ios' ? 'row' : 'row-reverse',
  },
  Player2HolesContainer: {
    flexDirection: 'column',
    marginRight: Platform.OS === 'ios' ? 25 : 0,
    marginLeft: Platform.OS === 'ios' ? 0 : 25,
    marginTop: 7,
  },
  Player1HolesContainer: {
    flexDirection: 'column-reverse',
    marginLeft: Platform.OS === 'ios' ? 25 : 0,
    marginRight: Platform.OS === 'ios' ? 0 : 25,
    marginTop: 7,
  },
  HoleContainer: {
    flexDirection: Platform.OS === 'ios' ? 'row' : 'row-reverse',
    alignItems: 'center',
  },
  HoleStyle: {
    width: 70,
    height: 70,
    borderColor: '#000',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Platform.OS === 'ios' ? 'transparent' : 'rgba(255,255,255,0.3)',
    borderWidth: 2,
    overflow: 'hidden',
    shadowColor: 'black',
    shadowRadius: 5,
    shadowOpacity: 1,
    marginBottom: 3,
    marginTop: 3,
  },
  BaseHoleContainer: {
    width: 200,
    height: 40,
    backgroundColor: 'rgba(133,81,7,0.1)',
    borderWidth: 2,
    shadowColor: 'black',
    shadowRadius: 3,
    shadowOpacity: 1,
    borderRadius: 10,
    marginTop: Platform.OS === 'ios' ? 10 : 2,
    alignItems: 'center',
  },
  StoneText: {
    transform: [{rotate: '270deg'}],
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold',
    height: 40,
  },
  Player2Title: {
    transform: [{rotate: '90deg'}],
    fontSize: 30,
    color: 'white',
  },
  Player1Title: {
    transform: [{rotate: '270deg'}],
    fontSize: 30,
    color: 'white',
  },
  SelecterPlayerTitle: {
    fontWeight: 'bold',
    color: '#9AE469',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 2,
  },
  PlayerTitleContainer: {
    justifyContent: 'center',
  },
  StonesContainer: {
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  StoneStyle: {
    height: 10,
    width: 10,
    borderRadius: 20,
    margin: 1,
    backgroundColor: '#F6742B',
  },
  BaseHoleText: {
    transform: [{rotate: '270deg'}],
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold',
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
  const {move, setMove, yourPlayerIndex} = props;
  const {turnIndex, state} = move;
  const {board} = state;

  const animValue = new Animated.Value(0);
  Animated.timing(animValue, {
    toValue: 1,
    duration: 100,
    useNativeDriver: true,
  }).start();
  function clickedOn(playerRow: number, cell: number) {
    console.log('BOARD', board);
    console.info('Game , clickedOn player Row', playerRow, 'cell', cell);
    if (turnIndex != yourPlayerIndex) {
      return;
    }
    try {
      console.info('Game , clickedOn player Row', playerRow, 'cell', cell);
      const move = createMove(state, playerRow, cell, turnIndex);

      setMove(move);
    } catch (e) {
      console.info('Cell is already full in position:', playerRow, cell);
    }
  }
  const cols = [0, 1, 2, 3, 4, 5];
  function getStones(playerRow: number, cell: number) {
    const stones = [];
    for (let i = 0; i < board[playerRow][cell]; i++) {
      stones.push(
        <Animated.View
          style={[
            styles.StoneStyle,
            {
              opacity: animValue,
              transform: [
                {
                  scale: animValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.85, 1],
                  }),
                },
              ],
            },
          ]}></Animated.View>
      );
    }
    return (
      <View style={styles.HoleContainer}>
        <Text style={styles.StoneText}>{board[playerRow][cell]}</Text>
        <View style={styles.HoleStyle}>
          <View style={styles.StonesContainer}>{stones}</View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.boardImage} source={require('../imgs/wood.png')}>
        <View>
          <View style={styles.GameContainer}>
            <View style={styles.BaseHoleContainer}>
              <Text style={styles.BaseHoleText}>{board[PLAYER1_INDEX][BASE_INDEX]}</Text>
            </View>
            <View style={styles.BoardContainer}>
              <View style={styles.PlayerTitleContainer}>
                <Text style={turnIndex === 1 ? [styles.Player2Title, styles.SelecterPlayerTitle] : styles.Player2Title}>
                  Player 2
                </Text>
              </View>
              <View>
                <View style={styles.Player2HolesContainer}>
                  {cols.map((d) => (
                    <TouchableWithoutFeedback key={d} onPress={() => clickedOn(1, d)}>
                      {getStones(1, d)}
                    </TouchableWithoutFeedback>
                  ))}
                </View>
              </View>
              <View>
                <View style={styles.Player1HolesContainer}>
                  {cols.map((d) => (
                    <TouchableWithoutFeedback key={d} onPress={() => clickedOn(0, d)}>
                      {getStones(0, d)}
                    </TouchableWithoutFeedback>
                  ))}
                </View>
              </View>
              <View style={styles.PlayerTitleContainer}>
                <Text style={turnIndex === 0 ? [styles.Player1Title, styles.SelecterPlayerTitle] : styles.Player1Title}>
                  Player 1
                </Text>
              </View>
            </View>
            <View style={styles.BaseHoleContainer}>
              <Text style={styles.BaseHoleText}>{board[PLAYER2_INDEX][BASE_INDEX]}</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};
