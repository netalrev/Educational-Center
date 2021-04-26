import { TextField } from "@material-ui/core";
import React, { Component } from "react";
import "./FormElement.css"

class FormElement extends Component {
    render() {
        return (
            <tr>
                <td className="tdsForm">
                    {/* <input className="formInputs" type={this.props.type} name={this.props.title} /> */}
                    <TextField id="standard-basic" label="Standard" />
                </td>
                <td>
                    <h3>{this.props.title}</h3>
                </td>
            </tr>
        );
    }
}
export default FormElement;
