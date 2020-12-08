import React from 'react';
import {View} from 'react-native';

interface DotProps {
  size: number;
  margin: number;
}

const Dot = ({size, margin}: DotProps) => {
  return <View style={{height: size, width: size, backgroundColor: 'black', borderRadius: size / 2, margin}} />;
};

export default Dot;
