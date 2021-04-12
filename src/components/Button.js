import React from "react";
import "./Button.css";
import SignUp from "./Register/SignUp";

import { useHistory } from "react-router-dom";
const STYLES = ["btn--primary", "btn--outline"];
const SIZES = ["btn--medium", "btn--large"];

export const Button = ({
  children,
  type,
  onClick,
  buttonStyle,
  buttonSize,
}) => {
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];
  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

  const history = useHistory();

  const routeChange = () => {
    let path = `register`;
    history.push(path);
  };

  return (
    <button
      className={`btn ${checkButtonStyle} ${checkButtonSize}`}
      onClick={routeChange}
      type={type}
    >
      {children}
    </button>
  );
};
