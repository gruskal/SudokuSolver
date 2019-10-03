import React from "react";
import styled from "styled-components";

const Table = styled.table`
  background-color: #83878C;
  padding: 0px 20vw 0px 20vw;
`
const Cell = styled.td`
  font-size: 20px;
  color: #FFFFFF;
  text-align: center;
`;

const SodokuBoard = ({ rows }) => {
  const renderRows = () => rows.map(row => <tr>{renderCells(row)}</tr>);
  const renderCells = row => row.cells.map(cell => <Cell> {cell.value} </Cell>);

  return (
    <Table>
      <tbody>{renderRows()}</tbody>
    </Table>
  );
};

export default SodokuBoard;
