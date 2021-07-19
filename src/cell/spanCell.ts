import { SpanCellType } from '../types';
import { Cell } from './cell';

export class SpanCell extends Cell {
  type: SpanCellType;
  original: Cell;
  cellOffset: number = 0;
  offset: number = 0;

  constructor(type: SpanCellType, original: Cell) {
    super('');

    this.type = type;
    this.original = original;
  }

  calculate() {
    if (this.type === 'row') {
      const y = this.position.y;
      const originalY = this.original.position.y;

      this.cellOffset = y - originalY;

      const rowHeights = this.row?.table?.options?.rowHeights;
      if (rowHeights) {
        this.offset = rowHeights[originalY];
        for (let i = 1; i < this.cellOffset; i++) {
          this.offset += 1 + rowHeights[this.cellOffset + 1];
        }
      } else {
        this.offset = 0;
      }

    }
  }
}
