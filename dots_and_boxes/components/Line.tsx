import React, {useEffect, useRef} from 'react';
import {Animated, Pressable} from 'react-native';

interface LineProps {
  width: number;
  height: number;
  onPress: () => void;
  isMarked?: boolean;
  vertical?: boolean;
}

const Line = ({height, width, onPress, isMarked = false, vertical = false}: LineProps) => {
  const opacity = useRef<Animated.Value>(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(opacity, {
      toValue: isMarked ? 1 : 0.05,
      duration: 700,
      useNativeDriver: true,
    }).start();
  }, [isMarked]);
  return vertical ? (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        {height: width, width: height, paddingHorizontal: pressed ? height * 0.2 : height * 0.3, elevation: 3},
      ]}>
      <Animated.View style={{flex: 1, backgroundColor: 'black', opacity}} />
    </Pressable>
  ) : (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [{height, width, paddingVertical: pressed ? height * 0.2 : height * 0.3, elevation: 3}]}>
      <Animated.View style={{flex: 1, backgroundColor: 'black', opacity}} />
    </Pressable>
  );
};

export default Line;
