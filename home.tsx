import Constants from 'expo-constants';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {LoadStateFromAsyncStorage} from './common/LoadStateFromAsyncStorage';

const styles = StyleSheet.create({
  statusBar: {
    height: Constants.statusBarHeight,
  },
});

export default function Home() {
  return (
    <View style={{flex: 1, backgroundColor: 'rgb(250,250,250)'}}>
      <View style={styles.statusBar} />
      <LoadStateFromAsyncStorage />
    </View>
  );
}
