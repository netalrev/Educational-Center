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
    maxWidth: 500,
    minWidth: 500,
    margin: "10px",
    opacity: 0.85,
    backgroundColor: "rgba(3, 3, 3, 0.5)",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    color: "red",
    text: "red",
    right: 0,
    transition: "transform 0.15s ease-in-out",
    marginInline: 400,
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

export default function ManageActivitiesFormPending(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [dates, setDates] = useState([]);
  const [checked, setChecked] = React.useState(true);
  const [zoomLink, setZoomLink] = useState(
    <tr>
      <FormElement name="activity_zoom" title=": קישור לזום" type="text" />
    </tr>
  );
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  var handleChange = (event) => {
    var toReturn;
    setChecked(!document.getElementById("zoomCheckBox").checked);
    //console.log(document.getElementById("zoomCheckBox").checked);
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
      var temp = ":תאריך פעילות מספר" + " " + (i + 1);
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
  var text = <b>{props.title}</b>;
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
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <table>
              <tr>
                <FormElement name="name" title=": שם הפעילות" type="text" />
              </tr>
              <tr>
                <FormElement
                  name="activity_img"
                  title=": קישור לתמונה"
                  type="text"
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
                />
              </tr>
              <tr id="dates_tr">{dates}</tr>
              <tr>
                <TextField
                  id="outlined-multiline-static"
                  label=": תיאור הפעילויות"
                  className={classes.textField}
                  name="activity_description"
                  multiline
                  rows={4}
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                    style: { color: "red" },
                  }}
                  InputProps={{
                    style: { color: "#fff" },
                  }}
                />
              </tr>
              <tr>
                <UploadResponsiveDialogActivities
                  isZoom={checked == false ? false : true}
                  phoneNumber={props.phoneNumber}
                  email={props.email}
                  givenName={props.givenName}
                  familyName={props.familyName}
                />
              </tr>
            </table>
          </div>
        </CardContent>
      </Collapse>
    </Card>
  );
}
