# SudokuSolver
Solves sudoku puzzles with various solving options: Step by step, animated solve, quick solve

#### README: If you're testing mobile using browser devtools make sure to refresh the page, otherwise the grid will not scale properly
  
## Prerequisites:
  - nodejs (https://nodejs.org/en/)
  
## How to run:
  #### Build
  1) Clone this git repo
  2) Run shell cmd "npm install" in the root of the cloned directory
  #### Deploy
  3) Run "npm start"
  #### Access
  4) Navigate to localhost:3000 using your favourite popular browser (Chrome, Safari, Edge)
  Note: Grid does not render properly in Firefox and therefore should not be used.
  
## If I had more time I would:
  - Make the grid render properly in Firefox
  - Fix the bug where a cell will at times be blank after solving a puzzle, this is due to it not re-rendering. This happens because the new value is the same as the old value stored in props. The reason it's displayed as blank is because it is a blank value in the cells state.
  - Fix imports in the worker
  
