import React, { Component } from "react";
import { MenuItems } from "./MenuItems";
import "./Navbar.css";
import { Button } from "../Button";
import { Auth } from "aws-amplify";
var loggedIn = false;
Auth.currentAuthenticatedUser().then((user) => (loggedIn = true));

class Navbar extends Component {
  if(loggedIn) {
    MenuItems[4].title = this.props.givenName + " " + this.props.familyName;
  }
  state = { clicked: false }; //for the menu btn

  handleClick = () => {
    this.setState({ clicked: !this.state.clicked });
  };

  render() {
    return (
      <nav className="NavbarItems">
        <h1
          className="navbar-logo"
          onClick={(e) => {
            e.preventDefault();
            window.location.href = "/"; //Url to icon button.
          }}
        >
          <i className="fab fa-react"></i>
          המרחב החינוכי
        </h1>

        <div className="menu-icon" onClick={this.handleClick}>
          <i
            className={this.state.clicked ? "fas fa-times" : "fas fa-bars"}
          ></i>
        </div>

        <ul className={this.state.clicked ? "nav-menu active" : "nav-menu"}>
          {MenuItems.map((item, index) => {
            return (
              <li key={index}>
                <a className={item.cName} href={item.url}>
                  {item.title}
                </a>
              </li>
            );
          })}
        </ul>
        <div className="daniels">
          {this.props.givenName !== "null" ? (
            (MenuItems[4].title =
              this.props.givenName + " " + this.props.familyName) && (
              <Button>
                {this.props.givenName} {this.props.familyName}
              </Button>
            )
          ) : (
            <Button>התחברות\הרשמה</Button>
          )}
        </div>
      </nav>
    );
  }
}
export default Navbar;
