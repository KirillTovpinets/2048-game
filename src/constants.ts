import { v4 as uuid } from 'uuid';
import { Cell } from './types';
import { randomColor } from './utils';
export const FIELD_CELLS_IN_ROW = 4;
export const COLORS = ['#eee4da'];
export const KEYBOARD_KEYS = [
  'ArrowRight',
  'ArrowUp',
  'ArrowDown',
  'ArrowLeft',
];

export const MOCK_CELLS: Cell[] = [
  {
    x: 0,
    y: 0,
    value: 4,
    id: uuid(),
    color: randomColor(),
  },
  {
    x: 2,
    y: 0,
    value: 2,
    id: uuid(),
    color: randomColor(),
  },
  {
    x: 3,
    y: 0,
    value: 2,
    id: uuid(),
    color: randomColor(),
  },
];
