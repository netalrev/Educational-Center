import React, { Component } from "react";
import "./profile.css";
import Amplify, { Auth } from "aws-amplify";
import { AmplifySignOut } from "@aws-amplify/ui-react";
import { useState, useEffect } from "react";
import { listUsers } from "../../graphql/queries";
import { API, graphqlOperation } from "aws-amplify";
import ReactCardFlip from "react-card-flip";
import LinearDeterminate from "./LinearDeterminate";

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
  const grades = [0, 50, 150, 350, 750, 1550, 3150, 4750];
  var nextLevel = 0;
  var level = 0;
  console.log(myScore.score)
  for (var i = 0; i < grades.length - 1; i++) {
    if (myScore.score >= grades[i] && myScore.score < grades[i + 1]) {
      level = i + 1;
    }
  }
  if (myScore.score >= grades[grades.length - 1])
    level = grades.length - 1;
  nextLevel = grades[level] - parseInt(myScore.score);
  var score = 0;
  score = parseInt(myScore.score) - grades[level - 1];
  score = parseInt((score / (grades[level] - grades[level - 1])) * 100);
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
        {level === grades.length ?
          <div id="container">
            <span>הידד, סיימת את כל השלבים</span>
            <br></br><br></br>
          </div>
          :
          <div id="container">
            <LinearDeterminate score={score} />

            <span id="progress1" style={{ fontWeight: "700" }}>
              {score}%
          </span>
            <span>:התקדמות</span>
          </div>
        }
      </div>
      <div className="name">
        <a>{props.givenName + " " + props.familyName}</a>
        <h6 title="Level">
          <div>
            <table className="pointsHolder">
              <td>
                <div className="points1"> {level}</div>
              </td>
              <td>
                <div className="points2"> /{grades.length}</div>
              </td>
            </table>
          </div>
        </h6>
      </div>
      <div className="logout">
        <div className="avatar">
          {level === 1 ? (
            <div>
              {" "}
              <p className="avatarLabel">
                !קיבלת כוכב על ההרשמה לפרוייקט! אנחנו כעט ברמה 1 אבל נמשיך להתקדם
              </p>{" "}
              <div id="logo1">
                <img className="pointsAvatar" src={"/img/partisipation.png"} />
              </div>
            </div>
          ) : (
            <div></div>
          )}
          {level === 2 ? (
            <div>
              {" "}
              <p className="avatarLabel">!רמה 2 - קיבלת תעודת השתתפות</p>{" "}
              <img className="pointsAvatar" src={"/img/diploma.png"} />{" "}
            </div>
          ) : (
            <div></div>
          )}
          {level === 3 ? (
            <div>
              {" "}
              <p className="avatarLabel">!רמה 3 - מדליית ארד</p>{" "}
              <img className="pointsAvatar" src={"/img/bronze-medal.png"} />{" "}
            </div>
          ) : (
            <div></div>
          )}
          {level === 4 ? (
            <div>
              {" "}
              <p className="avatarLabel">!רמה 4 - מדליית כסף</p>{" "}
              <img className="pointsAvatar" src={"/img/silver-medal.png"} />{" "}
            </div>
          ) : (
            <div></div>
          )}
          {level === 5 ? (
            <div>
              {" "}
              <p className="avatarLabel">!רמה 5 - מדליית זהב</p>{" "}
              <img className="pointsAvatar" src={"/img/gold-medal.png"} />{" "}
            </div>
          ) : (
            <div></div>
          )}
          {level === 6 ? (
            <div>
              {" "}
              <p className="avatarLabel">
                !רמה 6 זה כבר מרשים, קיבלת גביע ארד
              </p>{" "}
              <img className="pointsAvatar" src={"/img/trophy3.png"} />{" "}
            </div>
          ) : (
            <div></div>
          )}
          {level === 7 ? (
            <div>
              {" "}
              <p className="avatarLabel">
                !מדהים! הגעת לרמה 7 וקיבלת גביע כסף
              </p>{" "}
              <img className="pointsAvatar" src={"/img/trophy2.png"} />{" "}
            </div>
          ) : (
            <div></div>
          )}
          {level === 8 ? (
            <div>
              {" "}
              <p className="avatarLabel">
                !אליפות! סיימת את הפרוייקט וקיבלת את גביע הזהב
              </p>{" "}
              <img className="pointsAvatar" src={"/img/trophy1.png"} />{" "}
            </div>
          ) : (
            <div></div>
          )}
        </div>

        <div className="ds projects">
          <h6
            className="prof1"
            title="Number of projects created by the user"
            onClick={props.function}
          >
            הקורסים שלי
          </h6>
        </div>
      </div>
    </div>
  );
}
