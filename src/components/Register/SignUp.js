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
import { a, Auth } from 'aws-amplify';
import { useHistory } from "react-router-dom";
import ConfirmSignUp from "./ConfirmSignUp";
import { red } from "@material-ui/core/colors";
import "./SignUp.css";

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
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(1, 1, 1, -1),
    width: "95%",
  },
  textField: {
    zIndex: "0",
    border: "3px solid red",
    borderRadius: "9px",


    "& label.Mui-focused": {
      color: "red",

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

var username, password, phone_number, given_name, family_name, birthdate;
async function signUp() {
  try {

    if (/[^א-תa-zA-Z]/.test(given_name) || /[^א-תa-zA-Z]/.test(family_name)) {
      alert("שם פרטי/משפחה לא חוקי");
      throw Error;
    }
    else if (phone_number[4] != '0' || isNaN(phone_number.substring(1)) || phone_number.length !== 14) {
      alert("מספר פלאפון לא חוקי");
      throw Error;
    }
    else if (birthdate.toString() == "1900-01-01" || parseInt(birthdate.toString().split("-")[0]) <= 1901) {
      alert("תאריך לידה לא חוקי");
      throw Error;
    }
    else if (password.length < 8) {
      alert("אנא הכנס סיסמה באורך לפחות 8 תווים");
      throw Error;
    }
    const { user } = await Auth.signUp({
      username,
      password,
      attributes: {
        phone_number,   // optional - E.164 number convention
        birthdate,
        given_name,
        family_name,
        // other custom attributes 
      }
    });
    alert("קוד לאישור הרשמה נשלח אל כתובת המייל שלך");
    window.$mail = username;
    history.push("/ConfirmSignUp"/* , {state: username}*/);
    //window.location.reload();


  } catch (error) {
    console.log('שגיאת הרשמה', error);
  }
}

export default function SignUp() {
  const classes = useStyles();
  history = useHistory();

  function signClick(e) {
    username = document.getElementById("email").value;
    password = document.getElementById("password").value;
    phone_number = "+972" + document.getElementById("tel").value;
    birthdate = document.getElementById("birthdate").value;
    given_name = document.getElementById("given_name").value;
    family_name = document.getElementById("family_name").value;

    signUp();
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
          הרשמה
        </Typography>
        <form className={classes.form} onSubmit={signClick} validate  >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                className={classes.textField}
                variant="outlined"
                required
                fullWidth
                id="family_name"
                label="שם משפחה"
                name="family_name"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                className={classes.textField}
                autoComplete="fname"
                name="given_name"
                variant="outlined"
                required
                fullWidth
                id="given_name"
                label="שם פרטי"
                autoFocus
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                className={classes.textField}
                //autoComplete="bdate"
                name="birthdate"
                variant="outlined"
                required
                fullWidth
                type="date"
                id="birthdate"
                label="תאריך לידה"
                defaultValue="1900-01-01"
                style={
                  {
                    color: "red",
                  }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                className={classes.textField}
                variant="outlined"
                required
                fullWidth
                id="tel"
                label="טלפון"
                name="tel"
                autoComplete="tel"
                type="tel"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={classes.textField}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="כתובת אימייל"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={classes.textField}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="סיסמה"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                style={{
                  color: "#ffffff",
                }}
                control={
                  <Checkbox
                    value="allowExtraEmails"
                    style={{
                      color: "#ffffff",
                    }}
                  />
                }
                label="אני מאשר את תנאי השימוש"
              />
            </Grid>
          </Grid>
          <Button
            style={{
              backgroundColor: "red",
              padding: "18px 18px",
              fontSize: "18px",
              color: "#ffffff",
            }}
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
          >
            הרשמה
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link
                href="/register"
                variant="body2"
                style={{
                  color: "#ffffff",
                }}
              >
                כבר יש לך חשבון? לחץ להתחברות
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
