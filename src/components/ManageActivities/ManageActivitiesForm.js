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
import { useState } from "react";
import UploadResponsiveDialogActivities from "./UploadResponsiveDialogActivities";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "40%",
    minWidth: "40%",
    left: 0,
    margin: "auto",
    borderRadius: "10px",
    border: "3px solid #132c33",
    marginTop: "20px",
    opacity: 0.85,
    backgroundColor: "#d8e3e7",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    color: "#132c33",
    text: "#132c33",
    right: 0,
    transition: "transform 0.15s ease-in-out",
    textAlign: "center",
    justifyContent: "center",
  },

  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    color: "d8e3e7", //arrow color
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
    color: "d8e3e7",
  },
  avatar: {
    backgroundColor: "#132c33",
    color: "white",
  },
  subColor: {
    color: "#d8e3e7",
  },

  textField: {
    zIndex: "0",
    border: "3px solid #132c33",
    borderRadius: "10px",
    minWidth: "450px",
    //textAlign: "center",

    "& label.Mui-focused": {
      padding: "10px",
      color: "#132c33",
    },
    "& input": {
      color: "#132c33",
    },
    "& label": {
      padding: "10px",
      color: "#132c33",
    },
    "& .MuiInput-underline:before": {
      borderBottomColor: "#132c33",
      display: "none",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#132c33",
      display: "none",
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        display: "none",
      },
    },
  },
}));

export default function ManageActivitiesFormPending(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [dates, setDates] = useState([]);
  const [checked, setChecked] = React.useState(true);
  const [zoomLink, setZoomLink] = useState(
    <tr>
      <FormElement name="activity_zoom" title="קישור לזום :" type="text" />
    </tr>
  );
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  var handleChange = (event) => {
    var toReturn;
    setChecked(!document.getElementById("zoomCheckBox").checked);
    if (!document.getElementById("zoomCheckBox").checked == true) {
      toReturn = (
        <tr>
          <FormElement name="activity_zoom" title="קישור לזום :" type="text" />
        </tr>
      );
    } else {
      toReturn = null;
    }
    setZoomLink(toReturn);
  };

  function createDateInputs(event) {
    var toReturn = [];
    if (document.getElementsByName("activityCount")[0].value > 10) {
      document.getElementsByName("activityCount")[0].value = 10;
    } else if (document.getElementsByName("activityCount")[0].value < 1) {
      document.getElementsByName("activityCount")[0].value = 1;
    }
    for (
      var i = 0;
      i < document.getElementsByName("activityCount")[0].value;
      i++
    ) {
      var temp = "מפגש :" + " " + (i + 1);
      var tzoffset = new Date().getTimezoneOffset() * 60000;
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
  var text = <b style={{ color: "#132c33" }}>{props.title}</b>;
  return (
    <Card className={classes.root}>
      <CardHeader title={text} />
      <CardActions disableSpacing>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          style={{
            backgroundColor: "#132c33",
            maxWidth: "50px",
            maxHeight: "50px",
          }}
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <table>
              <tr>
                <FormElement name="name" title="שם הקורס :" type="text" />
              </tr>
              <tr>
                <FormElement
                  name="activity_img"
                  title="קישור לתמונת הקורס :"
                  type="text"
                  className={classes.textField}
                />
              </tr>
              <tr>
                הקורס יתבצע באופן מקוון
                <Checkbox
                  label="Antoine Llorca"
                  id="zoomCheckBox"
                  checked={checked}
                  onClick={handleChange}
                  inputProps={{ "aria-label": "primary checkbox" }}
                  style={{
                    paddingTop: "1px",
                    backgroundColor: "#132c33", maxWidth: "40px",
                    maxHeight: "40px",
                  }}
                />
              </tr>
              <tr>{zoomLink}</tr>
              <tr>
                <FormElement
                  name="activityCount"
                  title="מספר מפגשים :"
                  type="number"
                  onChange={createDateInputs}
                />
              </tr>
              <tr id="dates_tr">{dates}</tr>
              <tr>
                <TextField
                  id="outlined-multiline-static"
                  label=": תיאור הקורס"
                  className={classes.textField}
                  name="activity_description"
                  multiline
                  rows={4}
                  variant="outlined"
                />
              </tr>
              <tr>
                <UploadResponsiveDialogActivities
                  isZoom={checked == false ? false : true}
                  phoneNumber={props.phoneNumber}
                  email={props.email}
                  givenName={props.givenName}
                  familyName={props.familyName}
                  currentTime={props.currentTime}
                />
              </tr>
            </table>
          </div>
        </CardContent>
      </Collapse>
    </Card>
  );
}
