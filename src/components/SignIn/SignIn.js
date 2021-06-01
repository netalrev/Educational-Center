import React from "react";
import { Hub, Logger } from "aws-amplify";
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
import Loading from "../Loading/Loading";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";

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
    display: "flex",
    paddingTop: "30px",
    flexDirection: "column",
    alignItems: "center",
    color: "white",
  },
  load: {
    backgroundColor: "pink",
    display: "hide",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#132c33",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    color: "white",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: "white",
  },
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

var username, password;
var history;
async function signIn() {
  try {
    history.push("/loading");
    const user = await Auth.signIn(username, password);
    history.push("/register");
    document.getElementById("allForm").style.display = "none";
    window.location.reload();
  } catch (error) {
    history.push("/register");
    if (username == "" || username == null) {
      swal(" ", "אנא מלא אימייל", "error", {
        button: "אישור",
      });
    } else if (password == "" || password == null) {
      swal(" ", "אנא מלא סיסמה", "error", {
        button: "אישור",
      });
    } else if (password.length < 8) {
      swal(" ", "סיסמה קצרה מ-8 תווים", "error", {
        button: "אישור",
      });
    } else if (error.name == "UserNotFoundException") {
      swal(" ", "אימייל זה אינו רשום לאתר", "error", {
        button: "אישור",
      });
    } else
      swal(" ", "סיסמה/אימייל אינם נכונים", "error", {
        button: "אישור",
      });
    console.log("שגיאת התחברות", error);
  }
}
export default function SignIn() {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  history = useHistory();

  function doSomething(e) {
    console.log("Loggin in....");
    username = document.getElementById("email").value;
    password = document.getElementById("password").value;
    signIn();
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
        <Typography component="h1" variant="h5" style={{
          color: "#132c33",
        }}>
          כניסה
        </Typography>
        <form className={classes.form} onSubmit={doSomething} noValidate>
          <TextField
            className={classes.textField}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="כתובת אימייל"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            className={classes.textField}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="סיסמה"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            style={{
              backgroundColor: "#132c33",
              padding: "10px 10px",
              fontSize: "10px",
              color: "#ffffff",
              border: "3px solid #132c33",
              borderRadius: "10px",
            }}
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
          >
            התחבר
          </Button>
          <Grid container>
            <Grid item xs>
              <Link
                href="/ForgetPassword"
                variant="body2"
                style={{
                  color: "#132c33",
                }}
              >
                שכחתי את הסיסמה
              </Link>
            </Grid>
            <Grid item>
              <Link
                href="/SignUp"
                variant="body2"
                style={{
                  color: "#132c33",
                }}
              >
                {"לא רשום? לחץ כאן להרשמה"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
