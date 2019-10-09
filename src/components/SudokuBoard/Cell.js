import * as React from "react";
import styled from "styled-components";
import CellInputField from "../CellInputField"

/* Styles */
const Text = styled.div`
  margin: auto;
`;

const Container = styled.div`
  cursor: ${({editMode}) => editMode ? "pointer" : "default"};
  display: flex;
  width: 50px;
  height: 50px;
  border: 1px solid gray;
  box-sizing: border-box;
  font-size: 2vw;
  color: #EDEDED;
  text-align: center;
  &:focus-within {
    outline: 2px solid blue;  
  }
`;

/* Component */
const Cell = ({
  value,
  editMode,
  id,
  index
}) => {

  const handleFocus = () => {
    document.getElementById(id).select(); // Select input field
  }

  return (
    <Container 
      onFocus={handleFocus}
      editMode={editMode}
      tabIndex={editMode ? "-1" : undefined}
    >
      <CellInputField
        value={value === 0 ? "" : value}
        tabIndex={index}
        id={id}
        disabled={!editMode}
        // onChange={(value) => {
        //   onUpdate(value, rowIndex, index);
        // }}
      />
    </Container>
  );
};

export default Cell;
