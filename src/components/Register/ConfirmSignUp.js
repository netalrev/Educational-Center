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
import { Auth } from 'aws-amplify';
import { useHistory } from "react-router-dom";
var history;
function Copyright() {
  return (
    <Typography
      variant="body2"
      align="center"
      style={{
        color: "#ffffff",
        padding: "20px",
      }}
    >
      {"Copyright © "}
      <Link
        style={{
          color: "#ffffff",
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
    backgroundColor: "red",
  },
  Button: {

  },
  textField: {
    zIndex: "0",
    border: "3px solid red",
    borderRadius: "9px",

    "& label.Mui-focused": {
      color: "white",
    },
    "& input": {
      color: "white",
    },

    "& label": {
      color: "white",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "red",
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "white",
      },
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
    alert('error confirming sign up', error);
  }
}
async function resendConfirmationCode() {
  try {
    await Auth.resendSignUp(window.$mail);
    console.log('code resent successfully');
  } catch (err) {
    console.log('error resending code: ', err);
  }
}

export default function ConfirmSignUp(props) {
  const classes = useStyles();
  const mail = window.$mail;
  history = useHistory();

  function confirmClick(e) {
    username = mail;
    alert(mail);
    code = document.getElementById("code").value;
    confirmSignUp();
    e.preventDefault();

  }
  return (
    <Container component="main" maxWidth="xs" id="allForm">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography
          component="h1"
          variant="h5"
          style={{
            color: "#ffffff",
          }}
        >
          אנא הזן את קוד האישור שקיבלת במייל
        </Typography>
        <form className={classes.form} validate  >

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
              backgroundColor: "red",
              padding: "18px 18px",
              fontSize: "18px",
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
        <button
          onClick={resendConfirmationCode}
          style={{
            color: "#ffffff",
          }}
        >
          לא קיבלתי קוד, שלח מחדש
              </button>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}