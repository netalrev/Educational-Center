import React, { Component } from "react";
import DeletePending from "./DeletePending";
import DeleteApproved from "./DeleteApproved";
import EditPending from "./EditPending";
import EditApproved from "./EditApproved";
import ManageActivitiesForm from "./ManageActivitiesForm";

class ManageActivities extends Component {

  render() {
    return (
      <div>
        {console.log(this.props.groupName)}
        <ManageActivitiesForm email={this.props.email} givenName={this.props.givenName} familyName={this.props.familyName} id="1" title="העלאת תוכן" />
        <DeletePending groupName={this.props.groupName} type="pending" email={this.props.email} title="מחיקת פעיליות שטרם שאושרו" />
        <DeleteApproved groupName={this.props.groupName} type="approved" email={this.props.email} title="מחיקת פעיליות שאושרו" />
        <EditPending groupName={this.props.groupName} type="pending" email={this.props.email} title="עריכת פעיליות שטרם שאושרו" />
        <EditApproved groupName={this.props.groupName} type="approved" email={this.props.email} title="עריכת פעיליות שאושרו" />
      </div>
    );
  }
}
export default ManageActivities;
