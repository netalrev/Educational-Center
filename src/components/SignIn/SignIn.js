import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Auth } from "aws-amplify";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import swal from "sweetalert"; //special alert


//The style for Sign In page.
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

//Vars used for authentication procces and next page.
var username, password;
var history;

//Authentication function for Sign In with several err messege for spesific issues.
async function signIn() {
  try {
    history.push("/loading");//Next page is loading
    const user = await Auth.signIn(username, password);//Try to signin.
    history.push("/register");//Next page is register or sign in page.
    document.getElementById("allForm").style.display = "none";
    window.location.reload();
  } catch (error) {
    history.push("/register");
    if (username == "" || username == null) {
      swal(" ", "יש להזין דוא\"ל", "error", {
        button: "אישור",
      });
    } else if (password == "" || password == null) {
      swal(" ", "יש להזין סיסמה", "error", {
        button: "אישור",
      });
    } else if (password.length < 8) {
      swal(" ", "סיסמה קצרה מדי, יש להזין 8 תווים לפחות", "error", {
        button: "אישור",
      });
    } else if (error.name == "UserNotFoundException") {
      swal(" ", "דוא\"ל זה אינו רשום במערכת, יש להרשם או לפנות למנהלי האתר", "error", {
        button: "אישור",
      });
    } else
      swal(" ", "אחד מהפרטים אינם נכונים", "error", {
        button: "אישור",
      });
  }
}

//The SignIn component.
export default function SignIn() {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  history = useHistory();

  //Get values from user and run the authentication function.
  function doSomething(e) {
    username = document.getElementById("email").value;
    password = document.getElementById("password").value;
    signIn();
    e.preventDefault();
  }

  //HTML code with styling for spesific tags.
  return (
    <Container component="main" maxWidth="xs" id="allForm">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar style={{
          color: "#ffffff",
        }} className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" style={{
          color: "#132c33",
        }}>
          ברוכים הבאים למרחב החינוכי השלם
        </Typography>
        <form className={classes.form} onSubmit={doSomething} noValidate>
          <TextField
            className={classes.textField}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="כתובת מייל"
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
            התחברות
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
                שכחתי סיסמה
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
                {"אין לי חשבון, להרשמה"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
