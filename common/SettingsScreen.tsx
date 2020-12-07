import React from 'react';
import {LanguageId, LANGUAGES} from './localize';
import {FlatListChooser} from './FlatListChooser';
import {navigateNextFrame, useStoreContext} from './store';
import {TitleBar} from './TitleBar';
import {useNavigation} from '@react-navigation/native';
import {commonStyles} from './common';
import {View} from 'react-native';

export function SettingsScreen() {
  const {appState, dispatch} = useStoreContext();
  const navigation = useNavigation();
  const choices = Object.entries(LANGUAGES).map((i) => {
    return {id: i[0], text: i[1]};
  });
  return (
    <View style={commonStyles.screen}>
      <TitleBar />
      <FlatListChooser
        choices={choices}
        setChoice={(choice) => {
          dispatch({setLanguageId: choice.id as LanguageId});
          if (!appState.selectedGameId) {
            navigateNextFrame('ChooseGame', navigation);
          }
        }}
      />
    </View>
  );
}
