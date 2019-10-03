import React from "react";
import styled from "styled-components"

const TextWrapper = styled.div`
    text-align: center;
    margin: auto;
`;

const Indicator = styled.div`
    display: flex;
    background-color: #FFBF00;
    color: #2D2D2D;
    width: 75px;
    height: 75px;
    margin: auto auto 30px auto;
    border-radius: 50%;
    cursor: pointer;
    ${({stage}) => {
        if(stage === "adjust") {
            return "visibility: hidden; animation: shrink 0.1s;";
        }
        return `animation: pulse 2s infinite;
        &:hover {
            animation: grow 0.2s;
            transform: scale(1.5);
          }
        `;
    }}
    animation-timing-function: ease-out;
  
  @keyframes grow {
    0% {
        transform: scale(1);  
    }
    100% {
        transform: scale(1.5);
    }
  }

  @keyframes shrink {
    0% {
        visibility: visible;
        transform: scale(1);  
    }
    100% {
        visibility: hidden;
        transform: scale(0);
    }
  }

  @keyframes pulse {
    0% {
        transform: translateY(0px);       
    }
    35% {
        box-shadow: 0 0 0 0px rgba(255,241,105, 0);
        transform: translateY(-5px);
    }
    45% {
        transform: translateY(-10px) scale(1.1);
    }
    70% {
        box-shadow: 0 0 0 15px rgba(255,241,105, 0.2);
        transform: translateY(-10px) scale(1.0);
    }
    80% {
        box-shadow: 0 0 0 0 rgba(255,241,105, 0.1);
        transform: translateY(-10px) scale(1.0);
    }
  }
`;

const Buoy = ({text, onClick}) => (
    <Indicator onClick={onClick}>
        <TextWrapper> {text} </TextWrapper>
    </Indicator>
);

export default Buoy;