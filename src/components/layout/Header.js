import * as React from "react";
import styled from "styled-components";

/* Styles */
const Container = styled.div`
  color: #EDEDED;
  display: flex;
  flex: 0 0 auto;
  justify-content: center;
  align-content: center;
  background-color: #20B29A;
  padding: 12px;
`;

/* Component */
const Header = ({
   children,
   ...rest
}) => (
  <Container {...rest}>
    {children}
  </Container>
);

export default Header;
