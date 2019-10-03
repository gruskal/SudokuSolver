const POSSIBLES = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);

function getIntersection(setA, setB) {
  return new Set([...setA].filter(value => !setB.has(value)));
}
function Cell(value) {
  this.value = value;
  this.givenConstraints = new Set();
  this.attemptedValues = new Set();
  this.isPivot = false;
  this.pivotValue = null;
  this.previousState = null;
  this.impossibles = new Set();
  this.addImpossibles = values =>
    values.forEach(value => this.impossibles.add(value));
}
function Row() {
  this.cells = [];
  this.impossibles = new Set();
  this.initalImpossibles = new Set();
  this.append = cell => {
    this.cells.push(cell);
    this.initalImpossibles.add(cell.value);
    if (cell.value !== 0) {
      const success = this.impossibles.add(cell.value);
      if (!success) {
        console.error("Invalid cell structure"); //Make better error
      }
    }
  };
}
function Column() {
  this.cells = [];
  this.impossibles = new Set();
  this.initalImpossibles = new Set();
  this.append = cell => {
    this.cells.push(cell);
    this.initalImpossibles.add(cell.value);
    if (cell.value !== 0) {
      const success = this.impossibles.add(cell.value);
      if (!success) {
        console.error("Invalid cell structure"); //Make better error
      }
    }
  };
}
function Region() {
  this.cells = [];
  this.impossibles = new Set();
  this.initalImpossibles = new Set();
  this.append = cell => {
    this.cells.push(cell);
    this.initalImpossibles.add(cell.value);
    if (cell.value !== 0) {
      const success = this.impossibles.add(cell.value);
      if (!success) {
        console.error("Invalid cell structure"); //Make better error
      }
    }
  };
}

export default class SodokuTable {
  constructor(rawRows) {
    const numRows = rawRows.length;
    const numColumns = rawRows[0].length;
    const numRegions = (numColumns / 3) * (numRows / 3);
    this.rows = rawRows.map(row => {
      const newRow = new Row();
      row.forEach(cellValue => newRow.append(new Cell(cellValue)));
      return newRow;
    });
    this.columns = [[], []];
    for (let i = 0; i < numColumns; i++) {
      const newColumn = new Column();
      this.rows.forEach(row => {
        newColumn.append(row.cells[i]);
      });
      this.columns[i] = newColumn;
    }
    this.regions = [];
    for (let i = 0; i < numRows; i += 3) {
      for (let j = 0; j < numColumns / 3; j++) {
        const newRegion = new Region();
        for (let rowNum = 0; rowNum < 3; rowNum++) {
          newRegion.append(this.rows[i + rowNum].cells[j * 3]);
          newRegion.append(this.rows[i + rowNum].cells[j * 3 + 1]);
          newRegion.append(this.rows[i + rowNum].cells[j * 3 + 2]);
        }
        this.regions.push(newRegion);
      }
    }
  }
  getRows = () => this.rows;

  solve(currentRow, currentOffset) {
    console.log("RUn");
    this.setCellImpossibles();
    // this.rows.forEach((row) => {
    //   row.cells.forEach((cell) => {
    //     if(cell.value === 0)
    //      console.log(cell.value, cell.impossibles.size, [...setInterection(POSSIBLES, cell.impossibles)]);
    //   });
    // });
    console.log("Row ", currentRow, this.rows);
    let firstCell = true;
    for (let i in this.rows) {
      for (let j in this.rows[i].cells) {
        const cell = this.rows[i].cells[j];
        if (cell.value === 0) {
          const possibilities = [
            ...getIntersection(POSSIBLES, cell.impossibles)
          ];
          console.log("possibilities", possibilities);
          if (firstCell) {
            if (cell.givenConstraints.size === 0) {
              cell.givenConstraints.add(possibilities[0]);
            }
            // cell.givenConstraints.add(possibilities[0]);
            console.log("check", i > currentRow, i, currentRow);

            if (i > currentRow) {
              console.log("J ", i);
              this.saveState();
              currentRow = i;
            }
            firstCell = false;
          }

          if (possibilities[0]) {
            console.log("new value ", possibilities[0], possibilities);
            cell.value = possibilities[0];
            cell.attemptedValues.add(cell.value);

            this.rows[i].impossibles.add(cell.value);
            this.findColumn(cell).impossibles.add(cell.value);
            this.findRegion(cell).impossibles.add(cell.value);
          } else {
            console.log("resetting ", possibilities[0], possibilities);
            this.resetRow(this.rows[i]);
            currentRow--;
          }
          break;
        }
      }
      break;
    }
    // this.rows.find(row =>
    //   row.cells.find((cell, index) => {
    //     if(cell.value === 0) {
    //       console.log("FOUND: ", index)
    //       const possibilities = [...getIntersection(POSSIBLES, cell.impossibles)];
    //       console.log("new value ", possibilities[0]);
    //       cell.value = possibilities[0];
    //       return cell;
    //     }
    //   })
    // );
    console.log("END", this.rows);
    return {
      currentRow: currentRow,
      currentOffset: currentOffset,
      rows: [...this.rows]
    };
  }

  saveState = () => {
    console.log("saved", this.rows.length);
    this.rows.forEach(row => {
      row.cells.forEach(cell => {
        cell.previousState = { ...cell };
      });
    });
  };
  getFirstNonZeroInRow = row => row.cells.find(cell => cell.value !== 0);
  // loadState = () => {
  //   this.rows.impossibles.clear();
  //   this.columns.impossibles.clear();
  //   this.regions.impossibles.clear();
  //   this.rows.forEach(row => {
  //     row.cells.forEach(cell => {
  //       cell = {...cell.previousState};
  //     });
  //   });
  //   console.log("loaded", this.rows);
  // }
  resetRow = row => {
    row.impossibles = row.initalImpossibles;
    this.columns.forEach(column => {
      column.impossibles = column.initalImpossibles;
    });
    this.regions.forEach(region => {
      region.impossibles = region.initalImpossibles;
    });
    row.cells.forEach(cell => {
      // console.log("setting cell",cell,cell.previousState)
      // cell.givenConstraints = cell.previousState.givenConstraints;
      cell.value = cell.previousState.value;
      cell.impossibles = new Set(cell.givenConstraints);
      cell.previousState = cell.previousState.previousState;

      // cell = {...cell.previousState, givenConstraints: cell.givenConstraints};
      // console.log("set cell", cell)
    });
    console.log("reset", this.rows);
    console.log("reset", this.columns);
    // row.cells.forEach((cell, index) => {
    //   cell.value = row.givenCellValues[index];
    //   cell.impossibles.clear();
    // })
  };
  findColumn = cell =>
    this.columns.find(column => column.cells.indexOf(cell) !== -1);
  findRegion = cell =>
    this.regions.find(region => region.cells.indexOf(cell) !== -1);

  setCellImpossibles() {
    this.rows.forEach(row => {
      row.cells.forEach(cell => {
        const column = this.findColumn(cell);
        const region = this.findRegion(cell);
        cell.addImpossibles([
          ...row.impossibles,
          ...column.impossibles,
          ...region.impossibles
        ]);
      });
    });
  }
}
