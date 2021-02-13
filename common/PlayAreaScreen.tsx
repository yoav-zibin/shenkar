/* eslint @typescript-eslint/no-var-requires: "off" */
import React, {ReactChild} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Button} from 'react-native';
import {commonStyles, IMove, useEffectToSetAndClearTimeout} from './common';
import {createComputerMove} from './alphaBetaService';
import {navigateNextFrame, useStoreContext} from './store';
import {localize, LocalizeId} from './localize';
import {ProgressBar} from './ProgressBar';
import {findGameModule} from './gameModules';
import {useNavigation} from '@react-navigation/native';
import {Audio} from 'expo-av';
import {Sound} from 'expo-av/build/Audio';
import PassedStage from './PassedStage';

const styles = StyleSheet.create({
  bottomView: {
    marginBottom: 20,
    marginTop: 20,
  },
  text: {
    fontSize: 19,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  instructions: {
    marginTop: 5,
    color: 'grey',
    textAlign: 'center',
  },
  hintButton: {
    paddingLeft: '35%',
    paddingRight: '35%',
  },
});

// checkers move sound flag, every move include two clicks
let checkersFlag = true;

export function PlayAreaScreen() {
  const [sound, setSound] = React.useState<Sound | undefined>(undefined);
  const navigation = useNavigation();
  const {appState, dispatch} = useStoreContext();
  const {activityState, selectedGameId, activity, moveSound} = appState;
  const gameModule = findGameModule(selectedGameId);
  if (!activity || !activityState) {
    return null;
  }
  // console.log('Render PlayArea activity=', activity);

  const {riddleActivity, activityType} = activity;
  const {yourPlayerIndex, initialMove, currentMove, currentMoveNum, maxMovesNum, showHint} = activityState;
  const opponentPlayerIndex = 1 - yourPlayerIndex;
  const {turnIndex, endMatchScores, state} = currentMove;
  const isOverMaxMoves = maxMovesNum && currentMoveNum >= maxMovesNum;
  const isActivityOver = endMatchScores || isOverMaxMoves;
  // useEffect and useContext must be top level (not inside any conditions), see
  // https://reactjs.org/docs/hooks-rules.html
  useEffectToSetAndClearTimeout(() => {
    // Does the AI need to make a move?
    if (!isActivityOver && turnIndex != yourPlayerIndex) {
      // do AI move after 1 second (to finish any ongoing animations)
      // Give the AI 1 second to find the best move.
      // TODO: have an API to specify the duration of the animations.
      const millisecondsLimit = 1000;
      return setTimeout(() => {
        console.log('Searching AI move...');
        setMove(createComputerMove(state, turnIndex, {millisecondsLimit}, gameModule));
        console.log('Found AI move.');
      }, 1000);
    }
    return null;
  });

  // Set the showHint to be true when the get hint button is pressed
  const getHintPressed = () => {
    dispatch({
      setActivityState: {
        ...activityState,
        showHint: true,
      },
    });
  };

  // Button component only for the riddleActivity appState, will be visible only when the
  // hint is not presented yet and the riddle is not over
  let getHintButton: ReactChild | null = null;
  if (riddleActivity && !isActivityOver) {
    if (!showHint)
      getHintButton = (
        <View style={styles.hintButton}>
          <Button title={localize('GET_HINT', appState)} color="grey" onPress={getHintPressed} />
        </View>
      );
    else
      getHintButton = (
        <View style={styles.hintButton}>
          <Button title={localize('GET_HINT', appState)} disabled color="grey" onPress={getHintPressed} />
        </View>
      );
  }

  React.useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  async function playSound() {
    if (gameModule.gameId == 'checkers' && checkersFlag) {
      checkersFlag = false;
      return;
    }
    const {sound} = await Audio.Sound.createAsync(require('./playbacks/move.mp3'));
    setSound(sound);
    await sound.playAsync();
    checkersFlag = true;
  }

  let gameOverLocalizeId: LocalizeId | null = null;
  if (isActivityOver) {
    if (endMatchScores) {
      const youWon = endMatchScores[yourPlayerIndex] > endMatchScores[opponentPlayerIndex];
      if (riddleActivity) {
        gameOverLocalizeId = youWon ? 'RIDDLE_SOLVED' : 'RIDDLE_FAILED';
      } else {
        if (endMatchScores[0] == endMatchScores[1]) {
          gameOverLocalizeId = 'NOBODY_WON';
        } else {
          if (activityType == 'PASS_AND_PLAY') {
            gameOverLocalizeId = endMatchScores[0] > endMatchScores[1] ? 'FIRST_PLAYER_WON' : 'SECOND_PLAYER_WON';
          } else {
            gameOverLocalizeId = youWon ? 'YOU_WON' : 'YOU_LOST';
          }
        }
      }
    }
    if (!gameOverLocalizeId && isOverMaxMoves) {
      gameOverLocalizeId = 'RIDDLE_FAILED';
    }
  }

  const nextActionLocalizeId: LocalizeId | null =
    gameOverLocalizeId == 'RIDDLE_FAILED'
      ? 'TRY_RIDDLE_AGAIN'
      : gameOverLocalizeId == 'RIDDLE_SOLVED'
      ? 'NEXT_RIDDLE'
      : gameOverLocalizeId
      ? 'PLAY_AGAIN'
      : null;

  function nextAction() {
    if (nextActionLocalizeId == 'TRY_RIDDLE_AGAIN') {
      dispatch({setActivity: activity});
    } else if (nextActionLocalizeId == 'NEXT_RIDDLE' && riddleActivity) {
      const {levelIndex, riddleIndex} = riddleActivity;
      const level = gameModule.riddleLevels[levelIndex];
      if (riddleIndex < level.riddles.length - 1) {
        dispatch({setActivity: {riddleActivity: {levelIndex, riddleIndex: riddleIndex + 1, riddleFinished: false}}});
      } else if (levelIndex < gameModule.riddleLevels.length - 1) {
        console.log(riddleActivity.riddleFinished);
        dispatch({setActivity: {riddleActivity: {levelIndex: levelIndex + 1, riddleIndex: 0, riddleFinished: true}}});
      } else {
        // Finished all activities!
        // TODO: we should show something fun!
        // Clearing activity (to let the user choose what next).
        console.log(riddleActivity.riddleFinished);
        dispatch({clearActivity: true});
        navigateNextFrame('ChooseActivity', navigation);
      }
    } else if (nextActionLocalizeId == 'PLAY_AGAIN') {
      // TODO: if AGAINST_COMPUTER,
      // then we should switch colors (change yourPlayerIndex) by calling setActivityState.
      dispatch({setActivity: activity});
    }
  }

  function setHumanMove(chosenMove: IMove<unknown>) {
    if (yourPlayerIndex != currentMove.turnIndex) throw new Error('human cannot move!'); // bug in game
    setMove(chosenMove);
  }

  function setMove(chosenMove: IMove<unknown>) {
    const didTurnIndexChange = currentMove.turnIndex != chosenMove.turnIndex;
    const nextYourPlayerIndex = activityType == 'PASS_AND_PLAY' ? chosenMove.turnIndex : yourPlayerIndex;
    if (moveSound) playSound();
    dispatch({
      setActivityState: {
        yourPlayerIndex: nextYourPlayerIndex,
        initialMove,
        currentMove: chosenMove,
        currentMoveNum: currentMoveNum + (didTurnIndexChange ? 1 : 0),
        maxMovesNum,
        showHint: false,
      },
    });
  }

  return (
    <View style={commonStyles.screen}>
      {gameModule.component({
        move: currentMove,
        setMove: setHumanMove,
        yourPlayerIndex,
        showHint,
      })}
      {nextActionLocalizeId ? null : <ProgressBar></ProgressBar>}
      <View style={styles.bottomView}>
        {getHintButton}
        {riddleActivity?.riddleFinished ? <PassedStage></PassedStage> : <></>}
        {gameOverLocalizeId && nextActionLocalizeId && (
          <>
            <Text style={styles.text}>{localize(gameOverLocalizeId, appState)}</Text>
            <TouchableOpacity onPress={() => nextAction()}>
              <Text style={styles.instructions}>{localize(nextActionLocalizeId, appState)}</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}
