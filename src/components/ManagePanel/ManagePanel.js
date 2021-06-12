import ManageCardActivities from "./ManageCardActivities";
import ManageCardActivitiesFeedback from "./ManageCardActivitiesFeedback";
import UserInfo from "./UserInfo";
import ManageCardUsers from "./ManageCardUsers";
import ManageCardBlockUsers from "./ManageCardBlockUsers";
import ManageCardEditUsers from "./ManageCardEditUsers";
import ManageCardComfirmUsers from "./ManageCardComfirmUsers";
import DeleteEditApprovedForAdmin from "../ManageActivities/DeleteEditApprovedForAdmin";
import { useEffect, useState } from "react"

export default function ManagePanel(props) {
  //               Use State Initialization              //
  const [dateAndTime, setDateAndTime] = useState([]);
  //               Function              //
  const fetchTimeAndDate = async () => {



    try {
      var url = "https://timezone.abstractapi.com/v1/current_time/?api_key=6fd38868af1a4f1b8958be2d7f676947&location=Jerusalem"
      if (url.length !== 0) {
        const res = await fetch(url);
        const data = await res.json();
        setDateAndTime(data.datetime);
      }
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
      // var toSend = date + "-" + month + "-" + day + " " + new Date().toLocaleTimeString();
      // console.log(toSend, typeof (toSend))
      // setDateAndTime(toSend);
    } catch (err) {
      console.log("Error fetching date and time.", err);
    }
  };
  //               Use Effect Initialization              //
  useEffect(() => {
    fetchTimeAndDate();
  }, []);
  //The react component
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
  if (dateAndTime !== undefined) {
    return (
      <div>
        <ManageCardComfirmUsers
          groupName={props.groupName}
          email={props.email}
          currentTime={dateAndTime}
          title="אישור משתמשים חדשים"
          style={{ textAlign: "center", align: "center" }}
        />
        <ManageCardEditUsers
          groupName={props.groupName}
          email={props.email}
          currentTime={dateAndTime}
          title="ניהול משתמשים"
          style={{ textAlign: "center", align: "center" }}
        />
        <ManageCardBlockUsers
          groupName={props.groupName}
          email={props.email}
          currentTime={dateAndTime}
          title="ניהול משתמשים חסומים"
          style={{ textAlign: "center", align: "center" }}
        />
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
          title="אישור משתתפים הממתינים לקורס"
        />
        <UserInfo
          groupName={props.groupName}
          email={props.email}
          currentTime={dateAndTime}
          title="דו''ח מסכם לפי משתתפים"
          style={{ textAlign: "center", align: "center" }}
        />
        <ManageCardActivitiesFeedback
          groupName={props.groupName}
          email={props.email}
          currentTime={dateAndTime}
          title="דו''ח מסכם לפי מפגש בקורס"
          style={{ textAlign: "center", align: "center" }}
        />
      </div>
    );
  }
  return;
}
