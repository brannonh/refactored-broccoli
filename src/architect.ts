import Table from './table';
import Row from './row';
import Cell, { SpanCell } from './cell';
import { CellPosition, CellSpan } from './types';

export default class Architect {
  table: Table;
  debug: boolean;
  logOffset: number = 0;

  constructor(table: Table, debug: boolean = false) {
    this.table = table;
    this.debug = debug;
  }

  blueprint() {
    this.log(`Architect: blueprint`, 'in');
    this.position();
    this.insertMissingCells();
    this.insertSpanCells();
    this.log(null, 'out');
  }

  position() {
    this.log(`Architect: position`, 'in');

    for (let r = 0; r < this.table.elements.length; r++) {
      const row: Row = this.table.elements[r];
      let previous: Cell;
      for (let c = 0; c < row.elements.length; c++) {
        const cell: Cell = row.elements[c];

        cell.position.x = previous! && previous.position.x ? previous.position.x + 1 : c;
        cell.position.y = r;
        cell.span.column = cell.span.column ?? 1;
        cell.span.row = cell.span.row ?? 1;

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

    this.log(null, 'out');
  }

  insertMissingCells() {
    this.log(`Architect: insertMissingCells`, 'in');

    const maxHeight: number = this.table.maxHeight();
    const maxWidth: number = this.table.maxWidth();

    for (let y = 0; y < maxHeight; y++) {
      for (let x = 0; x < maxWidth; x++) {
        if (!this.tableConflicts(x, y)) {
          const position: CellPosition = { x, y};
          const span: CellSpan = { column: 1, row: 1 };

          while (++x < maxWidth && !this.tableConflicts(x, y)) {
            span.column!++;
            x++;
          }

          let y2 = y + 1;
          while (y2 < maxHeight && this.rowConflicts(y2, position.x, position.x + span.column!)) {
            span.row!++;
            y2++;
          }

          const cell = new Cell('', { span });
          cell.position = position;
          this.table.appendCell(this.table.elements[y], cell);
        }
      }
    }

    this.log(null, 'out');
  }

  insertSpanCells() {
    this.log(`Architect: insertSpanCells`, 'in');

    // Insert row spanners.
    for (let r = 0; r < this.table.elements.length; r++) {
      const row = this.table.elements[r];
      const rowLength = row.elements.length;
      for (let c = 0; c < rowLength; c++) {
        const cell = row.elements[c];
        for (let i = 1; i < cell.span.row!; i++) {
          this.log(`new SpanCell: row (r: ${r}, c: ${c}, x: ${cell.position.x}, y: ${cell.position.y})`);
          const rowSpanCell = new SpanCell('row', cell);
          rowSpanCell.position.x = cell.position.x;
          rowSpanCell.position.y = cell.position.y + i;
          this.table.appendCell(row, rowSpanCell);
        }
      }
    }

    // Insert column spanners.
    for (let r = this.table.elements.length - 1; r >= 0; r--) {
      const row = this.table.elements[r];
      for (let c = 0; c < row.elements.length; c++) {
        const cell = row.elements[c];
        for (let j = 1; j < cell.span.column!; j++) {
          this.log(`new SpanCell: column (r: ${r}, c: ${c}, x: ${cell.position.x}, y: ${cell.position.y})`);
          const colSpanCell = new SpanCell('column', cell);
          colSpanCell.position.x = cell.position.x + j;
          colSpanCell.position.y = cell.position.y;
          row.elements.splice(c + 1, 0, colSpanCell);
        }
      }
    }

    this.log(null, 'out');
  }

  cellsConflict(cell1: Cell, cell2: Cell) {
    this.log(`Architect: cellsConflict`, 'in');

    const [x1, y1]: number[]  = [cell1.position.x, cell1.position.y];
    const [x2, y2]: number[]  = [cell2.position.x, cell2.position.y];

    const xMax1: number = x1 - 1 + (cell1.span.column!);
    const xMax2: number = x2 - 1 + (cell2.span.column!);
    const xConflicts: boolean = !(x1 > xMax2 || x2 > xMax1);

    const yMax1: number = y1 - 1 + (cell1.span.row!);
    const yMax2: number = y2 - 1 + (cell2.span.row!);
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
