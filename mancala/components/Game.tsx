import React, {useState} from 'react';
import {GestureResponderEvent, TouchableWithoutFeedback, View} from 'react-native';

import Circle from './Hole';
import Cross from './BaseHole';
import PromptArea from '../../common/PromptArea';
import {AI_TURN_INDEX, getGameResult, getRelativeTouchLocation} from '../../common/common';

import {StyleSheet} from 'react-native';
import {createMove, createInitialMove, ROWS, COLS} from '../gameLogic';
import {findComputerMove} from '../aiService';
import Hole from './Hole';
import BaseHole from './BaseHole';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  board: {
    width: 312,
    height: 312,
    borderWidth: 3,
    borderColor: '#000',
  },
  line: {
    position: 'absolute',
    width: 3,
    height: 306,
    backgroundColor: '#000',
    transform: [{translateX: 100}],
  },
});

export const CENTER_POINTS = [
  {x: 156, y: 156},
  {x: 259, y: 156},
  {x: 362, y: 156},
  {x: 465, y: 156},
  {x: 568, y: 156},
  {x: 671, y: 156},
  {x: 774, y: 104},

  {x: 671, y: 53},
  {x: 568, y: 53},
  {x: 465, y: 53},
  {x: 362, y: 53},
  {x: 259, y: 53},
  {x: 156, y: 53},
  {x: 53, y: 104}

];

export const AREAS = [
  {startX: 106, startY: 106, endX: 206, endY: 206, player: 0, cell: 0},
  {startX: 209, startY: 106, endX: 309, endY: 206, player: 0, cell: 1},
  {startX: 312, startY: 106, endX: 412, endY: 206, player: 0, cell: 2},
  {startX: 415, startY:  106, endX: 515, endY: 206, player: 0, cell: 3},
  {startX: 518, startY:  106, endX: 618, endY: 206, player: 0, cell: 4},
  {startX: 621, startY:  106, endX: 721, endY: 206, player: 0, cell: 5},
  {startX: 724, startY:  3, endX: 824, endY: 206, player: 0, cell: 6},
  
  {startX: 621, startY: 3, endX: 721, endY: 103, player: 1, cell: 0},
  {startX: 518, startY: 3, endX: 618, endY: 103, player: 1, cell: 1},
  {startX: 415, startY: 3, endX: 515, endY: 103, player: 1, cell: 2},
  {startX: 312, startY: 3, endX: 412, endY: 103, player: 1, cell: 3},
  {startX: 209, startY: 3, endX: 309, endY: 103, player: 1, cell: 4},
  {startX: 106, startY: 3, endX: 206, endY: 103, player: 1, cell: 5},
  {startX: 3, startY: 3, endX: 103, endY: 206, player: 1, cell: 6},
];

export default function ManacalaGame() {
  const [gameState, setGameState] = useState(createInitialMove());
  const {endMatchScores, turnIndex, state} = gameState;

  if (turnIndex == AI_TURN_INDEX && !endMatchScores) {
    // do AI move
    setGameState(findComputerMove(gameState));
  }

  function restart() {
    setGameState(createInitialMove());
  }

  function boardClickHandler(e: GestureResponderEvent) {
    if (endMatchScores || turnIndex == AI_TURN_INDEX) {
      return;
    }

    const {locationX, locationY} = getRelativeTouchLocation(e);
    const area = AREAS.find(
      (d) => locationX >= d.startX && locationX <= d.endX && locationY >= d.startY && locationY <= d.endY
    );
    if (!area) {
      return;
    }
    try {
      const move = createMove(state, area.player, area.cell, turnIndex);
      setGameState(move);
    } catch (e) {
      console.info('Cell is empty in position:', area);
    }
  }

  const player1Stones: number[] = [];
  const player2Stones: number[] = [];
  let player1Base:number = 0;
  let player2Base:number = 0;
  //view
  // 0 | 1 | 2 | 3 | 4 | 5|
  for (let i = 0; i < 6; i++) {
    player1Stones.push(state.board[0][i])
  }
  console.info("player1 array ", player1Stones)
  player1Base = state.board[0][6]
   //view 
  // 5 | 4 | 3 | 2 | 1 | 0 |
  for(let i = 5; i >= 0; i--){
    console.info("for p2",state.board[1][i])
    player2Stones.push(state.board[1][i])
  }
  console.info("player2 array ", player2Stones)
  player2Base = state.board[1][6];

  return (
    <View>
      {/* <TouchableWithoutFeedback onPress={(e) => boardClickHandler(e)}> */}
      
          <View>
          <BaseHole 
            xTranslate={AREAS[6].startX}
            yTranslate={AREAS[6].startY}
            numOfStones={player1Base}
            player={0}
          />
          <View style={{backgroundColor:"blue"}}>
          {player1Stones.map((d, i) => (
            <Hole
              key={i}
              player={0}
              xTranslate={AREAS[i].startX}
              yTranslate={AREAS[i].startY}
              numOfStones={d}
              arrayPosition={i}

            />
          ))}
          </View>
          </View>
          <View>
            <View style={{backgroundColor:"red"}}>
          {player2Stones.map((d, i) => (
             <Hole
             key={i}
             player={1}
             xTranslate={AREAS[7 + i].startX}
             yTranslate={AREAS[7 + i].startY}
             numOfStones={d}
             arrayPosition={5 - i}
           />
          
          ))}
           </View>
            <BaseHole 
            xTranslate={AREAS[13].startX}
            yTranslate={AREAS[13].startY}
            numOfStones={player2Base}
            player={1}
          />
          </View>
      {/* </TouchableWithoutFeedback> */}
      <PromptArea result={getGameResult(endMatchScores)} onRestart={() => restart()} />
    </View>
  );
}
