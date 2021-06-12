import React, { Component } from "react";
import "./profile.css";
import Amplify, { Auth } from "aws-amplify";
import { AmplifySignOut } from "@aws-amplify/ui-react";
import { useState, useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";
import ReactCardFlip from "react-card-flip";
import { Scrollbars } from "rc-scrollbars";
import ReplayIcon from "@material-ui/icons/Replay";
import { Accordion } from "@material-ui/core";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";
import {
  listApprovedUsers,
  listUsers,
  listApprovedActivitiess,
  listPendingUsers,
  listPendingActivitiess,
} from "../../graphql/queries";
import LinearDeterminate from "./LinearDeterminate";

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
  const [myActivities, setMyActivities] = useState([]);
  const [myFinishActivities, setMyFinishActivities] = useState([]);
  const [url, setUrl] = useState([]);
  const [personalActivitiesID, setPersonalActivitiesID] = useState([]);
  const [personalActivitiesPending, setPersonalActivitiesPending] = useState(
    []
  );

  var activitiesHTML = "";

  // alert(activitysHTML);
  function howManyFeedBacks(activities) {
    const feedbackPerActivity = activities
      .filter((activity) => personalActivitiesID.includes(activity.id))
      .map((activity) => {
        var amount = 0;
        activity.dates.forEach((date) => {
          if (dates_class.compare(dateAndTime, dates_class.convert(date)) >= 0)
            amount += 1;
        });
        var id = activity.id;
        return { id, amount };
      });
    return feedbackPerActivity;
  }
  const fetchTimeAndDate = async () => {

    try {
      var url =
        "https://timezone.abstractapi.com/v1/current_time/?api_key=6fd38868af1a4f1b8958be2d7f676947&location=Jerusalem";
      if (url.length !== 0) {
        const res = await fetch(url);
        const data = await res.json();
        setDateAndTime(data.datetime);
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
      const feedbacks = howManyFeedBacks(approvedActivitiesList);
      var finished = [];
      var notFinshed = [];
      const x = approvedActivitiesList
        .filter((activity) => personalActivitiesID.includes(activity.id))
        .map((activity) => {
          var progress = parseInt(
            (feedbacks.filter((feedback) => feedback.id === activity.id)[0]
              .amount /
              activity.dates.length) *
            100
          );
          if (
            feedbacks.filter((feedback) => feedback.id === activity.id)[0]
              .amount <
            approvedActivitiesList.filter(
              (activity2) => activity2.id === activity.id
            )[0].dates.length
          )
            notFinshed.push(
              <div className="activityRow">
                <p>{activity.title}</p>
                <LinearDeterminate score={progress} />
                <p>
                  {
                    feedbacks.filter(
                      (feedback) => feedback.id === activity.id
                    )[0].amount
                  }{" "}
                  /{" "}
                  {
                    approvedActivitiesList.filter(
                      (activity2) => activity2.id === activity.id
                    )[0].dates.length
                  }
                </p>
                <br></br>
              </div>
            );
          else
            finished.push(
              <div className="activityRow">
                <p>{activity.title}</p>
                <p>
                  {
                    feedbacks.filter(
                      (feedback) => feedback.id === activity.id
                    )[0].amount
                  }{" "}
                  /{" "}
                  {
                    approvedActivitiesList.filter(
                      (activity2) => activity2.id === activity.id
                    )[0].dates.length
                  }
                </p>
                <br></br>
              </div>
            );
          return activity.id;
        });
      setMyActivities(notFinshed);
      setMyFinishActivities(finished);
    } catch (error) {
      console.log("error on fetching Approved Activities", error);
    }
  };

  const fetchPendingUsers = async () => {
    try {
      const usersData = await API.graphql(graphqlOperation(listPendingUsers));
      const usersList = usersData.data.listPendingUsers.items;
      const activityData = await API.graphql(
        graphqlOperation(listApprovedActivitiess)
      );
      const activityList = activityData.data.listApprovedActivitiess.items;
      const personalActivitiesIdList = usersList
        .filter((user) => user.email === props.email)
        .map((user) => user.activity_id);
      const myPendingActivities = activityList
        .filter((activity) => personalActivitiesIdList.includes(activity.id))
        .map((activity) => (
          <div className="activityRow">
            <p>{activity.title}</p>
            <br></br>
          </div>
        ));
      setPersonalActivitiesPending(myPendingActivities);
    } catch (error) {
      console.log("error on fetching pending users", error);
    }
  };

  const fetchApprovedUsers = async () => {
    try {
      const usersData = await API.graphql(graphqlOperation(listApprovedUsers));
      const usersList = usersData.data.listApprovedUsers.items;
      const personalActivitiesIdList = usersList.filter(
        (user) => user.email === props.email
      );
      const IDs = personalActivitiesIdList.map((activity) => {
        if (activity !== null) {
          return activity.activity_id;
        }
      });
      setPersonalActivitiesID(IDs);
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
      if (props.groupName === "approvedUsers")
        setMyScore(usersList.filter((user) => user.email === props.email)[0]);
    } catch (error) {
      console.log("error on fetching users", error);
    }
  };
  useEffect(() => {
    fetchApprovedUsers();
  }, []);
  useEffect(() => {
    fetchAllApprovedActivities();
  }, [personalActivitiesID, dateAndTime]);

  useEffect(() => {
    fetchUsers();
  }, []);
  useEffect(() => {
    fetchPendingUsers();
  }, []);

  return (
    <div className="card">
      <div className="ds-top">
        <h4 className="myCurses">הקורסים שלי</h4>
      </div>
      <div>
        <Scrollbars
          style={{
            marginBlockStart: "80px",
            width: 300,
            height: 390,
            float: "right",
          }}
        >
          <div id="container3">
            <div className="activityRow">
              <div className="ds pens">
                <h6 className="levels2"> {myFinishActivities.length} </h6>
                <h6
                  className="prof2"
                  title="Number of pens created by the user"
                >
                  קורסים שסיימת, קטן עלייך
                </h6>
                <img className="pointsAvatar2" src={"/img/completed.png"} />
              </div>
            </div>
            <div
              style={{
                paddingTop: "10px",
                textShadow: "0 0 19px #ffffff",
                marginBottom: "45px",
                fontSize: "13px",
                color: "#132c33",
                fontWeight: "600",
              }}
            >
              {myFinishActivities}
            </div>
          </div>
          <div id="container2">
            <div className="activityRow">
              <div className="ds pens">
                <tr>
                  <h6 className="levels"> {myActivities.length} </h6>
                </tr>
                <tr>
                  <h6
                    className="prof2"
                    title="Number of pens created by the user"
                  >
                    קורסים שבלעדייך זה לא יהיה אותו הדבר
                  </h6>
                  <img className="pointsAvatar2" src={"/img/validation.png"} />
                </tr>
              </div>
            </div>
            <div
              style={{
                paddingTop: "10px",
                textShadow: "0 0 19px #ffffff",
                marginBottom: "45px",
                fontSize: "13px",
                color: "#132c33",
                fontWeight: "600",
              }}
            >
              {myActivities}
            </div>
          </div>
          <div id="container2">
            <div className="activityRow1">
              <div className="ds pens">
                <h6 className="levels"> {personalActivitiesPending.length} </h6>
                <h6
                  className="prof2"
                  title="Number of pens created by the user"
                >
                  קורסים שממש עוד מעט נאשר אותך אליהם
                </h6>
                <img className="pointsAvatar2" src={"/img/pending.png"} />
              </div>
            </div>

            <div
              style={{
                paddingTop: "10px",
                textShadow: "0 0 19px #ffffff",
                marginBottom: "45px",
                fontSize: "13px",
                color: "#132c33",
                fontWeight: "600",
              }}
            >
              {personalActivitiesPending}
            </div>
          </div>
        </Scrollbars>
      </div>
      <div className="logout">
        <div className="bottomProfile" onClick={props.function}>
          <ReplayIcon fontSize="large" className="flipIcon" />
        </div>
      </div>
    </div>
  );
}
