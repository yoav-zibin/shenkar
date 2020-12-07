import React from 'react';
import {Ionicons} from '@expo/vector-icons';
import {getScreenTitle, RouteName, useStoreContext} from './store';
import {useNavigation} from '@react-navigation/native';
import {useRoute} from '@react-navigation/native';
import {DrawerActions} from '@react-navigation/native';
import {View, Text, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  titleBar: {
    height: 50,
  },
});

export function TitleBar() {
  const route = useRoute();
  const navigation = useNavigation();
  const {appState} = useStoreContext();
  const showTitleBar =
    appState.languageId && appState.selectedGameId
      ? false // TODO: should be true, I just disabled TitleBar because it looks horrible.
      : false;
  if (!showTitleBar) return null;
  return (
    <View style={styles.titleBar}>
      <Ionicons
        name="md-menu"
        size={24}
        color="black"
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      />
      <Text>{getScreenTitle(route.name as RouteName, appState)}</Text>
    </View>
  );
}
