import {Choice, FlatListChooser} from './FlatListChooser';
import React from 'react';
import {Activity, navigateNextFrame, useStoreContext} from './store';
import {localize, LocalizeId} from './localize';
import {TitleBar} from './TitleBar';
import {findGameModule} from './gameModules';
import {useNavigation} from '@react-navigation/native';
import {commonStyles} from './common';
import {View} from 'react-native';

export function ChooseActivityScreen() {
  const {appState, dispatch} = useStoreContext();
  const navigation = useNavigation();
  if (!appState.selectedGameId) return null;
  const gameModule = findGameModule(appState.selectedGameId);
  // We either choose a riddle or play activity.
  const riddleLevels = gameModule.riddleLevels;
  const choices: Choice<Activity>[] = [];
  for (let levelIndex = 0; levelIndex < riddleLevels.length; levelIndex++) {
    const level = riddleLevels[levelIndex];
    choices.push(
      getActivityChoice(level.levelLocalizeId, {
        riddleActivity: {levelIndex, riddleIndex: 0},
      })
    );
  }

  function getActivityChoice(localizeId: LocalizeId, activity: Activity): Choice<Activity> {
    return {
      id: localizeId,
      text: localize(localizeId, appState),
      data: activity,
    };
  }

  choices.push(getActivityChoice('AGAINST_COMPUTER', {activityType: 'AGAINST_COMPUTER'}));
  choices.push(getActivityChoice('PASS_AND_PLAY', {activityType: 'PASS_AND_PLAY'}));

  return (
    <View style={commonStyles.screen}>
      <TitleBar />
      <FlatListChooser
        choices={choices}
        setChoice={(choice) => {
          dispatch({setActivity: choice.data});
          navigateNextFrame('PlayArea', navigation);
        }}
      />
    </View>
  );
}
