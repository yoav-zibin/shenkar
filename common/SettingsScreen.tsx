import React from 'react';
import {LanguageId, LANGUAGES} from './localize';
import {navigateNextFrame, useStoreContext} from './store';
import {TitleBar} from './TitleBar';
import {useNavigation} from '@react-navigation/native';
import {commonStyles} from './common';
import {View, FlatList, StyleSheet, Text, Image} from 'react-native';
import {PageTitle} from './PageTitle';
import {IMAGES} from './imgs/imagesRequires';

export function SettingsScreen() {
  const {appState, dispatch} = useStoreContext();
  const navigation = useNavigation();
  const choices = Object.entries(LANGUAGES).map((i) => {
    return {id: i[0], text: i[1]};
  });
  return (
    <View>
      <TitleBar />
      <PageTitle />
      <FlatList
        data={choices}
        keyExtractor={(choice) => choice.id}
        renderItem={({item}) => (
          <View style={settingsPageStyle.flatListItemContainer}>
            <Image style={settingsPageStyle.tinyLogo} source={IMAGES[`${item.id}`]} />
            <Text
              key={item.id}
              style={settingsPageStyle.flatListItemText}
              onPress={() => {
                dispatch({setLanguageId: item.id as LanguageId});
                if (!appState.selectedGameId) {
                  navigateNextFrame('ChooseGame', navigation);
                }
              }}>
              {item.text}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const settingsPageStyle = StyleSheet.create({
  flatListItemContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '5%',
    marginBottom: '5%',
  },
  flatListItemText: {
    marginTop: '2%',
    fontSize: 18,
  },
  tinyLogo: {
    width: 100,
    height: 100,
  },
});
