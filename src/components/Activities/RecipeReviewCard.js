import React from "react";
import clsx from "clsx";
import { useState, useEffect } from "react";
import { listPendingUsers, listApprovedUsers } from "../../graphql/queries";
import { API, graphqlOperation } from "aws-amplify";

import RegisterResponsiveDialogActivities from "./RegisterResponsiveDialogActivities"
import CancelRegisterResponsiveDialogActivities from "./CancelRegisterResponsiveDialogActivities"
import CancelParticipationResponsiveDialogActivities from "./CancelParticipationResponsiveDialogActivities"
import "./RecipeReviewCard.css";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import VideocamIcon from '@material-ui/icons/Videocam';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import OpenZoomLink from "./OpenZoomLink";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    margin: "10px",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    color: "white",
    text: "white",
    borderRadius: "4%",
    right: 0,
    transition: "transform 0.15s ease-in-out",
    "&:hover": { transform: "scale3d(1.05, 1.05, 1)" },
  },

  media: {
    height: 0,
    color: "white",
    paddingTop: "56.25%", // 16:9
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

export default function RecipeReviewCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [pendingUsers, setPendingUsers] = useState([]);
  const [approvedUsers, setApprovedUsers] = useState([]);

  useEffect(() => {
    fetchPendingUsers();
  }, []);

  useEffect(() => {
    fetchApprovedUsers();
  }, []);

  const fetchApprovedUsers = async () => {
    try {
      const usersData = await API.graphql(graphqlOperation(listApprovedUsers));
      const usersList = usersData.data.listApprovedUsers.items;
      setApprovedUsers(usersList);
    } catch (error) {
      console.log("error on fetching approved users", error);
    }
  };

  const fetchPendingUsers = async () => {
    try {
      const usersData = await API.graphql(graphqlOperation(listPendingUsers));
      const usersList = usersData.data.listPendingUsers.items;
      setPendingUsers(usersList);
    } catch (error) {
      console.log("error on fetching pending users", error);
    }
  };
  var dates_class = {
    convert: function (d) {
      // Converts the date in d to a date-object. The input can be:
      //   a date object: returned without modification
      //  an array      : Interpreted as [year,month,day]. NOTE: month is 0-11.
      //   a number     : Interpreted as number of milliseconds
      //                  since 1 Jan 1970 (a timestamp) 
      //   a string     : Any format supported by the javascript engine, like
      //                  "YYYY/MM/DD", "MM/DD/YYYY", "Jan 31 2009" etc.
      //  an object     : Interpreted as an object with year, month and date
      //                  attributes.  **NOTE** month is 0-11.
      return (
        d.constructor === Date ? d :
          d.constructor === Array ? new Date(d[0], d[1], d[2]) :
            d.constructor === Number ? new Date(d) :
              d.constructor === String ? new Date(d) :
                typeof d === "object" ? new Date(d.year, d.month, d.date) :
                  NaN
      );
    },
    compare: function (a, b) {
      // Compare two dates (could be of any type supported by the convert
      // function above) and returns:
      //  -1 : if a < b
      //   0 : if a = b
      //   1 : if a > b
      // NaN : if a or b is an illegal date
      // NOTE: The code inside isFinite does an assignment (=).
      return (
        isFinite(a = this.convert(a).valueOf()) &&
          isFinite(b = this.convert(b).valueOf()) ?
          (a > b) - (a < b) :
          NaN
      );
    },
    inRange: function (d, start, end) {
      // Checks if date in d is between dates in start and end.
      // Returns a boolean or NaN:
      //    true  : if d is between start and end (inclusive)
      //    false : if d is before start or after end
      //    NaN   : if one or more of the dates is illegal.
      // NOTE: The code inside isFinite does an assignment (=).
      return (
        isFinite(d = this.convert(d).valueOf()) &&
          isFinite(start = this.convert(start).valueOf()) &&
          isFinite(end = this.convert(end).valueOf()) ?
          start <= d && d <= end :
          NaN
      );
    }
  };
  var tzoffset_start = (new Date()).getTimezoneOffset() * 60000;
  var tzoffset_end = (new Date()).getTimezoneOffset() * 60000 - 20 * 60000;
  var current_time = dates_class.convert(new Date(Date.now() - tzoffset_start).toISOString().substring(0, 16));
  var current_time_20 = dates_class.convert(new Date(Date.now() - tzoffset_end).toISOString().substring(0, 16));
  // console.log(current_time_20);
  function whichButton() {
    var start = Array.from(props.dates).filter(date => (dates_class.compare(dates_class.convert(date), current_time) <= 0) && (dates_class.compare(dates_class.convert(date + 20 * 60000), current_time) === -1)).length !== 0 ? true : false;
    console.log(start);
    if (dates_class.compare(dates_class.convert(props.dates[props.dates.length - 1]), current_time) <= 0) {
      return (<h3 style={{ color: "red" }}>הפעילות הסתיימה</h3>);
    }
    else if (approvedUsers.filter(users => users.activity_id === props.id).filter(users => users.name === props.givenName + " " + props.familyName).length === 0 && dates_class.compare(dates_class.convert(props.dates[0]), current_time) <= 0) {
      return (<h3 style={{ color: "red" }}>מועד הרשמה אחרון עבר</h3>);
    }
    else if (start === true && approvedUsers.filter(users => users.activity_id === props.id).filter(users => users.name === props.givenName + " " + props.familyName).length !== 0) {
      return (<OpenZoomLink
        zoom={props.zoom} />);
    }
    else if (approvedUsers.filter(users => users.activity_id === props.id).filter(users => users.name === props.givenName + " " + props.familyName).length !== 0 && dates_class.compare(dates_class.convert(props.dates[0]), current_time) <= 0) {
      return (<h3 style={{ color: "green" }}>הקישור יפתח במפגש הבא</h3>);
    }
    else if (pendingUsers.filter(users => users.activity_id === props.id).filter(users => users.name === props.givenName + " " + props.familyName).length !== 0) {
      return (<CancelRegisterResponsiveDialogActivities
        email={props.email}
        givenName={props.givenName}
        familyName={props.familyName}
        phoneNumber={props.phoneNumber}
        id={pendingUsers.filter(users => users.activity_id === props.id).filter(users => users.name === props.givenName + " " + props.familyName)[0].id} />);
    }
    else if (approvedUsers.filter(users => users.activity_id === props.id).filter(users => users.name === props.givenName + " " + props.familyName).length !== 0) {
      return (<CancelParticipationResponsiveDialogActivities
        email={props.email}
        givenName={props.givenName}
        familyName={props.familyName}
        phoneNumber={props.phoneNumber}
        id={approvedUsers.filter(users => users.activity_id === props.id).filter(users => users.name === props.givenName + " " + props.familyName)[0].id} />);
    }
    else {
      return (<RegisterResponsiveDialogActivities
        email={props.email}
        givenName={props.givenName}
        familyName={props.familyName}
        phoneNumber={props.phoneNumber}
        id={props.id} />)
    }

  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Card className={classes.root}>
      <CardHeader
        title={<h1 className="title__h1">{props.title} {approvedUsers.filter(users => users.activity_id === props.id).filter(users => users.name === props.givenName + " " + props.familyName).length !== 0 ? <VerifiedUserIcon color="primary"></VerifiedUserIcon> : ""}</h1>}
        subheader={
          <Typography className={classes.subColor}>
            ע"י: {props.owner}
          </Typography>
        }
      />
      <CardMedia
        className={classes.media}
        image={props.img === "" ? "https://vcunited.club/wp-content/uploads/2020/01/No-image-available-2.jpg" : props.img}
      />
      <CardContent></CardContent>
      <CardActions style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        {props.zoom === "" ? <VideocamOffIcon color="primary"></VideocamOffIcon> : <VideocamIcon color="primary"></VideocamIcon>}
        {whichButton()}
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
          <Typography paragraph>
            <Typography variant="body2" color="white" component="p">
              <h3>מספר מפגשים: {props.activityCount}</h3>
              <p>-</p>
              <h3>:תאריכים</h3>
              {props.dates.map((date, index) => {
                return <p> מפגש {index + 1} : תאריך - {date.substring(0, 10).split("-").reverse().join("-")} שעה - {date.substring(11)}</p>
              })}
              <p>-</p>
              <h3>:תיאור הפעילות</h3>
            </Typography>
            {props.description}
          </Typography>
        </CardContent>
      </Collapse>
    </Card >
  );
}
