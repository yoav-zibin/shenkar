/* eslint-disable @typescript-eslint/no-explicit-any
 */
import React, {useState, useEffect} from 'react';
import {Text, StyleSheet, Image, View, ActivityIndicator} from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';
const f: any = firebase;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flexDirection: 'row',
  },
  textContainer: {
    height: '100%',
    textAlign: 'center',
    marginLeft: 10,
  },
  text: {
    fontSize: 30,
  },
  image: {
    width: 40,
    height: 40,
  },
});

// get current user
function cureentUserUid(setIsLogin: any) {
  const user = f.auth().currentUser;
  if (!user) {
    setIsLogin(false);
  }
  return user.uid;
}
// get the score form firestore fome the current user
function fetchWinScore(setIsLogin: any) {
  const idUser = cureentUserUid(setIsLogin);
  const docRef = f.firestore().collection('users').doc(idUser);
  return docRef.get();
}
// Update firestore add one score
function updatehWinScore(prevNum: number, setIsLogin: any) {
  const idUser = cureentUserUid(setIsLogin);
  const docRef = f.firestore().collection('users').doc(idUser);
  return docRef.update({
    winConnect4: prevNum + 1,
  });
}
// score Bar component
export function Score(props: {move: any}) {
  const {move} = props;
  const [winScore, setWinScore] = useState('loading');
  const [isLogin, setIsLogin] = useState(true);
  const getWinScore = async () => {
    try {
      const fetchedWinScore = await fetchWinScore(setIsLogin);
      if (fetchedWinScore.exists) {
        // Check if the game is over
        if (move.endMatchScores) {
          // Check if I won
          if (move.endMatchScores[0] === 1 && move.endMatchScores[1] === 0) {
            // update the score
            await updatehWinScore(fetchedWinScore.data()['winConnect4'], setIsLogin);
          }
        }
        setLoading(false);
        // get the score
        setWinScore(fetchedWinScore.data()['winConnect4'] + 1);
      }
    } catch (error) {
      setLoading(false);
    }
  };
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (move.endMatchScores) {
      if (move.endMatchScores[0] === 1 && move.endMatchScores[1] === 0) {
        setLoading(true);
        getWinScore().then(() => setLoading(false));
      }
    }
  }, [move]);
  useEffect(() => {
    setLoading(true);
    getWinScore();
  }, []);
  // Waiting for a response from the server

  if (!isLogin) {
    return null;
  }
  if (loading || winScore == 'loading')
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  // Displays the score
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('./imgs/star.png')} />
      <View style={styles.textContainer}>
        <Text style={styles.text}>X {winScore}</Text>
      </View>
    </View>
  );
}
