import { merge as _merge } from 'lodash';
import { ArrayLike, TableOptions } from './types';
import { DefaultTableOptions } from './defaults';
import Architect from './architect';
import Row from './row';
import Cell from './cell';

export default class Table extends ArrayLike<Row> {
  options: TableOptions;
  architect: Architect;

  constructor(rows: Row[] = [], options: TableOptions = DefaultTableOptions) {
    super(rows);

    for (const row of this.elements) {
      row.table = this;
    }

    this.options = DefaultTableOptions;
    _merge(this.options, options);

    this.architect = new Architect(this);
  }

  appendCell(row: Row, cell: Cell) {
    let x: number = 0;
    while (x < row.elements.length && row.elements[x].position.x < cell.position.x) {
      x++;
    }
    row.elements.splice(x, 0, cell);
  }

  toString() {
    return `T(\n` + this.elements.map((curr) => {
      return curr.toString();
    }).reduce((prev, curr) => {
      return prev + curr;
    }) + ')\n';
  }
}
