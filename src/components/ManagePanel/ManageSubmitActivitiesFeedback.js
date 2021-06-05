import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import { red } from "@material-ui/core/colors";
import TextField from "@material-ui/core/TextField";
// import SubmitResponsiveDialogActivityFeedback from "./SubmitResponsiveDialogActivityFeedback";
import { useState, useEffect } from "react";
import { listSubmitedActivityFeedbacks } from "../../graphql/queries";
import {
  deletePendingActivities,
  deleteApprovedActivities,
} from "../../graphql/mutations";
import { API, graphqlOperation } from "aws-amplify";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 1000,
    minWidth: 400,
    margin: "10px",
    backgroundColor: "light gray",

    borderRadius: "4%",
    right: 0,
    transition: "transform 0.15s ease-in-out",
    //"&:hover": { transform: "scale3d(1.05, 1.05, 1)" },
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
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [activitiesFeedback, setActivitiesFeedback] = useState([]);
  const [allActivitiesFeedback, setAllActivitiesFeedback] = useState([]);

  useEffect(() => {
    // Fetch for content suppliers
    fetchActivitiesFeedbacks();
  }, []);

  useEffect(() => {
    // Fetch for admins
    fetchAllActivitiesFeedbacks();
  }, []);

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

  const fetchAllActivitiesFeedbacks = async () => {
    try {
      const activitiesFeedbackData = await API.graphql(graphqlOperation(listSubmitedActivityFeedbacks));
      const activitiesFeedbackList = activitiesFeedbackData.data.listSubmitedActivityFeedbacks.items;
      setAllActivitiesFeedback(activitiesFeedbackList);
    } catch (error) {
      console.log("error on fetching Pending Activities", error);
    }
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  var text = <b>{props.title}</b>;
  return (
    <Card
      className={classes.root}
      style={{
        color: "white",
        backgroundColor: "black",
      }}
    >
      <CardHeader title={text} />
      <CardContent>
        {allActivitiesFeedback.map((activity) => {
          if (props.id === activity.activity_id && activity.date === props.date) {
            return (
              <div>
                <h4>{activity.title}</h4>
                <h4>בתאריך: {activity.date.substring(0, 10)}</h4>
                <h4>בשעה: {activity.date.substring(11)}</h4>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    backgroundColor: "black",
                    color: "white",
                  }}
                >
                  <table>
                    <tr>
                      <div>
                        {activity.form.map((student) => (
                          <div>
                            <div
                              style={{
                                borderStyle: "solid",
                                borderRadius: "15px",
                                color: "white",
                                backgroundColor: "black",
                              }}
                            >
                              <h4>{student[0]}</h4>
                              <br></br>
                              {student[3] === "10" ? <h4>נכח</h4> : <h4>לא נכח</h4>}
                              <br></br>
                              <h4>ציון עבור השתתפות במפגש: 5 / {parseInt(student[4] / 3)}</h4>
                              <br></br>
                              <h4>ציון עבור תרומה במפגש: 5 / {parseInt(student[5] / 3)}</h4>
                              <br></br>
                            </div>
                            <br></br>
                          </div>
                        ))}
                      </div>
                    </tr>
                    <tr>
                      {/* <SubmitResponsiveDialogActivityFeedback
                        id={props.id}
                        date={activity.date}
                        student={activity.form}
                      /> */}
                    </tr>
                  </table>
                </div>
              </div>
            );
          }
        })}
      </CardContent>
    </Card>
  );
}
