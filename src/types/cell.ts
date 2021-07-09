import { Style } from './style';

export type CellOptions = Omit<CellAttributes, 'x' | 'y'>;

export interface CellAttributes {
  colSpan: number;
  rowSpan: number;
  style: Style;
  x: number;
  y: number;
}
