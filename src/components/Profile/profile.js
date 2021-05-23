import React, { Component } from "react";
import "./profile.css";
import Amplify, { Auth } from "aws-amplify";
import { AmplifySignOut } from "@aws-amplify/ui-react";
import { useState, useEffect } from "react";
import Dog from "../Avatars/Dog";

var level = 6;
var nextLevel = 88;
var registeredActivities = 1;
var pastActivities = 1;
var procces = registeredActivities / registeredActivities;

export default function Profile(props) {
  useEffect(() => {
    var elm = document.querySelector("#progress1");
    setInterval(function () {
      if (!elm.innerHTML.match(/87%/gi)) {
        elm.innerHTML = parseInt(elm.innerHTML) + 1 + "%";
      } else {
        clearInterval();
      }
    }, 18);
  }, []);
  return (
    <div className="card">
      <div className="ds-top"></div>
      <div className="avatar-holder">
        <div id="container">
          <input type="checkbox" id="water" />
          <label for="water" className="myLabel">
            <div id="fill"></div>
          </label>
          <span>Progress</span>
          <span id="progress1">0%</span>
        </div>
      </div>
      <div className="name">
        <a href="https://codepen.io/AlbertFeynman/" target="_blank">
          {props.givenName + " " + props.familyName}
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

      <div className="logout">
        <div className="avatar">
          <Dog />
        </div>
        <AmplifySignOut />
      </div>
    </div>
  );
}
