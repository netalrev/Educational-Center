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

function Copyright() {
  return (
    <Typography
      variant="body2"
      align="center"
      style={{
        color: "#ffffff",
        padding: "30px",
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
    backgroundColor: "#2b2b2b",
    display: "flex",
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
    backgroundColor: "red",
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
    border: "3px solid red",
    borderRadius: "9px",
    color: "white",
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
      "& fieldset": {},
      "&.Mui-focused fieldset": {
        borderColor: "black",
      },
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
    alert("אנא וודא כי הפרטים נכונים");
    history.push("/register");
    console.log("error signing in", error);
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
    if (username === "" || username === null) {
      alert("אנא מלא אימייל");
      return;
    }
    if (password === "" || password === null) {
      alert("");
      return;
    }
    if (password.length < 8) {
      alert("סיסמא קצרה מדיי");
      return;
    }

    signIn();

    e.preventDefault();
  }

  return (
    <Container component="main" maxWidth="xs" id="allForm">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
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
          <FormControlLabel
            control={
              <Checkbox
                style={{
                  color: "#ffffff",
                }}
                value="remember"
                color="black"
              />
            }
            label="השאר אותי מחובר"
          />
          <Button
            style={{
              backgroundColor: "red",
              padding: "18px 36px",
              fontSize: "18px",
              color: "#ffffff",
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
                  color: "#ffffff",
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
                  color: "#ffffff",
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
