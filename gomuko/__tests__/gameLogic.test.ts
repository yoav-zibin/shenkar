/* eslint-disable jest/no-commented-out-tests */
import {deepEquals} from '../../common/common';
import {Board, createNewBoard} from '../gameLogic';

describe('Game Logic Test', () => {
  it('Create Board', function () {
    const board: Board = createNewBoard(9);
    const expectedBoard: Board = [
      ['', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', ''],
    ];

    expect(deepEquals(board, expectedBoard)).toBe(true);
  });
});
