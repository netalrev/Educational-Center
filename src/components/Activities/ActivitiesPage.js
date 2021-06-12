import Loading from "../Loading/Loading";
import ActivityTable from "./ActivityTable";
import { useState, useEffect } from "react";
import $ from "jquery";

export default function ActivitiesPage(props) {

  //               Use State Initialization              //

  const [dateAndTime, setDateAndTime] = useState("");
  const [toReturn, setToReturn] = useState([]);

  // const [url, setUrl] = useState([]);

  //                 Functions                //

  //async function that return Israeli local time and date from an API.
  const fetchTimeAndDate = async () => {
    try {
      var url =
        "https://timezone.abstractapi.com/v1/current_time/?api_key=6fd38868af1a4f1b8958be2d7f676947&location=Jerusalem";
      if (url.length !== 0) {
        const res = await fetch(url);
        const data = await res.json();
        console.log(data.datetime);
        setDateAndTime(data.datetime);
        setToReturn(<div>
          <div id="loadingg">
            <Loading />
          </div>
          <div id="activities_page">
            <ActivityTable
              currentTime={data.datetime}
              email={props.email}
              givenName={props.givenName}
              familyName={props.familyName}
              phoneNumber={props.phoneNumber}
              groupName={props.groupName}
            />
          </div>
        </div>)
      }
    } catch (err) {
      console.log("Error fetching date and time.", err);
    }
  };


  //                 Use Effects                //

  useEffect(() => {
    fetchTimeAndDate();
  }, []);


  //                 Flow               //

  // var date = new Date().toLocaleDateString();
  // var day = "";
  // var month = "";
  // var year = "";
  // if (date[1] === ".") {
  //   day = "0" + date.substring(0, 1);
  //   date = date.substring(2);
  // }
  // else {
  //   day = date.substring(0, 2);
  //   date = date.substring(3);
  // }
  // if (date[1] === ".") {
  //   month = "0" + date.substring(0, 1);
  //   date = date.substring(2);
  // }
  // else {
  //   month = date.substring(0, 2);
  //   date = date.substring(3);
  // }
  // var dateAndTime = date + "-" + month + "-" + day + " " + new Date().toLocaleTimeString();

  $("#activities_page").hide();
  setTimeout(() => $("#loadingg").hide(), 2000);
  setTimeout(() => $("#activities_page").show(), 2000);
  //React componenet of the activities table.
  const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }
  async function timeSensativeAction() { //must be async func
    //do something here
    await sleep(5000) //wait 5 seconds  
    if (dateAndTime === "") {
      console.log("aaa");
    }
  }
  timeSensativeAction()
  console.log("llllllllll", dateAndTime, typeof (dateAndTime))
  return toReturn;
  // if (dateAndTime !== "") {
  // return (
  //   <div>
  //     <div id="loadingg">
  //       <Loading />
  //     </div>
  //     <div id="activities_page">
  //       <ActivityTable
  //         currentTime={dateAndTime}
  //         email={props.email}
  //         givenName={props.givenName}
  //         familyName={props.familyName}
  //         phoneNumber={props.phoneNumber}
  //         groupName={props.groupName}
  //       />
  //     </div>
  //   </div>
  // );
}
// }