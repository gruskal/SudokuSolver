import React, { useState } from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import SodokuTable from "./components/sodoku/SodokuTable";
import SodokuViewer from "./components/layout/SodokuViewer";

const table = new SodokuTable([
  [8, 0, 0, 9, 3, 0, 0, 0, 2],
  [0, 0, 9, 0, 0, 0, 0, 4, 0],
  [7, 0, 2, 1, 0, 0, 9, 6, 0],
  [2, 0, 0, 0, 0, 0, 0, 9, 0],
  [0, 6, 0, 0, 0, 0, 0, 7, 0],
  [0, 7, 0, 0, 0, 6, 0, 0, 5],
  [0, 2, 7, 0, 0, 8, 4, 0, 6],
  [0, 3, 0, 0, 0, 0, 5, 0, 0],
  [5, 0, 0, 0, 6, 2, 0, 0, 8]
]);

function App() {
  const [rowToSolve, setRowToSolve] = useState(0);
  const [solveOffset, setSolveOffset] = useState(0);

  const [rows, setRows] = useState(table.getRows());
  return (
    <div className="App">
      <button
        onClick={() => {
          const { currentRow, currentOffset, rows } = table.solve(
            rowToSolve,
            solveOffset
          );
          setSolveOffset(currentOffset);
          setRowToSolve(currentRow);
          setRows(rows);
        }}
      >
        Next Step
      </button>
      <SodokuViewer rows={rows} />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
