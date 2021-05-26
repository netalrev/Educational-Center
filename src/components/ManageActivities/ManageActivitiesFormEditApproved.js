import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import { red } from "@material-ui/core/colors";
import FormElement from "./FormElement";
import TextField from "@material-ui/core/TextField";
import UpdateResponsiveDialogActivities from "./UpdateResponsiveDialogActivities";
import { useState, useEffect } from "react";
import { listApprovedActivitiess } from "../../graphql/queries";
import { API, graphqlOperation } from "aws-amplify";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 1000,
    margin: "10px",
    backgroundColor: "#000000",
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
  tr_dates: {
    margin: "auto",
  },
  avatar: {
    backgroundColor: red[500],
    color: "white",
  },
  subColor: {
    color: "red",
  },
  textField: {
    zIndex: "0",
    border: "3px solid red",
    borderRadius: "33px",
    marginLeft: "auto",
    marginRight: "auto",
    widht: "95%",
    "& label.Mui-focused": {
      padding: "10px",
      color: "white",
    },
    "& input": {
      color: "white",
    },
    "& label": {
      padding: "10px",
      color: "white",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "red",
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "black",
      },
    },
  },
}));

export default function ManageActivitiesFormEditApproved(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [approvedActivitiess, setApprovedActivitiess] = useState([]);
  const [allApprovedActivitiess, setAllApprovedActivitiess] = useState([]);
  const [dates, setDates] = useState(fillDateInputs, []);
  const [zoomLink, setZoomLink] = useState(fillZoomInput, "");
  const [checked, setChecked] = useState(fillCheckInput, "");

  var handleChange = (event) => {
    var toReturn;
    setChecked(!document.getElementById("zoomCheckBox").checked);
    if (!document.getElementById("zoomCheckBox").checked == true) {
      toReturn = (
        <tr>
          <FormElement name="activity_zoom" title=": קישור לזום" type="text" />
        </tr>
      );
    } else {
      toReturn = null;
    }
    setZoomLink(toReturn);
  };

  useEffect(() => {
    // Fetch for content suppliers
    fetchApprovedActivities();
  }, []);

  useEffect(() => {
    // Fetch for admins
    fetchAllApprovedActivities();
  }, []);
  const fetchApprovedActivities = async () => {
    try {
      const ApprovedActivitiesData = await API.graphql(
        graphqlOperation(listApprovedActivitiess, {
          filter: { email: { eq: props.email } },
        })
      );
      const ApprovedActivitiesList =
        ApprovedActivitiesData.data.listApprovedActivitiess.items;
      setApprovedActivitiess(ApprovedActivitiesList);
    } catch (error) {
      console.log("error on fetching Approved Activities", error);
    }
  };

  const fetchAllApprovedActivities = async () => {
    try {
      const ApprovedActivitiesData = await API.graphql(
        graphqlOperation(listApprovedActivitiess)
      );
      const ApprovedActivitiesList =
        ApprovedActivitiesData.data.listApprovedActivitiess.items;
      setAllApprovedActivitiess(ApprovedActivitiesList);
    } catch (error) {
      console.log("error on fetching Approved Activities", error);
    }
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  function createDateInputs(event) {
    var toReturn = [];
    if (document.getElementsByName("activityCount")[0].value > 10) {
      document.getElementsByName("activityCount")[0].value = 10;
    } else if (document.getElementsByName("activityCount")[0].value < 1) {
      document.getElementsByName("activityCount")[0].value = 1;
    }
    var tzoffset = new Date().getTimezoneOffset() * 60000;
    for (
      var i = 0;
      i < document.getElementsByName("activityCount")[0].value;
      i++
    ) {
      var temp = ":תאריך פעילות מספר" + " " + (i + 1);
      toReturn.push(
        <tr>
          <TextField
            id="datetime-local"
            name="dates"
            label={temp}
            type="datetime-local"
            defaultValue={new Date(Date.now() - tzoffset)
              .toISOString()
              .substring(0, 16)}
            className={classes.textField}
          />
        </tr>
      );
    }
    setDates(toReturn);
  }
  function fillDateInputs() {
    var toReturn = [];
    var tzoffset = new Date().getTimezoneOffset() * 60000;
    for (var i = 0; i < props.activityCount; i++) {
      var temp = ":תאריך פעילות מספר" + " " + (i + 1);
      toReturn.push(
        <tr className={classes.tr_dates}>
          <TextField
            id="datetime-local"
            name="dates"
            label={temp}
            type="datetime-local"
            defaultValue={props.dates[i]}
            className={classes.textField}
          />
        </tr>
      );
    }
    return toReturn;
  }

  function fillZoomInput() {
    if (props.isZoom) {
      return (
        <tr>
          <FormElement
            name="activity_zoom"
            title=": קישור לזום"
            type="text"
            defaultValue={props.zoom}
          />
        </tr>
      );
    }
    return null;
  }
  function fillCheckInput() {
    if (props.isZoom) {
      return true;
    }
    return false;
  }
  var text = <b>{props.title}</b>;
  return (
    <Card className={classes.root}>
      <CardHeader title={text} />
      <CardContent>
        {props.groupName === "admins"
          ? allApprovedActivitiess.map((activity) => {
              if (props.id === activity.id) {
                return (
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <table>
                      <tr>
                        <FormElement
                          name="name"
                          title=": שם הפעילות"
                          type="text"
                          defaultValue={activity.title}
                        />
                      </tr>
                      <tr>
                        <FormElement
                          name="activity_img"
                          title=": קישור לתמונה"
                          type="text"
                          defaultValue={activity.img}
                        />
                      </tr>
                      <tr>
                        מפגש בזום
                        <Checkbox
                          id="zoomCheckBox"
                          checked={checked}
                          onClick={handleChange}
                          fill="red"
                          inputProps={{ "aria-label": "primary checkbox" }}
                        />
                      </tr>
                      <tr>{zoomLink}</tr>
                      <tr>
                        <FormElement
                          name="activityCount"
                          title=": מספר פעילויות"
                          type="number"
                          onChange={createDateInputs}
                          defaultValue={activity.activityCount}
                        />
                      </tr>
                      <tr id="dates_tr">{dates}</tr>
                      <tr>
                        <TextField
                          id="outlined-multiline-static"
                          label=": תיאור הפעילויות"
                          className={classes.textField}
                          name="activity_description"
                          defaultValue={activity.description}
                          multiline
                          rows={4}
                          variant="outlined"
                          InputLabelProps={{
                            style: {
                              color: "#fff",
                              right: "0px",
                              marginLeft: "35px",
                              backgroundColor: "black",
                            },
                            shrink: true,
                          }}
                          InputProps={{
                            style: { color: "#fff" },
                          }}
                          ד
                        />
                      </tr>
                      <tr>
                        <UpdateResponsiveDialogActivities
                          isZoom={checked}
                          currentTime={props.currentTime}
                          groupName={props.groupName}
                          type={props.type}
                          id={activity.id}
                          dates={dates}
                        />
                      </tr>
                    </table>
                  </div>
                );
              }
            })
          : approvedActivitiess.map((activity) => {
              if (props.id === activity.id) {
                return (
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <table>
                      <tr>
                        מפגש בזום
                        <Checkbox
                          id="zoomCheckBox"
                          checked={checked}
                          onClick={handleChange}
                          fill="red"
                          inputProps={{ "aria-label": "primary checkbox" }}
                        />
                      </tr>
                      <tr>{zoomLink}</tr>
                      <tr>
                        <FormElement
                          name="activityCount"
                          title=": מספר פעילויות"
                          type="number"
                          onChange={createDateInputs}
                          defaultValue={activity.activityCount}
                        />
                      </tr>
                      <tr id="dates_tr">{dates}</tr>
                      <tr>
                        <UpdateResponsiveDialogActivities
                          isZoom={checked}
                          groupName={props.groupName}
                          id={activity.id}
                          type={props.type}
                          idx={props.idx}
                          currentTime={props.currentTime}
                          dates={dates}
                        />
                      </tr>
                    </table>
                  </div>
                );
              }
            })}
      </CardContent>
      {/* </Collapse> */}
    </Card>
  );
}
