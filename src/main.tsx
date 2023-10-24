import React from 'react';
import ReactDOM from 'react-dom/client';
import ObserverApp from './App.tsx';
import { GameStore } from './classes/Game.ts';
import { GameContext } from './contexts.ts';
import './index.css';

const Main = () => {
  const GameStoreContext = new GameStore();
  GameStoreContext.mockGame();
  return (
    <React.StrictMode>
      <GameContext.Provider value={GameStoreContext}>
        <ObserverApp />
      </GameContext.Provider>
    </React.StrictMode>
  );
};
ReactDOM.createRoot(document.getElementById('root')!).render(<Main />);
