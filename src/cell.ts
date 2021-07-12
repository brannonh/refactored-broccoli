import { Primitive } from 'type-fest';
import { CellAttributes, CellOptions } from './types';
import { merge as _merge, omit as _omit, pick as _pick } from 'lodash';

type CellContent = Primitive;

export const DefaultCellOptions: CellOptions = {
  colSpan: 1,
  rowSpan: 1,
  style: {},
};

export default class Cell {
  content: string;
  attributes: Partial<CellAttributes> = {};

  constructor(content: CellContent, options: Partial<CellOptions> = DefaultCellOptions) {
    this.content = String(content);

    // Merge passed options with default options.
    _merge(this.attributes, DefaultCellOptions, options);
  }

  toString() {
    return `${this.content} |`;
  }
}
