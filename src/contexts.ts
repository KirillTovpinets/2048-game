import { createContext } from 'react';
import { GameStore } from './classes/Game';
import { Cell } from './types';

export const GameContext = createContext<GameStore>({
  cells: [] as Cell[],
  initGame: () => {},
});
