import React from "react";

const SodokuBoard = ({ rows }) => {
  const renderRows = () => rows.map(row => <tr>{renderCells(row)}</tr>);
  const renderCells = row => row.cells.map(cell => <td> {cell.value} </td>);

  return (
    <table>
      <tbody>{renderRows()}</tbody>
    </table>
  );
};

export default SodokuBoard;
