import FlatListChooser, {Choice} from './FlatListChooser';
import React from 'react';
import {AnyGameModule} from './common';
import {PlayActivity, RiddleActivity, useStoreContext} from './store';
import {localize, LocalizeId} from './localize';

export default function ChooseActivity(props: {gameModule: AnyGameModule}) {
  const {appState, dispatch} = useStoreContext();
  // We either choose a riddle or play activity.
  const riddleLevels = props.gameModule.riddleLevels;
  const riddleChoices: Choice<RiddleActivity>[] = [];
  for (let levelIndex = 0; levelIndex < riddleLevels.length; levelIndex++) {
    const level = riddleLevels[levelIndex];
    riddleChoices.push({
      id: 'levelIndex=' + levelIndex,
      text: localize(level.levelLocalizeId, appState),
      data: {levelIndex, riddleIndex: 0},
    });
    // In case we want to allow jumping to specific riddle in a level (with better UI):
    // const riddles = level.riddles;
    // for (let riddleIndex=0; riddleIndex < riddles.length; riddleIndex++) {
    //   riddleChoices.push({
    //     id: levelIndex + "," + riddleIndex,
    //     text: localize(level.levelLocalizeId, appState) + " " + (riddleIndex + 1) + " / " + (riddles.length),
    //     data: {levelIndex, riddleIndex}
    //   });
    // }
  }

  function getPlayChoice(localizeId: LocalizeId, activity: PlayActivity): Choice<PlayActivity> {
    return {
      id: localizeId,
      text: localize(localizeId, appState),
      data: activity,
    };
  }

  const playChoices: Choice<PlayActivity>[] = [];
  playChoices.push(getPlayChoice('AGAINST_COMPUTER', {playType: 'AGAINST_COMPUTER'}));
  playChoices.push(getPlayChoice('PASS_AND_PLAY_I18N', {playType: 'PASS_AND_PLAY'}));

  return (
    <>
      <FlatListChooser
        choices={riddleChoices}
        setChoice={(choice) => {
          dispatch({setActivity: {riddleActivity: choice.data}});
        }}
      />
      <FlatListChooser
        choices={playChoices}
        setChoice={(choice) => {
          dispatch({setActivity: {playActivity: choice.data}});
        }}
      />
    </>
  );
}
