import React from "react";
import styled from "styled-components";
import CellInputField from "../CellInputField";

/* Styles */
const Table = styled.table`
	width: 50%;
	margin: auto;	
`;

const FlexWrapper = styled.div`
	display: flex;
	flex: 2 0 auto;
	background-color: #83878C;
	align-content: center;
	width: 100%;
`;

const Cell = styled.td`
	font-size: 2vw;
	color: #EDEDED;
	text-align: center;
`;

/* Component */
const SodokuBoard = ({
	rows,
	editMode,
	onUpdate
}) => {
	const renderRows = () => {
		if(editMode) {
			return rows.map((row, index) => <tr key={`r${index}`}>{renderInputFieldCells(row, index)}</tr>);
		} else {
			return rows.map((row, index) => <tr key={`r${index}`}>{renderValueCells(row)}</tr>);
		}
	};
	const renderValueCells = (row) => (
		row.cells.map((cell, index) => <Cell key={`c${index}`}> {cell.value} </Cell>)
	);
	const renderInputFieldCells = (row, rowIndex) => (
		row.cells.map((cell, index) => (
			 <Cell key={`c${index}`}> 
				<CellInputField key={`ci${index}`}
					 value={cell.value}
					 onChange={(value) => {
						onUpdate(value, rowIndex, index);
					 }}
				/>
			</Cell>
		))
	);
	
	return (
		<FlexWrapper>
			<Table>
				<tbody>{renderRows()}</tbody>
			</Table>
		</FlexWrapper>
	);
};

export default SodokuBoard;
