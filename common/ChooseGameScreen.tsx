import {useNavigation} from '@react-navigation/native';
import React from 'react';
import Background from './Background';
import {FlatListChooser} from './FlatListChooser';
import {getAllGameModules} from './gameModules';
import {navigateNextFrame, useStoreContext} from './store';

export function ChooseGameScreen() {
  const {dispatch} = useStoreContext();
  const navigation = useNavigation();
  const choices = getAllGameModules().map((i) => {
    return {id: i.gameId, localizeId: i.gameLocalizeId};
  });
  console.log('Render ChooseGameScreen.');
  return (
    <Background>
      <FlatListChooser
        choices={choices}
        setChoice={(choice) => {
          dispatch({setSelectedGameId: choice.id});
          navigateNextFrame('ChooseActivity', navigation);
        }}
      />
    </Background>
  );
}
