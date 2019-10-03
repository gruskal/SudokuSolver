const POSSIBLES = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);

function getIntersection(setA, setB) {
  return new Set([...setA].filter(value => !setB.has(value)));
}

const cellStructureAppend = (cell, cells, constraints) => {
  cells.push(cell);
  if (cell.value !== 0) {
    if(constraints.has(cell.value)) {
      return true;
    }
    constraints.add(cell.value);
    return false;
  }
}

function Cell(value) {
  this.value = value;
  this.attemptedValues = new Set();
  this.given = value !== 0;
  this.constraints = new Set();
}

function Row() {
  this.cells = [];
  this.constraints = new Set();
  this.append = (cell) => (cellStructureAppend(cell, this.cells, this.constraints));
}
function Column() {
  this.cells = [];
  this.constraints = new Set();
  this.append = (cell) => (cellStructureAppend(cell, this.cells, this.constraints));  
}
function Region() {
  this.cells = [];
  this.constraints = new Set();
  this.append = (cell) => (cellStructureAppend(cell, this.cells, this.constraints));  
}

export default class SodokuPlayer {
  constructor(rawRows) {
    
  }

  initializeBoard = (rawRows, onStatusUpdate) => {
    this.i = 0
    this.backtracking = false;
    const numRows = rawRows.length;
    const numColumns = rawRows[0].length;
    const numRegions = (numColumns / 3) * (numRows / 3);
    this.pivotCell = null;
    this.cells = [];
    this.error = false;
    this.pivotIndex = -1;
    this.rows = rawRows.map(row => {
      const newRow = new Row();
      row.forEach(cellValue => {
        const cell = new Cell(cellValue); // Flattened array of all cells
        this.cells.push(cell);
        const error = newRow.append(cell);
        if(!this.error && error) {
          this.error = true;
        }
      });
      return newRow;
    });
    this.columns = [[], []];
    for (let i = 0; i < numColumns; i++) {
      const newColumn = new Column();
      this.rows.forEach(row => {
        const error = newColumn.append(row.cells[i]);
        if(!this.error && error) {
          this.error = true;
        }
      });
      this.columns[i] = newColumn;
    }
    this.regions = [];
    for (let i = 0; i < numRows; i += 3) {
      for (let j = 0; j < numColumns / 3; j++) {
        const newRegion = new Region();
        for (let rowNum = 0; rowNum < 3; rowNum++) {
          const error1 = newRegion.append(this.rows[i + rowNum].cells[j * 3]);
          const error2 = newRegion.append(this.rows[i + rowNum].cells[j * 3 + 1]);
          const error3 =  newRegion.append(this.rows[i + rowNum].cells[j * 3 + 2]);
          if(!this.error && (error1 && error2 && error3)) {
            this.error = true;
          }
        }
        this.regions.push(newRegion);
      }
    }
    
    if(this.error) {
      if(onStatusUpdate) {
        onStatusUpdate("Invalid Sodoku Board");
      } else {
        return "Invalid Sodoku Board";
      }
    }
  }
  getRows = () => this.rows;

  quickSolve() {
    const start = new Date().getTime();
    for(let i = 0; i < this.cells.length; i++) {
      const currentCell = this.cells[i];
      if(currentCell.given) {
        if(this.backtracking) {
          i -= 2;
        }
        continue;
      } else {
        this.backtracking = false;
      }
      const possibilities = this.calculateCellPossibilties(currentCell);
      if(possibilities.size > 0) {
        const nextPossibility = possibilities.values().next().value;        
        this.setCellValue(currentCell, nextPossibility);
        continue;
      } else {
        this.clearCellValue(currentCell);
        this.backtracking = true;
        const previousCell = this.cells[i - 1];
        if(!previousCell.given) {
          this.removeCellConstraint(previousCell); // Perfomance enchancement          
          previousCell.value = 0;
        }
        i -= 2;
      }
    }
    return {
      status: `Completed in ${new Date().getTime() - start}ms`,
      rows: [...this.rows]
    }
  }
  solve() {
      if(this.i === this.cells.length) {
        return {
          status: "Complete",
          rows: [...this.rows]
        }
      }
      const currentCell = this.cells[this.i];
      if(currentCell.given) {
        this.i = this.backtracking ? --this.i : ++this.i;
        return {
          status: "Working Reverse",
          rows: [...this.rows]
        }
      } else {
        this.backtracking = false;
      }
      const possibilities = this.calculateCellPossibilties(currentCell);
      if(possibilities.size > 0) {
        const nextPossibility = possibilities.values().next().value;
        this.setCellValue(currentCell, nextPossibility);
        this.i++;
      } else {
        this.clearCellValue(currentCell);
        this.backtracking = true;
        this.i --;
        const previousCell = this.cells[this.i];
        if(!previousCell.given) {
          this.removeCellConstraint(previousCell); // Perfomance enchancement    
    
          previousCell.value = 0;
        }
      }
    return {
      status: "Working Forward",
      rows: [...this.rows]
    }
  }

  removeCellConstraint = (cell) => {
    if(cell.value === 0) return;
    this.findColumn(cell).constraints.delete(cell.value);
    this.findRow(cell).constraints.delete(cell.value);
    this.findRegion(cell).constraints.delete(cell.value);
  }

  addCellConstraint = (cell) => {
    if(cell.value === 0) return;    
    this.findColumn(cell).constraints.add(cell.value);
    this.findRow(cell).constraints.add(cell.value);
    this.findRegion(cell).constraints.add(cell.value);
  }

  clearCellValue = (cell) => {
    this.removeCellConstraint(cell); // Perfomance enchancement    
    cell.value = 0;
    cell.attemptedValues.clear(); 
  }

  setCellValue = (cell, value) => {
    this.removeCellConstraint(cell); // Perfomance enchancement   
    cell.value = value;
    cell.attemptedValues.add(value);
    this.addCellConstraint(cell); // Perfomance enchancement
  }

  calculateCellPossibilties = (cell) => {
    const constraints = this.getCellConstraints(cell);
    return getIntersection(POSSIBLES, constraints);
  }

  getCellConstraints = (cell) => (
    new Set([
      ...this.findRow(cell).constraints,
      ...this.findColumn(cell).constraints,
      ...this.findRegion(cell).constraints,
      ...cell.attemptedValues
    ])
  )

  findRow = cell =>
    this.rows.find(row => row.cells.indexOf(cell) !== -1);

  findColumn = cell =>
    this.columns.find(column => column.cells.indexOf(cell) !== -1);

  findRegion = cell =>
    this.regions.find(region => region.cells.indexOf(cell) !== -1);
}
