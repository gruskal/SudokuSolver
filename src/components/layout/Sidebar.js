import * as React from "react";
import styled from "styled-components";

/* Styles */
const Container = styled.div`
  color: #090B26;
  display: flex;
  flex-direction: column;
  width: 96px;
  flex: 0 0 auto;
  align-content: center;
  background-color: #F2F4F3;
  padding: 12px;
  box-shadow: 0px 4px 3px 0px rgba(9,11,38,1);
`;

/* Component */
const Sidebar = ({
   children,
   ...rest
}) => (
  <Container {...rest}>
    {children}
  </Container>
);

export default Sidebar;
