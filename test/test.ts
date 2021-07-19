import Table from '../src/table';
import Row from '../src/row';
import Cell from '../src/cell';

const rows: Row[] = [
  new Row([
    new Cell('cell 1'),
    new Cell('cell 2'),
    new Cell('cell 3', { span: { row: 2 } }),
  ]),
  new Row([
    new Cell('cell 4', { span: { column: 2 } }),
  ]),
];

const table = new Table(rows);
table.architect.blueprint();

console.log(table.toString());
