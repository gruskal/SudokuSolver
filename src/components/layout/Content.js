import * as React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex: 10 0 auto;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  background-color: #83878C;
`;

const Content = ({
   children 
}) => (
  <Container>{children}</Container>
);

export default Content;
