import React from 'react';
import {IMAGES} from './imgs/imagesRequires';
import {getAllGameModules} from './gameModules';
import {navigateNextFrame, useStoreContext} from './store';
import {TitleBar} from './TitleBar';
import {useNavigation} from '@react-navigation/native';
import {commonStyles} from './common';
import {View, FlatList, StyleSheet, Text, Pressable, Image} from 'react-native';
import {localize} from './localize';

export function ChooseGameScreen() {
  const {dispatch, appState} = useStoreContext();
  const navigation = useNavigation();
  const choices = getAllGameModules().map((i) => {
    return {id: i.gameId, localizeId: i.gameLocalizeId};
  });
  const setChoice = (choice: string) => {
    dispatch({setSelectedGameId: choice});
    navigateNextFrame('ChooseActivity', navigation);
  };
  return (
    <View style={[commonStyles.screen, styles.ChooseGameScreenStyle]}>
      <TitleBar></TitleBar>
      <View style={[styles.ChoicesContainer]}>
        <FlatList
          numColumns={2}
          data={choices}
          renderItem={({item}) => (
            <Pressable onPress={() => setChoice(item.id)}>
              <View style={styles.ChoiceContainer}>
                <Image style={styles.ImgStyle} source={IMAGES[`${item.id}`]} />
                <Text style={styles.ChoiceTextStyle}>{localize(item.localizeId, appState)}</Text>
              </View>
            </Pressable>
          )}
          keyExtractor={(choice) => choice.id}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ChooseGameScreenStyle: {
    backgroundColor: 'rgb(246, 238, 223)',
  },
  ChoicesContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  ChoiceContainer: {
    backgroundColor: '#e3c794',
    width: 150,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    margin: 10,
  },
  ImgStyle: {
    width: 100,
    height: 100,
  },
  ChoiceTextStyle: {
    marginTop: 10,
    color: '#F6742B',
    fontWeight: 'bold',
  },
});
