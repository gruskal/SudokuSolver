import React from "react";
import styled from "styled-components";
import Region from "./Region";
import Cell from "./Cell/Cell";

const CONSTANTS = {
  numRegions: 9,
  rowLength: 9
}
/* Styles */
const Container = styled.div`
  border: 1px solid #4B4B4A;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  height: ${({height}) => height};
  ${({compact}) => ( compact ?
    "margin: auto" :
    "margin: auto 20px"
  )}
`;

/* Component */
class SudokuBoard extends React.Component {
  constructor(props) {
    super(props);
    this.navigationIndex = 0;
    this.state = {
      height: "auto",
      maxRegionHeight: "none",
      maxCellHeight: "none",
    }
  }

  componentDidMount() {
    const containerWidth = this.containerRef.offsetWidth;
    const containerHeight = this.containerRef.offsetHeight;
    if(containerHeight < containerWidth) {
      let newHeight = containerWidth;
      if(containerWidth > this.containerRef.parentNode.offsetHeight) {
        newHeight = this.containerRef.parentNode.offsetHeight - 40; // 40 to get 20px margins top and bottom
      }
      this.setState({
        height: `${newHeight}px`,
        maxRegionHeight: `${newHeight / 3}px`,
        maxCellHeight: `${newHeight / 9}px`,
      });
    }
  }

  handleNavigation = (event) => {
    switch(event.which) { // TOOD: Use constants
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
      default:
        break;
    }
  }

  focus = () => {
    setTimeout(() => document.getElementById(`c${this.navigationIndex}`).select(), 0); // TOOD: Find a better way to do this
  }

  render = () => {
    let regions = [];
    let index = 0;

    const {
      cells,
      editMode,
      compact
    } = this.props;

    let {
      rowLength: boardRowLength
    } = CONSTANTS;


    const getRegionCells = (cells, index) => ([
      ...cells.slice(index, index + Region.CONSTANTS.rowLength),
      ...cells.slice(index + boardRowLength, index + boardRowLength + Region.CONSTANTS.rowLength),
      ...cells.slice(index + boardRowLength * 2, index + boardRowLength * 2 + Region.CONSTANTS.rowLength)
    ]);

    /* Generate Regions and cells */
    while((index + 20) < cells.length) { // +20 is due to that by the time the last region is generated index is 20 cells behind
      /* Move index to top left of the next region */
      if(index > 0 && index % boardRowLength === 0) { // If next region is below current
        index += boardRowLength * 2;
      }
      const regionCells = getRegionCells(cells, index);
      const cellComponents = regionCells.map((cell) => {
        const cellIndex = cells.indexOf(cell);
        const identifer = `c${cellIndex}`;
        return (
          <Cell 
            key={identifer} 
            id={identifer}
            value={cell.value}
            index={cellIndex + 1}
            editMode={editMode}
            maxCellHeight={this.state.maxCellHeight}          
            onClick={() => this.navigationIndex = cellIndex}
          />
        );
      });
      regions.push(
        <Region 
          key={`rtlc${index}`}
          maxRegionHeight={this.state.maxRegionHeight}
        > 
          {cellComponents} 
        </Region>
      );
  
      // If next region is in the same row
      index += Region.CONSTANTS.rowLength;
    }
    return (
      <Container 
        onKeyDown={this.handleNavigation}
        ref={(containerRef) => this.containerRef = containerRef}
        height={this.state.height}
        compact={compact}
        tabindex="0" // Make focusable
      >
        {regions}
      </Container>
    );
  }
}

export default SudokuBoard;
