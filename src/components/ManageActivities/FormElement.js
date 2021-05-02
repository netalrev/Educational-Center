
import { TextField } from "@material-ui/core";
import React, { Component } from "react";
import "./FormElement.css"

function createDateInputs(event) {
    console.log('Horray! Someone wrote "' + event.target.value + '"!');
}

class FormElement extends Component {
    render() {
        return (
            <tr dir="rtl">
                <TextField required name={this.props.name} id="standard-basic" label={this.props.title} type={this.props.type} defaultValue={this.props.defaultValue}
                    onChange={this.props.onChange} />
            </tr>
        );
    }
}
export default FormElement;