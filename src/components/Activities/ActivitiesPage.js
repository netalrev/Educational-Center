import Loading from "../Loading/Loading";
import ActivityTable from "./ActivityTable";
import { useState, useEffect } from "react";
import $ from "jquery";

export default function ActivitiesPage(props) {

  //               Use State Initialization              //
  const [dateAndTime, setDateAndTime] = useState([]);
  const [url, setUrl] = useState([]);

  //                 Functions                //

  //async function that return Israeli local time and date from an API.
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


  //                 Use Effects                //

  useEffect(() => {
    fetchTimeAndDate();
  }, [url]);


  //                 Flow               //

  $("#activities_page").hide();
  setTimeout(() => $("#loadingg").hide(), 2000);
  setTimeout(() => $("#activities_page").show(), 2000);

  //React componenet of the activities table.
  return (
    <div>
      <div id="loadingg">
        <Loading />
      </div>
      <div id="activities_page">
        <ActivityTable
          currentTime={dateAndTime}
          email={props.email}
          givenName={props.givenName}
          familyName={props.familyName}
          phoneNumber={props.phoneNumber}
          groupName={props.groupName}
        />
      </div>
    </div>
  );
}
