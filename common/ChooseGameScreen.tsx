import React from 'react';
import {FlatListChooser} from './FlatListChooser';
import {getAllGameModules} from './gameModules';
import {useStoreContext} from './store';
import {TopBar} from './TopBar';

export function ChooseGameScreen() {
  const {dispatch} = useStoreContext();
  const choices = getAllGameModules().map((i) => {
    return {id: i.gameId, localizeId: i.gameLocalizeId};
  });
  return (
    <>
      <TopBar />
      <FlatListChooser choices={choices} setChoice={(choice) => dispatch({setSelectedGameId: choice.id})} />;
    </>
  );
}
