import React, {useEffect} from 'react';
import {readAppState, useStoreContext} from './store';
import Main from './Main';

export default function LoadStateFromLocalStorage() {
  const {appState, dispatch} = useStoreContext();
  useEffect(() => {
    readAppState().then((appState) => {
      if (appState) {
        dispatch({setStateFromLocalStorage: appState});
      } else {
        dispatch({setNoStateInLocalStorage: true});
      }
    });
  }, []);
  return appState.isInitialState ? null : <Main />;
}
