import React, { Component } from "react";
import ManageCard from "./ManageCard";

class ManagePanel extends Component {

  render() {
    return (
      <div>
        <ManageCard temp="daniel" id="1" title="אישור פעילויות" />
        <ManageCard id="2" title="אישור הרשמה לפעילויות" />
      </div>
    );
  }
}
export default ManagePanel;