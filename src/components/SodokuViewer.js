import React, { useState } from "react";
import styled from "styled-components";
import {
	Header,
	Content,
	Footer,
	SodokuBoard
} from "./layout";
import {
	Buoy,
	CircleButton
} from "./";

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

function SodokuViewer({
	sodokuPlayer,
	initialBoard,
	error
}) {
	const DEFAULTSTATUS = "Click on a solve option to begin";
	const [sodokuRunner, setSodokuRunner] = useState();
	const [status, setStatus] = useState(error || DEFAULTSTATUS);
	const [rows, setRows] = useState(sodokuPlayer.getRows());
	const [stepping, setStepping] = useState(false);
	const complete = status.indexOf("Completed") !== -1;
	const working = status.indexOf("Working") !== -1;

	const resetSodokuBoard = () => {
		clearInterval(sodokuRunner);
		sodokuPlayer.initializeBoard(initialBoard);
		setRows(sodokuPlayer.getRows());
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
			rows
		} = sodokuPlayer.solve()
		setStatus(status);
		setRows(rows);
	}
	const quickSolveSodoku = () => {
		const {
			status,
			rows
		} = sodokuPlayer.solve();
		setStatus(status);
		setRows(rows);
		setStepping(false);
	}

	return (
		<Container>
			<StyledHeader error={!!error} complete={complete}>
				<h1> {status} </h1>
			</StyledHeader>
			<SodokuBoard rows={rows} />
			<StyledFooter>
				<ButtonWrapper>
					{working && !stepping ? (
							<CancelButton
								text={"Cancel"}
								onClick={resetSodokuBoard}
							/>
						) : 
							(
								!complete ? (
									<React.Fragment>
										<CircleButton
											text={"Animated Solve"} 
											onClick={onAnimatedSolveClick}/>
										<Buoy 
											text={"Quick Solve"}
											onClick={() => {
												setStatus("Working ...");
												resetSodokuBoard();
												const {
													status,
													rows
												} = sodokuPlayer.quickSolve();
												setStatus(status);
												setRows(rows);
											}}
										/>
										<CircleButton
											text={"Step by step"}
											onClick={() => {
												setStepping(true);
												solveNextSodokuStep();
											}}
										/>
									</React.Fragment>
								) : 
									(
										<Buoy 
											text={"Reset"}
											onClick={resetSodokuBoard}
										/>
									)
							)
					}
				</ButtonWrapper>
			</StyledFooter>
		</Container>
	);
}

export default SodokuViewer;
