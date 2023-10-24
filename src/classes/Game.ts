import { makeAutoObservable } from 'mobx';
import { FIELD_CELLS_IN_ROW, MOCK_CELLS } from '../constants';
import { Cell, Directions } from '../types';
import { getRandomCell } from '../utils';

export class GameStore {
  public cells: Cell[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  get xCollection(): number[] {
    return this.filterDistinctItems(this.cells.map((cell) => cell.x));
  }

  get yCollection(): number[] {
    return this.filterDistinctItems(this.cells.map((cell) => cell.y));
  }

  filterDistinctItems(collection: number[]) {
    return collection.reduce((arr, value) => {
      if (!arr.includes(value)) {
        arr.push(value);
      }

      return arr;
    }, [] as number[]);
  }

  initGame() {
    this.cells.push(getRandomCell());
    this.cells.push(getRandomCell());
  }

  mockGame() {
    this.cells.push(...MOCK_CELLS);
  }

  private createNewCell() {
    this.cells.push(getRandomCell(this.cells));
  }

  moveCells(direction: string) {
    switch (direction as Directions) {
      case Directions.right:
        this.moveRight();
        break;
      case Directions.left:
        this.moveLeft();
        break;
      case Directions.down:
        this.moveDown();
        break;
      case Directions.up:
        this.moveUp();
        break;
    }

    setTimeout(() => {
      this.createNewCell();
    }, 400);
  }

  private moveRight() {
    this.moveAxis(FIELD_CELLS_IN_ROW - 1, 'x', (a, b) => b.x - a.x);
  }

  private moveLeft() {
    this.moveAxis(0, 'x', (a, b) => a.x - b.x);
  }

  private moveUp() {
    this.moveAxis(0, 'y', (a, b) => a.y - b.y);
  }

  private moveDown() {
    this.moveAxis(FIELD_CELLS_IN_ROW - 1, 'y', (a, b) => b.y - a.y);
  }

  private moveAxis(
    edgeIndex: number,
    rowAxis: 'y' | 'x',
    sortFunction: (a: Cell, b: Cell) => number
  ) {
    const collection = rowAxis === 'x' ? this.yCollection : this.xCollection;
    const elementAxis = rowAxis == 'x' ? 'y' : 'x';

    collection.forEach((selectedAxis) => {
      let oppositAxis = this.cells
        .filter((cell) => cell[elementAxis] === selectedAxis)
        .map((cell) => cell[rowAxis]);

      let updatedIndex = edgeIndex;
      let isMerged = false;

      while (oppositAxis.length !== 0) {
        const max =
          edgeIndex === 0 ? Math.min(...oppositAxis) : Math.max(...oppositAxis);

        const element = this.cells.find(
          (cell) => cell[rowAxis] === max
        ) as Cell;

        element[rowAxis] = updatedIndex;

        if (!isMerged) {
          const cell = this.flattenAxis(sortFunction, elementAxis);

          if (cell) {
            oppositAxis = oppositAxis.filter((x) => x !== cell[rowAxis]);
            isMerged = true;
          }
        }

        oppositAxis = oppositAxis.filter((x) => x !== max);

        if (edgeIndex === 0) {
          updatedIndex++;
        } else {
          updatedIndex--;
        }
      }
    });
  }

  private flattenAxis(
    sortFunction: (a: Cell, b: Cell) => number,
    axis: 'x' | 'y'
  ) {
    const updatedCollection: Cell[] = [];
    const axisCollection = axis === 'x' ? this.xCollection : this.yCollection;
    let filteredCell;
    axisCollection.forEach((selectedAxis) => {
      let merged = false;
      const updatedColumn = this.cells
        .filter((cell) => cell[axis] === selectedAxis)
        .sort(sortFunction)
        .reduce((arr, cell) => {
          const next = arr.pop();
          if (next && next.value === cell.value && !merged) {
            const updatedElement = {
              ...next,
              value: cell.value + next.value,
            };
            arr.push(updatedElement);
            filteredCell = cell;
            merged = !merged;
          } else if (next) {
            arr.push(next);
            arr.push(cell);
          } else {
            arr.push(cell);
          }
          return arr;
        }, [] as Cell[]);

      updatedCollection.push(...updatedColumn);
    });

    this.cells = [...updatedCollection];

    return filteredCell;
  }
}
