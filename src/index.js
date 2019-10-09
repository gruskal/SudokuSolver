import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import SudokuPlayer from "./components/SudokuPlayer"
import SudokuViewer from "./components/SudokuViewer";
import {
  Header,
  Content,
} from "./components/layout";

/* Constants */
const INITIALBOARD = [
  8, 0, 0, 9, 3, 0, 0, 0, 2,
  0, 0, 9, 0, 0, 0, 0, 4, 0,
  7, 0, 2, 1, 0, 0, 9, 6, 0,
  2, 0, 0, 0, 0, 0, 0, 9, 0,
  0, 6, 0, 0, 0, 0, 0, 7, 0,
  0, 7, 0, 0, 0, 6, 0, 0, 5,
  0, 2, 7, 0, 0, 8, 4, 0, 6,
  0, 3, 0, 0, 0, 0, 5, 0, 0,
  5, 0, 0, 0, 6, 2, 0, 0, 8
];

// const INITIALBOARD = [
//    [0,0,0,0,1,4,0,0,0],
//    [0,3,0,0,0,0,2,0,0],
//    [0,7,0,0,0,0,0,0,0],
//    [0,0,0,9,0,0,0,3,0],
//    [6,0,1,0,0,0,0,0,0],
//    [0,0,0,0,0,0,0,8,0],
//    [2,0,0,0,0,0,1,0,4],
//    [0,0,0,0,5,0,6,0,0],
//    [0,0,0,7,0,8,0,0,0]];

/* Styles */
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #ecf0f1;
  overflow: hidden;
`;

const StyledHeader = styled(Header)`
  justify-content: left;
  padding-left: 25px;
  background-color: #444444;
`;

/* Component */
const App = () => {
  const sudokuPlayer = new SudokuPlayer();
  const error = sudokuPlayer.initializeBoard(INITIALBOARD);

  return (
    <Container>
      {/* <StyledHeader>
        <h1> SudokuSolver </h1>
      </StyledHeader> */}
      <Content>
        <SudokuViewer initialBoard={INITIALBOARD} error={error} sudokuPlayer={sudokuPlayer}/>
      </Content>
    </Container>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
