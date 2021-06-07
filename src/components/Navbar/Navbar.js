import React, { Component } from "react";
import { MenuItems } from "./MenuItems";
import "./Navbar.css";
import { Button } from "../Button";
import { Auth } from "aws-amplify";
import logo from "./logo.png"; // Tell webpack this JS file uses this image
import PersonIcon from '@material-ui/icons/Person';

var loggedIn = false;
Auth.currentAuthenticatedUser().then((user) => (loggedIn = true));

class Navbar extends Component {
  if(loggedIn) {
    MenuItems[5].title = this.props.givenName + " " + this.props.familyName;
  }
  state = { clicked: false }; //for the menu btn

  handleClick = () => {
    this.setState({ clicked: !this.state.clicked });
  };

  render() {
    return (
      <nav className="NavbarItems">
        <img
          className="logo"
          src={logo}
          alt="Logo"
          onClick={(e) => {
            e.preventDefault();
            window.location.href = "/"; //Url to icon button.
          }}
        />

        <div className="menu-icon" onClick={this.handleClick}>
          <i
            className={this.state.clicked ? "fas fa-times" : "fas fa-bars"}
          ></i>
        </div>

        <ul className={this.state.clicked ? "nav-menu active" : "nav-menu"}>
          {MenuItems.map((item, index) => {
            return (
              <li
                key={index}
                tohide={item.title}
                style={{
                  display:
                    (this.props.groupName !== "admins" &&
                      this.props.groupName !== "contentSuppliers" &&
                      index === 1) ||
                      (this.props.groupName !== "admins" && index === 2) ||
                      (this.props.groupName === "null" && index !== 3)
                      ? "none"
                      : "block",
                }}
              >
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
              /*this.props.givenName + " " + this.props.familyName) && (*/
              <Button>
                {/*<PersonIcon style={{}} />*/}  {this.props.givenName} {this.props.familyName}
              </Button>
            )
          ) : (
            <Button>התחברות</Button>
          )}
        </div>
      </nav>
    );
  }
}

export default Navbar;
