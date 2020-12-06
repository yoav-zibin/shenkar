import React, {useEffect} from 'react';
import {readAppState, useStoreContext} from './store';
import {Main} from './Main';

export function LoadStateFromAsyncStorage() {
  const {appState, dispatch} = useStoreContext();
  useEffect(() => {
    readAppState().then((appState) => {
      if (appState) {
        dispatch({setStateFromAsyncStorage: appState});
      } else {
        dispatch({setNoStateInAsyncStorage: true});
      }
    });
  }, []);
  return appState.isInitialState ? null : <Main />;
}
