import React from 'react';
import {getScreenTitle, RouteName, useStoreContext} from './store';
import {useRoute} from '@react-navigation/native';
import {View, Text, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  titleBar: {
    marginTop: 20,
    fontSize: 19,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export function TitleBar() {
  const route = useRoute();
  const {appState} = useStoreContext();
  const showTitleBar =
    appState.languageId && appState.selectedGameId
      ? true // TODO: should be true, I just disabled TitleBar because it looks horrible.
      : false;
  if (!showTitleBar) return null;
  return (
    <View>
      <Text style={styles.titleBar}>{getScreenTitle(route.name as RouteName, appState)}</Text>
    </View>
  );
}
