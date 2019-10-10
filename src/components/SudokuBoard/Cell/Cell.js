import * as React from "react";
import styled from "styled-components";
import CellInputField from "./CellInputField"

/* Styles */
const Container = styled.div`
  cursor: ${({editMode}) => editMode ? "pointer" : "default"};
  display: flex;
  flex-basis: 33.3333%;
  max-height: ${({maxCellHeight}) => maxCellHeight};
  border: 1px solid #4B4B4A;
  box-sizing: border-box;
  font-size: 2vw;
  color: black;
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
  index,
  onClick,
  maxCellHeight
}) => {

  const handleFocus = () => {
    if(window.outerWidth  > 600) {
      document.getElementById(id).select(); // Select input field      
    }
  }

  const handleClick = () => {
    if(editMode) {
      onClick();
    }
  }

  return (
    <Container 
      onFocus={handleFocus}
      editMode={editMode}
      onClick={handleClick}
      maxCellHeight={maxCellHeight}
      tabIndex={editMode ? "-1" : undefined}
    >
      <CellInputField
        value={value === 0 ? "" : value}
        tabIndex={index}
        id={id}
        disabled={!editMode}
      />
    </Container>
  );
};

export default Cell;
