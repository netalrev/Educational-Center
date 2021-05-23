import React, { Component } from "react";
import DeleteEditPendingForAdmin from "./DeleteEditPendingForAdmin";
import DeleteEditPendingForContectSupplier from "./DeleteEditPendingForContectSupplier";
import DeleteEditApprovedForContectSupplier from "./DeleteEditApprovedForContectSupplier";
import DeleteEditApprovedForAdmin from "./DeleteEditApprovedForAdmin";
import ActivityFeedbackForAdmin from "./ActivityFeedbackForAdmin";
import ManageActivitiesForm from "./ManageActivitiesForm";

// class ManageActivities extends Component {
export default function ManageActivities(props) {
  return (
    <div style={{ align: "justify", align: "center" }}>
      <ManageActivitiesForm
        phoneNumber={props.phoneNumber}
        email={props.email}
        givenName={props.givenName}
        familyName={props.familyName}
        id="1"
        title="העלאת תוכן"
      />
      {props.groupName === "admins" ? (
        <DeleteEditPendingForAdmin
          groupName={props.groupName}
          type="pending"
          email={props.email}
          title="פעיליות שטרם שאושרו"
        />
      ) : (
        <DeleteEditPendingForContectSupplier
          groupName={props.groupName}
          type="pending"
          email={props.email}
          title="פעיליות שטרם שאושרו"
        />
      )}
      {props.groupName === "admins" ? (
        <DeleteEditApprovedForAdmin
          groupName={props.groupName}
          type="approved"
          email={props.email}
          title="פעיליות שאושרו"
        />
      ) : (
        <DeleteEditApprovedForContectSupplier
          groupName={props.groupName}
          type="approved"
          email={props.email}
          title="פעיליות שאושרו"
        />
      )}
      <ActivityFeedbackForAdmin
        groupName={props.groupName}
        type="approved"
        email={props.email}
        title="משוב פעלויות"
      />
    </div>
  );
}
