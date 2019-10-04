import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import SodokuPlayer from "./components/SodokuPlayer"
import SodokuViewer from "./components/SodokuViewer";
import {
  Header,
  Content,
} from "./components/layout";


/*
  [8, 0, 0, 9, 3, 0, 0, 0, 2],
  [0, 0, 9, 0, 0, 0, 0, 4, 0],
  [7, 0, 2, 1, 0, 0, 9, 6, 0],
  [2, 0, 0, 0, 0, 0, 0, 9, 0],
  [0, 6, 0, 0, 0, 0, 0, 7, 0],
  [0, 7, 0, 0, 0, 6, 0, 0, 5],
  [0, 2, 7, 0, 0, 8, 4, 0, 6],
  [0, 3, 0, 0, 0, 0, 5, 0, 0],
  [5, 0, 0, 0, 6, 2, 0, 0, 8]

  [0, 2, 0, 0, 0, 0, 9, 0, 0],
  [0, 0, 4, 3, 0, 0, 0, 0, 7],
  [0, 0, 9, 0, 4, 0, 0, 8, 0],
  [0, 4, 0, 0, 0, 0, 7, 0, 0],
  [8, 0, 0, 7, 3, 2, 0, 0, 5],
  [0, 0, 7, 0, 0, 0, 0, 6, 0],
  [0, 7, 0, 0, 1, 0, 6, 0, 0],
  [9, 0, 0, 0, 0, 6, 1, 0, 0],
  [0, 0, 5, 0, 0, 0, 0, 4, 0]

  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0]

  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [0, 9, 0, 0, 0, 4, 0, 0, 0],
  [4, 0, 0, 0, 0, 0, 0, 6, 1],
  [0, 6, 0, 3, 2, 0, 0, 0, 4],
  [0, 0, 0, 0, 8, 0, 0, 0, 0],
  [7, 0, 0, 0, 4, 9, 0, 2, 0],
  [3, 5, 0, 0, 0, 0, 0, 0, 9],
  [0, 0, 0, 2, 0, 0, 0, 4, 0],
  [0, 0, 0, 0, 3, 0, 0, 1, 6]
*/

const Container = styled.div`
  display: flex;
  flex: 1 0 auto;
  flex-direction: column;
  justify-content: center;
  background-color: #ecf0f1;
  height: 100%;
  overflow: hidden;
`;

const StyledHeader = styled(Header)`
  justify-content: left;
  padding-left: 25px;
  background-color: #444444;
`;


function App() {
  const initialBoard = [
    [8, 0, 0, 9, 3, 0, 0, 0, 2],
    [0, 0, 9, 0, 0, 0, 0, 4, 0],
    [7, 0, 2, 1, 0, 0, 9, 6, 0],
    [2, 0, 0, 0, 0, 0, 0, 9, 0],
    [0, 6, 0, 0, 0, 0, 0, 7, 0],
    [0, 7, 0, 0, 0, 6, 0, 0, 5],
    [0, 2, 7, 0, 0, 8, 4, 0, 6],
    [0, 3, 0, 0, 0, 0, 5, 0, 0],
    [5, 0, 0, 0, 6, 2, 0, 0, 8]
  ];
  const sodokuPlayer = new SodokuPlayer();
  const error = sodokuPlayer.initializeBoard(initialBoard);

  return (
    <Container>
      <StyledHeader>
        <h1> SodokuSolver </h1>
      </StyledHeader>
      <Content>
        <SodokuViewer initialBoard={initialBoard} error={error} sodokuPlayer={sodokuPlayer}/>
      </Content>
    </Container>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
