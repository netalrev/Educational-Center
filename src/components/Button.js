/*Costum Button*/

import "./Button.css";

const STYLES = ["btn--primary", "btn--outline"]; //For select style.
const SIZES = ["btn--medium", "btn--large"]; //For select size.

export const Button = ({
  children,
  type,
  buttonStyle,
  buttonSize,
}) => {
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];
  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];
  return (
    <button
      className={`btn ${checkButtonStyle} ${checkButtonSize}`}
      onClick={(e) => {
        e.preventDefault();
        window.location.href = "/register"; //Url to Reginster or SignUp pages.
      }}
      type={type}
    >
      {children}
    </button>
  );
};
