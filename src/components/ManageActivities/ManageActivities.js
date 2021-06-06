import React, { Component } from "react";
import DeleteEditPendingForAdmin from "./DeleteEditPendingForAdmin";
import DeleteEditPendingForContectSupplier from "./DeleteEditPendingForContectSupplier";
import DeleteEditApprovedForContectSupplier from "./DeleteEditApprovedForContectSupplier";
import DeleteEditApprovedForAdmin from "./DeleteEditApprovedForAdmin";
import ActivityFeedbackForAdmin from "./ActivityFeedbackForAdmin";
import ManageActivitiesForm from "./ManageActivitiesForm";
import ActivityInfo from "./ActivityInfo";
import { useState, useEffect } from "react"

// class ManageActivities extends Component {
export default function ManageActivities(props) {
  const [dateAndTime, setDateAndTime] = useState([]);
  const fetchTimeAndDate = async () => {
    try {
      var url =
        "http://api.timezonedb.com/v2.1/get-time-zone?key=7IOGNZDWONQE&format=json&by=zone&zone=Asia/Jerusalem";
      if (url.length !== 0) {
        const res = await fetch(url);
        const data = await res.json();
        setDateAndTime(data.formatted);
      }
    } catch (err) {
      console.log("Error fetching date and time.", err);
    }
  };
  useEffect(() => {
    fetchTimeAndDate();
  });
  return (
    <div style={{ align: "justify", align: "center" }}>
      <ManageActivitiesForm
        phoneNumber={props.phoneNumber}
        email={props.email}
        givenName={props.givenName}
        familyName={props.familyName}
        id="1"
        currentTime={dateAndTime}
        title="יצירת קורס חדש"
      />
      {props.groupName === "admins" ? (
        console.log()
      ) : (
        <DeleteEditPendingForContectSupplier
          groupName={props.groupName}
          type="pending"
          email={props.email}
          currentTime={dateAndTime}
          title="קורסים ממתינים לאישור הנהלה"
        />
      )}
      {props.groupName === "admins" ?
        console.log()
        :
        (
          <DeleteEditApprovedForContectSupplier
            groupName={props.groupName}
            type="approved"
            email={props.email}
            currentTime={dateAndTime}
            title="הקורסים שלי"
          />
        )}
      <ActivityFeedbackForAdmin
        groupName={props.groupName}
        phoneNumber={props.phoneNumber}
        type="approved"
        email={props.email}
        currentTime={dateAndTime}
        title="משובים הממתינים לשליחה"
      />
      <ActivityInfo
        groupName={props.groupName}
        phoneNumber={props.phoneNumber}
        type="approved"
        email={props.email}
        currentTime={dateAndTime}
        title="מידע לפי קורסים"
      />

    </div>
  );
}
