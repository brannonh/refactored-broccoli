import Table from '../src/table';
import Row from '../src/row';
import Cell from '../src/cell';

const rows: Row[] = [
  new Row([new Cell('cell 1'), new Cell('cell 2'), new Cell('cell 3')]),
  new Row([new Cell('cell 4'), new Cell('cell 5'), new Cell('cell 6')]),
];

const cell: Cell = new Cell('cell 7', { span: { row: 1, column: 1, }, style: {}, });
cell.position = { x: 4, y: 1 };

const table = new Table(rows);
table.architect.blueprint();
table.appendCell(rows[1], cell);

console.log(table.toString());
