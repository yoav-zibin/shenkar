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
  PASS_AND_PLAY_I18N: {
    en: 'Play with a friend seating next to you',
    he: 'שחק 2 אנשים עם אותו טלפון',
  },
  MULTIPLAYER_I18N: {
    en: 'Play against a random human',
    he: 'שחק נגד אדם אחר',
  },
  AGAINST_COMPUTER_EASY_I18N: {
    en: 'Easy play against the computer',
    he: 'משחק קל נגד המחשב',
  },
  AGAINST_COMPUTER_MEDIUM_I18N: {
    en: 'Medium play against the computer',
    he: 'משחק ברמת קושי בינונית נגד המחשב',
  },
  AGAINST_COMPUTER_HARD_I18N: {
    en: 'Hard play against the computer',
    he: 'משחק קשה נגד המחשב',
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
  // GO! ends.
  // Connect4 starts.
  // Connect4 ends.
  // Dots and Boxes starts.
  // Dots and Boxes ends.
  // Gomoku starts.
  GOMOKU_GAME_NAME: {
    en: 'Gomoku',
    he: '5 בשורה',
  },
  GOMOKU_LEVEL1: {
    en: 'Level 1',
    he: 'רמה 1',
  },
  GOMOKU_LEVEL2: {
    en: 'Level 2',
    he: 'רמה 2',
  },
  GOMOKU_LEVEL3: {
    en: 'Level 3',
    he: 'רמה 3',
  },
  GOMOKU_LEVEL4: {
    en: 'Level 4',
    he: 'רמה 4',
  },
  // Gomoku ends.
};

export type LocalizeId = keyof typeof LOCALIZE_ID_TO_NAME;
export function localize(id: LocalizeId, appState: AppState): string {
  const languageId = appState.languageId;
  const langToStr = LOCALIZE_ID_TO_NAME[id];
  return langToStr[languageId];
}
