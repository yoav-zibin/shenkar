import React from 'react';
import {Header} from 'react-native-elements';
import {hasTopBar, useStoreContext} from './store';

export function TopBar() {
  const {appState} = useStoreContext();
  const showTopBar = hasTopBar(appState);
  return showTopBar ? <Header leftComponent={{icon: 'menu'}} centerComponent={{text: 'Our app name'}} /> : null;
}
