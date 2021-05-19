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
            color: "black",
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

var username, code, new_password;
async function forgetPassword() {
    try {
        // Send confirmation code to user's email
        Auth.forgotPasswordSubmit(username, code, new_password)
            .then(data => console.log(data))
            .catch(err => console.log(err));
        history.push("/register");
        return;
    } catch (error) {
        alert('error confirming sign up', error);
    }
}
export default function ForgetPassword(props) {
    const classes = useStyles();
    const mail = window.$mail;
    history = useHistory();
    function sendCode(e) {
        username = document.getElementById("email").value;
        Auth.forgotPassword(username)
            .then(data => alert(data))
            .catch(err => alert(err));
        e.preventDefault();
    }
    function resendConfirmationCode(e) {
        code = document.getElementById("code").value;
        new_password = document.getElementById("new_password").value;
        forgetPassword();
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
                        variant="outlined"
                        required
                        fullWidth
                        id="email"
                        label="כתובת אימייל"
                        name="email"
                        style={{
                            backgroundColor: "black",
                            color: "black",
                        }}
                        autoComplete="email"
                    />
                    <Button
                        style={{
                            backgroundColor: "red",
                            padding: "18px 18px",
                            fontSize: "18px",
                            color: "#ffffff",
                            marginTop: "20px",
                        }}
                        onClick={sendCode}
                        fullWidth
                        variant="contained"
                        className={classes.submit}
                    >
                        שלח קוד אימות
          </Button>
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
                    <TextField
                        className={classes.textField}
                        autoComplete="code"
                        name="code"
                        variant="outlined"
                        type="password"
                        required
                        fullWidth
                        id="new_password"
                        label="סיסמה חדשה"
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
                        onClick={resendConfirmationCode}
                        fullWidth
                        variant="contained"
                        className={classes.submit}
                    >
                        אישור
          </Button>
                </form>

            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}