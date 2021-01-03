import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {ChooseActivityScreen} from './ChooseActivityScreen';
import {ChooseGameScreen} from './ChooseGameScreen';
import {PlayAreaScreen} from './PlayAreaScreen';
import {SettingsScreen} from './SettingsScreen';
import {RootStackParamList, useStoreContext} from './store';
import {localize} from './localize';

const GameStack = createStackNavigator<RootStackParamList>();

export function Main() {
  const {appState} = useStoreContext();

  // After choosing Settings (language) and game, we show the usual UI.
  return (
    <NavigationContainer>
      <GameStack.Navigator>
        <GameStack.Screen name="Settings" component={SettingsScreen} options={{headerShown: false}} />
        <GameStack.Screen
          name="ChooseGame"
          component={ChooseGameScreen}
          options={{headerTitle: localize('CHOOSE_GAME_SCREEN', appState)}}
        />
        <GameStack.Screen
          name="ChooseActivity"
          component={ChooseActivityScreen}
          options={{headerTitle: localize('CHOOSE_ACTIVITY_SCREEN', appState)}}
        />
        <GameStack.Screen name="PlayArea" component={PlayAreaScreen} options={{headerTitle: 'שם המשחק'}} />
      </GameStack.Navigator>
    </NavigationContainer>
  );
}
