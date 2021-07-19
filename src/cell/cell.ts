import { cloneDeep as _cloneDeep, merge as _merge, omit as _omit, pick as _pick } from 'lodash';
import { CellContent, CellOptions, CellPosition, CellSpan, Style } from '../types';
import { DefaultCellOptions } from '../defaults';
import Row from '../row';

export class Cell {
  row: Row | undefined = undefined;
  content: string = '';
  position: CellPosition = { x: 1, y: 1, };
  span: CellSpan = _cloneDeep(DefaultCellOptions.span);
  style: Style = _cloneDeep(DefaultCellOptions.style);

  constructor(content: CellContent, options: Partial<CellOptions> = DefaultCellOptions) {
    this.content = String(content);

    // Merge passed options with default options.
    _merge(this.span, DefaultCellOptions.span, options.span);
    _merge(this.style, DefaultCellOptions.style, options.style);
  }

  toString() {
    return `    C(cs: ${this.span.column}, rs: ${this.span.row}, x: ${this.position.x}, y: ${this.position.y}, c: '${this.content}')`;
  }
}
