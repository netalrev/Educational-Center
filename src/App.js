import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer";
import SignInSide from "./components/Login/SignInSide";
import SignUp from "./components/Register/SignUp";
import RecipeReviewCard from "./components/RecipeReviewCard";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";
import ContactForm from './components/ContactUs/ContactForm';

const useStyles = makeStyles({
  gridContainer: {
    paddingLeft: "10px",
    paddingRight: "10px",
  },
});

function App() {
  const classes = useStyles();

  return (
    <div className="App">
      <Navbar />
      <div className="main">
        <Router>
          <Switch>
            <Route exact path="/">
              <RecipeReviewCard />
            </Route>
            <Route exact path="/register">
              <SignUp />
            </Route>
            <Route exact path="/login">
              <SignInSide />
            </Route>
            <Route exact path="/contactus">
              <ContactForm /> 
            </Route>
          </Switch>
        </Router>
      </div>
      <Footer />
    </div>
  );
}

export default App;
