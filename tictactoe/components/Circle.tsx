import React from 'react';
import {StyleSheet, View} from 'react-native';

export default function Circle(props: {xTranslate: number; yTranslate: number; color: string}) {
  const {xTranslate, yTranslate, color} = props;
  return (
    <View
      style={[
        styles.container,
        {
          transform: [{translateX: xTranslate ? xTranslate : 10}, {translateY: yTranslate ? yTranslate : 10}],
          backgroundColor: color ? color : '#000',
        },
      ]}>
      <View style={styles.innerCircle}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  innerCircle: {
    backgroundColor: '#F5FCFF',
    width: 70,
    height: 70,
    borderRadius: 35,
  },
});
