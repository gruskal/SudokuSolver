import React from "react";
import styled from "styled-components";

const Table = styled.table`
  width: 100%;
  height: 100%;
  padding: 0px 20vw 0px 20vw;
`;

const FlexWrapper = styled.div`
  background-color: #83878C;
  flex: 2 0 auto;
  width: 100%;
`;

const Cell = styled.td`
  font-size: 2vw;
  color: #FFFFFF;
  text-align: center;
`;

const SodokuBoard = ({
  rows 
}) => {
  const renderRows = () => rows.map(row => <tr>{renderCells(row)}</tr>);
  const renderCells = row => row.cells.map(cell => <Cell> {cell.value} </Cell>);

  return (
    <FlexWrapper>
      <Table>
        <tbody>{renderRows()}</tbody>
      </Table>
    </FlexWrapper>
  );
};

export default SodokuBoard;
