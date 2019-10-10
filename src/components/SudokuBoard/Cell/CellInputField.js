import React, { useState, useEffect } from "react";
import styled from "styled-components"

/* Styles */
const Text = styled.div`
    font-size: 2em;
    margin: auto;
`;

const StyledInput = styled(({
    name,
    disabled,
    ...rest
}) => (
    <input size={1} max={9} min={1} type="number" {...rest} disabled={disabled}/>
))`
    background-color: transparent;
    font-size: 2em;
    border: none;
    box-shadow: none;
    outline: none;
    margin: auto;
    -moz-appearance:textfield;

    ::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`;

/* Component */
class CellInputField extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            disabledProp: props.disabled,
            valueProp: props.value,
            currentValue: props.value
        }
    }

    static getDerivedStateFromProps(props, state) {
        if(props.id === "c11") {
            debugger;
        }
        if(props.value !== state.valueProp) {
            return {
                valueProp: props.value,
                currentValue: props.value
            };
        }
        if(props.disabled === true) {
            return {
                valueProp: -1
            };
        }
        return null;
    }

    handleChange = (event) => {
        let {
            target
        } = event;
        debugger;
        let newValue = target.value;
        if(target.value.length > 1) { // Limit value to one character
            newValue = target.value.substr(0,1);
        } 
        this.setState({
            currentValue: newValue
        })
    };

    handleKeyDown = (event) => {
        event.target.select();
        /* If backspace, delete, or 1-9 is pressed */
        if(event.which === 8 || event.which === 46 || (event.which > 48 && event.which < 58)) { 
            return true;
        }
        event.preventDefault();
        return false;
    };

    handleKeyUp = (event) => {
        event.target.select();
    };

    render = () => {
        const {
            value,
            id,
            disabled,
            ...rest
        } = this.props;
        return (
            <StyledInput
                value={this.state.currentValue}
                disabled={disabled}
                onKeyDown={this.handleKeyDown}
                onKeyUp={this.handleKeyUp}
                onChange={this.handleChange}
                id={id}
                {...rest}
            />
        );
    }
}

export default CellInputField;