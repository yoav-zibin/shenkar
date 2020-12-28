import React, {useState} from 'react';
import PromptArea from '../common/PromptArea';
import {createInitialMove, GameModule} from './common';
import {AI_TURN_INDEX, getGameResult, HUMAN_TURN_INDEX} from './commonUtils';
import {createComputerMove} from './alphaBetaService';

export default function PlayArea<T>(props: {gameModule: GameModule<T>}) {
  const {gameModule} = props;
  const initialMove = createInitialMove(gameModule.initialState);
  const [move, setMove] = useState(initialMove);
  const {turnIndex, endMatchScores, state} = move;

  if (turnIndex == AI_TURN_INDEX && !endMatchScores) {
    // do AI move after 1 second (to finish any ongoing animations)
    // Give the AI 1 second to find the best move.
    setTimeout(() => setMove(createComputerMove(state, turnIndex, {millisecondsLimit: 1000}, gameModule)), 1000);
  }

  function restart() {
    setMove(initialMove);
  }

  return (
    <>
      {gameModule.component({move, setMove, yourPlayerIndex: HUMAN_TURN_INDEX})}
      <PromptArea result={getGameResult(endMatchScores)} onRestart={() => restart()} />
    </>
  );
}
