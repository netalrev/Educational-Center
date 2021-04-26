import React, { Component } from "react";
import axios from "axios";

class ContactForm extends Component {
  render() {
    return (
      <form method="POST">
        <div>
          <label htmlFor="name">Name:</label>
        </div>
        <div>
          <label htmlFor="email">Email:</label>
        </div>
        <div>
          <label htmlFor="message">Message:</label>
        </div>
        <button type="submit">dasdasfsf</button>
      </form>
    );
  }
}

export default ContactForm;
