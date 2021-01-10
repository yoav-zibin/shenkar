import React, {useContext, createContext, ReactNode, useReducer} from 'react';
import {createInitialMove, deepClone, deepEquals, IMove} from './common';
import {DEBUGGING_OPTIONS} from './debugging';
import {findGameModule} from './gameModules';
import {LanguageId, localize} from './localize';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationProp} from '@react-navigation/native';

// see https://blog.logrocket.com/use-hooks-and-context-not-react-and-redux/

export interface AppContext {
  appState: AppState;
  dispatch: (action: AppStateAction) => void;
}
export interface AppState {
  isInitialState: boolean;
  languageId: LanguageId;
  lastLogin?: number; // The last epoch timestamp that the user logged in
  dailyStreak?: number; // The daily streak count starting from 0 and counting up.
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
  setStreak?: true;
}
export const ACTIVITY_TYPES = ['PASS_AND_PLAY', 'AGAINST_COMPUTER'];

export type ActivityType = typeof ACTIVITY_TYPES[number];
export interface Activity {
  activityType?: ActivityType;
  riddleActivity?: RiddleActivity;
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

export const initialAppState: AppState = {
  isInitialState: true,
  languageId: '' as LanguageId,
  selectedGameId: '',
  lastLogin: new Date().getTime(), // UTC timestamp
  dailyStreak: 0,
};

const initialContext: AppContext = {
  appState: addDebugOptionsToState(initialAppState),
  dispatch: () => {
    // do nothing. we get the real method from useReducer below.
  },
};
export const store = createContext(initialContext);
const {Provider} = store;

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
  const {riddleActivity, activityType} = activity;
  const gameModule = findGameModule(appState.selectedGameId);

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
  } else {
    const initialMove = createInitialMove(gameModule.initialState);
    if (activityType == 'PASS_AND_PLAY') {
      return {
        yourPlayerIndex: 0,
        initialMove: initialMove,
        currentMove: initialMove,
        currentMoveNum: 0,
        maxMovesNum: 0, // no limit
        showHint: false,
      };
    } else {
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

export function reducerAndStoreState(appState: AppState, action: AppStateAction) {
  const nextState = ourReducer(appState, action);
  try {
    const jsonValue = JSON.stringify(nextState);
    AsyncStorage.setItem(STORAGE_KEY, jsonValue);
  } catch (e) {
    console.error('Error saving local state', e);
  }
  console.log('Performing action:', action, ' and state changed to: ', nextState);
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
    setStreak,
  } = action;

  if (setStreak) {
    return {...appState};
  }
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

export type RootStackParamList = {
  Settings: undefined;
  ChooseGame: undefined;
  ChooseActivity: undefined;
  PlayArea: undefined;
};
export type RouteName = keyof RootStackParamList; // "Settings" | "ChooseGame" | "ChooseActivity" | "PlayArea"

export function getScreenTitle(routeName: RouteName, appState: AppState) {
  switch (routeName) {
    case 'Settings':
      return localize('SETTINGS_SCREEN', appState);
    case 'ChooseGame':
      return localize('CHOOSE_GAME_SCREEN', appState);
    case 'ChooseActivity':
      return localize('CHOOSE_ACTIVITY_SCREEN', appState);
  }
  // PlayArea screen.
  const {selectedGameId, activity} = appState;
  if (!activity) throw new Error('no activity');
  const {activityType, riddleActivity} = activity;
  const currentGameModule = findGameModule(selectedGameId);
  if (riddleActivity) {
    return localize(currentGameModule.riddleLevels[riddleActivity.levelIndex].levelLocalizeId, appState);
  }
  return localize(activityType == 'PASS_AND_PLAY' ? 'PASS_AND_PLAY' : 'AGAINST_COMPUTER', appState);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function navigateNextFrame(routeName: RouteName, navigation: NavigationProp<any>) {
  requestAnimationFrame(() => {
    navigation.navigate(routeName);
  });
}
