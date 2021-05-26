import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import { red } from "@material-ui/core/colors";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FormElement from "./FormElement";
import TextField from "@material-ui/core/TextField";
import UpdateResponsiveDialogActivities from "./UpdateResponsiveDialogActivities";
import { useState, useEffect } from "react";
import { listPendingActivitiess } from "../../graphql/queries";
import {
  deletePendingActivities,
  deleteApprovedActivities,
} from "../../graphql/mutations";
import Amplify, { API, graphqlOperation, selectInput } from "aws-amplify";
import ActivityTable from "../Activities/ActivityTable";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 1000,
    margin: "10px",
    backgroundColor: "black",
    color: "red",
    text: "white",
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
  textField: {
    zIndex: "0",
    border: "3px solid red",
    borderRadius: "9px",

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
    "& label span": {
      //For remove Asterisk from required inputs.
      display: "none",
    },
  },
}));

export default function ManageActivitiesFormEditPending(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [pendingActivitiess, setPendingActivitiess] = useState([]);
  const [allPendingActivitiess, setAllPendingActivitiess] = useState([]);
  const [dates, setDates] = useState(fillDateInputs, []);
  const [zoomLink, setZoomLink] = useState(fillZoomInput, "");
  const [checked, setChecked] = useState(fillCheckInput, "");

  // const [allPendingActivitiess, setAllPendingActivitiess] = useState([]);

  var handleChange = (event) => {
    var toReturn;
    setChecked(event.target.checked);
    if (event.target.checked == true) {
      toReturn = (
        <tr>
          <FormElement
            name="activity_zoom"
            title=": קישור לזום"
            type="text"
            defaultValue={props.zoom}
          />
        </tr>
      );
    } else {
      toReturn = null;
    }
    setZoomLink(toReturn);
  };

  useEffect(() => {
    // Fetch for content suppliers
    fetchPendingActivities();
  }, []);

  useEffect(() => {
    // Fetch for admins
    fetchAllPendingActivities();
  }, []);
  const fetchPendingActivities = async () => {
    try {
      const PendingActivitiesData = await API.graphql(
        graphqlOperation(listPendingActivitiess, {
          filter: { email: { eq: props.email } },
        })
      );
      const PendingActivitiesList =
        PendingActivitiesData.data.listPendingActivitiess.items;
      setPendingActivitiess(PendingActivitiesList);
    } catch (error) {
      console.log("error on fetching Pending Activities", error);
    }
  };

  const fetchAllPendingActivities = async () => {
    try {
      const PendingActivitiesData = await API.graphql(
        graphqlOperation(listPendingActivitiess)
      );
      const PendingActivitiesList =
        PendingActivitiesData.data.listPendingActivitiess.items;
      setAllPendingActivitiess(PendingActivitiesList);
    } catch (error) {
      console.log("error on fetching Pending Activities", error);
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
            InputLabelProps={{
              style: {
                color: "#fff",
                right: "0px",
                marginLeft: "35px",
                backgroundColor: "#e1980c",
              },
              shrink: true,
            }}
            InputProps={{
              style: { color: "#fff" },
            }}
          />
        </tr>
      );
    }
    setDates(toReturn);
  }
  function fillDateInputs() {
    var toReturn = [];
    for (var i = 0; i < props.activityCount; i++) {
      var temp = ":תאריך פעילות מספר" + " " + (i + 1);
      toReturn.push(
        <tr>
          <TextField
            id="datetime-local"
            name="dates"
            label={temp}
            type="datetime-local"
            defaultValue={props.dates[i]}
            className={classes.textField}
            InputLabelProps={{
              style: {
                color: "#fff",
                right: "0px",
                marginLeft: "35px",
                backgroundColor: "#e1980c",
              },
              shrink: true,
            }}
            InputProps={{
              style: { color: "#fff" },
            }}
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
        {console.log(props.email)}
        {props.groupName === "admins"
          ? allPendingActivitiess.map((activity) => {
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
                          onChange={handleChange}
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
                          name="activity_description"
                          label=": תיאור הפעילויות"
                          className={classes.textField}
                          defaultValue={activity.description}
                          multiline
                          rows={4}
                          variant="outlined"
                        />
                      </tr>
                      <tr>
                        <UpdateResponsiveDialogActivities
                          isZoom={checked}
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
          : pendingActivitiess.map((activity) => {
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
                          onChange={handleChange}
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
                          name="activity_description"
                          className={classes.textField}
                          defaultValue={activity.description}
                          multiline
                          rows={4}
                          variant="outlined"
                        />
                      </tr>
                      <tr>
                        <UpdateResponsiveDialogActivities
                          isZoom={checked}
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
            })}
      </CardContent>
      {/* </Collapse> */}
    </Card>
  );
}
