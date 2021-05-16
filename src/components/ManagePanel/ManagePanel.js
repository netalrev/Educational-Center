import React, { Component } from "react";
import ManageCardActivities from "./ManageCardActivities";
import ManageCardUsers from "./ManageCardUsers";
import DeleteEditApprovedForAdmin from "../ManageActivities/DeleteEditApprovedForAdmin";

export default function ManagePanel(props) {
  return (
    <div>
      <ManageCardActivities groupName={props.groupName} title="פעילויות שטרם אושרו" />
      <DeleteEditApprovedForAdmin groupName={props.groupName} type="pending" email={props.email} title="פעיליות שאושרו" />
      <ManageCardUsers groupName={props.groupName} title="אישור משתתפים לפעילויות" />
    </div >
  );
}
