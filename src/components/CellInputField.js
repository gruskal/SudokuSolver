import React from "react";
import styled from "styled-components"

const StyledInput = styled(({
    name,
    ...rest
}) => (
    <input size={1} max={9} min={0} type="number" {...rest} />
))`
    width: 15px;
    -moz-appearance:textfield;

    ::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`;

const CellInputField = ({
    value,
    onChange
}) => {
    const handleChange = (event, v) => {
        let {
            target
        } = event;
        if(target.value.length > 1) {
            target.value = target.value.substr(0,1);
        }
        if(onChange) {
            onChange(target.value);
        }
    };
    const handleFocus = ({
        target
    }) => {
        target.value = "";
    };
    const handleBlur= ({
        target
    }) => {
        if(target.value === "") {
            target.value = 0;
            if(onChange) {
                onChange(target.value);
            }
        }
    };

    return (
        <StyledInput
            defaultValue={value}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
        />
    );
}

export default CellInputField;