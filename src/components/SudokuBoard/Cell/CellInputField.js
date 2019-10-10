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
    font-size: ${window.outerWidth  > 600 ?  "1em" : "2em"};
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
            timeProp: props.time,
            valueProp: props.value,
            currentValue: props.value
        }
    }

    static getDerivedStateFromProps(props, state) {
        if(props.value !== state.valueProp) {
            return {
                valueProp: props.value,
                currentValue: props.value
            };
        }
        return null;
    }

    handleChange = (event) => {
        let {
            target
        } = event;
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
            time,
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
                time={time}
                {...rest}
            />
        );
    }
}

export default CellInputField;