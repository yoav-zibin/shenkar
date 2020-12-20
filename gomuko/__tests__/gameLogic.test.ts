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

  // it('Initial move', function () {
  //   console.log('NEED TO IMPLEMENT');
  // });

  // it('Black Win', () => {
  //   console.log('NEED TO IMPLEMENT');
  // });
});
