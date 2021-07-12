import Table from '../src/table';
import Row from '../src/row';
import Cell from '../src/cell';

const rows: Row[] = [
  new Row([new Cell('cell 1'), new Cell('cell 2'), new Cell('cell 3')]),
  new Row([new Cell('cell 4'), new Cell('cell 5'), new Cell('cell 6')]),
];

const table = new Table(rows);

console.log(table.toString());
