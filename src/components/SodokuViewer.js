import React, { useState } from "react";
import SodokuBoard from "./layout/SodokuBoard";

export default function SodokuViewer({
	sodokuPlayer,
	error
}) {
	const [status, setStatus] = useState(error || "Click on a solve option to begin");
	const [rows, setRows] = useState(sodokuPlayer.getRows());
	
  const solveNextSodokuStep = () => {
	const {
	  status,
	  rows
	} = sodokuPlayer.solve()
	setStatus(status)
	setRows(rows);
  }
  const quickSolveSodoku = () => {
	const {
	  status,
	  rows
	} = sodokuPlayer.solve();
	setStatus(status);
	setRows(rows);
  }

  return (
	<div className="App">
	  <button onClick={solveNextSodokuStep}>
		Next Step
	  </button>
	  <button
		onClick={() => {
		  setInterval(solveNextSodokuStep, 0);
		}}
	  >
		Animated Solve
	  </button>
	  <button
		onClick={() => {
		  setStatus("Working ...");
		  const {
			status,
			rows
		  } = sodokuPlayer.quickSolve();
		  setStatus(status);
		  setRows(rows);
		}}
	  >
		Quick Solve
	  </button>
	  <h1> {status} </h1>
		<SodokuBoard rows={rows} />
	</div>
  );
}
