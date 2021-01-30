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
  BACKGROUNDMUSIC: {
    en: 'Background Music',
    he: 'מוסיקת רקע',
  },
  MOVESOUND: {
    en: 'Player Move Sound',
    he: 'קול במהלך שחקן',
  },
  YES: {
    en: 'ON',
    he: 'פעיל',
  },
  NO: {
    en: 'OFF',
    he: 'כבוי',
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
  GET_HINT: {
    en: 'Get hint',
    he: 'קבל רמז',
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
  CHECKERS_GAME_NAME: {
    en: 'Çheckers',
    he: 'דמקה',
  },
  CHECKERS_LEVEL1: {
    en: 'Possible Moves',
    he: 'מהלכים אפשריים',
  },
  CHECKERS_LEVEL2: {
    en: 'Offence',
    he: 'התקפה',
  },
  CHECKERS_LEVEL3: {
    en: 'Defence',
    he: 'הגנה',
  },
  CHECKERS_LEVEL4: {
    en: 'Crown A King',
    he: 'להפוך למלך',
  },
  CHECKERS_LEVEL5: {
    en: 'King Moves',
    he: 'מהלכי מלך',
  },
  // Illegal selection
  ILLEGAL_IGNORE_MANDATORY_JUMP: {
    en: 'Ignored Mandatory Jump',
    he: 'התעלמת מאכילת כלי יריב ',
  },
  ILLEGAL_SIMPLE_MOVE: {
    en: 'Illegal Simple Move',
    he: 'מהלך פשוט לא חוקי',
  },
  ILLEGAL_MOVE: {
    en: 'Illegal Simple Move',
    he: 'מהלך פשוט לא חוקי',
  },
  ILLEGAL_JUMP_MOVE: {
    en: 'Illegal Jump Move',
    he: 'מהלך קפיצה לא חוקי',
  },
  ILLEGAL_DELTA: {
    en: 'Illegal Delta',
    he: 'מרחק לא חוקי',
  },
  ILLEGAL_COLOR_CHANGED: {
    en: 'Illegal Color',
    he: 'צבע לא נכון',
  },
  ILLEGAL_CROWNED: {
    en: 'Illegal Crown',
    he: 'המלכה לא נכונה',
  },
  ILLEGAL_UNCROWNED: {
    en: 'Illegal Crown',
    he: 'המלכה לא נכונה',
  },
  ILLEGAL_SET_TURN: {
    en: 'It is not your turn',
    he: 'זה לא התור שלך',
  },
  ILLEGAL_END_MATCH_SCORE: {
    en: 'Illegal End Match Score',
    he: 'תוצאת סיום לא תקינה',
  },
  ILLEGAL_CODE: {
    en: 'Illegal Code',
    he: 'טעות כללית במשחק',
  },
  // Checkers ends.
  // Reversi starts.
  REVERSI_GAME_NAME: {
    en: 'Reversi',
    he: 'רוורסי',
  },
  REVERSI_LEVEL1: {
    en: 'B wins in 1 move',
    he: 'B מנצח במסע אחד',
  },
  REVERSI_LEVEL2: {
    en: 'W wins in 1 move',
    he: 'W מנצח במסע אחד',
  },
  REVERSI_LEVEL3: {
    en: 'B wins in 1 move',
    he: 'B מנצח במסע אחד',
  },
  REVERSI_LEVEL4: {
    en: 'B wins in 3 move',
    he: 'B מנצח ב 3 מסעים  ',
  },

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
  GOMOKU_GAME_NAME: {
    en: 'Gomoku',
    he: '5 בשורה',
  },
  GOMOKU_LEVEL1: {
    en: 'WIN!',
    he: 'ניצחון!',
  },
  GOMOKU_LEVEL2: {
    en: 'Block White!',
    he: 'חסום את לבן!',
  },
  GOMOKU_LEVEL3: {
    en: 'WIN 2!',
    he: 'ניצחון 2!',
  },
  GOMOKU_LEVEL4: {
    en: 'Block and Win',
    he: 'חסום ונצח',
  },
  // Gomoku ends.
  // Mancala Starts
  MANCALA_GAME_NAME: {
    en: 'Mancala',
    he: 'מנקלה',
  },
  MANCALA_LEVEL1: {
    en: 'Get an Extra Turn',
    he: 'קבל תור נוסף',
  },
  MANCALA_LEVEL2: {
    en: 'Get Oponnets Stones',
    he: 'לקחת את אבני המתחרה',
  },
  MANCALA_LEVEL3: {
    en: 'Finish the Game',
    he: 'לסיים את המשחק',
  },
};

export type LocalizeId = keyof typeof LOCALIZE_ID_TO_NAME;
export function localize(id: LocalizeId, appState: AppState): string {
  const languageId = appState.languageId;
  const langToStr = LOCALIZE_ID_TO_NAME[id];
  return langToStr[languageId ? languageId : 'en'];
}
