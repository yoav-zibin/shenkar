export const DEBUGGING_OPTIONS = {
  // To skip the <ChooseLanguage> component, set it to a language Id,
  // e.g., 'he'
  SKIP_CHOOSE_LANGUAGE_AND_USE: 'en',

  // To skip the <ChooseGame> component, set it to a game Id,
  // e.g., 'tictactoe'
  SKIP_CHOOSE_GAME_AND_JUMP_TO: 'checkers',

  // To skip the <ChooseGame> component, set it to an activity,
  // e.g., {activityType: 'PASS_AND_PLAY'}
  SKIP_CHOOSE_ACTIVITY_AND_JUMP_TO: undefined,

  // To make it easy to debug the hints, set to true and then
  // we show the hint after 1 second
  // (instead of waiting for 10-30 seconds)
  SHOW_HINT_AFTER_ONE_SECOND: true,

  IGNORE_ASYNC_STORAGE: false,
};
