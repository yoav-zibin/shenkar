import {getAllGameModules} from '../gameModules';
import {checkAiServiceUsingRandomWalk, checkAllRiddles, checkGetPossibleMovesUsingRandomWalk} from '../utilsForTests';

const allGames = getAllGameModules();

describe('gameModules', function () {
  it('have games with valid getPossibleMoves', function () {
    allGames.forEach((g) => {
      checkGetPossibleMovesUsingRandomWalk(g);
    });
  });
  it('have games with valid aiService', function () {
    allGames.forEach((g) => {
      checkAiServiceUsingRandomWalk(g);
    });
  });
  it('have games with valid riddles', function () {
    allGames.forEach((g) => {
      checkAllRiddles(g.riddleLevels, g, g.checkRiddleData);
    });
  });
});
