import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import { red } from "@material-ui/core/colors";
import { useState, useEffect } from "react";
import { listSubmitedActivityFeedbacks } from "../../graphql/queries";
import { API, graphqlOperation } from "aws-amplify";

//Style for adtivities edit page.
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 1000,
    minWidth: 400,
    margin: "10px",
    backgroundColor: "light gray",

    borderRadius: "4%",
    right: 0,
    transition: "transform 0.15s ease-in-out",
    "& label": {
      margin: "10px",
      color: "white",
      fontSize: "2000px",
      backgroundColor: "red",
      borderRadius: "20px",
      zIndex: "1222",
    },
  },

  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    color: "red", //arrow color
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
    color: "red",
  },
  avatar: {
    backgroundColor: red[500],
    color: "white",
  },
  subColor: {
    color: "red",
  },
}));

export default function ManageSubmitActivitiesFeedback(props) {

  //               Use State Initialization              //

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [activitiesFeedback, setActivitiesFeedback] = useState([]);
  const [allActivitiesFeedback, setAllActivitiesFeedback] = useState([]);

  //               Use Effect Initialization              //

  useEffect(() => {
    // Fetch for content suppliers
    fetchActivitiesFeedbacks();
  }, []);

  useEffect(() => {
    // Fetch for admins
    fetchAllActivitiesFeedbacks();
  }, []);

  //               Functions              //

  //async function to fetch pending activity.
  const fetchActivitiesFeedbacks = async () => {
    try {
      const activitiesFeedbackData = await API.graphql(
        graphqlOperation(listSubmitedActivityFeedbacks, { filter: { email: { eq: props.email } }, }));
      const activitiesFeedbackList = activitiesFeedbackData.data.listSubmitedActivityFeedbacks.items;
      setActivitiesFeedback(activitiesFeedbackList);
    } catch (error) {
      console.log("error on fetching Pending Activities", error);
    }
  };

  //async function to fetch all pending activities.
  const fetchAllActivitiesFeedbacks = async () => {
    try {
      const activitiesFeedbackData = await API.graphql(graphqlOperation(listSubmitedActivityFeedbacks));
      const activitiesFeedbackList = activitiesFeedbackData.data.listSubmitedActivityFeedbacks.items;
      setAllActivitiesFeedback(activitiesFeedbackList);
    } catch (error) {
      console.log("error on fetching Pending Activities", error);
    }
  };

  //Get all students.
  var students = [];
  allActivitiesFeedback.filter(activity => props.id === activity.activity_id).forEach(user => {
    var idx = -1;
    for (var i = 0; i < students.length; i++) {
      if (students[i][1] === user.form[0][1]) {
        idx = i;
        break;
      }
    }
    if (idx !== -1) {
      if (user.form[0][3] === "10") {
        students[idx][3]++;
      }
      students[idx][4] += parseInt(user.form[0][4]) / 3;
      students[idx][5] += parseInt(user.form[0][5]) / 3;
    }
    else {
      students.push([user.form[0][0], user.form[0][1], user.form[0][2], user.form[0][3] === "10" ? 1 : 0, user.form[0][4] / 3, user.form[0][5] / 3])
    }
  });

  var text = <b>{props.title}</b>;//Var for title.
  //React component.
  return (
    <Card
      className={classes.root}
      style={{
        color: "#132c33",
        backgroundColor: "#d8e3e7",
      }}
    >
      <CardHeader title={text} />
      <CardContent s>
        {<div>
          <h4>{text}</h4>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              backgroundColor: "#d8e3e7",
              color: "#132c33",
            }}
          >
            <table>
              <tr>
                <div>
                  {students.map((student) => (
                    <div>
                      <h4>{student[0]}</h4>
                      <div
                        style={{
                          minWidth: "200px",
                          borderStyle: "solid",
                          borderRadius: "15px",
                          color: "#132c33",
                          backgroundColor: "#d8e3e7",
                        }}
                      >
                        <br></br>
                        <h4>נוכחות: {props.howManyPass} / {student[3]}</h4>
                        <br></br>
                        <h4>השתתפות: 5 / {student[4] / props.howManyPass}</h4>
                        <br></br>
                        <h4>תרומה: 5 / {student[5] / props.howManyPass}</h4>
                        <br></br>
                      </div>
                      <br></br>
                    </div>
                  ))}
                </div>
              </tr>
            </table>
          </div>
        </div>
        }
      </CardContent>
    </Card>
  );
}
