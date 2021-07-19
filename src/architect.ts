import Table from './table';
import Row from './row';
import Cell from './cell';
import { CellPosition } from './types';

export default class Architect {
  table: Table;
  debug: boolean;
  logOffset: number = 0;

  constructor(table: Table, debug: boolean = false) {
    this.table = table;
    this.debug = debug;
  }

  blueprint() {
    for (let r = 0; r < this.table.elements.length; r++) {
      const row: Row = this.table.elements[r];
      let previous: Cell;
      for (let c = 0; c < row.elements.length; c++) {
        const cell: Cell = row.elements[c];

        cell.position.x = previous! && previous.position.x ? previous.position.x + 1 : c;
        cell.position.y = r;

        for (let y = r; y >= 0; y--) {
          const upRow = this.table.elements[y];
          const xMax = y === r ? c : upRow.length;

          for (let x = 0; x < xMax; x++) {
            const upCell = upRow.elements[x];
            while (this.cellsConflict(cell, upCell)) {
              cell.position.x++;
            }
          }

          previous = cell;
        }
      }
    }
  }

  cellsConflict(cell1: Cell, cell2: Cell) {
    this.log(`Architect: cellsConflict`, 'in');

    const [x1, y1]: number[]  = [cell1.position.x, cell1.position.y];
    const [x2, y2]: number[]  = [cell2.position.x, cell2.position.y];

    const xMax1: number = x1 - 1 + (cell1.span.column);
    const xMax2: number = x2 - 1 + (cell2.span.column);
    const xConflicts: boolean = !(x1 > xMax2 || x2 > xMax1);

    const yMax1: number = y1 - 1 + (cell1.span.row);
    const yMax2: number = y2 - 1 + (cell2.span.row);
    const yConflicts: boolean = !(y1 > yMax2 || y2 > yMax1);

    this.log(null, 'out');
    return xConflicts && yConflicts;
  }

  tableConflicts(x: number, y: number) {
    this.log(`Architect: tableConflicts`, 'in');

    const iMax: number = Math.min(this.table.elements.length - 1, y);
    const cell: Cell = new Cell('');
    cell.position = { x, y };

    for (let r = 0; r <= iMax; r++) {
      const row: Row = this.table.elements[r];
      for (let c = 0; c < row.elements.length; c++) {
        if (this.cellsConflict(cell, row.elements[c])) {
          this.log(null, 'out');
          return true;
        }
      }
    }

    this.log(null, 'out');
    return false;
  }

  rowConflicts(y: number, xMin: number, xMax: number) {
    this.log(`Architect: rowConflicts`, 'in');

    for (let x = xMin; x < xMax; x++) {
      if (this.tableConflicts(x, y)) {
        this.log(null, 'out');
        return false;
      }
    }

    this.log(null, 'out');
    return true;
  }

  log(msg: string | null | undefined, offset: 'in' | 'out' | null | undefined = null) {
    if (this.debug) {
      if (offset === 'in') {
        this.logOffset += 2;
      }

      if (msg) {
        console.debug(' '.repeat(this.logOffset) + msg);
      }

      if (offset === 'out') {
        this.logOffset -= 2;
      }
    }
  }
}
