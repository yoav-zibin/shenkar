import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useAlert} from './alerts';
import {AlertPropsType} from './alerts/AlertProvider';
import Background from './Background';
import {localize} from './localize';
import {useStoreContext} from './store';
import {TitleBar} from './TitleBar';

export function SettingsScreen() {
  const Alert = useAlert();
  const {appState} = useStoreContext();
  const navigation = useNavigation();
  const alert: AlertPropsType = {
    message: 'בדיקה בדיקה',
    title: 'בדיקה',
    firstButton: {
      text: 'המשך',
    },
    secondButton: {
      text: 'בטל',
    },
  };
  const choices = [
    {text: localize('SETTINGS_SCREEN', appState), onPress: () => Alert.confirm(alert)},
    {text: localize('CHOOSE_GAME_SCREEN', appState), onPress: () => navigation.navigate('ChooseGame')},
  ];
  return (
    <Background>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <TitleBar />
        {choices.map((choice, key) => {
          return (
            <Pressable style={styles.button} onPress={choice.onPress} key={key}>
              <Text style={styles.buttonText}>{choice.text}</Text>
            </Pressable>
          );
        })}
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 73,
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    backgroundColor: 'rgba(255,255,255,.3)',
    borderRadius: 10,
  },
  buttonText: {
    fontFamily: 'gan',
    color: 'white',
    fontSize: 23,
  },
});
