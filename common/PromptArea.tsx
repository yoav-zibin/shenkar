import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import {GameResult} from './common';

function generateResultText(result: GameResult) {
  switch (result) {
    case GameResult.HUMAN_WON:
      return 'You won the game!';
    case GameResult.AI_WON:
      return 'AI won the game!';
    case GameResult.TIE:
      return 'Tie!';
    default:
      return '';
  }
}

export default function PromptArea(props: {result: GameResult; onRestart: () => void}) {
  const {result, onRestart} = props;
  return (
    <View>
      <Text style={styles.text}>{generateResultText(result)}</Text>
      {result !== GameResult.NO_RESULT && (
        <TouchableOpacity onPress={() => onRestart()}>
          <Text style={styles.instructions}>Touch here to play again</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    marginTop: 20,
    fontSize: 19,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  instructions: {
    marginTop: 20,
    color: 'grey',
    marginBottom: 5,
    textAlign: 'center',
  },
});
