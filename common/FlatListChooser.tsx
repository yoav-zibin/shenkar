import React from 'react';
import {FlatList, StyleSheet, Text} from 'react-native';
import {localize, LocalizeId} from './localize';
import {useStoreContext} from './store';

type BaseChoice<T> = {
  id: string;
  data?: T;
};
interface NameChoice<T> extends BaseChoice<T> {
  localizeId: LocalizeId;
}
interface TextChoice<T> extends BaseChoice<T> {
  text: string;
}
export type Choice<T> = NameChoice<T> | TextChoice<T>;

interface Props<T> {
  choices: Choice<T>[];
  setChoice: (selection: Choice<T>) => void;
}
export function FlatListChooser<T>(props: Props<T>) {
  const {appState} = useStoreContext();
  return (
    <FlatList
      style={flatListStyles.flatList}
      data={props.choices}
      keyExtractor={(choice) => choice.id}
      renderItem={({item}) => (
        <Text key={item.id} style={flatListStyles.flatListItem} onPress={() => props.setChoice(item)}>
          {'localizeId' in item ? localize(item.localizeId, appState) : item.text}
        </Text>
      )}
    />
  );
}

const flatListStyles = StyleSheet.create({
  flatList: {
    paddingTop: 22,
  },
  flatListItem: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
