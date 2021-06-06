import React, { Component } from "react";
import ManageCardActivities from "./ManageCardActivities";
import ManageCardActivitiesFeedback from "./ManageCardActivitiesFeedback";
import UserInfo from "./UserInfo";
import ManageCardUsers from "./ManageCardUsers";
import DeleteEditApprovedForAdmin from "../ManageActivities/DeleteEditApprovedForAdmin";
import { useEffect, useState } from "react"

export default function ManagePanel(props) {
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
    <div>
      <ManageCardActivities
        groupName={props.groupName}
        email={props.email}
        currentTime={dateAndTime}
        title="קורסים הממתינים לאישור"
        style={{ textAlign: "center", align: "center" }}
      />
      <DeleteEditApprovedForAdmin
        groupName={props.groupName}
        currentTime={dateAndTime}
        type="pending"
        email={props.email}
        title="קורסים מאושרים"
      />
      <ManageCardUsers
        currentTime={dateAndTime}
        groupName={props.groupName}
        title="משתתפים הממתינים לאישור"
      />
      <UserInfo
        groupName={props.groupName}
        email={props.email}
        currentTime={dateAndTime}
        title="משובים לפי משתתפים"
        style={{ textAlign: "center", align: "center" }}
      />
      <ManageCardActivitiesFeedback
        groupName={props.groupName}
        email={props.email}
        currentTime={dateAndTime}
        title="משובים לפי מפגש בקורס"
        style={{ textAlign: "center", align: "center" }}
      />
    </div>
  );
}
