import React, {useState} from 'react';
import ChooseGame from './ChooseGame';
import {findGameModule} from './gameModules';
import PlayArea from './PlayArea';

export default function Main() {
  const [selectedGameId, setSelectedGameId] = useState('');

  const currentGameModule = findGameModule(selectedGameId);

  if (!currentGameModule) {
    return <ChooseGame setSelectedGameId={setSelectedGameId} />;
  }
  return <PlayArea gameModule={currentGameModule} />;
}
