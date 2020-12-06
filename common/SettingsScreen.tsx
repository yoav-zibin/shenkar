import React from 'react';
import {LanguageId, LANGUAGES} from './localize';
import {FlatListChooser} from './FlatListChooser';
import {useStoreContext} from './store';
import {TopBar} from './TopBar';

export function SettingsScreen() {
  const {dispatch} = useStoreContext();
  const choices = Object.entries(LANGUAGES).map((i) => {
    return {id: i[0], text: i[1]};
  });
  return (
    <>
      <TopBar />
      <FlatListChooser choices={choices} setChoice={(choice) => dispatch({setLanguageId: choice.id as LanguageId})} />
    </>
  );
}
