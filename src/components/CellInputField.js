import React from "react";
import styled from "styled-components"

const StyledInput = styled(({
    name,
    ...rest
}) => (
    <input size={1} max={9} min={0} type="number" {...rest} />
))`
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const CellInputField = ({
    value,
    onChange
}) => {
    const handleChange = (event) => {
        let {
            target,
            nativeEvent: {
                data
            }
        } = event;
        if(!data) {
            data = 0;
        }
        target.value = data;
        if(onChange) {
            onChange(data);
        }
    };

    const handleClick = ({
        target
    }) => {
        target.select();
    };

    return (
        <StyledInput
            defaultValue={value}
            onFocus={handleClick}
            onChange={handleChange}
        />
    );
}

export default CellInputField;