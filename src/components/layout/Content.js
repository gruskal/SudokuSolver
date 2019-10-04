import * as React from "react";
import styled from "styled-components";

/* Styles */
const Container = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  background-color: #83878C;
`;

/* Component */
const Content = ({
   children 
}) => (
  <Container>{children}</Container>
);

export default Content;
