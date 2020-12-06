import React from 'react';
import {ChooseGameScreen} from './ChooseGameScreen';
import {SettingsScreen} from './SettingsScreen';
import {AppState, useStoreContext} from './store';
import {findGameModule} from './gameModules';
import {PlayAreaScreen} from './PlayAreaScreen';
import {ChooseActivityScreen} from './ChooseActivityScreen';
// import { createStackNavigator } from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {localize} from './localize';

type RootStackParamList = {
  Settings: undefined;
  ChooseGame: undefined;
  ChooseActivity: undefined;
  PlayArea: undefined;
};

const Navigator = createDrawerNavigator<RootStackParamList>();

function getPlayAreaTitle(appState: AppState) {
  const {selectedGameId, activity} = appState;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const {playActivity, riddleActivity} = activity!;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const currentGameModule = findGameModule(selectedGameId)!;
  if (playActivity) {
    return localize(playActivity.playType == 'PASS_AND_PLAY' ? 'PASS_AND_PLAY' : 'AGAINST_COMPUTER', appState);
  }
  if (riddleActivity) {
    return localize(currentGameModule.riddleLevels[riddleActivity.levelIndex].levelLocalizeId, appState);
  }
  throw new Error('no activity');
}

export function Main() {
  const {appState} = useStoreContext();
  const {selectedGameId, languageId, activity} = appState;

  const initialRouteName = !languageId
    ? 'Settings'
    : !selectedGameId
    ? 'ChooseGame'
    : !activity
    ? 'ChooseActivity'
    : 'PlayArea';

  // After choosing Settings (language) and game, we show the usual UI.
  return (
    <NavigationContainer>
      <Navigator.Navigator initialRouteName={initialRouteName}>
        <Navigator.Screen
          name="Settings"
          component={SettingsScreen}
          options={{title: localize('SETTINGS_SCREEN', appState)}}
        />
        <Navigator.Screen
          name="ChooseGame"
          component={ChooseGameScreen}
          options={{title: localize('CHOOSE_GAME_SCREEN', appState)}}
        />
        {!selectedGameId ? null : (
          <>
            <Navigator.Screen
              name="ChooseActivity"
              component={ChooseActivityScreen}
              options={{title: localize('CHOOSE_ACTIVITY_SCREEN', appState)}}
            />
            {!activity ? null : (
              <>
                <Navigator.Screen
                  name="PlayArea"
                  component={PlayAreaScreen}
                  options={{title: getPlayAreaTitle(appState)}}
                />
              </>
            )}
          </>
        )}
      </Navigator.Navigator>
    </NavigationContainer>
  );
}
