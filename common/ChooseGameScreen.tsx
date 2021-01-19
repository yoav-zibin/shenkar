import React from 'react';
import {FlatListChooser} from './FlatListChooser';
import {getAllGameModules} from './gameModules';
import {navigateNextFrame, useStoreContext} from './store';
import {TitleBar} from './TitleBar';
import {useNavigation} from '@react-navigation/native';
import {commonStyles} from './common';
import {View} from 'react-native';

export function ChooseGameScreen() {
  const {dispatch} = useStoreContext();
  const navigation = useNavigation();
  const choices = getAllGameModules().map((i) => {
    return {id: i.gameId, localizeId: i.gameLocalizeId};
  });
  console.log('Render ChooseGameScreen.');
  return (
    <View style={commonStyles.screen}>
      <TitleBar></TitleBar>
      <FlatListChooser
        choices={choices}
        setChoice={(choice) => {
          dispatch({setSelectedGameId: choice.id});
          navigateNextFrame('ChooseActivity', navigation);
        }}
      />
    </View>
  );
}
