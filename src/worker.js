/*
    Note: I was not able to get imports to work correctly with Workers, and therefore resulted in copying SudokuPlayer
    into this file. This is only done this way due to time contraints, I'll look into fixing this in the future
*/
  
export default class SudokuWorker {
    constructor(worker) {
        const code = WorkerThread.toString();
        const blob = new Blob(['('+code+')()']);
        return new Worker(URL.createObjectURL(blob));
    }
}

const WorkerThread = () => {
    const POSSIBLES = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    
    /* Helper functions */
    function getIntersection(setA, setB) {
        return new Set([...setA].filter(value => !setB.has(value)));
    }
    
    function cellStructureAppend(cell, cells, constraints) {
        cells.push(cell);
        if (cell.value !== 0) {
            if(constraints.has(cell.value)) {
                return true;
            }
            constraints.add(cell.value);
            return false;
        }
    }
    
    /* Schema / Cell Datastructures */
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
    
    class SudokuPlayer {
        initializeBoard = (rawCells, onStatusUpdate) => {
            this.currentSolveIndex = 0
            this.reversing = false;
            const boardSize = 9;
            this.cells = [];
            this.error = false;
            this.rows = new Array(9);
            for(let i = 0; i < this.rows.length; i++) {
                this.rows[i] = new Row();
            }
            for (let i = 0; i < rawCells.length; i++) {
                const cell = new Cell(rawCells[i]);			
                this.cells.push(cell); // Flattened array of all cells
                const rowNumber = Math.floor(i / 9);
                const error = this.rows[rowNumber].append(cell);
                if(!this.error && error) {
                    this.error = true;
                }
            }
            this.columns = [[], []];
            for (let i = 0; i < boardSize; i++) { // Create columns from rows of cells
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
            for (let i = 0; i < boardSize; i += 3) { // Create regions from rows of cells
                for (let j = 0; j < boardSize / 3; j++) {
                    const newRegion = new Region();
                    for (let rowNum = 0; rowNum < 3; rowNum++) {
                        const error1 = newRegion.append(this.rows[i + rowNum].cells[j * 3]);
                        const error2 = newRegion.append(this.rows[i + rowNum].cells[j * 3 + 1]);
                        const error3 =  newRegion.append(this.rows[i + rowNum].cells[j * 3 + 2]);
                        if(!this.error && (error1 || error2 || error3)) {
                            this.error = true;
                        }
                    }
                    this.regions.push(newRegion);
                }
            }
            
            if(this.error) {
                if(onStatusUpdate) {
                    onStatusUpdate("Invalid Sodoku Board");
                } else { // If no updater is given, return status update instead
                    return "Invalid Sodoku Board";
                }
            }
        }
        getCells = () => this.cells;
    
        quickSolve() { // Solves Sodoku with no delay between steps
            const start = new Date().getTime();
            for(let i = 0; i < this.cells.length; i++) {
                if(i < 0) {
                    return {
                        status: "No solution",
                        cells: [...this.cells]
                    }	
                }
                const currentCell = this.cells[i];
                if(currentCell.given) {
                    if(this.reversing) {
                        i -= 2; // Go back to previous step
                    }
                    continue;
                } else {
                    this.reversing = false;
                }
                const possibilities = this.calculateCellPossibilties(currentCell);
                if(possibilities.size > 0) {
                    const nextPossibility = possibilities.values().next().value;        
                    this.setCellValue(currentCell, nextPossibility);
                    continue;
                } else {
                    this.clearCellValue(currentCell);
                    this.reversing = true;
                    const previousCell = this.cells[i - 1];
                    if(!previousCell.given) {
                        this.removeCellConstraint(previousCell);
                        previousCell.value = 0;
                    }
                    i -= 2; // Go back to previous step
                }
            }
            return {
                status: `Completed in ${new Date().getTime() - start}ms`,
                cells: [...this.cells]
            }
        }
        solveNextStep() { // Used for step by step and animated solve
                if(this.currentSolveIndex === this.cells.length) {
                    return {
                        status: "Complete",
                        cells: [...this.cells]
                    }
                } else if(this.currentSolveIndex < 0) {
                    return {
                        status: "No solution",
                        cells: [...this.cells]
                    }	
                }
                const currentCell = this.cells[this.currentSolveIndex];
                if(currentCell.given) {
                    this.currentSolveIndex = this.reversing ? --this.currentSolveIndex : ++this.currentSolveIndex;
                    return {
                        status: "Working Reverse",
                        cells: [...this.cells]
                    }
                } else {
                    this.reversing = false;
                }
                const possibilities = this.calculateCellPossibilties(currentCell);
                if(possibilities.size > 0) {
                    const nextPossibility = possibilities.values().next().value;
                    this.setCellValue(currentCell, nextPossibility);
                    this.currentSolveIndex++;
                } else {
                    this.clearCellValue(currentCell);
                    this.reversing = true;
                    this.currentSolveIndex --;
                    const previousCell = this.cells[this.currentSolveIndex];
                    if(!previousCell.given) {
                        this.removeCellConstraint(previousCell);
            
                        previousCell.value = 0;
                    }
                }
            return {
                status: "Working Forward",
                cells: [...this.cells]
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
            this.removeCellConstraint(cell);
            cell.value = 0;
            cell.attemptedValues.clear(); 
        }
    
        setCellValue = (cell, value) => {
            this.removeCellConstraint(cell);  
            cell.value = value;
            cell.attemptedValues.add(value);
            this.addCellConstraint(cell);
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
    
    // eslint-disable-next-line no-restricted-globals            
    self.addEventListener('message', (event) => {
        const {
            data: {
                command,
                cells: initialCells
            }
        } = event;
        if(command === "QuickSolve") {
            const sudokuPlayer = new SudokuPlayer();
            sudokuPlayer.initializeBoard(initialCells);

            const {
                status,
                cells
            } = sudokuPlayer.quickSolve();

            // eslint-disable-next-line no-restricted-globals            
            self.postMessage({
                command: command,
                status: status,
                cells: cells
            });
        }
    }, false);
}
