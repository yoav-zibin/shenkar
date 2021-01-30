import React from 'react';
import {getScreenTitle, RouteName, useStoreContext} from './store';
import {useRoute} from '@react-navigation/native';
import {View, Text, StyleSheet} from 'react-native';
import {findGameModule} from './gameModules';

const styles = StyleSheet.create({
  bottomView: {
    marginBottom: 50,
    backgroundColor: 'red',
    marginTop: 20,
  },
  text: {
    fontSize: 19,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  instructions: {
    marginTop: 5,
    color: 'grey',

    textAlign: 'center',
  },
});

export function ProgressBar() {
  let level = null;
  let size = 0;
  const route = useRoute();
  const {appState} = useStoreContext();
  const {selectedGameId, activity} = appState;
  const gameModule = findGameModule(selectedGameId);
  const levelIndex = activity?.riddleActivity?.levelIndex;
  const riddleIndex = activity?.riddleActivity?.riddleIndex;
  if (levelIndex != null) {
    level = gameModule.riddleLevels[levelIndex];
    size = level.riddles.length;
  }
  const showTitleBar = appState.languageId && appState.selectedGameId ? true : false;
  if (!showTitleBar) return null;
  return (
    <View>
      <Text style={styles.text}>{getScreenTitle(route.name as RouteName, appState)}</Text>
      {riddleIndex || riddleIndex == 0 ? (
        <Text style={styles.instructions}>
          {riddleIndex + 1}/{size}
        </Text>
      ) : null}
    </View>
  );
}
