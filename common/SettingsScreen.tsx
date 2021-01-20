/* eslint @typescript-eslint/no-var-requires: "off" */
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable, StyleSheet, Text, View, Switch} from 'react-native';
import Background from './Background';
import {LanguageId, LANGUAGES, localize} from './localize';
import {useStoreContext} from './store';
import {Audio} from 'expo-av';
import {Sound} from 'expo-av/build/Audio';

const SettingsScreen = () => {
  const [backgroundSound, setBackgroundSound] = React.useState<Sound | undefined>(undefined);
  const [backSwitch, setBackSwitch] = React.useState<boolean>(false);
  const [moveSwitch, setMoveSwitch] = React.useState<boolean>(true);
  const {appState, dispatch} = useStoreContext();
  const {playBackgroundMusic, moveSound} = appState;
  const navigation = useNavigation();

  async function loadAndPlayBackround() {
    const {sound} = await Audio.Sound.createAsync(require('./playbacks/PatakasWorld.mp3'));
    setBackgroundSound(sound);
  }
  function playBackground(sound: Sound | undefined) {
    sound?.playAsync();
    sound?.setIsLoopingAsync(true);
  }

  function musicToggle(switchValue: boolean) {
    setBackSwitch(switchValue);
    if (switchValue) {
      playBackground(backgroundSound);
    } else {
      backgroundSound?.stopAsync();
    }
  }

  function soundToggle(switchValue: boolean) {
    console.log(moveSound);
    setMoveSwitch(switchValue);
    dispatch({setMoveSound: switchValue});
    console.log(moveSound);
  }

  React.useEffect(() => {
    if (!playBackgroundMusic) {
      loadAndPlayBackround();
      dispatch({setPlayBackgroundMusic: true});
    }
  });

  return (
    <Background>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View style={styles.container}>
          {Object.entries(LANGUAGES).map((i, key) => {
            const onSelect = async () => {
              dispatch({setLanguageId: i[0] as LanguageId});
              await AsyncStorage.setItem('language', i[0]);
              navigation.goBack();
            };
            return (
              <Pressable style={styles.optionContainer} onPress={onSelect} key={key}>
                <Text style={styles.option}>{i[1]}</Text>
              </Pressable>
            );
          })}
          <View style={styles.optionContainer}>
            <Text style={styles.option}>{localize('BACKGROUNDMUSIC', appState)}</Text>
            <Text style={styles.option}>{backSwitch ? localize('YES', appState) : localize('NO', appState)}</Text>
            <Switch value={backSwitch} onValueChange={(backSwitch: boolean) => musicToggle(backSwitch)} />
            <Text style={styles.option}>{localize('MOVESOUND', appState)}</Text>
            <Text style={styles.option}>{moveSwitch ? localize('YES', appState) : localize('NO', appState)}</Text>
            <Switch value={moveSwitch} onValueChange={(moveSwitch: boolean) => soundToggle(moveSwitch)} />
          </View>
        </View>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '64%',
    borderRadius: 10,
  },
  optionContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  option: {
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 14,
  },
  title: {
    position: 'absolute',
    top: 100,
    fontFamily: 'gan',
    fontSize: 50,
    textAlign: 'center',
    color: 'white',
  },
});

export default SettingsScreen;
