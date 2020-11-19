import React from 'react';
import {StyleSheet, View} from 'react-native';

export default function Cross(props: {xTranslate: number; yTranslate: number; color: string}) {
  const {xTranslate, yTranslate, color} = props;
  return (
    <View
      style={[
        styles.container,
        {
          transform: [
            {translateX: (xTranslate ? xTranslate : 10) + 35},
            {translateY: (yTranslate ? yTranslate : 10) - 12},
          ],
        },
      ]}>
      <View
        style={[
          styles.line,
          {
            transform: [{rotate: '45deg'}],
            backgroundColor: color ? color : '#000',
          },
        ]}
      />
      <View
        style={[
          styles.line,
          {
            transform: [{rotate: '135deg'}],
            backgroundColor: color ? color : '#000',
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: 80,
    height: 80,
  },
  line: {
    position: 'absolute',
    width: 8,
    height: 105,
  },
});
