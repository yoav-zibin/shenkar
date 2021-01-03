import React, {useEffect, useRef} from 'react';
import {View, Animated} from 'react-native';
import {DOT_PHYSICAL_SIZE} from './consts';

interface SquareProps {
  size: number;
  fillColor: string;
}

const Square = ({size, fillColor}: SquareProps) => {
  const opacity = useRef<Animated.Value>(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.spring(opacity, {
      toValue: fillColor !== 'transparent' ? 1 : 0,
      useNativeDriver: true,
    }).start();
  }, [fillColor]);
  const scale = opacity.interpolate({
    inputRange: [0, 1],
    outputRange: [0.01, 1],
    extrapolate: 'clamp',
  });
  return (
    <Animated.View style={{height: size, width: size, opacity, transform: [{scale}]}}>
      <View
        style={{
          position: 'absolute',
          elevation: -1,
          zIndex: -1,
          height: size + DOT_PHYSICAL_SIZE,
          width: size + DOT_PHYSICAL_SIZE,
          left: -DOT_PHYSICAL_SIZE / 2,
          top: -DOT_PHYSICAL_SIZE / 2,
          backgroundColor: fillColor,
        }}
      />
    </Animated.View>
  );
};

export default Square;
