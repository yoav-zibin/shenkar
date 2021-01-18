import React from 'react';
import {getAllGameModules} from './gameModules';
import {navigateNextFrame, useStoreContext} from './store';
import {TitleBar} from './TitleBar';
import {useNavigation} from '@react-navigation/native';
import {localize} from './localize';
import {View, FlatList, StyleSheet, Text, Image} from 'react-native';
import {PageTitle} from './PageTitle';
import {IMAGES} from './imgs/imagesRequires';

export function ChooseGameScreen() {
  const {appState, dispatch} = useStoreContext();
  const navigation = useNavigation();
  const choices = getAllGameModules().map((i) => {
    return {id: i.gameId, localizeId: i.gameLocalizeId};
  });
  return (
    <View>
      <TitleBar />
      <PageTitle />
      <View style={ChooseGamePageStyle.flatList}>
        <FlatList
          data={choices}
          numColumns={2}
          keyExtractor={(choice) => choice.id}
          renderItem={({item}) => (
            <View style={ChooseGamePageStyle.flatListItemContainer}>
              <Image style={ChooseGamePageStyle.tinyLogo} source={IMAGES[`${item.id}`]} />
              <Text
                key={item.id}
                style={ChooseGamePageStyle.flatListItemText}
                onPress={() => {
                  dispatch({setSelectedGameId: item.id});
                  navigateNextFrame('ChooseActivity', navigation);
                }}>
                {localize(item.localizeId, appState)}
              </Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}
const ChooseGamePageStyle = StyleSheet.create({
  flatList: {
    display: 'flex',
    alignItems: 'center',
  },
  flatListItemContainer: {
    marginBottom: '5%',
    marginTop: '5%',
    display: 'flex',
    alignItems: 'center',
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
