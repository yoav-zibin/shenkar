import React, {useContext, createContext, ReactNode, useReducer} from 'react';
import {createInitialMove, deepClone, deepEquals, IMove} from './common';
import {DEBUGGING_OPTIONS} from './debugging';
import {findGameModule} from './gameModules';
import {LanguageId} from './localize';
import AsyncStorage from '@react-native-async-storage/async-storage';

// see https://blog.logrocket.com/use-hooks-and-context-not-react-and-redux/

export interface AppContext {
  appState: AppState;
  dispatch: (action: AppStateAction) => void;
}
export interface AppState {
  isInitialState: boolean;
  languageId: LanguageId;
  selectedGameId?: string;
  activity?: Activity;
  activityState?: ActivityState;
}
export interface AppStateAction {
  setLanguageId?: LanguageId;
  setSelectedGameId?: string;
  setActivity?: Activity;
  clearActivity?: true;
  setActivityState?: ActivityState;
  setStateFromAsyncStorage?: AppState;
  setNoStateInAsyncStorage?: true;
}
export interface Activity {
  riddleActivity?: RiddleActivity;
  playActivity?: PlayActivity;
}
export interface ActivityState {
  yourPlayerIndex: number;
  initialMove: IMove<unknown>;
  currentMove: IMove<unknown>;
  currentMoveNum: number;
  maxMovesNum: number;
  showHint: boolean;
}
// The current riddle is gameModule.riddleLevels[levelIndex].riddles[riddleIndex]
export interface RiddleActivity {
  levelIndex: number;
  riddleIndex: number;
}
export const PLAY_TYPES = ['PASS_AND_PLAY', 'AGAINST_COMPUTER'];

export type PlayType = typeof PLAY_TYPES[number];
export interface PlayActivity {
  playType: PlayType;
}

const initialAppState: AppState = {
  isInitialState: true,
  languageId: '' as LanguageId,
  selectedGameId: '',
};

const initialContext: AppContext = {
  appState: addDebugOptionsToState(initialAppState),
  dispatch: () => {
    // do nothing. we get the real method from useReducer below.
  },
};
export const store = createContext(initialContext);
const {Provider} = store;

export function hasTopBar(appState: AppState) {
  return appState.languageId && appState.selectedGameId ? true : false;
}

function addDebugOptionsToState(appState: AppState) {
  const nextGameId = DEBUGGING_OPTIONS.SKIP_CHOOSE_GAME_AND_JUMP_TO;
  const nextActivity = DEBUGGING_OPTIONS.SKIP_CHOOSE_ACTIVITY_AND_JUMP_TO;
  const shouldUseInitialState =
    (nextGameId && nextGameId != appState.selectedGameId) ||
    (nextActivity && !deepEquals(nextActivity, appState.activity));
  const res = deepClone(shouldUseInitialState ? initialAppState : appState);
  // If debug game / activity is different, then reset to
  if (DEBUGGING_OPTIONS.SKIP_CHOOSE_LANGUAGE_AND_USE) {
    res.languageId = DEBUGGING_OPTIONS.SKIP_CHOOSE_LANGUAGE_AND_USE as LanguageId;
  }
  if (nextGameId) {
    res.selectedGameId = nextGameId;
  }
  if (nextActivity) {
    res.activity = nextActivity;
  }
  return res;
}

function getInitialActivityState(appState: AppState, activity: Activity): ActivityState {
  const {riddleActivity, playActivity} = activity;
  const gameModule = findGameModule(appState.selectedGameId);
  if (!gameModule) throw new Error('Missing selectedGameId');

  if (playActivity) {
    const initialMove = createInitialMove(gameModule.initialState);
    switch (playActivity.playType) {
      case 'PASS_AND_PLAY':
        return {
          yourPlayerIndex: 0,
          initialMove: initialMove,
          currentMove: initialMove,
          currentMoveNum: 0,
          maxMovesNum: 0, // no limit
          showHint: false,
        };
      case 'AGAINST_COMPUTER':
        return {
          yourPlayerIndex: 0,
          initialMove: initialMove,
          currentMove: initialMove,
          currentMoveNum: 0,
          maxMovesNum: 0, // no limit
          showHint: false,
        };
    }
  }
  if (riddleActivity) {
    const level = gameModule.riddleLevels[riddleActivity.levelIndex];
    const riddle = level.riddles[riddleActivity.riddleIndex];
    const initialMove = {endMatchScores: null, turnIndex: level.turnIndex, state: riddle};
    return {
      yourPlayerIndex: level.turnIndex,
      initialMove: initialMove,
      currentMove: initialMove,
      currentMoveNum: 0,
      maxMovesNum: level.maxMovesNum,
      showHint: false,
    };
  }
  throw new Error('Set either play/riddle activity');
}

const STORAGE_KEY = 'APP_STATE';

export async function readAppState() {
  try {
    const value = await AsyncStorage.getItem(STORAGE_KEY);
    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (e) {
    console.error('Error reading local state', e);
  }
  return null;
}

function reducerAndStoreState(appState: AppState, action: AppStateAction) {
  const nextState = ourReducer(appState, action);
  try {
    const jsonValue = JSON.stringify(nextState);
    AsyncStorage.setItem(STORAGE_KEY, jsonValue);
  } catch (e) {
    console.error('Error saving local state', e);
  }
  return nextState;
}

function ourReducer(appState: AppState, action: AppStateAction) {
  const {
    setLanguageId,
    setSelectedGameId,
    setActivity,
    clearActivity,
    setActivityState,
    setStateFromAsyncStorage,
    setNoStateInAsyncStorage,
  } = action;
  if (setLanguageId) {
    return {...appState, languageId: setLanguageId};
  }
  if (setSelectedGameId) {
    return {...appState, activity: undefined, activityState: undefined, selectedGameId: setSelectedGameId};
  }
  if (setActivity) {
    const activity = setActivity;
    // When activity changes, we need to initialize it's state.
    return {...appState, activity, activityState: getInitialActivityState(appState, activity)};
  }
  if (clearActivity) {
    return {...appState, activity: undefined, activityState: undefined};
  }
  if (setActivityState) {
    return {...appState, activityState: setActivityState};
  }
  if (setStateFromAsyncStorage) {
    return {...addDebugOptionsToState(setStateFromAsyncStorage), isInitialState: false};
  }
  if (setNoStateInAsyncStorage) {
    return {...appState, isInitialState: false};
  }
  throw new Error('Illegal action=' + JSON.stringify(action));
}

export const StateProvider = (props: {children: ReactNode}) => {
  const [appState, dispatch] = useReducer(reducerAndStoreState, initialAppState);
  return <Provider value={{appState, dispatch}}>{props.children}</Provider>;
};

export function useStoreContext() {
  return useContext(store);
}
