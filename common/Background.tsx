import React from 'react';
import {View, StyleSheet} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';

interface BackgroundProps {
  children?: JSX.Element | JSX.Element[];
}

const Background = ({children}: BackgroundProps) => {
  return (
    <View style={{flex: 1}}>
      <LinearGradient
        style={StyleSheet.absoluteFillObject}
        start={{x: 0.2, y: 0.2}}
        end={{x: 1, y: 1}}
        colors={['#0095B6', '#00DCB4']}
      />
      {children}
    </View>
  );
};

export default Background;
