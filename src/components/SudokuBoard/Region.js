import * as React from "react";
import styled from "styled-components";

const CONSTANTS = {
    rowLength: 3
}

/* Styles */
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-basis: 33.3333%
  border: 2px solid #4B4B4A;
  box-sizing: border-box;
  max-height: ${({maxRegionHeight}) => maxRegionHeight};
`;

/* Component */
const Region = ({
    maxRegionHeight,
    children
}) => {
    return (
        <Container maxRegionHeight={maxRegionHeight}>
            {children}
        </Container>
    );
};

Region.CONSTANTS = CONSTANTS;
export default Region;
