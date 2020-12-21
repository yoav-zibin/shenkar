import React, {useEffect} from 'react';
import {useStoreContext} from './store';
import {Main} from './Main';
import {DEBUGGING_OPTIONS} from './debugging';
import {readAppStateAndcheckStreak} from './StreakHandler';

export function LoadStateFromAsyncStorage() {
  const {appState, dispatch} = useStoreContext();
  useEffect(() => {
    console.log('One time reading from AsyncStorage. isInitialState=', appState.isInitialState);
    if (appState.isInitialState) {
      readAppStateAndcheckStreak().then((appStateFromAsyncStorage) => {
        console.log(appStateFromAsyncStorage);
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
