import React, { Component } from "react";
import "./profile.css";
import Amplify, { Auth } from "aws-amplify";
import { AmplifySignOut } from "@aws-amplify/ui-react";
import { useState, useEffect } from "react";
import Dog from "../Avatars/Dog";
import { listUsers } from "../../graphql/queries";
import { API, graphqlOperation } from "aws-amplify";
import ReactCardFlip from "react-card-flip";

var level = 6;
var nextLevel = 88;
var registeredActivities = 1;
var pastActivities = 1;
var procces = registeredActivities / registeredActivities;
// function handleClick(e) {
//   e.preventDefault();
//   this.setState((prevState) => ({ isFlipped: !prevState.isFlipped }));
// }
var fname = "null";
var gname = "null";
var emailAddress = "null";
var groupName = "null";
var phoneNumber = "null";
var groups = new Array(3);
Auth.currentAuthenticatedUser().then(
  (user) =>
    (gname = user.attributes.given_name) &&
    (fname = user.attributes.family_name) &&
    (emailAddress = user.attributes.email) &&
    (phoneNumber = user.attributes.phone_number) &&
    (groups = user.signInUserSession.accessToken.payload["cognito:groups"]) &&
    (groupName = groups[0])
);

async function signOut() {
  try {
    await Auth.signOut();
    window.location.reload();
  } catch (error) {
    console.log("error signing out: ", error);
  }
}

export default function Profile(props) {
  const [users, setUsers] = useState([]);
  const [myScore, setMyScore] = useState([]);
  const [prevState, setState] = useState(props.flip_state);

  const fetchUsers = async () => {
    try {
      const usersData = await API.graphql(graphqlOperation(listUsers));
      const usersList = usersData.data.listUsers.items;
      setUsers(usersList);
      if (props.groupName === "approvedUsers")
        setMyScore(
          usersList.filter(
            (user) => user.name === props.givenName + " " + props.familyName
          )[0]
        );
    } catch (error) {
      console.log("error on fetching users", error);
    }
  };

  useEffect(() => {
    var elm = document.querySelector("#progress1");
    setInterval(function () {
      if (!elm.innerHTML.match(/94%/gi)) {
        elm.innerHTML = parseInt(elm.innerHTML) + 1 + "%";
      } else {
        clearInterval();
      }
    }, 18);
  }, []);
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div className="card">
      <div className="ds-top"></div>
      <div className="avatar-holder1">
        <div id="container">
          <label for="water" className="myLabel">
            <div id="fill"></div>
          </label>
          <span>Progress</span>
          <span id="progress1">0%</span>
        </div>
      </div>
      <div className="name">
        <a>{props.givenName + " " + props.familyName}</a>
        <h6 title="Level">
          <h1 className="points"> {level} </h1>
        </h6>
      </div>

      <div className="ds-info">
        <div className="ds pens">
          <h6 className="prof2" title="Number of pens created by the user">
            רישום לפעילויות
          </h6>
          <h6 className="levels"> {registeredActivities} </h6>
        </div>
        <div className="ds projects">
          <h6
            className="prof1"
            title="Number of projects created by the user"
            onClick={props.function}
          >
            התקדמות בפעילויות
          </h6>
        </div>
        <div className="ds posts">
          <h6 className="prof2" title="Number of posts">
            דרגה הבאה
          </h6>
          <h6 className="levels"> {nextLevel} </h6>
        </div>
      </div>

      <div className="logout">
        <div className="avatar">
          <Dog />
        </div>
        <button className="signOutBtn" onClick={signOut}>
          התנתקות
        </button>
      </div>
    </div>
  );
}
