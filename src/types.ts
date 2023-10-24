export type Cell = {
  x: number;
  y: number;
  value: number;
  color: string;
  id: string;
};

export enum Directions {
  up = 'ArrowUp',
  down = 'ArrowDown',
  right = 'ArrowRight',
  left = 'ArrowLeft',
}
