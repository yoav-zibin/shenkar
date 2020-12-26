import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

export default function BaseHole(props: {xTranslate: number; yTranslate: number; numOfStones:number; player:number;}) {
  const {xTranslate, yTranslate, numOfStones, player } = props;
  return (
    <View  style=
    {
      [styles.hole,  
      {transform: [
                  {translateX: xTranslate},
                  {translateY: yTranslate}
                ]
    }]} >
      <Text>{numOfStones.toString()}</Text>
      <Text>{player == 1 ? "player2" : "player1"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  hole: {
    position:'absolute',
    backgroundColor:"pink",
    width: 100,
    height: 200,
    borderWidth: 1,
    borderColor: 'black',
  },
});
