import React from 'react';
import {Pressable, View} from 'react-native';

interface LineProps {
  width: number;
  height: number;
  onPress: () => void;
  isMarked?: boolean;
  vertical?: boolean;
}

const Line = ({height, width, onPress, isMarked = false, vertical = false}: LineProps) => {
  const backgroundColor = `rgba(0,0,0,${isMarked ? 1 : 0.1})`;
  return vertical ? (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [{height: width, width: height, paddingHorizontal: pressed ? height * 0.2 : height * 0.3}]}>
      <View style={{flex: 1, backgroundColor}} />
    </Pressable>
  ) : (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [{height, width, paddingVertical: pressed ? height * 0.2 : height * 0.3}]}>
      <View style={{flex: 1, backgroundColor}} />
    </Pressable>
  );
};

export default Line;
