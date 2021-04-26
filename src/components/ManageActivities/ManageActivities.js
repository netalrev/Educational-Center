import React, { Component } from "react";
import ManageActivitiesCard from "./ManageActivitiesCard";
import ManageActivitiesForm from "./ManageActivitiesForm";

class ManageActivities extends Component {
  render() {
    return (
      <div>
        <ManageActivitiesForm id="1" title="העלאת תוכן" />
        <ManageActivitiesCard id="1" title="מחיקת תוכן" />
        <ManageActivitiesCard id="2" title="עריכת תוכן" />
      </div>
    );
  }
}
export default ManageActivities;
