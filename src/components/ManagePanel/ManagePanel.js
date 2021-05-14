import React, { Component } from "react";
import ManageCard from "./ManageCard";
import ManageCardActivities from "./ManageCardActivities";
import DeleteEditApprovedForAdmin from "../ManageActivities/DeleteEditApprovedForAdmin";

export default function ManagePanel(props) {
  console.log("CCC", props.email)
  return (
    <div>
      <ManageCardActivities groupName={props.groupName} id="1" title="פעילויות שטרם אושרו" />
      <DeleteEditApprovedForAdmin groupName={props.groupName} type="pending" email={props.email} title="פעיליות שאושרו" />
      <ManageCard id="2" title="אישור הרשמה לפעילויות" />
    </div>
  );
}
