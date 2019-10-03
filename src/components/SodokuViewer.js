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
  console.log(error)
  return (
	<Container>
		<StyledHeader error={!!error} complete={!status.indexOf("Completed")}>
			<h1> {status} </h1>
	  	</StyledHeader>
		<SodokuBoard rows={rows} />
		<StyledFooter>
			<ButtonWrapper>
				<CircleButton
					text={"Animated Solve"} 
					onClick={() => {
						setInterval(solveNextSodokuStep, 0);
					}}/>
				<Buoy 
					text={"Quick Solve"}
					onClick={() => {
						setStatus("Working ...");
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
					onClick={solveNextSodokuStep}
				/>
			</ButtonWrapper>
		</StyledFooter>
	</Container>
  );
}
