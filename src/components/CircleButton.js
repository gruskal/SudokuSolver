import React from "react";
import styled from "styled-components"

const TextWrapper = styled.div`
    text-align: center;
    margin: auto;
    user-select: none;
`;

const Indicator = styled.div`
    display: flex;
    color: #2D2D2D;
    background-color: #D8A200;
    width: 75px;
    height: 75px;
    margin: auto 37px auto 37px;
    border-radius: 50%;
    cursor: pointer;
    animation-timing-function: ease-out;
  
    &:hover {
        animation: grow 0.2s;
        transform: scale(1.5);
    }
    @keyframes grow {
    0% {
        transform: scale(1);  
    }
    100% {
        transform: scale(1.5);
    }
    }
`;

const CircleButton = ({
    text,
    onClick,
    ...rest
}) => (
    <Indicator onClick={onClick} {...rest}>
        <TextWrapper> {text} </TextWrapper>
    </Indicator>
);

export default CircleButton;