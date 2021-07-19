import { cloneDeep as _cloneDeep, merge as _merge } from 'lodash';
import { ArrayLike, TableOptions } from './types';
import { DefaultTableOptions } from './defaults';
import Architect from './architect';
import Row from './row';
import Cell from './cell';

export default class Table extends ArrayLike<Row> {
  options: TableOptions = _cloneDeep(DefaultTableOptions);
  architect: Architect;

  constructor(rows: Row[] = [], options: TableOptions = DefaultTableOptions) {
    super(rows);

    for (const row of this.elements) {
      row.table = this;
    }

    _merge(this.options, DefaultTableOptions, options);

    this.architect = new Architect(this, true);
  }

  maxHeight() {
    return this.elements.length;
  }

  maxWidth() {
    let value: number = 0;

    for (let r = 0; r < this.elements.length; r++) {
      const row = this.elements[r];
      for (let c = 0; c < row.elements.length; c++) {
        const cell = row.elements[c];
        value = Math.max(value, cell.position.x + (cell.span.column ?? 1));
      }
    }

    return value;
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
