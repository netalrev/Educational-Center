import React, { Component } from "react";
import "./profile.css";
import Amplify, { Auth } from "aws-amplify";
import { AmplifySignOut } from "@aws-amplify/ui-react";

var level = 1;
var nextLevel = 100;
var registeredActivities = 1;
var pastActivities = 1;
var procces = registeredActivities / registeredActivities;

class profile extends Component {
  render() {
    return (
      <div className="card">
        <div className="ds-top"></div>
        <div className="avatar-holder">
          <img
            src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1820405/profile/profile-512.jpg?1533058950"
            alt="Albert Einstein"
          ></img>
        </div>
        <div className="name">
          <a href="https://codepen.io/AlbertFeynman/" target="_blank">
            {this.props.givenName + " " + this.props.familyName}
          </a>
          <h6 title="Level">
            <i className="fas fa-user-graduate"></i>{" "}
            <span className="Level"> {level} </span>
          </h6>
        </div>

        <div className="ds-info">
          <div className="ds pens">
            <h6 title="Number of pens created by the user">
              רישום לפעילויות <i className="fas fa-edit"></i>
            </h6>
            <p> {registeredActivities} </p>
          </div>
          <div className="ds projects">
            <h6 title="Number of projects created by the user">
              התקדמות בפעילויות <i className="fas fa-project-diagram"></i>
            </h6>
            <p> {procces} </p>
          </div>
          <div className="ds posts">
            <h6 title="Number of posts">
              דרגה הבאה <i className="fas fa-comments"></i>
            </h6>
            <p> {nextLevel} </p>
          </div>
        </div>
        <div className="ds-skill">
          <h6>
            Skill <i className="fa fa-code" aria-hidden="true"></i>
          </h6>

          <div className="skill html">
            <h6>
              <i className="fab fa-html5"></i> HTML5{" "}
            </h6>
            <div className="bar bar-html">
              <p>95%</p>
            </div>
          </div>
          <div className="skill css">
            <h6>
              <i className="fab fa-css3-alt"></i> CSS3{" "}
            </h6>
            <div className="bar bar-css">
              <p>90%</p>
            </div>
          </div>
          <div className="skill javascript">
            <h6>
              <i className="fab fa-js"></i> JavaScript{" "}
            </h6>
            <div className="bar bar-js">
              <p>75%</p>
            </div>
          </div>
        </div>
        <div className="logout">
          <AmplifySignOut />
        </div>
      </div>
    );
  }
}

export default profile;
