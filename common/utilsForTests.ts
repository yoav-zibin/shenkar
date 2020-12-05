import {AiService, CheckRiddleData, IMove, randomElement, RiddlesLevel, toPrettyJson} from './common';
import {createComputerMove} from './alphaBetaService';

function checkRandomWalk<S>(aiService: AiService<S>, getNextMove: (state: S, turnIndex: number) => IMove<S>) {
  const maxMoves = 20;
  const allMoves: IMove<S>[] = [];
  let currentState = aiService.initialState;
  let currentTurnIndex = 0;
  while (allMoves.length < maxMoves) {
    const nextMove = getNextMove(currentState, currentTurnIndex);
    if (!nextMove) {
      throw new Error('No next move returned!  ' + toPrettyJson({currentState, currentTurnIndex, allMoves}));
    }
    allMoves.push(nextMove);
    const {endMatchScores, state, turnIndex} = nextMove;
    if (endMatchScores) {
      if (endMatchScores.length != 2) {
        throw new Error('Illegal endMatchScores=' + endMatchScores + ' allMoves=' + toPrettyJson(allMoves));
      }
      if (turnIndex != -1) {
        throw new Error('turnIndex must be -1 when game ends! allMoves=' + toPrettyJson(allMoves));
      }
      return;
    } else {
      if (turnIndex != 0 && turnIndex != 1) {
        throw new Error('turnIndex must be 0/1 when game is ongoing! allMoves=' + toPrettyJson(allMoves));
      }
      currentState = state;
      currentTurnIndex = turnIndex;
    }
  }
}

export function checkAiServiceUsingRandomWalk<S>(aiService: AiService<S>) {
  checkRandomWalk(aiService, (state, turnIndex) =>
    createComputerMove(state, turnIndex, {millisecondsLimit: 100}, aiService)
  );
}

export function checkGetPossibleMovesUsingRandomWalk<S>(aiService: AiService<S>) {
  checkRandomWalk(aiService, (state, turnIndex) => randomElement(aiService.getPossibleMoves(state, turnIndex)));
}

export function checkAllRiddles<S>(
  riddleLevels: RiddlesLevel<S>[],
  aiService: AiService<S>,
  checkRiddleData: CheckRiddleData<S>
) {
  if (riddleLevels.length < 4) throw new Error('You must have at least 4 levels');
  for (const level of riddleLevels) {
    if (!level.difficulty) throw new Error('Missing level.difficulty');
    if (!level.levelLocalizeId) throw new Error('Missing level.levelLocalizeId');
    if (!level.maxMovesNum || level.maxMovesNum > 5) throw new Error('Illegal level.maxMovesNum');
    if (!(level.turnIndex === 0 || level.turnIndex === 1)) throw new Error('Illegal level.turnIndex');
    if (level.riddles.length < 3) throw new Error('You must have at least 3 riddles in a level');
    for (const riddle of level.riddles) {
      checkRiddle(riddle, level.maxMovesNum, level.turnIndex, aiService, checkRiddleData);
    }
  }
}

function checkRiddle<S>(
  state: S,
  maxMovesNum: number,
  turnIndex: number,
  aiService: AiService<S>,
  checkRiddleData: CheckRiddleData<S>
) {
  const firstMoveSolutions = aiService
    .getPossibleMoves(state, turnIndex)
    .filter((m) => isRiddleSolved(aiService, m, turnIndex, maxMovesNum - (turnIndex == m.turnIndex ? 0 : 1)));
  if (!checkRiddleData(state, turnIndex, firstMoveSolutions)) {
    throw new Error('checkRiddleData returned false for:' + toPrettyJson({state, turnIndex, firstMoveSolutions}));
  }
}

function isRiddleSolved<S>(
  aiService: AiService<S>,
  move: IMove<S>,
  humanTurnIndex: number,
  remainingMoves: number
): boolean {
  if (remainingMoves == 0) {
    return !move.endMatchScores ? false : move.endMatchScores[humanTurnIndex] > move.endMatchScores[1 - humanTurnIndex];
  }
  const {state, turnIndex} = move;
  return aiService
    .getPossibleMoves(state, turnIndex)
    .some((m) => isRiddleSolved(aiService, m, humanTurnIndex, remainingMoves - (turnIndex == m.turnIndex ? 0 : 1)));
}

export function checkAiService<S>(aiService: AiService<S>) {
  checkGetPossibleMovesUsingRandomWalk(aiService);
  checkAiServiceUsingRandomWalk(aiService);
}
