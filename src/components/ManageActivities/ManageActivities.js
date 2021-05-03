import React, { Component } from "react";
import DeletePending from "./DeletePending";
import DeleteApproved from "./DeleteApproved";

import ManageActivitiesForm from "./ManageActivitiesForm";

class ManageActivities extends Component {

  render() {
    return (
      <div>
        <ManageActivitiesForm email={this.props.email} givenName={this.props.givenName} familyName={this.props.familyName} id="1" title="העלאת תוכן" />
        <DeletePending type="pending" email={this.props.email} title="מחיקת פעילות שטרם שאושרה" />
        <DeleteApproved type="approved" email={this.props.email} title="מחיקת פעילות שאושרה" />
      </div>
    );
  }
}
export default ManageActivities;
