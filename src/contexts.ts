import { createContext } from 'react';
import { GameStore } from './classes/Game';

export const GameContext = createContext<GameStore>(new GameStore());
