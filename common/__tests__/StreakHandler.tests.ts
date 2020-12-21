import {checkStreak} from '../StreakHandler';
import {initialAppState, AppState} from '../store';

describe('Streak Handler Tests', () => {
  it('difference in more than 24 hours state returns the streak to 0', () => {
    const state: AppState = initialAppState;
    const lastDate = new Date(state.lastLogin);
    lastDate.setHours(lastDate.getHours() - 24);
    state.lastLogin = lastDate.getTime();
    state.dailyStreak = 5;
    expect(checkStreak(state)).toHaveProperty('dailyStreak', 0);
  });
  it('difference is less than 24 hours and not same day state returns the streak to +1', () => {
    const state: AppState = initialAppState;
    const lastDate = new Date(state.lastLogin);
    lastDate.setHours(lastDate.getHours() - 18);
    state.lastLogin = lastDate.getTime();
    expect(checkStreak(state)).toHaveProperty('dailyStreak', 1);
  });
  it('difference is less than 24 hours and same day state doesnt change state', () => {
    const state: AppState = initialAppState;
    state.dailyStreak = 3;
    expect(checkStreak(state)).toHaveProperty('dailyStreak', 3);
  });
});
