import 'react-native-gesture-handler';
import React from 'react';
import {ThemeProvider} from 'react-native-elements';
import {LoadStateFromAsyncStorage} from './common/LoadStateFromAsyncStorage';
import {StateProvider} from './common/store';
import {StyleSheet, View} from 'react-native';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
  statusBar: {
    height: Constants.statusBarHeight,
  },
  container: {
    flex: 1,
  },
});

export default function App() {
  return (
    <View style={{flex: 1, backgroundColor: 'rgb(250,250,250)'}}>
      <ThemeProvider>
        <StateProvider>
          <View style={styles.container}>
            <View style={styles.statusBar} />
            <LoadStateFromAsyncStorage />
          </View>
        </StateProvider>
      </ThemeProvider>
    </View>
  );
}
