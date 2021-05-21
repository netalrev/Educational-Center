import React from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Loading from "./components/Loading/Loading";
import HomePage from "./components/HomePage/HomePage";
import Profile from "./components/Profile/profile";
import SignUp from "./components/Register/SignUp";
import SignIn from "./components/SignIn/SignIn";
import ForgetPassword from "./components/SignIn/ForgetPassword";
import ManagePanel from "./components/ManagePanel/ManagePanel";
import ManageActivities from "./components/ManageActivities/ManageActivities";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ActivitiesPage from "./components/Activities/ActivitiesPage";
import ClassesPage from "./components/Classes/ClassesPage";
import Amplify, { Auth } from "aws-amplify";
import awsconfig from "./aws-exports";
import ConfirmSignUp from "./components/Register/ConfirmSignUp";
import { I18n } from "aws-amplify";
import { Translations } from "@aws-amplify/ui-components";
import { useState, useEffect } from "react";
import { Hub, Logger } from "aws-amplify";

Amplify.configure(awsconfig); //AWS CONFIGORE
var fname = "null";
var gname = "null";
var emailAddress = "null";
var groupName = "null";
var phoneNumber = "null";
var groups = new Array(3);
const confirmEmail = React.createContext("confirmEmail");

Auth.currentAuthenticatedUser().then(
  (user) =>
    (gname = user.attributes.given_name) &&
    (fname = user.attributes.family_name) &&
    (emailAddress = user.attributes.email) &&
    (phoneNumber = user.attributes.phone_number) &&
    (groups = user.signInUserSession.accessToken.payload["cognito:groups"]) &&
    (groupName = groups[0])
);
const logger = new Logger("Logger", "INFO");
const listener = (data) => {
  switch (data.payload.event) {
    case "signIn":
      logger.info("user signed in");

      break;
    case "signUp":
      logger.info("user signed up");
      break;
    case "signOut":
      logger.info("user signed out");
      break;
    case "signIn_failure":
      logger.info("user sign in failed");
      break;
    case "configured":
      logger.info("the Auth module is configured");
      break;
    default:
      logger.error("Something went wrong, look at data object", data);
  }
};

function refreshPage() {
  window.location.reload();
}
Hub.listen("auth", listener);
const loader = document.querySelector(".loader");
function App() {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  if (isAuthenticating) void 0;
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
      <Navbar givenName={gname} familyName={fname} groupName={groupName} />
      <div className="main" id="mainDiv">
        <Router>
          <Switch>
            <Route exact path="/loading">
              <Loading />
            </Route>
            <Route exact path="/">
              <HomePage />
            </Route>
            {groupName === "admins" ||
            groupName === "contentSuppliers" ||
            groupName === "approvedUsers" ? (
              <Route exact path="/profile">
                <h1>עמוד פרופיל</h1>
              </Route>
            ) : (
              <Route exact path="/profile">
                <h2 className="forbidden">אנא התחבר\י על מנת לצפות בפרופיל</h2>
              </Route>
            )}
            {groupName === "admins" ||
            groupName === "contentSuppliers" ||
            groupName === "approvedUsers" ? (
              <Route exact path="/activitiespage">
                <ActivitiesPage
                  groupName={groupName}
                  email={emailAddress}
                  givenName={gname}
                  familyName={fname}
                  phoneNumber={phoneNumber}
                />
              </Route>
            ) : (
              <Route exact path="/activitiespage">
                <h2 className="forbidden">
                  אנא התחבר\י על מנת לצפות בפעילויות
                </h2>
              </Route>
            )}
            {groupName === "admins" ||
            groupName === "contentSuppliers" ||
            groupName === "approvedUsers" ? (
              <Route exact path="/classespage">
                <ClassesPage />
              </Route>
            ) : (
              <Route exact path="/classespage">
                <h2 className="forbidden">אנא התחבר\י על מנת לצפות בשיעורים</h2>
              </Route>
            )}

            {groupName === "admins" || groupName === "contentSuppliers" ? (
              <Route exact path="/manageActivities">
                <ManageActivities
                  phoneNumber={phoneNumber}
                  groupName={groupName}
                  givenName={gname}
                  familyName={fname}
                  email={emailAddress}
                />
              </Route>
            ) : (
              <Route exact path="/manageActivities">
                <h2 className="forbidden">Access Forbbiden</h2>
              </Route>
            )}
            {groupName === "admins" ? (
              <Route exact path="/ManagerPanel">
                <ManagePanel
                  phoneNumber={phoneNumber}
                  groupName={groupName}
                  givenName={gname}
                  familyName={fname}
                  email={emailAddress}
                />
              </Route>
            ) : (
              <Route exact path="/ManagerPanel">
                <h2 className="forbidden">Access Forbbiden</h2>
              </Route>
            )}
            <Route exact path="/register">
              {isAuthenticated ? (
                <div onClick={refreshPage}>
                  {" "}
                  <h1 className="profileHeader">עמוד פרופיל</h1>
                  <Profile
                    givenName={gname}
                    familyName={fname}
                    groupName={groupName}
                  />{" "}
                </div>
              ) : (
                <SignIn />
              )}
            </Route>
            <Route exact path="/SignUp">
              <SignUp />
            </Route>
            <Route exact path="/ConfirmSignUp">
              <ConfirmSignUp />
            </Route>
            <Route exact path="/ForgetPassword">
              <ForgetPassword />
            </Route>
          </Switch>
        </Router>
      </div>
      <Footer />
    </div>
  );
}

export default App;
