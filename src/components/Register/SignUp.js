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
import { useHistory } from "react-router-dom";
import "./SignUp.css"; //For change swal (special alert) style.
import swal from "sweetalert"; //special alert


//The style for Sign Up page.
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

//Var used for authentication procces and next page.
var history;
var username, password, phone_number, given_name, family_name, birthdate;

//Authentication function for sign up page with several err messege for spesific issues.
async function signUp() {
  try {
    const { user } = await Auth.signUp({
      username,
      password,
      attributes: {
        phone_number, // optional - E.164 number convention
        birthdate,
        given_name,
        family_name,
        // other custom attributes
      },
    });
    swal("", "קוד לאישור הרשמה נשלח אל כתובת הדוא\"ל שלך", "success", {
      button: "אישור",
    });
    window.$mail = username;
    history.push("/ConfirmSignUp");
  } catch (error) {
    if (/[^א-תa-zA-Z]/.test(given_name) || /[^א-תa-zA-Z]/.test(family_name)) {
      swal("", "שם פרטי/משפחה לא תקין", "error", {
        button: "אישור",
      });
    } else if (
      phone_number[4] != "0" ||
      isNaN(phone_number.substring(1)) ||
      phone_number.length !== 14
    ) {
      swal("", "מספר טלפון לא תקין", "error", {
        button: "אישור",
      });
    } else if (
      birthdate.toString() == "1900-01-01" ||
      parseInt(birthdate.toString().split("-")[0]) <= 1901
    ) {
      swal("", "תאריך לידה לא תקין", "error", {
        button: "אישור",
      });
    } else if (password.length < 8) {
      swal("", "סיסמה קצרה מדי, יש להכנס סיסמה באורך 8 תווים לפחות", "error", {
        button: "אישור",
      });
    } else if (error.name == "UsernameExistsException") {
      swal("", "דוא\"ל זה כבר קיים במערכת", "error", {
        button: "אישור",
      });
    } else {
      swal("", "יש לוודא שהפרטים נכונים", "error", {
        button: "אישור",
      });
    }
  }
}

//The SignUp component.
export default function SignUp() {
  const classes = useStyles();
  history = useHistory();

  //Get values from user and run the authentication function.
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

  //HTML code with styling for spesific tags.
  return (
    <Container component="main" maxWidth="xs" id="allForm">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar style={{
          background: "#132c33",
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
          הרשמה
        </Typography>
        <form className={classes.form} onSubmit={signClick} validate>
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
                name="birthdate"
                variant="outlined"
                required
                fullWidth
                type="date"
                id="birthdate"
                label="תאריך לידה"
                defaultValue="1900-01-01"
                style={{
                  color: "#132c33"
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
                label="כתובת מייל"
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
          </Grid>
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
            הרשמה
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link
                href="/register"
                variant="body2"
                style={{
                  color: "#132c33",
                }}
              >
                כבר יש לך חשבון? לחץ להתחברות
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <br></br>
    </Container>
  );
}
