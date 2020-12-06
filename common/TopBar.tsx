import React from 'react';
import {Header} from 'react-native-elements';

export default function TopBar() {
  return <Header leftComponent={{icon: 'menu'}} centerComponent={{text: 'Our app name'}} />;
}
