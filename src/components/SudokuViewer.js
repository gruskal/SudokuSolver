import React, { useState, useRef } from "react";
import styled from "styled-components";
import SudokuBoard from "./SudokuBoard/SudokuBoard"
import {
	Header,
	Footer,
} from "./layout";
import {
	Buoy,
	CircleButton
} from "./";

/* Constants */
const EDITSTATUS = "Editing, when you're done press:";
const DEFAULTSTATUS = "Click on a solve option to begin, or:";

/* Styles */
const EditButton = styled(CircleButton)`
	color: #EDEDED;
	height: 50px;
	width: 50px;
	background-color: #343434;
	margin: auto 0 auto 12px;
`;
const CancelButton = styled(CircleButton)`
	background-color: #B22020;
	margin: auto auto 30px auto;
`;

const StyledHeader = styled(Header)`
	background-color: ${({error, complete}) => (
		complete ? 
			"#44B220" :
			error ? "#B22020" : "#CCA224"
	)};
`;
const StyledFooter = styled(Footer)`
	padding-top: 20px;
	margin: auto;
`;

const ButtonWrapper = styled.div`
	display: flex;
	flex-direction: row;
	padding-top: 16px;
`;

const Container = styled.div`
	display: flex;
	flex: 1 0 auto;
	flex-direction: column;
	justify-content: center;
	background-color: #222222;
`;

/* Component */
function SodokuViewer({
	sudokuPlayer,
	initialBoard,
	error
}) {
	const boardRef = useRef(null);
	const [currentBoard, setBoard] = useState(initialBoard);
	const [sodokuRunner, setSodokuRunner] = useState();
	const [status, setStatus] = useState(error || DEFAULTSTATUS);
	const [cells, setCells] = useState(sudokuPlayer.getCells());
	const [stepping, setStepping] = useState(false);
	const [editMode, setEditMode] = useState(false);
	const complete = status.indexOf("Complete") !== -1;
	const working = status.indexOf("Working") !== -1;
	const hasError = !!error || status.indexOf("Invalid") !== -1;

	const resetSodokuBoard = () => {
		clearInterval(sodokuRunner);
		sudokuPlayer.initializeBoard(currentBoard);
		setCells(sudokuPlayer.getCells());
		setStatus(DEFAULTSTATUS);
		setStepping(false);
	}
	const onAnimatedSolveClick = () => {
		setSodokuRunner(setInterval(solveNextSodokuStep, 1));
		setStepping(false);
	}
	const solveNextSodokuStep = () => {
		const {
			status,
			cells
		} = sudokuPlayer.solveNextStep()
		setStatus(status);
		setCells(cells);
	}
	const quickSolveSodoku = () => {
		setStepping(false);
		setStatus("Working ...");
		resetSodokuBoard();
		const {
			status,
			cells
		} = sudokuPlayer.quickSolve();
		setStatus(status);
		setCells(cells);
	}
	const handleBoardUpdate = (value, rowIndex, cellIndex) => {
		// const newRows = [...rows];
		// newRows[rowIndex].cells[cellIndex] = {value: parseInt(value)};
		// const newBoard = newRows.map((row) => (
		// 	row.cells.map((cell) => (
		// 		cell.value
		// 	))
		// ))
		// setBoard(newBoard);
		// sudokuPlayer.initializeBoard(newBoard, setStatus);
		// setRows(sudokuPlayer.getRows());
	}
	return (
		<Container>
			<StyledHeader 
				error={hasError} 
				complete={complete}
			>
				<h1> {status} </h1>
				{status === DEFAULTSTATUS || status === "No solution" ?
					<EditButton
						text="Edit"
						onClick={() => {
							setStatus(EDITSTATUS);
							setEditMode(true);
							boardRef.current.focus();
						}}
					/>
					: status === EDITSTATUS &&
					<EditButton
						text="Finish"
						onClick={() => {
							setStatus(DEFAULTSTATUS);
							setEditMode(false);
						}}
					/>
				}
			</StyledHeader>
			<SudokuBoard cells={cells} editMode={editMode} ref={boardRef}/>
			<StyledFooter>
				{editMode ? (
					<ButtonWrapper>
						<CircleButton
							text="Finish"
							onClick={() => {
								setEditMode(false);
								setStatus(DEFAULTSTATUS);
							}}
						/>
					</ButtonWrapper>
				) :
				(
					<ButtonWrapper>
						{working && !stepping ? (
								<CancelButton
									text="Cancel"
									onClick={resetSodokuBoard}
								/>
							) : 
								(
									!complete ? (
										<React.Fragment>
											<CircleButton
												text="Animated Solve"
												onClick={onAnimatedSolveClick}/>
											<Buoy 
												text="Quick Solve"
												onClick={quickSolveSodoku}
											/>
											<CircleButton
												text="Step by step"
												onClick={() => {
													setStepping(true);
													solveNextSodokuStep();
												}}
											/>
										</React.Fragment>
									) : 
										(
											<Buoy 
												text="Reset"
												onClick={resetSodokuBoard}
											/>
										)
								)
						}
					</ButtonWrapper>
				)}
			</StyledFooter>
		</Container>
	);
}

export default SodokuViewer;
