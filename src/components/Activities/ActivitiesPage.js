import React, { Component } from "react";

import ActivityTable from "./ActivityTable";

export default function ActivitiesPage(props) {
  return (
    <ActivityTable
      email={props.email}
      givenName={props.givenName}
      familyName={props.familyName}
      phoneNumber={props.phoneNumber}
      groupName={props.groupName}
    />
  );
}
