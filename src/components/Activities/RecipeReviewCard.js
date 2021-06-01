import React from "react";
import clsx from "clsx";
import { useState, useEffect } from "react";
import {
  listActivityFeedbacks,
  listPendingUsers,
  listApprovedUsers,
  listApprovedActivitiess,
} from "../../graphql/queries";
import { createActivityFeedback } from "../../graphql/mutations";
import { API, graphqlOperation } from "aws-amplify";
import { Scrollbars } from "rc-scrollbars";
import RegisterResponsiveDialogActivities from "./RegisterResponsiveDialogActivities";
import CancelRegisterResponsiveDialogActivities from "./CancelRegisterResponsiveDialogActivities";
import CancelParticipationResponsiveDialogActivities from "./CancelParticipationResponsiveDialogActivities";
import CancelParticipationResponsiveDialogActivitiesManager from "./CancelParticipationResponsiveDialogActivitiesManager";
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
import VideocamIcon from "@material-ui/icons/Videocam";
import VideocamOffIcon from "@material-ui/icons/VideocamOff";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import OpenZoomLink from "./OpenZoomLink";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 320,
    minWidth: 320,
    // maxHeight: 700,
    margin: "10px",
    background: "#132c33",
    borderRadius: "4%",
    border: "6px solid #132c33",
    right: 0,
    color: "#d8e3e7",
    transition: "transform 0.15s ease-in-out",
    //"&:hover": { transform: "scale3d(1.05, 1.05, 1)" },
    boxShadow: "5px 5px 9px rgba(20, 18, 18, 0.62)",
  },

  media: {
    height: 0,
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
  subColor: {
    color: "#d8e3e7",
  },
}));

export default function RecipeReviewCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [pendingUsers, setPendingUsers] = useState([]);
  const [approvedUsers, setApprovedUsers] = useState([]);
  const [activityFeedbacks, setActivityFeedbacks] = useState([]);
  const [allApprovedActivitiess, setAllApprovedActivitiess] = useState([]);
  useEffect(() => {
    fetchAllApprovedActivities();
  }, []);

  useEffect(() => {
    fetchPendingUsers();
  }, []);

  useEffect(() => {
    fetchApprovedUsers();
  }, []);
  useEffect(() => {
    fetchActivityFeedbacks();
  }, []);

  const fetchAllApprovedActivities = async () => {
    try {
      const approvedActivitiesData = await API.graphql(
        graphqlOperation(listApprovedActivitiess)
      );
      const approvedActivitiesList =
        approvedActivitiesData.data.listApprovedActivitiess.items;
      setAllApprovedActivitiess(approvedActivitiesList);
    } catch (error) {
      console.log("error on fetching Approved Activities", error);
    }
  };

  const fetchActivityFeedbacks = async () => {
    try {
      const feedbacksData = await API.graphql(
        graphqlOperation(listActivityFeedbacks)
      );
      const feedbackList = feedbacksData.data.listActivityFeedbacks.items;
      setActivityFeedbacks(feedbackList);
    } catch (error) {
      console.log("error on fetching activity feedbacks", error);
    }
  };
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
  const createNewActivityFeedback = async () => {
    try {
      var new_form = [];
      var filteredUsers = approvedUsers.filter(
        (user) => user.activity_id === props.id
      );
      filteredUsers.map((element) => {
        var student = [];
        student.push(element.name);
        student.push(element.email);
        student.push(element.phone_number);
        new_form.push(student);
      });
      var IDs = activityFeedbacks.map((element) => parseInt(element.id));
      IDs.sort(function compareNumbers(a, b) {
        return a - b;
      });
      var zoomLink = "";
      if (props.zoom.length > 0) zoomLink = props.zoom;
      const activityFeedback = {
        id: IDs.length == 0 ? 0 : IDs[IDs.length - 1] + 1,
        owner: props.owner,
        title: props.title,
        email: allApprovedActivitiess.filter(
          (activity) => activity.id === props.id
        )[0].email,
        activity_id: props.id,
        zoom: zoomLink,
        img: props.img,
        activityCount: props.activityCount,
        date: props.dates.filter(
          (date) =>
            dates_class.compare(
              dates_class.convert(props.currentTime),
              dates_class.convert(date)
            ) >= 0 &&
            dates_class.compare(
              dates_class.convert(props.currentTime),
              dates_class.convert(
                dates_class
                  .convert(date)
                  .setMinutes(dates_class.convert(date).getMinutes() + 20)
              )
            ) <= 0
        )[0],
        phone_number: allApprovedActivitiess.filter(
          (activity) => activity.id === props.id
        )[0].phone_number,
        form: new_form,
      };
      console.log(activityFeedback);
      await API.graphql(
        graphqlOperation(createActivityFeedback, { input: activityFeedback })
      );
      await fetchActivityFeedbacks();
    } catch (error) {
      console.log("error creating activity feedback: ", error);
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
  const createActivityF = async () => {
    await createNewActivityFeedback();
  };
  function whichButton() {
    var start = props.dates.filter(
      (date) =>
        dates_class.compare(
          dates_class.convert(props.currentTime),
          dates_class.convert(date)
        ) >= 0 &&
        dates_class.compare(
          dates_class.convert(props.currentTime),
          dates_class.convert(
            dates_class
              .convert(date)
              .setMinutes(dates_class.convert(date).getMinutes() + 20)
          )
        ) <= 0
    );
    if (
      activityFeedbacks.filter(
        (activity) =>
          activity.activity_id === props.id &&
          activity.date ===
            props.dates.filter(
              (date) =>
                dates_class.compare(
                  dates_class.convert(props.currentTime),
                  dates_class.convert(date)
                ) >= 0 &&
                dates_class.compare(
                  dates_class.convert(props.currentTime),
                  dates_class.convert(
                    dates_class
                      .convert(date)
                      .setMinutes(dates_class.convert(date).getMinutes() + 20)
                  )
                ) <= 0
            )[0]
      ).length === 0
    )
      createActivityF();
    if (
      start.length !== 0 &&
      approvedUsers
        .filter((users) => users.activity_id === props.id)
        .filter(
          (users) => users.name === props.givenName + " " + props.familyName
        ).length !== 0
    ) {
      if (props.zoom !== "") {
        return <OpenZoomLink zoom={props.zoom} />;
      } else {
        if (
          activityFeedbacks.filter(
            (activity) => activity.activity_id === props.id
          ).length === 0
        )
          createActivityF();
        return <h3 style={{ color: "green" }}>הפעילות התחילה</h3>;
      }
    } else if (
      dates_class.compare(
        dates_class.convert(props.currentTime),
        dates_class
          .convert(props.dates[props.dates.length - 1])
          .setMinutes(
            dates_class
              .convert(props.dates[props.dates.length - 1])
              .getMinutes() + 20
          )
      ) >= 0
    ) {
      return <h3 style={{ color: "red" }}>הפעילות הסתיימה</h3>;
    } else if (props.groupName !== "approvedUsers" && props.zoom !== "") {
      return <OpenZoomLink zoom={props.zoom} />;
    } else if (props.groupName !== "approvedUsers") {
      return <h3 style={{ color: "#d8e3e7" }}>פעילות פרונטלית</h3>;
    } else if (
      approvedUsers
        .filter((users) => users.activity_id === props.id)
        .filter(
          (users) => users.name === props.givenName + " " + props.familyName
        ).length === 0 &&
      dates_class.compare(
        dates_class.convert(props.dates[0]),
        dates_class.convert(props.currentTime)
      ) <= 0
    ) {
      return <h3 style={{ color: "red" }}>מועד הרשמה אחרון עבר</h3>;
    } else if (
      approvedUsers
        .filter((users) => users.activity_id === props.id)
        .filter(
          (users) => users.name === props.givenName + " " + props.familyName
        ).length !== 0 &&
      dates_class.compare(
        dates_class.convert(props.dates[0]),
        dates_class.convert(props.currentTime)
      ) <= 0
    ) {
      if (props.zoom !== "") {
        return <h3 style={{ color: "green" }}>הקישור יפתח במפגש הבא</h3>;
      } else {
        return <h3 style={{ color: "green" }}>אנא המתן למפגש הבא</h3>;
      }
    } else if (
      pendingUsers
        .filter((users) => users.activity_id === props.id)
        .filter(
          (users) => users.name === props.givenName + " " + props.familyName
        ).length !== 0
    ) {
      return (
        <CancelRegisterResponsiveDialogActivities
          id={
            pendingUsers
              .filter((users) => users.activity_id === props.id)
              .filter(
                (users) =>
                  users.name === props.givenName + " " + props.familyName
              )[0].id
          }
        />
      );
    } else if (
      approvedUsers
        .filter((users) => users.activity_id === props.id)
        .filter(
          (users) => users.name === props.givenName + " " + props.familyName
        ).length !== 0
    ) {
      return (
        <CancelParticipationResponsiveDialogActivities
          id={
            approvedUsers
              .filter((users) => users.activity_id === props.id)
              .filter(
                (users) =>
                  users.name === props.givenName + " " + props.familyName
              )[0].id
          }
        />
      );
    } else {
      return (
        <RegisterResponsiveDialogActivities
          email={props.email}
          givenName={props.givenName}
          familyName={props.familyName}
          phoneNumber={props.phoneNumber}
          id={props.id}
        />
      );
    }
  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Card className={classes.root}>
      <CardHeader
        title={
          <h1 className="title__h1" style={{ color: "#d8e3e7" }}>
            <b style={{ color: "#d8e3e7" }}>{props.title}</b>{" "}
            {approvedUsers
              .filter((users) => users.activity_id === props.id)
              .filter(
                (users) =>
                  users.name === props.givenName + " " + props.familyName
              ).length !== 0 ? (
              <VerifiedUserIcon style={{ fill: "green" }}></VerifiedUserIcon>
            ) : (
              ""
            )}
          </h1>
        }
        subheader={
          <Typography className={classes.subColor}>
            ע"י: {props.owner}
          </Typography>
        }
      />
      <CardMedia
        className={classes.media}
        image={
          props.img === ""
            ? "https://vcunited.club/wp-content/uploads/2020/01/No-image-available-2.jpg"
            : props.img
        }
      />
      <CardActions
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {props.zoom === "" ? (
          <VideocamOffIcon style={{ fill: "red" }}></VideocamOffIcon>
        ) : (
          <VideocamIcon style={{ fill: "green" }}></VideocamIcon>
        )}
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
          <Scrollbars style={{ width: 320, height: 300, float: "right" }}>
            <Typography paragraph>
              {props.groupName !== "approvedUsers" ? (
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <PeopleAltIcon
                      style={{ fill: "rgba(60,60,60)", marginInlineEnd: 10 }}
                    ></PeopleAltIcon>
                    <h3>
                      כמות משתתפים:{" "}
                      {
                        approvedUsers.filter(
                          (users) => users.activity_id === props.id
                        ).length
                      }
                    </h3>
                  </div>
                  <br></br>
                  {approvedUsers.filter(
                    (users) => users.activity_id === props.id
                  ).length !== 0 ? (
                    <table style={{ margin: "0 auto" }}>
                      <th> </th>
                      <th className="nameOfStudent">:שם התלמיד/ה</th>
                      {approvedUsers
                        .filter((users) => users.activity_id === props.id)
                        .map((user) => (
                          <tr className="nameOfStudent">
                            <td style={{ width: 150 }}>
                              <CancelParticipationResponsiveDialogActivitiesManager
                                id={
                                  approvedUsers
                                    .filter(
                                      (users2) =>
                                        users2.activity_id === props.id
                                    )
                                    .filter(
                                      (users2) => users2.name === user.name
                                    )[0].id
                                }
                              />
                            </td>
                            <td style={{ width: 130 }}>{user.name}</td>
                          </tr>
                        ))}
                    </table>
                  ) : (
                    ""
                  )}
                </div>
              ) : (
                ""
              )}
              <Typography variant="body2" color="#d8e3e7" component="p">
                <h3>מספר מפגשים: {props.activityCount}</h3>
                <br></br>
                <h3>:תאריכים</h3>
                <br></br>
                {props.dates.map((date, index) => {
                  return (
                    <p className="actDesc">
                      <b> מפגש {index + 1} :</b> תאריך -{" "}
                      <b>
                        {date.substring(0, 10).split("-").reverse().join("-")}
                      </b>{" "}
                      שעה - <b>{date.substring(11)}</b>
                    </p>
                  );
                })}
              </Typography>
            </Typography>
            <h3>:תיאור הפעילות</h3>
            <br></br>
            <Typography className="actDesc">{props.description}</Typography>
            <br></br>
            <br></br>
          </Scrollbars>
        </CardContent>
      </Collapse>
    </Card>
  );
}
