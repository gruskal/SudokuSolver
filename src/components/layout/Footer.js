import * as React from "react";
import styled from "styled-components";

/* Styles */
const Container = styled.div`
  display: flex;
  flex: 1 0 auto;
  flex-direction: column;
  justify-content: center;
  background-color: #222222;
  padding: 8px;
`;

/* Component */
const Footer = ({
  children,
  ...rest
}) => (
  <Container {...rest}>
    {children}
  </Container>
);

export default Footer;
