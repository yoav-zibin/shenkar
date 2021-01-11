import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {commonStyles, IMove, secondsToShowHint, useEffectToSetAndClearTimeout} from './common';
import {createComputerMove} from './alphaBetaService';
import {navigateNextFrame, useStoreContext} from './store';
import {localize, LocalizeId} from './localize';
import {DEBUGGING_OPTIONS} from './debugging';
import {TitleBar} from './TitleBar';
import {findGameModule} from './gameModules';
import {useNavigation} from '@react-navigation/native';
import {Audio} from 'expo-av';
import {Sound} from 'expo-av/build/Audio';

const styles = StyleSheet.create({
  bottomView: {
    height: 100,
  },
  text: {
    marginTop: 20,
    fontSize: 19,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  instructions: {
    marginTop: 20,
    color: 'grey',
    marginBottom: 5,
    textAlign: 'center',
  },
});

// flag for sound in checkers every move include two clicks
let checkersFlag = true;
// backround suond flag
let backGroundMusic = false;

export function PlayAreaScreen() {
  const [sound, setSound] = React.useState<Sound | undefined>(undefined);
  const [backroundSound, setBackgroundSound] = React.useState<Sound | undefined>(undefined);
  const navigation = useNavigation();
  const {appState, dispatch} = useStoreContext();
  const {activityState, selectedGameId, activity} = appState;
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

  useEffectToSetAndClearTimeout(() => {
    // Show hint after a timeout if needed.
    if (!showHint && riddleActivity && currentMoveNum == 0) {
      const {levelIndex} = riddleActivity;
      const level = gameModule.riddleLevels[levelIndex];
      const millisUntilShowHint = DEBUGGING_OPTIONS.SHOW_HINT_AFTER_ONE_SECOND
        ? 1000
        : secondsToShowHint(level.difficulty);
      console.log('We will show hint in ' + millisUntilShowHint + ' millis');
      return setTimeout(() => {
        console.log('Showing hint');
        dispatch({
          setActivityState: {
            ...activityState,
            showHint: true,
          },
        });
      }, millisUntilShowHint);
    }
    return null;
  });

  React.useEffect(() => {
    if (!backGroundMusic) {
      playBackround();
      backGroundMusic = true;
    }
  }, [backroundSound]);

  React.useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  async function playSound() {
    const {sound} = await Audio.Sound.createAsync(require('./playbacks/move.mp3'));
    setSound(sound);
    await sound.playAsync();
  }

  async function playBackround() {
    const {sound} = await Audio.Sound.createAsync(require('./playbacks/smallWorld.mp3'));
    setBackgroundSound(sound);
    await sound.playAsync();
    await sound.setIsLoopingAsync(true);
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
        dispatch({setActivity: {riddleActivity: {levelIndex, riddleIndex: riddleIndex + 1}}});
      } else if (levelIndex < gameModule.riddleLevels.length - 1) {
        dispatch({setActivity: {riddleActivity: {levelIndex: levelIndex + 1, riddleIndex: 0}}});
      } else {
        // Finished all activities!
        // TODO: we should show something fun!
        // Clearing activity (to let the user choose what next).
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
    const nextYourPlayerIndex = activityType == 'PASS_AND_PLAY' ? 1 - yourPlayerIndex : yourPlayerIndex;
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
    if (gameModule.gameId == 'checkers' && checkersFlag) {
      checkersFlag = false;
      return;
    } else {
      playSound();
      checkersFlag = true;
    }
  }

  return (
    <View style={commonStyles.screen}>
      <TitleBar />
      {gameModule.component({
        move: currentMove,
        setMove: setHumanMove,
        yourPlayerIndex,
        showHint,
      })}
      <View style={styles.bottomView}>
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
