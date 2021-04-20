import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer";
import Clock from "./components/Clock";
import SignInSide from "./components/Login/SignInSide";
//import AmplifySignUp from "./components/Register/AmplifySignUp"
import RecipeReviewCard from "./components/RecipeReviewCard";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
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

Amplify.configure(awsconfig); //AWS CONFIGORE

var name;
Auth.currentAuthenticatedUser().then(
  (user) =>
    //alert(user.attributes.given_name)
    (name = user.attributes.given_name)
);

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

function App() {
  const classes = useStyles();

  return (
    <div className="App">
      <Navbar />
      <div className="main">
        <div className="clock"></div>
        <Router>
          <Switch>
            <Route exact path="/">
              <h1>{name}</h1>
            </Route>

            <Route exact path="/register">
              <AmplifyAuthenticator>
                <AmplifySignUp
                  slot="sign-up"
                  usernameAlias="email"
                  headerText="הרשמה"
                  formFields={[
                    {
                      type: "email",
                      label: "Custom email Label",
                      placeholder: "custom email placeholder",
                      required: true,
                    },
                    {
                      type: "password",
                      label: "Custom Password Label",
                      placeholder: "custom password placeholder",
                      required: true,
                    },
                    {
                      label: "Confirm Password",
                      name: "password2",
                      required: true,
                      type: "password",
                    },

                    {
                      type: "phone_number",
                      label: "Custom Phone Label",
                      placeholder: "custom Phone placeholder",
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
                <AmplifySignIn slot="sign-in" usernameAlias="email" />
              </AmplifyAuthenticator>
            </Route>
            {/*
            <Route exact path="/login">
              <AmplifySignIn />
            </Route>
            */}
            <Route exact path="/SignOut">
              <AmplifySignOut />
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
