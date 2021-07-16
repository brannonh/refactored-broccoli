import Cell from './cell';
import { ArrayLike } from './types';
import Table from './table';

export default class Row extends ArrayLike<Cell> {
  table: Table | undefined = undefined;

  constructor(cells: Cell[] = []) {
    super(cells);

    for (const cell of cells) {
      cell.row = this;
    }
  }

  toString() {
    return '  R(\n' + this.elements.map((curr) => {
      return curr.toString();
    }).reduce((prev, curr) => {
      return `${prev}\n${curr}`;
    }) + '\n  )\n';
  }
}
