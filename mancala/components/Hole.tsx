import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

export default function Hole(props: { xTranslate: number; yTranslate: number; numOfStones:number; arrayPosition:number;player:number;}) {
  const { xTranslate, yTranslate , numOfStones , arrayPosition, player } = props;
  console.info(numOfStones )
  return (
    <View style=
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
    backgroundColor:"green",
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: 'black',
  },
  
});
