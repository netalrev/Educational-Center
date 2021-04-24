import React from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer";
import Clock from "./components/Clock";
import { makeStyles } from "@material-ui/core/styles";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
  withRouter,
} from "react-router-dom";
import ContactForm from "./components/ContactUs/ContactForm";
import ActivitiesPage from "./components/Activities/ActivitiesPage";
import ClassesPage from "./components/Classes/ClassesPage";
import Amplify, { Auth } from "aws-amplify";
import awsconfig from "./aws-exports";
import {
  AmplifyAuthenticator,
  AmplifySignUp,
  AmplifySignIn,
  AmplifySignOut,
} from "@aws-amplify/ui-react";
import { I18n } from "aws-amplify";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { onAuthUIStateChange } from "@aws-amplify/ui-components";

Amplify.configure(awsconfig); //AWS CONFIGORE
var fname = "null";
var gname = "null";
Auth.currentAuthenticatedUser().then(
  (user) =>
    //alert(user.attributes.given_name)
    (gname = user.attributes.given_name) &&
    (fname = user.attributes.family_name)
);

var count = 0;
const useStyles = makeStyles({
  gridContainer: {
    paddingLeft: "10px",
    paddingRight: "10px",
  },
});
const signUpConfig = {
  hideAllDefaults: true,
  signUpFields: [
    {
      label: "Email",
      key: "username",
      required: true,
      placeholder: "Email",
      type: "email",
      displayOrder: 1,
    },
    {
      label: "Password",
      key: "password",
      required: true,
      placeholder: "Password",
      type: "password",
      displayOrder: 2,
    },
  ],
};
function refreshPage() {
  window.location.reload();
}

function Content() {
  let history = useHistory();

  function handleAuthStateChange(state) {
    //refreshPage();
  }
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    } catch (e) {
      if (e !== "No current user") {
        alert(e);
      }
    }
    setIsAuthenticating(false);
  }
  useEffect(() => {
    onLoad();
  }, []);
  const [authState, setAuthState] = useState("");

  function handleAuthStateChange(state) {
    if (state === "signedin" || state === "signedout") {
      setAuthState(state);
    }
    if (state === "signedin") {
      refreshPage();
    }
  }
  return (
    <AmplifyAuthenticator>
      <AmplifySignUp
        slot="sign-up"
        usernameAlias="email"
        headerText="הרשמה"
        formFields={[
          {
            type: "email",
            label: "כתובת אימייל",
            placeholder: "example@host.com",
            required: true,
          },
          {
            type: "password",
            label: "בחר סיסמה",
            placeholder: "סיסמה",
            required: true,
          },
          {
            label: "אישור סיסמה",
            name: "password2",
            required: true,
            type: "password",
          },

          {
            type: "phone_number",
            label: "מספר טלפון נייד",
            placeholder: "טלפון",
            dialCode: +972,
            required: true,
          },
          {
            type: "given_name",
            label: "שם פרטי",
            placeholder: "שם פרטי",
            required: true,
          },
          {
            type: "family_name",
            label: "שם משפחה",
            placeholder: "שם משפחה",
            required: true,
          },
        ]}
      />
      <AmplifySignIn
        slot="sign-in"
        usernameAlias="email"
        //handleAuthStateChange={handleAuthStateChange}
      />
      <AmplifySignOut />
    </AmplifyAuthenticator>
  );
}

function App() {
  const classes = useStyles();
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    } catch (e) {
      if (e !== "No current user") {
        alert(e);
      }
    }
    setIsAuthenticating(false);
  }
  useEffect(() => {
    onLoad();
  }, []);

  return (
    <div className="App">
      <Navbar givenName={gname} familyName={fname} />
      <div className="main">
        <div className="clock"></div>
        <Router>
          <Switch>
            <Route exact path="/">
              <h1>ברוכים הבאים ! מקווים שתהנה</h1>
            </Route>
            <Route exact path="/profile">
              <h1>עמוד פרופיל</h1>
            </Route>

            <Route exact path="/register">
              {isAuthenticated ? (
                <div onClick={refreshPage}>
                  {" "}
                  <AmplifySignOut />{" "}
                </div>
              ) : (
                <Content />
              )}
            </Route>

            <Route exact path="/contactus">
              <ContactForm />
            </Route>
            <Route exact path="/activitiespage">
              <ActivitiesPage />
            </Route>
            <Route exact path="/classespage">
              <ClassesPage />
            </Route>
          </Switch>
        </Router>
      </div>
      <Footer />
    </div>
  );
}

export default App;
