import { TextField } from "@material-ui/core";
import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";

import "./FormElement.css";
const useStyles = makeStyles((theme) => ({
  textField: {
    zIndex: "0",
    border: "3px solid #132c33",
    borderRadius: "10px",
    minWidth: "450px",
    textAlign: "center",

    "& label.Mui-focused": {
      padding: "10px",
      color: "#132c33",
    },
    "& input": {
      color: "#132c33",
    },
    "& label": {
      padding: "10px",
      color: "#132c33",
    },
    "& .MuiInput-underline:before": {
      borderBottomColor: "#132c33",
      display: "none",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#132c33",
      display: "none",
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        display: "none",
      },
    },
  },
}));

export default function FormElement(props) {
  const classes = useStyles();
  return (
    <tr dir="rtl">
      <TextField
        required
        name={props.name}
        id="standard-basic"
        label={props.title}
        type={props.type}
        defaultValue={props.defaultValue}
        onChange={props.onChange}
        className={classes.textField}
      />
    </tr>
  );
}
