import React from 'react';
import {getScreenTitle, RouteName, useStoreContext} from './store';
import {useNavigation} from '@react-navigation/native';
import {useRoute} from '@react-navigation/native';
import {View, Text, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  pageTitleContainer: {
    height: 50,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '15%',
  },
  pageTitleText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export function PageTitle() {
  const route = useRoute();
  const navigation = useNavigation();
  const {appState} = useStoreContext();
  return (
    <View style={styles.pageTitleContainer}>
      <Text style={styles.pageTitleText}>{getScreenTitle(route.name as RouteName, appState)}</Text>
    </View>
  );
}
