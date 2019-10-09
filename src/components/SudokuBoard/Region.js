import * as React from "react";
import styled from "styled-components";
import Cell from "./Cell"

const CONSTANTS = {
    rowLength: 3
}

/* Styles */
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 150px;
  height: 150px;
  border: 2px solid red;
`;

/* Component */
const Region = ({
  children
}) => {
    return (
        <Container>
            {children}
        </Container>
    );
};

Region.CONSTANTS = CONSTANTS;
export default Region;
