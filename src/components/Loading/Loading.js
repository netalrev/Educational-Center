import { Component } from "react";
import "./Loading.css";//Loading page style

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
