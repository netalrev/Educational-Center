import "./profile.css";
import React, { Component } from "react";
import ReactCardFlip from "react-card-flip";
import Amplify, { Auth } from "aws-amplify";
import { AmplifySignOut } from "@aws-amplify/ui-react";
import Profile from "./profile";
import ProfileAdmin from "./profileAdmin";
import Back from "./Back";

async function signOut() {
  try {
    await Auth.signOut();
    window.location.reload();
  } catch (error) {
    console.log("error signing out: ", error);
  }
}
class ProfileCard extends React.Component {
  constructor() {
    super();
    this.state = {
      isFlipped: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.setState((prevState) => ({ isFlipped: !prevState.isFlipped }));
  }

  render() {
    return (
      <div>
        <div className="profileContainer">
          <ReactCardFlip
            isFlipped={this.state.isFlipped}
            flipDirection="horizontal"
            className="_ReactCardFlip"
          >
            <div id="card_cont">
              {this.props.groupName === "approvedUsers" ? (
                <Profile
                  className="flip_btn"
                  function={this.handleClick}
                  givenName={this.props.givenName}
                  familyName={this.props.familyName}
                  email={this.props.email}
                  groupName={this.props.groupName}
                />
              ) : (
                <ProfileAdmin
                  className="flip_btn"
                  function={this.handleClick}
                  givenName={this.props.givenName}
                  familyName={this.props.familyName}
                  email={this.props.email}
                  groupName={this.props.groupName}
                />
              )}
              <div className="flip_btn"></div>
            </div>
            <div id="card_cont">
              <Back
                className="flip_btn"
                function={this.handleClick}
                givenName={this.props.givenName}
                familyName={this.props.familyName}
                email={this.props.email}
                groupName={this.props.groupName}
              />
              <div className="flip_btn"></div>
            </div>
          </ReactCardFlip>
        </div>
        <button
          style={{
            backgroundColor: "#132c33",
            color: "#d8e3e7",
            paddingLeft: "60px",
            paddingRight: "60px",
            paddingTop: "15px",
            paddingBottom: "15px",
            borderRadius: "10px",
          }}
          onClick={signOut}
        >
          התנתקות
        </button>
      </div>
    );
  }
}
export default ProfileCard;
