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
    } catch (err) {
      console.log("Error fetching date and time.", err);
    }
  };
  //               Use Effect Initialization              //
  useEffect(() => {
    fetchTimeAndDate();
  });
  //The react component
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
