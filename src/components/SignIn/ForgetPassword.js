import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Auth } from 'aws-amplify';
import { useHistory } from "react-router-dom";
import swal from "sweetalert"; //special alert


//The style for Forget Password page.
const useStyles = makeStyles((theme) => ({
    paper: {
        display: "flex",
        paddingTop: "30px",
        flexDirection: "column",
        alignItems: "center",
        color: "white",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: "#132c33",
    },
    Button: {
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
var username, code, new_password;

//Authentication function for forget Password page with several err messege for spesific issues.
async function forgetPassword() {
    try {
        // Send confirmation code to user's email.
        await Auth.forgotPasswordSubmit(username, code, new_password);
        swal("", 'סיסמה שונתה בהצלחה ', "success", {
            button: "אישור",
        });
        history.push("/register");//The next page.
        return;
    } catch (error) {
        if (error.name == "CodeMismatchException") {
            swal("", 'קוד אימות שגוי', "error", {
                button: "אישור",
            });
        }
        else if (error.name == "InvalidParameterException") {
            swal("", "סיסמה קצרה מדי, יש להזין לפחות 8 תווים", "error", {
                button: "אישור",
            });
        }
        else
            swal("", ' יש לוודא שהפרטים נכונים ', "error", {
                button: "אישור",
            });
    }
}

//The ForgetPassword component.
export default function ForgetPassword(props) {
    const classes = useStyles();
    const mail = window.$mail;
    history = useHistory();

    //This function check if user email input are valid and send code for change password.
    function sendCode(e) {
        username = document.getElementById("email").value;
        Auth.forgotPassword(username)
            .then(data => swal("", username + ' - קוד נשלח לדוא\"ל ', "success", {
                button: "אישור",
            }))
            .catch(err => swal("", "דוא\"ל זה אינו רשום", "error", {
                button: "אישור",
            }));
        e.preventDefault();
    }

    //This function resend to user code for change password. for first send problem issues.
    function resendConfirmationCode(e) {
        code = document.getElementById("code").value;
        new_password = document.getElementById("new_password").value;
        forgetPassword();
        e.preventDefault();
    }

    //HTML code with styling for spesific tags.
    return (
        <Container component="main" maxWidth="xs" id="allForm" >
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
                        margin: "20px",
                    }}
                >
                    איפוס סיסמה
        </Typography>
                <form className={classes.form} validate  >
                    <TextField
                        className={classes.textField}
                        variant="outlined"
                        required
                        fullWidth
                        id="email"
                        label="כתובת מייל"
                        lang="he"
                        name="email"
                        autoComplete="email"
                    />
                    <Button
                        style={{
                            backgroundColor: "#132c33",
                            padding: "10px 10px",
                            fontSize: "10px",
                            color: "#ffffff",
                            marginTop: "20px",
                            border: "3px solid #132c33",
                            borderRadius: "10px",
                        }}
                        onClick={sendCode}
                        fullWidth
                        variant="contained"
                        className={classes.submit}
                    >
                        שלחו לי קוד אימות
          </Button>
                    <Typography
                        style={{
                            color: "#132c33",
                            marginTop: "20px",
                            marginBottom: "-20px",
                        }}
                    >
                        יש להזין את קוד האימות שקיבלת במייל
                    </Typography>
                    <TextField
                        className={classes.textField}
                        autoComplete="code"
                        name="code"
                        variant="outlined"
                        required
                        fullWidth
                        id="code"
                        label="קוד אימות"
                        style={{
                            marginTop: "20px",
                        }}
                        autoFocus
                    />
                    <Typography
                        style={{
                            color: "#132c33",
                            marginTop: "20px",
                            marginBottom: "-20px",
                        }}
                    >
                        יש להזין סיסמה חדשה
                    </Typography>
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
                            backgroundColor: "#132c33",
                            padding: "10px 10px",
                            fontSize: "10px",
                            color: "#ffffff",
                            marginTop: "20px",
                            border: "3px solid #132c33",
                            borderRadius: "10px",
                        }}
                        onClick={resendConfirmationCode}
                        fullWidth
                        variant="contained"
                        className={classes.submit}
                    >
                        שינוי סיסמה
          </Button>
                </form>

            </div>
            <br></br>
        </Container>
    );
}
