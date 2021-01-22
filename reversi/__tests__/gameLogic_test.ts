import {IMove} from '../../common/common';
import {
  IState,
  isMoveOk,
  IIsMoveOk,
  getInitialState,
  checkRiddleData,
  Board,
  RiddleData,
  createMove,
  exampleMoves,
  exampleGame,
} from '../gameLogic';

describe('Reversi - game logic', () => {
  function validMove(turnIndexBeforeMove: number, stateBeforeMove: IState, move: IMove<IState>) {
    const isMoveOkParams: IIsMoveOk = {
      turnIndexBeforeMove,
      stateBeforeMove,
      move,
    };

    expect(isMoveOk(isMoveOkParams)).toBe(true);
    // expect(isMoveOk(isMoveOkParams)).toEqual(move);
  }

  function invalidMove(turnIndexBeforeMove: number, stateBeforeMove: IState | undefined, move: IMove<IState> | null) {
    const isMoveOkParams: IIsMoveOk = {
      turnIndexBeforeMove,
      stateBeforeMove,
    };

    if (move) isMoveOkParams.move = move;
    // expect(isMoveOk(isMoveOkParams)).toEqual(move);

    expect(isMoveOk(isMoveOkParams)).toBe(false);
  }
  describe('getInitialState', () => {
    it('should return the initial state', () => {
      expect(getInitialState()).toEqual({
        board: [
          ['', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', ''],
          ['', '', '', 'W', 'B', '', '', ''],
          ['', '', '', 'B', 'W', '', '', ''],
          ['', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', ''],
        ],
      });
    });
  });

  describe('createMove', () => {
    it('should throw exception One can only make a move in an empty position!', () => {
      const board = [
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', 'W', 'B', '', '', ''],
        ['', '', '', 'B', 'W', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
      ];
      expect(function () {
        createMove(board, 3, 3, 0);
      }).toThrow(new Error('One can only make a move in an empty position!'));
    });

    it("should throw exception One can only make a move next to the opponent's piece!", () => {
      const board = [
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', 'W', 'B', '', '', ''],
        ['', '', '', 'B', 'W', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
      ];
      expect(function () {
        createMove(board, 0, 0, 0);
      }).toThrow(new Error("One can only make a move next to the opponent's piece!"));
    });

    it("should throw exception One must sandwich opponent's pieces on every move!", () => {
      const board = [
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', 'W', 'B', '', '', ''],
        ['', '', '', 'B', 'W', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
      ];
      expect(function () {
        createMove(board, 3, 5, 0);
      }).toThrow(new Error("One must sandwich opponent's pieces on every move!"));
    });

    it('should throw exception CreateMove func should receive a value for turnIndexBeforeMove', () => {
      const board = [
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', 'W', 'B', '', '', ''],
        ['', '', '', 'B', 'W', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
      ];
      expect(function () {
        createMove(board, 3, 5, undefined);
      }).toThrow(new Error('CreateMove func should receive a value for turnIndexBeforeMove'));
    });

    it('should return valid response for B move', () => {
      const board = [
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', 'W', 'B', '', '', ''],
        ['', '', '', 'B', 'W', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
      ];
      expect(createMove(board, 3, 2, 0)).toEqual({
        turnIndex: 1,
        endMatchScores: null,
        state: {
          board: [
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', 'B', 'B', 'B', '', '', ''],
            ['', '', '', 'B', 'W', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
          ],
          delta: {
            row: 3,
            col: 2,
          },
        },
      });
    });

    it('should return valid response for W move', () => {
      const board = [
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', 'W', 'B', '', '', ''],
        ['', '', '', 'B', 'W', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
      ];
      expect(createMove(board, 3, 5, 1)).toEqual({
        turnIndex: 0,
        endMatchScores: null,
        state: {
          board: [
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', 'W', 'W', 'W', '', ''],
            ['', '', '', 'B', 'W', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
          ],
          delta: {
            row: 3,
            col: 5,
          },
        },
      });
    });

    it('should return valid response for B move (B is the winner)', () => {
      const board = [
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['B', 'B', 'B', 'B', 'W', '', '', ''],
        ['B', 'B', 'B', 'B', 'B', 'B', 'B'],
        ['B', 'B', 'B', 'B', 'B', 'B', 'B'],
        ['B', 'B', 'B', 'B', 'B', 'B', 'B'],
        ['B', 'B', 'B', 'B', 'B', 'B', 'B'],
      ];
      expect(createMove(board, 3, 5, 0)).toEqual({
        turnIndex: -1,
        endMatchScores: [1, 0],
        state: {
          board: [
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['B', 'B', 'B', 'B', 'B', 'B', '', ''],
            ['B', 'B', 'B', 'B', 'B', 'B', 'B'],
            ['B', 'B', 'B', 'B', 'B', 'B', 'B'],
            ['B', 'B', 'B', 'B', 'B', 'B', 'B'],
            ['B', 'B', 'B', 'B', 'B', 'B', 'B'],
          ],
          delta: {
            row: 3,
            col: 5,
          },
        },
      });
    });

    it('should return valid response for W move (W is the winner)', () => {
      const board = [
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['W', 'W', 'W', 'W', 'B', '', '', ''],
        ['W', 'W', 'W', 'W', 'W', 'W', 'W'],
        ['W', 'W', 'W', 'W', 'W', 'W', 'W'],
        ['W', 'W', 'W', 'W', 'W', 'W', 'W'],
        ['W', 'W', 'W', 'W', 'W', 'W', 'W'],
      ];
      expect(createMove(board, 3, 5, 1)).toEqual({
        turnIndex: -1,
        endMatchScores: [0, 1],
        state: {
          board: [
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['W', 'W', 'W', 'W', 'W', 'W', '', ''],
            ['W', 'W', 'W', 'W', 'W', 'W', 'W'],
            ['W', 'W', 'W', 'W', 'W', 'W', 'W'],
            ['W', 'W', 'W', 'W', 'W', 'W', 'W'],
            ['W', 'W', 'W', 'W', 'W', 'W', 'W'],
          ],
          delta: {
            row: 3,
            col: 5,
          },
        },
      });
    });

    it('should return valid response for B move (T)', () => {
      const board = [
        ['B', 'B', 'B', 'B', 'B', 'B', 'B'],
        ['B', 'B', 'B', 'B', 'B', 'B', 'B'],
        ['B', 'B', 'B', 'B', 'B', 'B', 'B'],
        ['', 'W', 'B', 'B', 'B', 'B', 'B'],
        ['W', 'W', 'W', 'W', 'W', 'W', 'W'],
        ['W', 'W', 'W', 'W', 'W', 'W', 'W'],
        ['W', 'W', 'W', 'W', 'W', 'W', 'W'],
        ['W', 'W', 'W', 'W', 'W', 'W', 'W'],
      ];
      expect(createMove(board, 3, 0, 0)).toEqual({
        turnIndex: -1,
        endMatchScores: [0, 0],
        state: {
          board: [
            ['B', 'B', 'B', 'B', 'B', 'B', 'B'],
            ['B', 'B', 'B', 'B', 'B', 'B', 'B'],
            ['B', 'B', 'B', 'B', 'B', 'B', 'B'],
            ['B', 'B', 'B', 'B', 'B', 'B', 'B'],
            ['W', 'W', 'W', 'W', 'W', 'W', 'W'],
            ['W', 'W', 'W', 'W', 'W', 'W', 'W'],
            ['W', 'W', 'W', 'W', 'W', 'W', 'W'],
            ['W', 'W', 'W', 'W', 'W', 'W', 'W'],
          ],
          delta: {
            row: 3,
            col: 0,
          },
        },
      });
    });
  });

  describe('exampleMoves', () => {
    it('should return the right result', () => {
      const board = [
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', 'W', 'B', '', '', ''],
        ['', '', '', 'B', 'W', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
      ];
      const arrayOfRowColComment = [{row: 3, col: 2, comment: 'good'}];
      const state = {
        board: [
          ['', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', ''],
          ['', '', 'B', 'B', 'B', '', '', ''],
          ['', '', '', 'B', 'W', '', '', ''],
          ['', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', ''],
        ],
        delta: {
          row: 3,
          col: 2,
        },
      };
      expect(exampleMoves(0, {board}, arrayOfRowColComment)).toEqual({
        stateBeforeMove: {board},
        stateAfterMove: state,
        turnIndexBeforeMove: 0,
        // TODO check
        turnIndexAfterMove: 1,
        comment: {en: 'good'},
        move: {
          endMatchScores: null,
          turnIndex: 1,
          state: state,
        },
      });
    });
  });

  describe('exampleGame', () => {
    it('should return the right result', () => {
      const boardAfterMove = [
        ['', 'W', 'B', 'B', 'B', 'B', 'B', ''],
        ['', '', 'W', 'B', 'W', 'B', '', ''],
        ['W', 'W', 'B', 'W', 'B', 'W', 'B', 'B'],
        ['W', 'B', 'W', 'B', 'B', 'W', 'B', 'B'],
        ['W', 'W', 'B', 'W', 'B', 'B', 'B', 'B'],
        ['W', 'W', 'W', 'B', 'W', 'B', 'W', 'W'],
        ['', '', 'B', 'W', 'W', 'W', 'W', 'W'],
        ['', 'B', 'B', 'B', 'B', 'B', '', 'B'],
      ];

      const boardBeforeMove = [
        ['', 'W', 'B', 'B', 'B', 'B', 'B', ''],
        ['', '', 'W', 'B', 'W', 'B', '', ''],
        ['W', 'W', 'B', 'W', 'B', 'W', 'B', 'B'],
        ['W', 'B', 'W', 'B', 'B', 'W', 'B', 'B'],
        ['W', 'W', 'B', 'W', 'B', 'B', 'B', 'B'],
        ['W', 'W', 'W', 'B', 'W', 'B', 'W', 'W'],
        ['', '', 'B', 'W', 'W', 'W', 'B', ''],
        ['', 'B', 'B', 'B', 'B', 'B', '', 'B'],
      ];

      const stateAfterMove = {
        board: boardAfterMove,
        delta: {
          row: 6,
          col: 7,
        },
      };

      const stateBeforeMove = {
        board: boardBeforeMove,
        delta: {
          row: 7,
          col: 7,
        },
      };

      expect(exampleGame()).toEqual({
        stateBeforeMove: stateBeforeMove,
        stateAfterMove: stateAfterMove,
        turnIndexBeforeMove: 1,
        turnIndexAfterMove: 0,
        comment: {en: 'White plays (6,7)'},
        move: {
          endMatchScores: null,
          turnIndex: 0,
          state: stateAfterMove,
        },
      });
    });
  });

  describe('checkRiddleData', () => {
    it('should return the true', () => {
      const board: Board = [
        ['', 'W', 'B', 'B', 'B', 'B', 'B', ''],
        ['', '', 'W', 'B', 'W', 'B', '', ''],
        ['W', 'W', 'B', 'W', 'B', 'W', 'B', 'B'],
        ['W', 'B', 'W', 'B', 'B', 'W', 'B', 'B'],
        ['W', 'W', 'B', 'W', 'B', 'B', 'B', 'B'],
        ['W', 'W', 'W', 'B', 'W', 'B', 'W', 'W'],
        ['', '', 'B', 'W', 'W', 'W', 'B', ''],
        ['', 'B', 'B', 'B', 'B', 'B', '', 'B'],
      ];
      const riddleData: RiddleData = {
        solutionCol: 0,
        solutionRow: 0,
      };

      const firstMoveSolutions: IMove<IState>[] = [
        {
          endMatchScores: null,
          turnIndex: 1,
          state: {
            board,
            delta: {row: 0, col: 0},
          },
        },
      ];

      expect(checkRiddleData({riddleData}, 0, firstMoveSolutions)).toBeTruthy();
    });

    it('should return the false', () => {
      const board: Board = [
        ['', 'W', 'B', 'B', 'B', 'B', 'B', ''],
        ['', '', 'W', 'B', 'W', 'B', '', ''],
        ['W', 'W', 'B', 'W', 'B', 'W', 'B', 'B'],
        ['W', 'B', 'W', 'B', 'B', 'W', 'B', 'B'],
        ['W', 'W', 'B', 'W', 'B', 'B', 'B', 'B'],
        ['W', 'W', 'W', 'B', 'W', 'B', 'W', 'W'],
        ['', '', 'B', 'W', 'W', 'W', 'B', ''],
        ['', 'B', 'B', 'B', 'B', 'B', '', 'B'],
      ];

      const firstMoveSolutions: IMove<IState>[] = [
        {
          endMatchScores: null,
          turnIndex: 1,
          state: {
            board,
            delta: {row: 0, col: 0},
          },
        },
      ];

      expect(checkRiddleData({}, 0, firstMoveSolutions)).toBeFalsy();
    });
  });

  it('isMoveOk should returns false when stateBeforMove is undefined', () => {
    invalidMove(0, undefined, {
      turnIndex: 1,
      endMatchScores: null,
      state: {
        board: [
          ['', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', ''],
          ['', '', 'B', 'B', 'B', '', '', ''],
          ['', '', '', 'B', 'W', '', '', ''],
          ['', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', ''],
        ],
        delta: {row: 3, col: 2},
      },
    });
  });

  it('checks that placing B in (3,2) is valid', () => {
    validMove(
      0,
      {},
      {
        turnIndex: 1,
        endMatchScores: null,
        state: {
          board: [
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', 'B', 'B', 'B', '', '', ''],
            ['', '', '', 'B', 'W', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
          ],
          delta: {row: 3, col: 2},
        },
      }
    );
  });

  it('checks that placing W in (2,4) after B plays is valid', function () {
    validMove(
      1,
      {
        board: [
          ['', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', ''],
          ['', '', 'B', 'B', 'B', '', '', ''],
          ['', '', '', 'B', 'W', '', '', ''],
          ['', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', ''],
        ],
        delta: {row: 3, col: 2},
      },
      {
        endMatchScores: null,
        turnIndex: 0,
        state: {
          board: [
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', 'W', '', '', ''],
            ['', '', 'B', 'B', 'W', '', '', ''],
            ['', '', '', 'B', 'W', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
          ],
          delta: {row: 2, col: 4},
        },
      }
    );
  });

  it('checks that setting the turn back to oneself when opponent has no valid move is valid', function () {
    validMove(
      0,
      {
        board: [
          ['B', 'B', 'B', 'B', 'B', 'B', 'B', ''],
          ['W', 'B', 'W', 'B', 'B', 'W', '', ''],
          ['W', 'B', 'B', 'B', 'B', 'W', 'W', ''],
          ['W', 'B', 'B', 'W', 'W', 'B', 'W', ''],
          ['W', 'B', 'W', 'W', 'W', 'W', 'W', 'W'],
          ['W', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', ''],
        ],
        delta: {row: 5, col: 0},
      },
      {
        endMatchScores: null,
        turnIndex: 0,
        state: {
          board: [
            ['B', 'B', 'B', 'B', 'B', 'B', 'B', ''],
            ['B', 'B', 'W', 'B', 'B', 'W', '', ''],
            ['B', 'B', 'B', 'B', 'B', 'W', 'W', ''],
            ['B', 'B', 'B', 'W', 'W', 'B', 'W', ''],
            ['B', 'B', 'W', 'W', 'W', 'W', 'W', 'W'],
            ['B', '', '', '', '', '', '', ''],
            ['B', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
          ],
          delta: {row: 6, col: 0},
        },
      }
    );
  });

  it('checks that the game ends when there are no more empty squares (white wins)', function () {
    validMove(
      1,
      {
        board: [
          ['W', 'B', 'B', 'B', 'B', 'B', 'B', ''],
          ['W', 'W', 'W', 'W', 'W', 'B', 'B', 'W'],
          ['W', 'W', 'W', 'B', 'B', 'W', 'B', 'B'],
          ['W', 'B', 'B', 'B', 'W', 'W', 'B', 'B'],
          ['W', 'W', 'B', 'W', 'W', 'B', 'W', 'B'],
          ['W', 'B', 'W', 'B', 'B', 'B', 'B', 'B'],
          ['W', 'B', 'B', 'B', 'B', 'B', 'B', 'B'],
          ['W', 'W', 'W', 'W', 'W', 'W', 'W', 'W'],
        ],
        delta: {row: 0, col: 6},
      },
      {
        endMatchScores: [0, 1], // white wins
        turnIndex: -1,
        state: {
          board: [
            ['W', 'W', 'W', 'W', 'W', 'W', 'W', 'W'],
            ['W', 'W', 'W', 'W', 'W', 'B', 'W', 'W'],
            ['W', 'W', 'W', 'B', 'B', 'W', 'B', 'B'],
            ['W', 'B', 'B', 'B', 'W', 'W', 'B', 'B'],
            ['W', 'W', 'B', 'W', 'W', 'B', 'W', 'B'],
            ['W', 'B', 'W', 'B', 'B', 'B', 'B', 'B'],
            ['W', 'B', 'B', 'B', 'B', 'B', 'B', 'B'],
            ['W', 'W', 'W', 'W', 'W', 'W', 'W', 'W'],
          ],
          delta: {row: 0, col: 7},
        },
      }
    );
  });

  it('checks that the game ends when there are no more empty squares (black wins)', function () {
    validMove(
      0,
      {
        board: [
          ['W', 'B', 'B', 'B', 'B', 'B', 'B', 'B'],
          ['W', 'B', 'B', 'B', 'B', 'B', 'B', 'B'],
          ['W', 'W', 'B', 'B', 'B', 'B', 'B', 'B'],
          ['B', 'B', 'W', 'B', 'W', 'W', 'B', 'B'],
          ['B', 'W', 'B', 'W', 'W', 'B', 'W', 'B'],
          ['B', 'B', 'W', 'B', 'W', 'B', 'W', 'B'],
          ['B', 'B', 'B', 'B', 'B', 'W', 'W', 'B'],
          ['W', 'W', 'W', 'W', 'W', '', 'W', 'B'],
        ],
        delta: {row: 7, col: 6},
      },
      {
        endMatchScores: [1, 0], // black wins
        turnIndex: -1,
        state: {
          board: [
            ['W', 'B', 'B', 'B', 'B', 'B', 'B', 'B'],
            ['W', 'B', 'B', 'B', 'B', 'B', 'B', 'B'],
            ['W', 'W', 'B', 'B', 'B', 'B', 'B', 'B'],
            ['B', 'B', 'W', 'B', 'W', 'W', 'B', 'B'],
            ['B', 'W', 'B', 'W', 'W', 'B', 'W', 'B'],
            ['B', 'B', 'W', 'B', 'W', 'B', 'W', 'B'],
            ['B', 'B', 'B', 'B', 'B', 'B', 'B', 'B'],
            ['W', 'W', 'W', 'W', 'W', 'B', 'B', 'B'],
          ],
          delta: {row: 7, col: 5},
        },
      }
    );
  });

  it('checks that placing a disk in a non-empty square (3,3) is invalid', function () {
    invalidMove(
      0,
      {},
      {
        turnIndex: 1,
        endMatchScores: null,
        state: {
          board: [
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', 'B', 'B', '', '', ''],
            ['', '', '', 'B', 'W', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
          ],
          delta: {row: 3, col: 3},
        },
      }
    );
  });

  it("checks that placing a disk in a cell not adjacent to one with the opponent's disk is invalid", function () {
    invalidMove(
      1,
      {
        board: [
          ['', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', ''],
          ['', '', 'B', 'B', 'B', '', '', ''],
          ['', '', '', 'B', 'W', '', '', ''],
          ['', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', ''],
        ],
        delta: {row: 3, col: 2},
      },
      {
        turnIndex: 0,
        endMatchScores: null,
        state: {
          board: [
            ['W', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', 'B', 'B', 'B', '', '', ''],
            ['', '', '', 'B', 'W', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
          ],
          delta: {row: 0, col: 0},
        },
      }
    );
  });

  it('checks that placing a disk in a cell without forming a sandwich is invalid', function () {
    invalidMove(
      1,
      {
        board: [
          ['', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', ''],
          ['', '', 'B', 'B', 'B', '', '', ''],
          ['', '', '', 'B', 'W', '', '', ''],
          ['', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', ''],
        ],
        delta: {row: 3, col: 2},
      },
      {
        turnIndex: 0,
        endMatchScores: null,
        state: {
          board: [
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', 'B', 'B', 'B', 'W', '', ''],
            ['', '', '', 'B', 'W', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
          ],
          delta: {row: 3, col: 5},
        },
      }
    );
  });

  it('checks that placing a disk outside the board (8,7) is invalid', function () {
    invalidMove(
      1,
      {
        board: [
          ['', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', ''],
          ['', '', '', '', 'B', 'B', 'B', ''],
          ['', '', 'B', 'B', 'B', 'B', 'B', ''],
          ['', '', 'W', 'W', 'B', 'W', 'W', 'W'],
          ['', '', '', '', '', 'B', 'W', 'B'],
          ['', '', '', '', '', 'B', 'W', 'B'],
          ['', '', '', '', '', '', '', ''],
        ],
        delta: {row: 6, col: 7},
      },
      {
        turnIndex: 0,
        endMatchScores: null,
        state: {
          board: [
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', 'B', 'B', 'B', ''],
            ['', '', 'B', 'B', 'B', 'B', 'B', ''],
            ['', '', 'W', 'W', 'B', 'W', 'W', 'W'],
            ['', '', '', '', '', 'B', 'W', 'B'],
            ['', '', '', '', '', 'B', 'W', 'B'],
            ['', '', '', '', '', '', '', 'W'],
          ],
          delta: {row: 8, col: 7},
        },
      }
    );
  });

  it('checks that placing a disk on a correct cell (7,5), but setting the board wrong is invalid', function () {
    invalidMove(
      1,
      {
        board: [
          ['', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', ''],
          ['', '', '', '', 'B', 'B', 'B', ''],
          ['', '', 'B', 'B', 'B', 'B', 'B', ''],
          ['', '', 'W', 'W', 'B', 'W', 'W', 'W'],
          ['', '', '', '', '', 'B', 'W', 'B'],
          ['', '', '', '', '', 'B', 'W', 'B'],
          ['', '', '', '', '', '', '', ''],
        ],
        delta: {row: 6, col: 7},
      },
      {
        turnIndex: 0,
        endMatchScores: null,
        state: {
          board: [
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', 'B', 'B', 'B', ''],
            ['', '', 'B', 'B', 'B', 'B', 'B', ''],
            ['', '', 'W', 'W', 'B', 'W', 'W', 'W'],
            ['', '', '', '', '', 'B', 'W', 'B'],
            ['', '', '', '', '', 'B', 'W', 'B'],
            ['', '', '', '', '', '', '', 'W'],
          ],
          delta: {row: 7, col: 5},
        },
      }
    );
  });

  it('checks that setting the turn to self when the opponent has a valid next move is invalid', function () {
    invalidMove(
      1,
      {
        board: [
          ['', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', ''],
          ['', '', '', '', 'B', 'B', 'B', ''],
          ['', '', 'B', 'B', 'B', 'B', 'B', ''],
          ['', '', 'W', 'W', 'B', 'W', 'W', 'W'],
          ['', '', '', '', '', 'B', 'W', 'B'],
          ['', '', '', '', '', 'B', 'W', 'B'],
          ['', '', '', '', '', '', '', ''],
        ],
        delta: {row: 6, col: 7},
      },
      {
        turnIndex: 1,
        endMatchScores: null,
        state: {
          board: [
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
            ['', '', '', '', 'B', 'B', 'B', ''],
            ['', '', 'B', 'B', 'B', 'B', 'B', ''],
            ['', '', 'W', 'W', 'B', 'W', 'W', 'W'],
            ['', '', '', '', '', 'B', 'W', 'B'],
            ['', '', '', '', '', 'B', 'W', 'B'],
            ['', '', '', '', '', 'W', '', ''],
          ],
          delta: {row: 7, col: 5},
        },
      }
    );
  });

  it('checks that setting the turn to the opponent (W) when he has no valid move is invalid', function () {
    invalidMove(
      0,
      {
        board: [
          ['B', 'B', 'B', 'B', 'B', 'B', 'B', ''],
          ['W', 'B', 'W', 'B', 'B', 'W', '', ''],
          ['W', 'B', 'B', 'B', 'B', 'W', 'W', ''],
          ['W', 'B', 'B', 'W', 'W', 'B', 'W', ''],
          ['W', 'B', 'W', 'W', 'W', 'W', 'W', 'W'],
          ['W', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', ''],
        ],
        delta: {row: 5, col: 0},
      },
      {
        turnIndex: 1,
        endMatchScores: null,
        state: {
          board: [
            ['B', 'B', 'B', 'B', 'B', 'B', 'B', ''],
            ['W', 'B', 'W', 'B', 'B', 'W', '', ''],
            ['W', 'B', 'B', 'B', 'B', 'W', 'W', ''],
            ['W', 'B', 'B', 'W', 'W', 'B', 'W', ''],
            ['W', 'B', 'W', 'W', 'W', 'W', 'W', 'W'],
            ['W', '', '', '', '', '', '', ''],
            ['B', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
          ],
          delta: {row: 6, col: 0},
        },
      }
    );
  });

  it('checks that move without board is invalid', function () {
    invalidMove(
      0,
      {},
      {
        turnIndex: 1,
        endMatchScores: null,
        state: {
          delta: {row: 6, col: 0},
        },
      }
    );
  });

  it('checks that null move is invalid', function () {
    invalidMove(0, {}, null);
  });

  it('checks that move without delta is invalid', function () {
    invalidMove(
      0,
      {
        board: [
          ['B', 'B', 'B', 'B', 'B', 'B', 'B', ''],
          ['W', 'B', 'W', 'B', 'B', 'W', '', ''],
          ['W', 'B', 'B', 'B', 'B', 'W', 'W', ''],
          ['W', 'B', 'B', 'W', 'W', 'B', 'W', ''],
          ['W', 'B', 'W', 'W', 'W', 'W', 'W', 'W'],
          ['W', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', ''],
          ['', '', '', '', '', '', '', ''],
        ],
        delta: {row: 5, col: 0},
      },
      {
        turnIndex: 0,
        endMatchScores: null,
        state: {
          board: [
            ['B', 'B', 'B', 'B', 'B', 'B', 'B', ''],
            ['W', 'B', 'W', 'B', 'B', 'W', '', ''],
            ['W', 'B', 'B', 'B', 'B', 'W', 'W', ''],
            ['W', 'B', 'B', 'W', 'W', 'B', 'W', ''],
            ['W', 'B', 'W', 'W', 'W', 'W', 'W', 'W'],
            ['W', '', '', '', '', '', '', ''],
            ['B', '', '', '', '', '', '', ''],
            ['', '', '', '', '', '', '', ''],
          ],
        },
      }
    );
  });
});
