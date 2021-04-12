import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer";
import SignInSide from "./components/Login/SignInSide";

import RecipeReviewCard from "./components/RecipeReviewCard";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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
        <SignInSide />
      </div>
      <Footer />
    </div>
  );
}

export default App;
