import React from 'react';
import {ChooseGameScreen} from './ChooseGameScreen';
import {SettingsScreen} from './SettingsScreen';
import {getScreenTitle, RouteName, RootStackParamList, useStoreContext} from './store';
import {PlayAreaScreen} from './PlayAreaScreen';
import {ChooseActivityScreen} from './ChooseActivityScreen';
// import { createStackNavigator } from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';

const Navigator = createBottomTabNavigator<RootStackParamList>();

export function Main() {
  const {appState} = useStoreContext();
  const {selectedGameId, languageId, activity} = appState;

  const initialRouteName: RouteName = !languageId
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
          options={{title: getScreenTitle('Settings', appState)}}
        />
        {!languageId ? null : (
          <>
            <Navigator.Screen
              name="ChooseGame"
              component={ChooseGameScreen}
              options={{title: getScreenTitle('ChooseGame', appState)}}
            />
            {!selectedGameId ? null : (
              <>
                <Navigator.Screen
                  name="ChooseActivity"
                  component={ChooseActivityScreen}
                  options={{title: getScreenTitle('ChooseActivity', appState)}}
                />
                {!activity ? null : (
                  <>
                    <Navigator.Screen
                      name="PlayArea"
                      component={PlayAreaScreen}
                      options={{title: getScreenTitle('PlayArea', appState)}}
                    />
                  </>
                )}
              </>
            )}
          </>
        )}
      </Navigator.Navigator>
    </NavigationContainer>
  );
}
