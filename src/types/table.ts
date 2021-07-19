import { Style } from './style';

type BorderCharType =
  'top' | 'topBetween' | 'topLeft' | 'topRight' |
  'bottom' | 'bottomBetween' | 'bottomLeft' | 'bottomRight' |
  'left' | 'leftBetween' |
  'rowBetween' | 'rowIntersect' |
  'right' | 'rightBetween' |
  'columnBetween';

type ColumnWidth = number;
type RowHeight = number;

export interface TableOptions {
  border?: Partial<Record<BorderCharType, string>>;
  columnWidths?: ColumnWidth[];
  rowHeights?: RowHeight[];
  style?: {
    paddingLeft?: number;
    paddingRight?: number;
    border?: Style;
    compact?: boolean;
  };
  truncate?: string;
}
