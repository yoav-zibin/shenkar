import {Choice, FlatListChooser} from './FlatListChooser';
import React from 'react';
import {Activity, navigateNextFrame, useStoreContext} from './store';
import {localize, LocalizeId} from './localize';
import {TitleBar} from './TitleBar';
import {findGameModule} from './gameModules';
import {useNavigation} from '@react-navigation/native';
import {View, StyleSheet, FlatList, Text, ImageBackground} from 'react-native';

export function ChooseActivityScreen() {
  const {appState, dispatch} = useStoreContext();
  const navigation = useNavigation();
  if (!appState.selectedGameId) return null;
  const gameModule = findGameModule(appState.selectedGameId);
  // We either choose a riddle or play activity.
  const riddleLevels = gameModule.riddleLevels;
  const choices: Choice<Activity>[] = [];
  for (let levelIndex = 0; levelIndex < riddleLevels.length; levelIndex++) {
    const level = riddleLevels[levelIndex];
    choices.push(
      getActivityChoice(level.levelLocalizeId, {
        riddleActivity: {levelIndex, riddleIndex: 0},
      })
    );
  }

  function getActivityChoice(localizeId: LocalizeId, activity: Activity): Choice<Activity> {
    return {
      id: localizeId,
      text: localize(localizeId, appState),
      data: activity,
    };
  }

  choices.push(getActivityChoice('AGAINST_COMPUTER', {activityType: 'AGAINST_COMPUTER'}));
  choices.push(getActivityChoice('PASS_AND_PLAY', {activityType: 'PASS_AND_PLAY'}));

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.logoBack}
        source={require(
          './activityBackImage.png'
        )}
      >
      <TitleBar />

  <FlatList
      contentContainerStyle={styles.list}
      data={choices}
      keyExtractor={(choice) => choice.id}
      renderItem={({item}) => (
        <Text key={item.id} style={styles.listItem} onPress={() => {
          dispatch({setActivity: item.data as Activity});
          navigateNextFrame('PlayArea', navigation);
        }}>
          {'localizeId' in item ? localize(item.localizeId, appState) : item.text}
        </Text>
      )}
    />
</ImageBackground>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F6EEDF',
    flex: 1,

  },
  list:{
  //  backgroundColor: 'red',
    flex:1,
    justifyContent:'space-evenly',
    alignContent:'center'
  },
  listItem:{
    backgroundColor:'#e3c794',
    color:'#F6742B',
    textAlign:'center',
    fontSize: 24,
    fontWeight: 'bold',
    height: 80,
    width: 400,
    alignSelf:'center',
    borderRadius:20,
    shadowColor: " rgba(235,188,112,0.82)",
  shadowOffset: {
    width: 0,
    height: 5,
  },
  shadowOpacity: 0.34,
  shadowRadius: 6.27,

  elevation: 10,
    },
    logoBack:{
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center"

    }
});