import React from 'react';
import ObserverApp from './App';
import { GameStore } from './classes/Game';
import { GameContext } from './contexts';
import './index.css';

const Main = () => {
  const GameStoreContext = new GameStore();
  GameStoreContext.initGame();
  return (
    <React.StrictMode>
      <GameContext.Provider value={GameStoreContext}>
        <ObserverApp />
      </GameContext.Provider>
    </React.StrictMode>
  );
};
const Game2048 = () => <Main />;

export default Game2048;
