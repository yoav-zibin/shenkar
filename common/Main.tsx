import React from 'react';
import ChooseGame from './ChooseGame';
import ChooseLanguage from './Settings';
import {useStoreContext} from './store';
import {findGameModule} from './gameModules';
import PlayArea from './PlayArea';
import {LanguageId} from './localize';
import ChooseActivity from './ChooseActivity';

export default function Main() {
  const {appState, dispatch} = useStoreContext();
  const {selectedGameId, languageId, activity} = appState;
  if (!languageId) {
    return <ChooseLanguage setLanguageId={(langId) => dispatch({setLanguageId: langId as LanguageId})} />;
  }

  const currentGameModule = findGameModule(selectedGameId);

  if (!currentGameModule) {
    return <ChooseGame setSelectedGameId={(selectedGameId) => dispatch({setSelectedGameId: selectedGameId})} />;
  }
  if (!activity) {
    return <ChooseActivity gameModule={currentGameModule} />;
  }
  return <PlayArea gameModule={currentGameModule} activity={activity} />;
}
