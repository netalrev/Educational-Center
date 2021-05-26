import React, { Component } from "react";
import "./profile.css";
import Amplify, { Auth } from "aws-amplify";
import { AmplifySignOut } from "@aws-amplify/ui-react";
import { useState, useEffect } from "react";
import Dog from "../Avatars/Dog";
import { listUsers } from "../../graphql/queries";
import { API, graphqlOperation } from "aws-amplify";
import ReactCardFlip from "react-card-flip";
import ReplayIcon from "@material-ui/icons/Replay";
import { Accordion } from "@material-ui/core";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";
import { listApprovedUsers } from "../../graphql/queries";
import { listApprovedActivitiess } from "../../graphql/queries";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

var level = 6;
var nextLevel = 88;
var registeredActivities = 1;
var pastActivities = 1;
var procces = registeredActivities / registeredActivities;
function handleClick(e) {
  e.preventDefault();
  this.setState((prevState) => ({ isFlipped: !prevState.isFlipped }));
}
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
    return d.constructor === Date
      ? d
      : d.constructor === Array
      ? new Date(d[0], d[1], d[2])
      : d.constructor === Number
      ? new Date(d)
      : d.constructor === String
      ? new Date(d)
      : typeof d === "object"
      ? new Date(d.year, d.month, d.date)
      : NaN;
  },
  compare: function (a, b) {
    // Compare two dates (could be of any type supported by the convert
    // function above) and returns:
    //  -1 : if a < b
    //   0 : if a = b
    //   1 : if a > b
    // NaN : if a or b is an illegal date
    // NOTE: The code inside isFinite does an assignment (=).
    return isFinite((a = this.convert(a).valueOf())) &&
      isFinite((b = this.convert(b).valueOf()))
      ? (a > b) - (a < b)
      : NaN;
  },
  inRange: function (d, start, end) {
    // Checks if date in d is between dates in start and end.
    // Returns a boolean or NaN:
    //    true  : if d is between start and end (inclusive)
    //    false : if d is before start or after end
    //    NaN   : if one or more of the dates is illegal.
    // NOTE: The code inside isFinite does an assignment (=).
    return isFinite((d = this.convert(d).valueOf())) &&
      isFinite((start = this.convert(start).valueOf())) &&
      isFinite((end = this.convert(end).valueOf()))
      ? start <= d && d <= end
      : NaN;
  },
};

export default function Back(props) {
  const [users, setUsers] = useState([]);
  const [myScore, setMyScore] = useState([]);
  const [prevState, setState] = useState(props.flip_state);
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [approvedUsers, setApprovedUsers] = useState([]);
  const [allApprovedActivities, setAllApprovedActivities] = useState([]);
  const [dateAndTime, setDateAndTime] = useState([]);
  const [url, setUrl] = useState([]);
  const [personalActivitiesID, setPersonalActivitiesID] = useState([]);
  const [personalActivities, setPersonalActivities] = useState([]);

  var activitiesHTML = "";

  // alert(activitysHTML);

  const fetchTimeAndDate = async () => {
    try {
      var url =
        "http://api.timezonedb.com/v2.1/get-time-zone?key=7IOGNZDWONQE&format=json&by=zone&zone=Asia/Jerusalem";
      if (url.length !== 0) {
        const res = await fetch(url);
        const data = await res.json();
        setDateAndTime(data.formatted);
      }
    } catch (err) {
      console.log("Error fetching date and time.", err);
    }
  };

  useEffect(() => {
    fetchTimeAndDate();
  }, [url]);
  function comparing(a, b) {
    var i = 0,
      j = 0;
    while (i < a.activityCount && j < b.activityCount) {
      if (
        dates_class.compare(dates_class.convert(a.dates[i]), dateAndTime) === -1
      ) {
        i++;
        continue;
      } else if (
        dates_class.compare(dates_class.convert(b.dates[j]), dateAndTime) === -1
      ) {
        j++;
        continue;
      }
      if (
        dates_class.compare(
          dates_class.convert(a.dates[i]),
          dates_class.convert(b.dates[j])
        ) === 1
      )
        return 1;
      else if (
        dates_class.compare(
          dates_class.convert(a.dates[i]),
          dates_class.convert(b.dates[j])
        ) === 0
      )
        return 0;
      else return -1;
    }
  }
  const fetchAllApprovedActivities = async () => {
    try {
      const approvedActivitiesData = await API.graphql(
        graphqlOperation(listApprovedActivitiess)
      );
      const approvedActivitiesList =
        approvedActivitiesData.data.listApprovedActivitiess.items;
      approvedActivitiesList.sort(comparing);
      setAllApprovedActivities(approvedActivitiesList);
    } catch (error) {
      console.log("error on fetching Approved Activities", error);
    }
  };
  const fetchPersonalActivities = async () => {
    try {
      const temp = personalActivitiesID.map((activity) => parseInt(activity));
      const personalActivitiesList = allApprovedActivities.filter((activity) =>
        personalActivitiesID.includes(activity.id)
      );
      //activitiesHTML = "";
      for (var i = 0; i < personalActivitiesList.length; i++) {
        activitiesHTML +=
          "<div><p>" + personalActivitiesList[i].title + "</p></div>";
      }

      //console.log("okokok: " + activitiesHTML);
      //document.getElementById("container").innerHTML = activitiesHTML;
      console.log("NEW PERSONAL", personalActivitiesList);
    } catch (error) {
      console.log("error on fetching approved users", error);
    }
  };
  const fetchApprovedUsers = async () => {
    try {
      const usersData = await API.graphql(graphqlOperation(listApprovedUsers));
      const usersList = usersData.data.listApprovedUsers.items;
      const personalActivitiesIdList = usersList
        .filter((user) => user.email === props.email)
        .map((user) => user.activity_id);
      console.log(personalActivitiesIdList);
      setPersonalActivitiesID(personalActivitiesIdList);
      setApprovedUsers(usersList);
    } catch (error) {
      console.log("error on fetching approved users", error);
    }
  };
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const fetchUsers = async () => {
    try {
      const usersData = await API.graphql(graphqlOperation(listUsers));
      const usersList = usersData.data.listUsers.items;
      console.log(props.groupName);
      console.log(usersList.filter((user) => user.email === props.email));
      if (props.groupName === "approvedUsers")
        setMyScore(usersList.filter((user) => user.email === props.email)[0]);
      console.log(usersList.filter((user) => user.email === props.email)[0]);
    } catch (error) {
      console.log("error on fetching users", error);
    }
  };
  useEffect(() => {
    fetchApprovedUsers();
  }, []);
  useEffect(() => {
    fetchAllApprovedActivities();
  }, []);

  useEffect(() => {
    var elm = document.querySelector("#progress1");
    setInterval(function () {
      if (!elm.innerHTML.match(/87%/gi)) {
        elm.innerHTML = parseInt(elm.innerHTML) + 1 + "%";
      } else {
        clearInterval();
      }
    }, 18);
  }, []);
  useEffect(() => {
    fetchUsers();
  }, []);
  useEffect(() => {
    fetchPersonalActivities();
  }, []);

  return (
    <div className="card">
      <div className="ds-top">
        <h4>הפעילויות שלי</h4>
      </div>
      <div id="container2">
        <div className="activityRow">
          <p>אפייה מנהלית</p>
          <div class="progress2">
            <div class="progress2-value"></div>
          </div>
        </div>

        <div className="activityRow">
          <p>שיגור ארנבים</p>
          <div class="progress2">
            <div class="progress2-value"></div>
          </div>
        </div>
        <div className="activityRow">
          <p>ציד חייזרים</p>
          <div class="progress2">
            <div class="progress2-value"></div>
          </div>
        </div>
        <div className="ds-info">
          <div className="ds projects">{}</div>
        </div>
      </div>
      <div className="logout">
        <div className="bottomProfile" onClick={props.function}>
          <ReplayIcon fontSize="large" className="flipIcon" />
        </div>
      </div>
    </div>
  );
}
