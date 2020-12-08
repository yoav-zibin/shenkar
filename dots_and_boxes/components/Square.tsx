import React from 'react';
import {View} from 'react-native';

interface SquareProps {
  size: number;
  fillColor: string;
}

const Square = ({size, fillColor}: SquareProps) => {
  return <View style={{height: size, width: size, backgroundColor: fillColor}} />;
};

export default Square;
