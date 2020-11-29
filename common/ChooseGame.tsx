import React from 'react';
import FlatListChooser from './FlatListChooser';
import {getAllGameModules} from './gameModules';

export default function ChooseGame(props: {setSelectedGameId: (selectedGameId: string) => void}) {
  const choices = getAllGameModules().map((i) => {
    return {id: i.gameId, localizeId: i.gameLocalizeId};
  });
  return <FlatListChooser choices={choices} setChoice={(choice) => props.setSelectedGameId(choice.id)} />;
}
