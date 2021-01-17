import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {AuthContext} from '../App';
import Background from './Background';
import {LanguageId, LANGUAGES} from './localize';
import {useStoreContext} from './store';

const LanguageSelect = () => {
  const {dispatch} = useStoreContext();
  const selectLanguage = React.useContext(AuthContext)?.selectLanguage;
  return (
    <Background>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {/* <Text style={styles.title}>השם של המשחק</Text> */}
        <View style={styles.container}>
          {Object.entries(LANGUAGES).map((i, key) => {
            const onSelect = async () => {
              dispatch({setLanguageId: i[0] as LanguageId});
              await AsyncStorage.setItem('language', i[0]);
              if (selectLanguage) selectLanguage(i[0]);
            };
            return (
              <Pressable style={styles.optionContainer} onPress={onSelect} key={key}>
                <Text style={styles.option}>{i[1]}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 32,
    width: '64%',
    paddingTop: 128,
    borderRadius: 10,
  },
  optionContainer: {
    paddingVertical: 16,
  },
  option: {
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold',
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

export default LanguageSelect;
