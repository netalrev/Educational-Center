import React, { Component } from "react";
import "./Loading.css";

class Loading extends Component {
  render() {
    return (
      <div className="main">
        <div className="arc"></div>
        <h1 className="h1loading"></h1>
      </div>
    );
  }
}

export default Loading;
