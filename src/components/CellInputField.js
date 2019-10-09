import React from "react";
import styled from "styled-components"

/* Styles */
const StyledInput = styled(({
    name,
    disabled,
    ...rest
}) => (
    <input size={1} max={9} min={1} type="number" {...rest} disabled={disabled}/>
))`
    background-color: transparent;
    color: white;
    border: none;
    box-shadow: none;
    outline: none;
    width: 15px;
    margin: auto;
    -moz-appearance:textfield;

    ::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`;

/* Component */
const CellInputField = ({
    value,
    onChange,
    disabled,
    ...rest
}) => {
    const handleChange = (event) => {
        let {
            target
        } = event;
        if(target.value === 0) {
            target.value = "";
        } else if(target.value.length > 1) {
            target.value = target.value.substr(0,1);
        }
        if(onChange) {
            onChange(target.value);
        }
    };

    const handleKeyDown = (event) => {
        if (event.which === 37 || event.which === 38 || event.which === 39 || event.which === 40) {
            event.preventDefault();
        }
        event.target.select();
    };
    
    const handleKeyUp = (event) => {
        event.target.select();
    };

    return (
        <StyledInput
            defaultValue={value}
            disabled={disabled}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            onChange={handleChange}
            {...rest}
        />
    );
}

export default CellInputField;