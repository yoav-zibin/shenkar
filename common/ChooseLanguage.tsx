import React from 'react';
import {LANGUAGES} from './localize';
import FlatListChooser from './FlatListChooser';

export default function ChooseLanguage(props: {setLanguageId: (lang: string) => void}) {
  const choices = Object.entries(LANGUAGES).map((i) => {
    return {id: i[0], text: i[1]};
  });
  return <FlatListChooser choices={choices} setChoice={(choice) => props.setLanguageId(choice.id)} />;
}
