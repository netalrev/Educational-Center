import DeleteEditPendingForContectSupplier from "./DeleteEditPendingForContectSupplier";
import DeleteEditApprovedForContectSupplier from "./DeleteEditApprovedForContectSupplier";
import ActivityFeedbackForAdmin from "./ActivityFeedbackForAdmin";
import ManageActivitiesForm from "./ManageActivitiesForm";
import ActivityInfo from "./ActivityInfo";
import { useState, useEffect } from "react"


export default function ManageActivities(props) {

  //               Use State Initialization              //

  const [dateAndTime, setDateAndTime] = useState([]);

  //               Functions              //

  //async function to get the jerusalem-israel local date and time.
  const fetchTimeAndDate = async () => {
    try {
      if (dateAndTime.length === 0) {
        var url =
          "https://timezone.abstractapi.com/v1/current_time/?api_key=6fd38868af1a4f1b8958be2d7f676947&location=Jerusalem";
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
      }
    } catch (err) {
      console.log("Error fetching date and time.", err);
    }
  };

  //               Use Effect Initialization              //

  useEffect(() => {
    fetchTimeAndDate();
  }, []);
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
  // console.log(toSend, typeof (toSend))
  //React component for manage activities.
  if (dateAndTime !== undefined) {
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
          title="דו''חות מסכמים הממתינים לשליחה"
        />
        <ActivityInfo
          groupName={props.groupName}
          phoneNumber={props.phoneNumber}
          type="approved"
          email={props.email}
          currentTime={dateAndTime}
          title="דו''ח מסכם לפי קורס"
        />

      </div>
    );
  }
  return;
}
