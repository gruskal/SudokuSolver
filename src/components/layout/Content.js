import * as React from "react";
import styled from "styled-components";

/* Styles */
const Container = styled.div`
  display: flex;
  flex: 1 1 auto;
  align-content: center;
  justify-content: center;
`;

/* Component */
const Content = ({
   children 
}) => (
  <Container>{children}</Container>
);

export default Content;
