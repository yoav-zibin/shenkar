import React, {useContext, createContext, ReactNode, useReducer} from 'react';
import {createInitialMove, IMove} from './common';
import {DEBUGGING_OPTIONS} from './debugging';
import {findGameModule} from './gameModules';
import {LanguageId} from './localize';

// see https://blog.logrocket.com/use-hooks-and-context-not-react-and-redux/

export interface AppContext {
  appState: AppState;
  dispatch: (action: AppStateAction) => void;
}
export interface AppState {
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
  riddleData: unknown;
}
// The current riddle is gameModule.riddleLevels[levelIndex].riddles[riddleIndex]
export interface RiddleActivity {
  levelIndex: number;
  riddleIndex: number;
}
export const PLAY_TYPES = ['PASS_AND_PLAY', 'AGAINST_COMPUTER', 'MULTIPLAYER'];
export const COMPUTER_LEVELS = ['EASY', 'MEDIUM', 'HARD'];

export type ComputerLevel = typeof COMPUTER_LEVELS[number];
export function computerLevelToAiMillis(level: ComputerLevel): number {
  switch (level) {
    case 'EASY':
      return 100;
    case 'MEDIUM':
      return 1000;
    case 'HARD':
      return 5000;
  }
  throw new Error('illegal level=' + level);
}

export type PlayType = typeof PLAY_TYPES[number];
export interface PlayActivity {
  playType: PlayType;
  computerLevel?: typeof COMPUTER_LEVELS[number];
}

const initialAppState: AppState = {
  languageId: DEBUGGING_OPTIONS.SKIP_CHOOSE_LANGUAGE_AND_USE as LanguageId,
  selectedGameId: DEBUGGING_OPTIONS.SKIP_CHOOSE_GAME_AND_JUMP_TO,
};

const initialContext: AppContext = {
  appState: DEBUGGING_OPTIONS.SKIP_CHOOSE_ACTIVITY_AND_JUMP_TO
    ? ourReducer(initialAppState, {setActivity: DEBUGGING_OPTIONS.SKIP_CHOOSE_ACTIVITY_AND_JUMP_TO})
    : initialAppState,
  dispatch: () => {
    // do nothing. we get the real method from useReducer below.
  },
};
export const store = createContext(initialContext);
const {Provider} = store;

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
          riddleData: null,
        };
      case 'AGAINST_COMPUTER':
      case 'MULTIPLAYER':
        // TODO: handle MULTIPLAYER
        return {
          yourPlayerIndex: 0,
          initialMove: initialMove,
          currentMove: initialMove,
          currentMoveNum: 0,
          maxMovesNum: 0, // no limit
          showHint: false,
          riddleData: null,
        };
    }
  }
  if (riddleActivity) {
    const level = gameModule.riddleLevels[riddleActivity.levelIndex];
    const riddle = level.riddles[riddleActivity.riddleIndex];
    const initialMove = {endMatchScores: null, turnIndex: level.turnIndex, state: riddle.state};
    return {
      yourPlayerIndex: level.turnIndex,
      initialMove: initialMove,
      currentMove: initialMove,
      currentMoveNum: 0,
      maxMovesNum: level.maxMovesNum,
      showHint: false,
      riddleData: riddle.riddleData,
    };
  }
  throw new Error('Set either play/riddle activity');
}

function ourReducer(appState: AppState, action: AppStateAction) {
  if (action.setLanguageId) {
    return {...appState, languageId: action.setLanguageId};
  }
  if (action.setSelectedGameId) {
    return {...appState, selectedGameId: action.setSelectedGameId};
  }
  if (action.setActivity) {
    const activity = action.setActivity;
    // When activity changes, we need to initialize it's state.
    return {...appState, activity, activityState: getInitialActivityState(appState, activity)};
  }
  if (action.clearActivity) {
    return {...appState, activity: undefined, activityState: undefined};
  }
  if (action.setActivityState) {
    return {...appState, activityState: action.setActivityState};
  }
  throw new Error('Illegal action=' + JSON.stringify(action));
}

export const StateProvider = (props: {children: ReactNode}) => {
  const [appState, dispatch] = useReducer(ourReducer, initialAppState);
  return <Provider value={{appState, dispatch}}>{props.children}</Provider>;
};

export function useStoreContext() {
  return useContext(store);
}
