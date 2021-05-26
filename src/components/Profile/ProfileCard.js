import "./profile.css";
import React, { Component } from "react";
import ReactCardFlip from "react-card-flip";

import Profile from "./profile";
import Back from "./Back";

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
      <ReactCardFlip
        isFlipped={this.state.isFlipped}
        flipDirection="horizontal"
        className="_ReactCardFlip"
      >
        <div id="card_cont">
          <Profile
            className="flip_btn"
            function={this.handleClick}
            givenName={this.props.givenName}
            familyName={this.props.familyName}
            email={this.props.email}
            groupName={this.props.groupName}
          />
          {/* <button className="flip_btn" onClick={this.handleClick}>
            Click to flip
          </button> */}
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
          {/* <button className="flip_btn" onClick={this.handleClick}>
            Click to flip
          </button> */}
        </div>
      </ReactCardFlip>
    );
  }
}
export default ProfileCard;
