import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import { red } from "@material-ui/core/colors";
import SubmitResponsiveDialogActivityFeedback from "./SubmitResponsiveDialogActivityFeedback";
import { useState, useEffect } from "react";
import { listActivityFeedbacks } from "../../graphql/queries";
import { API, graphqlOperation } from "aws-amplify";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

//Style for adtivities edit page.
const useStyles = makeStyles((theme) => ({

  root: {
    maxWidth: 1000,
    minWidth: 400,
    margin: "5px",
    borderRadius: "10px",
    //border: "3px solid #132c33",
    right: 0,
    transition: "transform 0.15s ease-in-out",
    "& label": {
      margin: "5px",
      color: "#d8e3e7",
      fontSize: "20px",
      backgroundColor: "#126e82",
      borderRadius: "10px",

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
  checkboxLabelA: {
    fontWeight: "800",
    zIndex: "22222222",
    minWidth: "200px",
  },
  checkboxLabelB: {
    color: "blue",
  },
}));

export default function ManageActivitiesFeedbackFormEdit(props) {

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

  //async function for fetch activity feedback.
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

  //async function for fetch all activities feedbacks.
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

  var text = <b>{props.title}</b>;//Var for title.
  //React component .
  return (
    <Card
      className={classes.root}
      style={{
        backgroundColor: "#d8e3e7",
      }}
    >
      <CardHeader title={text} />
      <CardContent>
        {allActivitiesFeedback.map((activity) => {
          if (
            props.id === activity.activity_id &&
            activity.date === props.date
          ) {
            return (
              <table>
                <tr>
                  <div>
                    {activity.form.map((student) => (
                      <div>
                        <div
                        >
                          <h4>:{student[0]}</h4>
                          <br></br>
                          <FormControl
                            component="fieldset"
                            style={{
                              color: "#132c33",
                              backgroundColor: "#d8e3e7",
                            }}
                          >
                            <FormLabel
                              component="legend"
                              style={{ color: "#132c33" }}
                            >
                              נוכחות
                            </FormLabel>
                            <RadioGroup
                              row
                              aria-label="position"
                              name={student[1] + " 1"}
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                color: "#132c33",
                              }}
                            >
                              <p
                                style={{
                                  color: "#132c33",
                                  margin: "5px",
                                  fontSize: "15px",
                                }}
                              >
                                נכח
                              </p>
                              <FormControlLabel
                                value="10"
                                control={<Radio />}
                                label="נכח"
                                labelPlacement="top"
                                classes={{ label: classes.checkboxLabelA }}
                              />
                              <FormControlLabel
                                value="0"
                                control={<Radio color="#132c33" />}
                                label="לא נכח"
                                labelPlacement="top"
                                classes={{ label: classes.checkboxLabelB }}
                              />
                              <p
                                style={{
                                  color: "#132c33",
                                  margin: "5px",
                                  fontSize: "15px",
                                }}
                              >
                                לא נכח
                              </p>
                            </RadioGroup>
                            <FormLabel
                              component="legend"
                              style={{ color: "#132c33" }}
                            >
                              השתתפות
                            </FormLabel>
                            <RadioGroup
                              row
                              aria-label="position"
                              name={student[1] + " 2"}
                            >
                              <p
                                style={{
                                  color: "#132c33",
                                  margin: "5px",
                                  fontSize: "15px",
                                  fontWeight: "900",
                                }}
                              >
                                5
                              </p>
                              <FormControlLabel
                                value="15"
                                control={<Radio color="#132c33" />}
                                label="5"
                                labelPlacement="top"
                              />
                              <FormControlLabel
                                value="12"
                                control={<Radio color="#132c33" />}
                                label="4"
                                labelPlacement="top"
                              />
                              <FormControlLabel
                                value="9"
                                control={<Radio color="#132c33" />}
                                label="3"
                                labelPlacement="top"
                              />
                              <FormControlLabel
                                value="6"
                                control={<Radio color="#132c33" />}
                                label="2"
                                labelPlacement="top"
                              />
                              <FormControlLabel
                                value="3"
                                control={<Radio color="#132c33" />}
                                label="1"
                                labelPlacement="top"
                              />
                              <FormControlLabel
                                value="0"
                                control={<Radio color="#132c33" />}
                                label="0"
                                labelPlacement="top"
                              />
                              <p
                                style={{
                                  color: "#132c33",
                                  margin: "5px",
                                  fontSize: "15px",
                                  fontWeight: "900",
                                }}
                              >
                                0
                              </p>
                            </RadioGroup>
                            <FormLabel
                              component="legend"
                              style={{ color: "#132c33" }}
                            >
                              תרומה
                            </FormLabel>
                            <RadioGroup
                              row
                              aria-label="position"
                              name={student[1] + " 3"}
                            >
                              <p
                                style={{
                                  color: "#132c33",
                                  margin: "5px",
                                  fontSize: "15px",
                                  fontWeight: "900",
                                }}
                              >
                                5
                              </p>

                              <FormControlLabel
                                value="15"
                                control={<Radio color="#132c33" />}
                                label="5"
                                labelPlacement="top"
                              />
                              <FormControlLabel
                                value="12"
                                control={<Radio color="#132c33" />}
                                label="4"
                                labelPlacement="top"
                              />
                              <FormControlLabel
                                value="9"
                                label="3"
                                control={<Radio color="#132c33" />}
                                color="#132c33"
                                labelPlacement="top"
                              />
                              <FormControlLabel
                                value="6"
                                control={<Radio color="#132c33" />}
                                label="2"
                                labelPlacement="top"
                              />
                              <FormControlLabel
                                value="3"
                                control={<Radio color="#132c33" />}
                                label="1"
                                labelPlacement="top"
                              />
                              <FormControlLabel
                                value="0"
                                control={<Radio color="#132c33" />}
                                label="0"
                                labelPlacement="top"
                              />
                              <p
                                style={{
                                  color: "#132c33",
                                  margin: "5px",
                                  fontSize: "15px",
                                  fontWeight: "900",
                                }}
                              >
                                0
                              </p>
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
            );
          }
        })}
      </CardContent>
    </Card>
  );
}
