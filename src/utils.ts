import { v4 as uuid } from 'uuid';
import { COLORS, FIELD_CELLS_IN_ROW } from './constants';
import { Cell } from './types';

export const randomNumberFactory = () => {
  return (min: number, max: number): number =>
    Math.floor(Math.random() * (max - min) + min);
};

export const randomNumber = randomNumberFactory();

export const randomColor = (): string => {
  const randomIndex = randomNumber(0, COLORS.length);
  return COLORS[randomIndex];
};

export const randomCellGanarator = () => {
  let memo: Pick<Cell, 'x' | 'y'>;

  return (cells: Cell[] = []): Cell => {
    let randomX: number = 0;
    let randomY: number = 0;
    do {
      randomX = randomNumber(0, FIELD_CELLS_IN_ROW - 1);
      randomY = randomNumber(0, FIELD_CELLS_IN_ROW);
    } while (
      (memo && memo.x === randomX && memo.y === randomY) ||
      !!cells.find((cell) => cell.x === randomX && cell.y === randomY)
    );
    memo = {
      x: randomX,
      y: randomY,
    };

    return {
      x: randomX,
      y: randomY,
      value: randomNumber(0, 1) ? 4 : 2,
      color: randomColor(),
      id: uuid(),
    };
  };
};

export const getRandomCell = randomCellGanarator();
