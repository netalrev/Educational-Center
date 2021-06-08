import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Auth } from "aws-amplify";
import { useHistory } from "react-router-dom";
import swal from "sweetalert"; //special alert


//The style for Confirm Sign Up page.
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

//Var used for authentication procces and next page.
var history;
var username, code;

//Authentication function for confirm register page with err messege for spesific issue.
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

//This function resend to user code for confirm register. for first send problem issues.
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

//The ConfirmSignUp component.
export default function ConfirmSignUp(props) {
  const classes = useStyles();
  const mail = window.$mail;
  history = useHistory();

  //Get values from user and run the authentication function.
  function confirmClick(e) {
    username = mail;
    code = document.getElementById("code").value;
    confirmSignUp();
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
        <Typography
          component="h1"
          variant="h5"
          style={{
            color: "#132c33",
          }}
        >
          יש להזין את קוד האישור שקיבלת במייל
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
      <br></br>
    </Container>
  );
}
