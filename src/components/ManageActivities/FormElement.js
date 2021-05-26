import { TextField } from "@material-ui/core";
import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";

import "./FormElement.css";
const useStyles = makeStyles((theme) => ({
  textField: {
    zIndex: "0",
    border: "3px solid red",
    borderRadius: "9px",
    textAlign: "center",
    minWidth: "450px",

    "& label.Mui-focused": {
      padding: "10px",
      color: "white",
    },
    "& input": {
      color: "white",
    },
    "& label": {
      padding: "10px",
      color: "white",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "red",
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "black",
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
