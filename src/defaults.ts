import { TableOptions } from './types';
import { CellOptions } from './types';

export const DefaultCellOptions: CellOptions = {
  span: {
    column: 1,
    row: 1,
  },
  style: {},
};

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
