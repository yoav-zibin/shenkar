import React from 'react';
import {MyComponent} from './hw2_react_components/yoav_zibin_component';
import {ThemeProvider} from 'react-native-elements';

export default function App() {
  return (
    <ThemeProvider>
      <MyComponent title="some title" />
    </ThemeProvider>
  );
}
