import React from 'react';
import {FlatList, StyleSheet, Text} from 'react-native';
import {getAllGameModules} from './gameModules';

const styles = StyleSheet.create({
  flatList: {
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

export default function ChooseGame(props: {setSelectedGameId: (selectedGameId: string) => void}) {
  return (
    <FlatList
      style={styles.flatList}
      data={getAllGameModules()}
      keyExtractor={(item) => item.gameId}
      renderItem={({item}) => (
        <Text key={item.gameId} style={styles.item} onPress={() => props.setSelectedGameId(item.gameId)}>
          {item.gameName}
        </Text>
      )}
    />
  );
}
