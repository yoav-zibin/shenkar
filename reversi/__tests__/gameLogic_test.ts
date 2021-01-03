// import {IState, isMoveOk, IIsMoveOk, exampleGame, riddles} from '../gameLogic';
import {IMove} from '../../common/common';
import {IState, isMoveOk, IIsMoveOk} from '../gameLogic';

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

  function invalidMove(turnIndexBeforeMove: number, stateBeforeMove: IState, move: IMove<IState> | null) {
    const isMoveOkParams: IIsMoveOk = {
      turnIndexBeforeMove,
      stateBeforeMove,
    };

    if (move) isMoveOkParams.move = move;
    // expect(isMoveOk(isMoveOkParams)).toEqual(move);

    expect(isMoveOk(isMoveOkParams)).toBe(false);
  }

  // wrong
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

  // wrong
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

  // game bug

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

  // wrong
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
