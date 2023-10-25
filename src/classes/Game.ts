import { makeAutoObservable } from 'mobx';
import { FIELD_CELLS_IN_ROW, MOCK_CELLS } from '../constants';
import { Cell, Directions } from '../types';
import { getRandomCell } from '../utils';

export class GameStore {
  public cells: Cell[] = [];
  private updated: boolean = false;

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

  private removeUselessCell() {
    this.cells = this.cells.filter((cell) => !cell.toRemove);
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
      if (this.updated) {
        this.createNewCell();
        this.updated = false;
      }
      this.removeUselessCell();
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

    collection.forEach((axisValue) => {
      const valuesInCurrentAxis = this.cells
        .filter((cell) => cell[elementAxis] === axisValue)
        .sort(sortFunction)
        .map((cell) => cell[rowAxis]);

      let updatedIndex = edgeIndex;
      let isMerged = false;
      const movedCells: Cell[] = [];
      let positionUpdated = false;

      while (valuesInCurrentAxis.length !== 0) {
        const max = valuesInCurrentAxis.shift();

        const element = this.cells.find(
          (cell) => cell[rowAxis] === max && cell[elementAxis] === axisValue
        ) as Cell;

        if (element[rowAxis] !== updatedIndex) {
          element[rowAxis] = updatedIndex;
          positionUpdated = true;
        }

        const nextElement = movedCells.pop();
        if (!isMerged && nextElement) {
          isMerged = this.flattenAxis(element, nextElement);
          if (isMerged) {
            updatedIndex =
              edgeIndex === 0 ? updatedIndex - 1 : updatedIndex + 1;
          }
        } else {
          isMerged = false;
        }

        if (!this.updated) {
          this.updated = isMerged || positionUpdated;
        }

        movedCells.push(element);

        if (edgeIndex === 0) {
          updatedIndex++;
        } else {
          updatedIndex--;
        }
      }
    });
  }

  private flattenAxis(element: Cell, nextCell: Cell) {
    if (element.value !== nextCell.value) {
      return false;
    }

    if (element.x > nextCell.x || element.y > nextCell.y) {
      element.value += element.value;
      nextCell.toRemove = true;
    } else {
      nextCell.value += element.value;
      element.toRemove = true;
    }
    element.x = nextCell.x;
    element.y = nextCell.y;
    return true;
  }
}
