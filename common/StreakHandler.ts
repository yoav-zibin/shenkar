import {reducerAndStoreState, readAppState, AppState} from './store';

const diffHours = (dt2: Date, dt1: Date): number => {
  let diff = (dt2.getTime() - dt1.getTime()) / 1000;
  diff /= 60 * 60;
  return Math.abs(Math.round(diff));
};

export const checkStreak = (state: AppState) => {
  if (state.lastLogin === undefined || state.dailyStreak === undefined) return state;

  const currDate = new Date(Date.now());
  const lastDate = new Date(state.lastLogin);

  if (diffHours(currDate, lastDate) >= 24) state.dailyStreak = 0;
  else if (currDate.getDay() != lastDate.getDay()) state.dailyStreak++;

  return state;
};

/**
 * Modiefied version of readAppState to allow checking for streak
 * the function reads the state checks the streak saves changes if there are any and returns the new state
 * otherwise it returns the state it read as is.
 */
export const readAppStateAndCheckStreak = async (): Promise<AppState | null> => {
  let state: AppState | null = null;
  try {
    state = await readAppState(); // read the state from storage
    if (!state) return null;
    if (!state.dailyStreak) state.dailyStreak = 0;
    if (!state.lastLogin) state.lastLogin = new Date().getTime(); // Current UTC time
    state = checkStreak(state);
    await reducerAndStoreState(state, {setStreak: true}); // store the changes of dailystreak back to the storage
    return state;
  } catch (e) {
    console.log(e);
  }
  return state;
};
