import React, { Component } from "react";
import Amplify, { Auth } from "aws-amplify";
import { AmplifySignOut } from "@aws-amplify/ui-react";
import { useState, useEffect } from "react";

// var registeredActivities = 1;
// var pastActivities = 1;
// var procces = registeredActivities / registeredActivities;
// function handleClick(e) {
//   e.preventDefault();
//   this.setState((prevState) => ({ isFlipped: !prevState.isFlipped }));
// }
// var fname = "null";
// var gname = "null";
// var emailAddress = "null";
// var groupName = "null";
// var phoneNumber = "null";
// var groups = new Array(3);
// Auth.currentAuthenticatedUser().then(
//   (user) =>
//     (gname = user.attributes.given_name) &&
//     (fname = user.attributes.family_name) &&
//     (emailAddress = user.attributes.email) &&
//     (phoneNumber = user.attributes.phone_number) &&
//     (groups = user.signInUserSession.accessToken.payload["cognito:groups"]) &&
//     (groupName = groups[0])
// );

async function signOut() {
  try {
    await Auth.signOut();
    window.location.reload();
  } catch (error) {
    console.log("error signing out: ", error);
  }
}

export default function ProfileAdmin(props) {
  return (
    <div>
      <button
        onClick={signOut}
        style={{
          color: "#d8e3e7",
          backgroundColor: "#132c33",
          width: "200px",
          padding: "30px",
          borderRadius: "10px",
        }}
      >
        התנתקות
      </button>
    </div>
  );
}
