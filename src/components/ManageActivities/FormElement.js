import { TextField } from "@material-ui/core";
import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";

import "./FormElement.css";

class FormElement extends Component {
  render() {
    return (
      <tr dir="rtl">
        <TextField
          required
          name={this.props.name}
          id="standard-basic"
          label={this.props.title}
          type={this.props.type}
          defaultValue={this.props.defaultValue}
          onChange={this.props.onChange}
          style={{
            backgroundColor: "red",
            borderRadius: "18px",
            paddingLeft: "10px",
            paddingRight: "10px",
          }}
          InputLabelProps={{
            style: { color: "#fff", right: "0px", marginLeft: "35px" },
          }}
          InputProps={{
            style: { color: "#fff" },
          }}
        />
      </tr>
    );
  }
}
export default FormElement;
