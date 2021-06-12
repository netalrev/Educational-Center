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
      var url =
        "https://timezone.abstractapi.com/v1/current_time/?api_key=6fd38868af1a4f1b8958be2d7f676947&location=Jerusalem";
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

  //React component for manage activities.
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
