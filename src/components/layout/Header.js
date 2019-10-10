import React from "react";
import styled from "styled-components";
import SideBarAction from "../SidebarAction";
import DehazeIcon from '@material-ui/icons/Dehaze';

/* Styles */
const Container = styled.div`
  color: #090B26;
  display: flex;
  height: ${({compact}) => compact ? "10%" : "36px"};
  flex: 0 0 auto;
  align-content: center;
  ${({compact}) => compact && "justify-content: center;"};
  background-color: #F2F4F3;
  padding: 12px;
  box-shadow: 0px 0px 4px 0px rgba(9,11,38,1);
`;

const StyledSideBarAction = styled(SideBarAction)`
  padding: 30px;
  height: 100px;
  flex: 0;
`;
const StyledDehazeIcon = styled(DehazeIcon)`
  && {
    height: 100px;
    width: 100px;
  }
`;

/* Component */
const Header = ({
   children,
   compact,
   menuContent,
   onCompactMenuOpen,
   ...rest
}) => {
  return (
    <Container compact={compact} {...rest}>
      {compact ?
        <StyledSideBarAction icon={<StyledDehazeIcon/>} onClick={() => onCompactMenuOpen(true)} compact={compact}/>
        : children
      }
    </Container>
  );
};

export default Header;
