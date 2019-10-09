import React, { useState } from "react";
import styled from "styled-components";
import Region from "./Region";
import Cell from "./Cell";

const CONSTANTS = {
  numRegions: 9,
  rowLength: 9
}
/* Styles */
const Container = styled.div`
  border: 1px solid red;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 462px;
  height: 462px;
`;

/* Component */
class SudokuBoard extends React.Component {
  constructor(props) {
    super(props);
    this.navigationIndex = 0;
  }

  handleNavigation = (event) => {
    console.log(event.which)
    switch(event.which) {
      case 37: //Arrow left
        if(this.navigationIndex > 0) {
          this.navigationIndex--;
          document.getElementById(`c${this.navigationIndex}`).focus();
        }
        break;
      case 38: //Arrow up
        if(this.navigationIndex - 9 >= 0) {
          this.navigationIndex -= 9;
          document.getElementById(`c${this.navigationIndex}`).focus();
        }
        break;
      case 39: //Arrow right
        if(this.navigationIndex < 80) {
          this.navigationIndex ++;
          document.getElementById(`c${this.navigationIndex}`).focus();
        }
        break;
      case 40: //Arrow down
        if(this.navigationIndex + 9 <= 80) {
          this.navigationIndex += 9;
          document.getElementById(`c${this.navigationIndex}`).focus();
        }
        break;
    }
  }

  focus = () => {
    document.getElementById("c0").select();
  }

  render = () => {
    const {
      cells,
      editMode
    } = this.props;
    let {
      numRegions,
      rowLength: boardRowLength
    } = CONSTANTS;
    let regions = [];
    let index = 0;
    const getRegionCells = (cells, index) => ([
      ...cells.slice(index, index + Region.CONSTANTS.rowLength),
      ...cells.slice(index + boardRowLength, index + boardRowLength + Region.CONSTANTS.rowLength),
      ...cells.slice(index + boardRowLength * 2, index + boardRowLength * 2 + Region.CONSTANTS.rowLength)
    ]);
    while((index + 20) < cells.length) { // TODO: COMMENT
      /* Move index to top left of the next region */
      if(index > 0 && index % boardRowLength === 0) { // If next region is below current
        index += boardRowLength * 2;
      }
      const regionCells = getRegionCells(cells, index);
      const cellComponents = regionCells.map((cell) => {
        const cellIndex = cells.indexOf(cell);
        const identifer = `c${cellIndex}`;
        return (
          <Cell key={identifer} id={identifer} value={cell.value} index={cellIndex + 1} editMode={editMode}/>
        );
      });
      regions.push(<Region key={`rtlc${index}`}> {cellComponents} </Region>);
  
      // If next region is in the same row
      index += Region.CONSTANTS.rowLength;
    }
    return (
      <Container onKeyDown={this.handleNavigation} tabindex="0">
        {regions}
      </Container>
    );
  }
}

export default SudokuBoard;
