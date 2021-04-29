import { TextField } from "@material-ui/core";
import React, { Component } from "react";
import "./FormElement.css"

class FormElement extends Component {
    render() {
        return (
            <tr>
                <TextField id="standard-basic" label={this.props.title} type={this.props.type}  defaultValue={this.props.defaultValue} 
                change={this.props.change}/>
            </tr>
        );
    }
}
export default FormElement;
