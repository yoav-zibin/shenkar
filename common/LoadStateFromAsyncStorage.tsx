import React, {useEffect} from 'react';
import {readAppState, useStoreContext} from './store';
import {Main} from './Main';
import {DEBUGGING_OPTIONS} from './debugging';

export function LoadStateFromAsyncStorage() {
  const {appState, dispatch} = useStoreContext();
  useEffect(() => {
    console.log('One time reading from AsyncStorage. isInitialState=', appState.isInitialState);
    if (appState.isInitialState) {
      readAppState().then((appStateFromAsyncStorage) => {
        if (appStateFromAsyncStorage && !DEBUGGING_OPTIONS.IGNORE_ASYNC_STORAGE) {
          dispatch({setStateFromAsyncStorage: appStateFromAsyncStorage});
        } else {
          dispatch({setNoStateInAsyncStorage: true});
        }
      });
    }
  }, []);
  return appState.isInitialState ? null : <Main />;
}
