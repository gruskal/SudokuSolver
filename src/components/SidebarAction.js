import React from "react";
import styled from "styled-components"

/* Styles */
const TextWrapper = styled.div`
    text-align: center;
    margin: auto;
    user-select: none;
    font-size: ${({compact}) => compact ? "2em" : "0.8em"};
`;

const IconWrapper = styled.div`
    padding-right: 4px;
`;

const Container = styled.div`
    cursor: pointer;
    width: 100%;
    height: 30px;
    display: flex;
    flex: ${({compact}) => compact ? "1" : "0"} 0 auto;
    ${({compact, icon}) => compact && !icon && "box-shadow: 0px 2px 3px 2px rgba(9,11,38,1);"}
    padding: 25px 0;
    color: #66718A;
    -webkit-transition: background .1s ease-in;
    -o-transition: background .1s ease-in;
    transition: background .1s ease-in;

    &:hover {
        background: #FBFDFF;
        -webkit-box-shadow: inset 0 0 0 0.5px #D8DCE4;
        box-shadow: inset 0 0 0 0.5px #D8DCE4;
    }
`;

/* Component */
const SidebarAction = ({
    text,
    onClick,
    compact,
    icon,
    ...rest
}) => (
    <Container onClick={onClick} {...rest} compact={compact} icon={icon}>
        {icon &&
            <IconWrapper> {icon} </IconWrapper>
        }
        <TextWrapper compact={compact}> {text} </TextWrapper>
    </Container>
);

export default SidebarAction;