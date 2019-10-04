# SodokuSolver
Solves sodoku puzzles with various solving options: Step by step, animated solve, quick solve
- Step by step: cick to iterate through the solution step by step
- Animated solve: automatically iterates through the solution
- Quick solve: Solves without updating the displayed board - Significantly faster
#### You can also edit the board to solve a different puzzle by clicking the edit button
  
## Prerequisites:
  - nodejs (https://nodejs.org/en/)
  
## How to run:
  #### Build
  1) Clone this git repo
  2) Run shell cmd "npm install" in the root of the cloned directory
  #### Deploy
  3) Run "npm start"
  #### Access
  4) Navigate to localhost:3000 using your favourite popular browser (Chrome, Firefox, Safari, Edge)
  
## If I had more time I would:
  - Add better support for mobile devices (Tall & narrow screens do not display optimally)
  - Make CircleButton and Buoy inherit from a common parent
  - Use a better solution for editing Sodoku boards
  - Improve styling / ux (Allow for creating boards of any size, set animated solve speed)
  - Refactor: Separate and share much of the logic between quickSolve and solveNextStep in SodokuPlayer.js
  
