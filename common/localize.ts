import {AppState} from './store';

export type LanguageId = 'en' | 'he';
type LangToName = {
  // The name in English.
  en: string;
  // The name in Hebrew.
  he: string;
};

export const LANGUAGES: LangToName = {
  en: 'English',
  he: 'עברית',
};

const LOCALIZE_ID_TO_NAME = {
  // LeftMenu
  SETTINGS_SCREEN: {
    en: 'Settings',
    he: 'הגדרות',
  },
  CHOOSE_GAME_SCREEN: {
    en: 'Change game',
    he: 'החלף משחק',
  },
  CHOOSE_ACTIVITY_SCREEN: {
    en: 'Change activity',
    he: 'החלף פעילות',
  },
  PLAY_AREA_SCREEN: {
    en: 'Change activity',
    he: 'החלף פעילות',
  },

  PASS_AND_PLAY: {
    en: 'Play against another human',
    he: 'שחק נגד אדם אחר',
  },
  AGAINST_COMPUTER: {
    en: 'Play against the computer',
    he: 'שחק נגד המחשב',
  },
  // For AGAINST_COMPUTER
  YOU_WON: {
    en: 'You won the game!',
    he: 'ניצחת!',
  },
  YOU_LOST: {
    en: 'You lost the game.',
    he: 'הפסדת.',
  },
  // For PASS_AND_PLAY
  FIRST_PLAYER_WON: {
    en: 'First player won the game!',
    he: 'השחקן הראשון נצח!',
  },
  SECOND_PLAYER_WON: {
    en: 'Second player won the game!',
    he: 'השחקן השני נצח!',
  },
  // For any play activity
  NOBODY_WON: {
    en: 'Nobody won, game ended in a tie.',
    he: 'אין מנצח, המשחק נגמר בתיקו',
  },
  PLAY_AGAIN: {
    en: 'Play again!',
    he: 'שחק שוב!',
  },

  LEVEL_SUCCESS: {
    en: 'Good Job! Level finished',
    he: 'כל הכבוד! שלב הסתיים',
  },
  // For riddles
  RIDDLE_SOLVED: {
    en: 'Riddle solved!',
    he: 'פתרת את החידה!',
  },
  NEXT_RIDDLE: {
    en: 'Next riddle',
    he: 'לחידה הבאה',
  },
  RIDDLE_FAILED: {
    en: 'Riddle failed',
    he: 'נכשלת בפתרון החידה',
  },
  TRY_RIDDLE_AGAIN: {
    en: 'Try again',
    he: 'נסה שוב',
  },
  //  TICTACTOE starts.
  TICTACTOE_GAME_NAME: {
    en: 'TicTacToe',
    he: 'איקס עיגול',
  },
  TICTACTOE_LEVEL1: {
    en: 'X wins in 1 move',
    he: 'X מנצח במסע אחד',
  },
  TICTACTOE_LEVEL2: {
    en: '◯ wins in 1 move',
    he: '◯ מנצח במסע אחד',
  },
  TICTACTOE_LEVEL3: {
    en: 'X blocks and then wins',
    he: 'X חוסם ואז מנצח',
  },
  TICTACTOE_LEVEL4: {
    en: 'X forces ◯ to block and then wins',
    he: 'X מכריח את ◯ לחסום ואז מנצח',
  },
  TICTACTOE_LEVEL5: {
    en: 'X wins eventually',
    he: 'X מנצח בסוף',
  },
  // TICTACTOE ends.
  // Checkers starts.
  // Checkers ends.
  // Reversi starts.
  // Reversi ends.
  // GO! starts.
  GO_GAME_NAME: {
    en: 'GO!',
    he: 'גו!',
  },
  GO_LEVEL1: {
    en: 'Black conquer white in 1 move',
    he: 'שחור כובש את הלבן במסע אחד',
  },
  GO_LEVEL2: {
    en: 'Black blocks white in 1 move',
    he: 'שחור חוסם את הלבן במסע אחד',
  },
  GO_LEVEL3: {
    en: 'Black conquer white in 2 move',
    he: 'שחור כובש את הלבן בשני מסעים',
  },
  GO_LEVEL4: {
    en: 'Black blocks white in 2 move',
    he: 'שחור חוסם את הלבן בשני מסעים',
  },

  // GO! ends.
  // Connect4 starts.
  CONNECT4_GAME_NAME: {
    en: 'Connect4',
    he: 'ארבע בשורה',
  },
  CONNECT4_LEVEL1: {
    en: 'level1 - Y wins in 1 move',
    he: 'Y שלב 1 - מנצח במסע אחד',
  },
  CONNECT4_LEVEL2: {
    en: 'level2 - Y wins in 1 move',
    he: 'Y שלב 2 - מנצח במסע אחד',
  },
  CONNECT4_LEVEL3: {
    en: 'level3 - Advanced',
    he: 'שלב 3 - למתקדמים',
  },
  CONNECT4_LEVEL4: {
    en: 'level3-Advanced Tricks',
    he: 'שלב 4 - טריקים למתקדמים',
  },
  // Connect4 ends.
  // Dots and Boxes starts.
  DOTS_AND_BOXES_GAME_NAME: {
    en: 'Dots and Boxes',
    he: 'קווים וקופסאות',
  },
  DOTS_AND_BOXES_LEVEL1: {
    en: 'You wins in 1 move',
    he: 'אתה מנצח במסע אחד',
  },
  DOTS_AND_BOXES_LEVEL2: {
    en: 'You wins in 2 move',
    he: 'אתה מנצח ב-2 מסעים',
  },
  DOTS_AND_BOXES_LEVEL3: {
    en: 'You wins in 3 move',
    he: 'אתה מנצח ב-3 מסעים',
  },
  DOTS_AND_BOXES_LEVEL4: {
    en: 'You wins in 5 move',
    he: 'אתה מנצח ב-5 מסעים',
  },
  // Dots and Boxes ends.
  // Gomoku starts.
  // Gomoku ends.
};

export type LocalizeId = keyof typeof LOCALIZE_ID_TO_NAME;
export function localize(id: LocalizeId, appState: AppState): string {
  const languageId = appState.languageId;
  const langToStr = LOCALIZE_ID_TO_NAME[id];
  return langToStr[languageId ? languageId : 'en'];
}
