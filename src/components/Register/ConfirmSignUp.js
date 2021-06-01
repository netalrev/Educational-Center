import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Auth } from "aws-amplify";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";


var history;
function Copyright() {
  return (
    <Typography
      variant="body2"
      align="center"
      style={{
        color: "#132c33",
        padding: "20px",
      }}
    >
      {"Copyright © "}
      <Link
        style={{
          color: "#132c33",
        }}
        href="#"
      >
        המרחב החינוכי השלם
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#132c33",
  },
  Button: {},
  textField: {
    zIndex: "0",
    border: "3px solid #132c33",
    borderRadius: "10px",

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
    "& .MuiInput-underline:after": {
      borderBottomColor: "#132c33",
      display: "none",
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        display: "none",
      },
    },
    "& label span": {
      //For remove Asterisk from required inputs.
      display: "none",
    },
  },
}));

var username, code;
async function confirmSignUp() {
  try {
    await Auth.confirmSignUp(username, code);
    history.push("/register");
    return;
  } catch (error) {
    swal("", "הקוד שהוזן אינו תקין", "error", {
      button: "אישור",
    });
  }
}
async function resendConfirmationCode() {
  const mail = window.$mail;
  try {
    await Auth.resendSignUp(window.$mail);
    swal("", mail + ' - קוד נשלח לכתובת המייל ', "success", {
      button: "אישור",
    });
  } catch (err) {
    console.log("error resending code: ", err);
  }
}

export default function ConfirmSignUp(props) {
  const classes = useStyles();
  const mail = window.$mail;
  history = useHistory();

  function confirmClick(e) {
    username = mail;
    code = document.getElementById("code").value;
    confirmSignUp();
    e.preventDefault();
  }
  return (
    <Container component="main" maxWidth="xs" id="allForm">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar style={{
          color: "#132c33",
        }} className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography
          component="h1"
          variant="h5"
          style={{
            color: "#132c33",
          }}
        >
          אנא הזן את קוד האישור שקיבלת במייל
        </Typography>
        <form className={classes.form} validate>
          <TextField
            className={classes.textField}
            autoComplete="code"
            name="code"
            variant="outlined"
            required
            fullWidth
            id="code"
            label="קוד אישור"
            style={{
              marginTop: "20px",
            }}
            autoFocus
          />
          <Button
            style={{
              backgroundColor: "#132c33",
              padding: "10px 10px",
              fontSize: "10px",
              border: "3px solid #132c33",
              borderRadius: "10px",
              color: "#ffffff",
              marginTop: "20px",
            }}
            type="submit"
            onClick={confirmClick}
            fullWidth
            variant="contained"
            className={classes.submit}
          >
            אישור
          </Button>
        </form>
        <Link
          onClick={resendConfirmationCode}
          style={{
            padding: "10px",
            color: "#132c33",
            cursor: "pointer",
            borderRadius: "10px",
          }}
        >
          לא קיבלתי קוד, שלח מחדש
        </Link>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
