import { Style } from './style';

type BorderCharType =
  'top' | 'topBetween' | 'topLeft' | 'topRight' |
  'bottom' | 'bottomBetween' | 'bottomLeft' | 'bottomRight' |
  'left' | 'leftBetween' |
  'rowBetween' | 'rowIntersect' |
  'right' | 'rightBetween' |
  'columnBetween';

export interface TableOptions {
  border?: Partial<Record<BorderCharType, string>>;
  truncate?: string;
  style?: {
    paddingLeft?: number;
    paddingRight?: number;
    border?: Style;
    compact?: boolean;
  };
}
