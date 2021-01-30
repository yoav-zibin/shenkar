/* eslint @typescript-eslint/no-var-requires: "off" */
import {IMAGES} from './imgs/imagesRequires';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {Pressable, StyleSheet, Text, View, Switch, Image} from 'react-native';
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

  const {playBackgroundMusic, languageId} = appState;
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
    setMoveSwitch(switchValue);
    dispatch({setMoveSound: switchValue});
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
            };
            return (
              <Pressable style={styles.optionContainer} onPress={onSelect} key={key}>
                <View
                  style={
                    languageId === i[0]
                      ? styles.langOptionContainer
                      : [styles.langOptionContainer, styles.langOptionNotSelected]
                  }>
                  <Image style={[styles.tinyLogo]} source={IMAGES[`${i[0]}`]} />
                  <Text style={[styles.langOption, styles.option]}>{i[1]}</Text>
                </View>
              </Pressable>
            );
          })}
          <View style={[styles.optionContainer, styles.musicOptionContainer]}>
            <Text style={[styles.option, styles.musicOptionTitle]}>{localize('BACKGROUNDMUSIC', appState)}</Text>
            <Text style={styles.option}>{backSwitch ? localize('YES', appState) : localize('NO', appState)}</Text>
            <Switch value={backSwitch} onValueChange={(backSwitch: boolean) => musicToggle(backSwitch)} />
            <Text style={[styles.option, styles.musicOptionTitle]}>{localize('MOVESOUND', appState)}</Text>
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
    width: '100%',
    borderRadius: 10,
  },
  optionContainer: {
    width: '100%',
    alignItems: 'center',
  },
  musicOptionContainer: {
    marginTop: 40,
  },
  option: {
    fontSize: 26,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  musicOptionTitle: {
    marginTop: 30,
    marginBottom: 10,
    width: '100%',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.3);',
  },
  langOption: {
    width: 100,
    marginLeft: 20,
  },

  title: {
    position: 'absolute',
    top: 100,
    fontFamily: 'gan',
    fontSize: 50,
    textAlign: 'center',
    color: 'white',
  },
  langOptionContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  langOptionNotSelected: {
    opacity: 0.5,
  },
  tinyLogo: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },

  CustomButtonContainer: {
    borderRadius: 20,
    marginTop: 50,
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7);',
  },
  CustomButtonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'gan',
  },
});

export default SettingsScreen;
