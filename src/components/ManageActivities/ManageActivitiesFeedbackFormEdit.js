import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import { red } from "@material-ui/core/colors";
import TextField from "@material-ui/core/TextField";
import SubmitResponsiveDialogActivityFeedback from "./SubmitResponsiveDialogActivityFeedback";
import { useState, useEffect } from "react";
import { listActivityFeedbacks } from "../../graphql/queries";
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

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 1000,
    minWidth: 400,
    margin: "10px",
    backgroundColor: "light gray",
    color: "red",
    text: "red",
    borderRadius: "4%",
    right: 0,
    transition: "transform 0.15s ease-in-out",
    "&:hover": { transform: "scale3d(1.05, 1.05, 1)" },
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

  // textField: {
  //     width: '90%',
  //     marginLeft: 'auto',
  //     marginRight: 'auto',
  //     textAlign: 'right',
  //     theme: "createMuiTheme({ direction: \"rtl\" }",
  //     paddingBottom: 0,
  //     marginTop: "0",
  //     fontWeight: 500
  // },
}));

export default function ManageActivitiesFeedbackFormEdit(props) {
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
        graphqlOperation(listActivityFeedbacks, {
          filter: { email: { eq: props.email } },
        })
      );
      const activitiesFeedbackList =
        activitiesFeedbackData.data.listActivityFeedbacks.items;
      setActivitiesFeedback(activitiesFeedbackList);
    } catch (error) {
      console.log("error on fetching Pending Activities", error);
    }
  };

  const fetchAllActivitiesFeedbacks = async () => {
    try {
      const activitiesFeedbackData = await API.graphql(
        graphqlOperation(listActivityFeedbacks)
      );
      const activitiesFeedbackList =
        activitiesFeedbackData.data.listActivityFeedbacks.items;
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
          if (props.id === activity.activity_id) {
            return (
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
                            <h4>:{student[0]}</h4>
                            <br></br>
                            <FormControl
                              component="fieldset"
                              style={{
                                color: "white",
                                backgroundColor: "black",
                              }}
                            >
                              <FormLabel
                                component="legend"
                                style={{ color: "white" }}
                              >
                                נוכחות במפגש
                                  </FormLabel>
                              <RadioGroup
                                row
                                aria-label="position"
                                name={student[1] + " 1"}
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  color: "white",
                                }}
                              >
                                <FormControlLabel
                                  value="10"
                                  control={<Radio color="white" />}
                                  label="נכח"
                                />
                                <FormControlLabel
                                  value="0"
                                  control={<Radio color="white" />}
                                  label="לא נכח"
                                  labelPlacement="top"
                                />
                              </RadioGroup>
                              <FormLabel
                                component="legend"
                                style={{ color: "white" }}
                              >
                                השתתפות במפגש
                                  </FormLabel>
                              <RadioGroup
                                row
                                aria-label="position"
                                name={student[1] + " 2"}
                              >
                                <FormControlLabel
                                  value="15"
                                  control={<Radio color="rgba(60,60,60)" />}
                                  label="5"
                                  labelPlacement="top"
                                />
                                <FormControlLabel
                                  value="12"
                                  control={<Radio color="rgba(60,60,60)" />}
                                  label="4"
                                  labelPlacement="top"
                                />
                                <FormControlLabel
                                  value="9"
                                  control={<Radio color="rgba(60,60,60)" />}
                                  label="3"
                                  labelPlacement="top"
                                />
                                <FormControlLabel
                                  value="6"
                                  control={<Radio color="rgba(60,60,60)" />}
                                  label="2"
                                  labelPlacement="top"
                                />
                                <FormControlLabel
                                  value="3"
                                  control={<Radio color="rgba(60,60,60)" />}
                                  label="1"
                                  labelPlacement="top"
                                />
                                <FormControlLabel
                                  value="0"
                                  control={<Radio color="rgba(60,60,60)" />}
                                  label="0"
                                  labelPlacement="top"
                                />
                              </RadioGroup>
                              <FormLabel
                                component="legend"
                                style={{ color: "white" }}
                              >
                                תרומה למפגש
                                  </FormLabel>
                              <RadioGroup
                                row
                                aria-label="position"
                                name={student[1] + " 3"}
                              >
                                <FormControlLabel
                                  value="15"
                                  control={<Radio color="rgba(60,60,60)" />}
                                  label="5"
                                  labelPlacement="top"
                                />
                                <FormControlLabel
                                  value="12"
                                  control={<Radio color="rgba(60,60,60)" />}
                                  label="4"
                                  labelPlacement="top"
                                />
                                <FormControlLabel
                                  value="9"
                                  label="3"
                                  control={<Radio color="rgba(60,60,60)" />}
                                  color="white"
                                  labelPlacement="top"
                                />
                                <FormControlLabel
                                  value="6"
                                  control={<Radio color="rgba(60,60,60)" />}
                                  label="2"
                                  labelPlacement="top"
                                />
                                <FormControlLabel
                                  value="3"
                                  control={<Radio color="rgba(60,60,60)" />}
                                  label="1"
                                  labelPlacement="top"
                                />
                                <FormControlLabel
                                  value="0"
                                  control={<Radio color="rgba(60,60,60)" />}
                                  label="0"
                                  labelPlacement="top"
                                />
                              </RadioGroup>
                            </FormControl>
                          </div>
                          <br></br>
                        </div>
                      ))}
                    </div>
                  </tr>
                  <tr>
                    <SubmitResponsiveDialogActivityFeedback
                      id={props.id}
                      date={activity.date}
                      student={activity.form}
                    />
                  </tr>
                </table>
              </div>
            );
          }
        })}
      </CardContent>
    </Card>
  );
}
