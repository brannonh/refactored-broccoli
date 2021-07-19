import { Primitive } from 'type-fest';
import { Style } from './style';

export interface CellPosition {
  x: number;
  y: number;
}

export interface CellSpan {
  column?: number;
  row?: number;
}

export interface CellOptions {
  span?: CellSpan;
  style?: Style;
}

export type CellContent = Primitive;

export type SpanCellType = 'column' | 'row';
