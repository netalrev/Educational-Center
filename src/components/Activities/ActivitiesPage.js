import React, { Component } from "react";

import ActivityTable from "./ActivityTable";
import { useState, useEffect } from "react";

export default function ActivitiesPage(props) {
  const [dateAndTime, setDateAndTime] = useState([]);
  const [url, setUrl] = useState([]);

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
  }, [url]);

  return (
    <div>
      {/* <Clock format={'DD/MM/YYYY HH:mm:ss'} className='current_time' date={dateAndTime} /> */}
      {/* {console.log(document.getElementsByClassName("current_time")[0].innerText)} */}
      <ActivityTable
        currentTime={dateAndTime}
        email={props.email}
        givenName={props.givenName}
        familyName={props.familyName}
        phoneNumber={props.phoneNumber}
        groupName={props.groupName}
      />
    </div>
  );
}
