import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {ThemeProvider} from 'react-native-elements';
import TicTacToeGame from './tictactoe/components/Game';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

export default function App() {
  const [selectedGame, setSelectedGame] = useState('');
  if (!selectedGame) {
    return (
      <ThemeProvider>
        <View style={styles.container}>
          <FlatList
            data={[
              {key: 'tictactoe', displayName: 'TicTacToe'},
              {key: 'checkers', displayName: 'Checkers'},
              {key: 'go', displayName: 'Go game'},
            ]}
            renderItem={({item}) => (
              <Text style={styles.item} onPress={() => setSelectedGame(item.key)}>
                {item.displayName}
              </Text>
            )}
          />
        </View>
      </ThemeProvider>
    );
  }
  switch (selectedGame) {
    case 'tictactoe':
      return <TicTacToeGame />;
    // TODO: add other games.
  }
  return <Text>Game {selectedGame} is still not ready ...</Text>;
}
