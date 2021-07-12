import { ArrayLike, TableOptions } from './types';
import { merge as _merge } from 'lodash';
import Row from './row';
import Cell from './cell';

export const DefaultTableOptions: TableOptions = {
  border: {
    top: '─',
    topBetween: '┬',
    topLeft: '┌',
    topRight: '┐',
    bottom: '─',
    bottomBetween: '┴',
    bottomLeft: '└',
    bottomRight: '┘',
    left: '│',
    leftBetween: '├',
    rowBetween: '─',
    rowIntersect: '┼',
    right: '│',
    rightBetween: '┤',
    columnBetween: '│',
  },
  truncate: '…',
  style: {
    paddingLeft: 1,
    paddingRight: 1,
    border: {
      color: '#6272a4',
      bgColor: false,
      underline: false,
      bold: false,
      dim: false,
      italic: false,
      strikethrough: false,
    },
    compact: false,
  }
}

export default class Table extends ArrayLike<Row> {
  options: TableOptions;

  constructor(rows: Row[] = [], options: TableOptions = DefaultTableOptions) {
    super(rows);

    this.options = DefaultTableOptions;
    _merge(this.options, options);
  }

  toString() {
    return this.elements.map((curr) => {
      return curr.toString();
    }).reduce((prev, curr) => {
      return prev + curr;
    });
  }
}
