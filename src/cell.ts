import { CellAttributes, CellOptions } from './types';
import { merge as _merge, omit as _omit, pick as _pick } from 'lodash';

type CellContent = boolean | number | string;

export const DefaultCellOptions: CellOptions = {
  colSpan: 1,
  rowSpan: 1,
  style: {},
};

export default class Cell {
  content: CellContent;
  attributes: Partial<CellAttributes> = {};

  constructor(content: CellContent, options: Partial<CellOptions> = DefaultCellOptions) {
    this.content = content;

    // Merge passed options with default options.
    _merge(this.attributes, DefaultCellOptions, options);
  }
}
