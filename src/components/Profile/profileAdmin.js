import React, { Component } from "react";
import "./profile.css";
import Amplify, { Auth } from "aws-amplify";
import { AmplifySignOut } from "@aws-amplify/ui-react";
import { useState, useEffect } from "react";
import Dog from "../Avatars/Dog";
import { listUsers } from "../../graphql/queries";
import { API, graphqlOperation } from "aws-amplify";
import ReactCardFlip from "react-card-flip";
import LinearDeterminate from "./LinearDeterminate";

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

export default function ProfileAdmin(props) {
  const [users, setUsers] = useState([]);
  const [myScore, setMyScore] = useState([]);
  const [prevState, setState] = useState(props.flip_state);
  const grades = [0, 50, 100, 300, 700, 1500, 3100, 4700];
  var nextLevel = 0;
  var level = 0;
  for (var i = 0; i < grades.length - 1; i++) {
    if (myScore.score >= grades[i] && myScore.score < grades[i + 1]) {
      level = i + 1;
    }
  }
  nextLevel = grades[level] - parseInt(myScore.score);
  var score = 0;
  score = parseInt(myScore.score) - grades[level - 1];
  score = parseInt(score / (grades[level] - grades[level - 1]) * 100);
  const fetchUsers = async () => {
    try {
      const usersData = await API.graphql(graphqlOperation(listUsers));
      const usersList = usersData.data.listUsers.items;
      setUsers(usersList);
      if (props.groupName === "approvedUsers")
        setMyScore(usersList.filter((user) => user.email === props.email)[0]);
    } catch (error) {
      console.log("error on fetching users", error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="card">
      <div className="ds-top"></div>
      <div className="avatar-holder1">
      </div>
      <div className="name">
        <a>{props.givenName + " " + props.familyName}</a>
      </div>
      <div className="logout">
        <button className="signOutBtn" onClick={signOut}>
          התנתקות
        </button>
      </div>
    </div >
  );
}