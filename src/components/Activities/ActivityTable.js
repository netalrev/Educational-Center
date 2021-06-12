import { useState, useEffect } from "react";
import { listApprovedActivitiess } from "../../graphql/queries";
import { API, graphqlOperation } from "aws-amplify";
import { makeStyles } from "@material-ui/core/styles";
import RecipeReviewCard from "./RecipeReviewCard";
import SearchBar from "material-ui-search-bar";

//The style for Activities table.
const useStyles = makeStyles((theme) => ({
  searchBar: {
    zIndex: "0",
    border: "3px solid #51c4d3",
    borderRadius: "20px",
    textAlign: "center",
    backgroundColor: "#132c33",

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

export default function ActivityTable(props) {

  //               Use State Initialization              //
  const [dateAndTime, setDateAndTime] = useState([]);
  const [allApprovedActivitiess, setAllApprovedActivitiess] = useState([]);
  const [toShow, setToShow] = useState([]);
  const classes = useStyles();


  //                 Functions                //

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

  //This function comparing between two courses to find the first one ( date and time !).
  function comparing(a, b) {
    var i = 0,
      j = 0;
    while (i < a.activityCount && j < b.activityCount) {
      if (
        dates_class.compare(
          dates_class.convert(a.dates[i]),
          dateAndTime
        ) === -1
      ) {
        i++;
        continue;
      } else if (
        dates_class.compare(
          dates_class.convert(b.dates[j]),
          dateAndTime
        ) === -1
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

  //async function to fetch all aprroved activities.

  const fetchTimeAndDate = async () => {
    try {
      if (dateAndTime.length === 0) {
        var url =
          "https://timezone.abstractapi.com/v1/current_time/?api_key=6fd38868af1a4f1b8958be2d7f676947&location=Jerusalem";
        if (url.length !== 0) {
          const res = await fetch(url);
          const data = await res.json();
          setDateAndTime(data.datetime);
        }
      }
    } catch (err) {
      console.log("Error fetching date and time.", err);
    }
  };

  const fetchAllApprovedActivities = async () => {
    try {
      const approvedActivitiesData = await API.graphql(
        graphqlOperation(listApprovedActivitiess)
      );
      const approvedActivitiesList =
        approvedActivitiesData.data.listApprovedActivitiess.items;
      approvedActivitiesList.sort(comparing);
      var copy = [];
      for (var i = 0; i < approvedActivitiesList.length; i++) {
        if (
          dates_class.compare(dateAndTime, dates_class.convert(
            dates_class.convert(approvedActivitiesList[i].dates[
              approvedActivitiesList[i].dates.length - 1])
              .setMinutes(dates_class.convert(
                approvedActivitiesList[i].dates[
                approvedActivitiesList[i].dates.length - 1]).getMinutes() + 60))) <= 0) {
          copy.push(approvedActivitiesList[i]);
        }
      }
      setAllApprovedActivitiess(copy);
    } catch (error) {
      console.log("error on fetching Approved Activities", error);
    }
  };

  //This function return a card that shows all the courses details.
  function fillToShow() {
    var allActivity = [];
    allActivity = allApprovedActivitiess.map((activity) => (
      <RecipeReviewCard
        id={activity.id}
        img={activity.img}
        dates={activity.dates}
        activityCount={activity.activityCount}
        owner={activity.owner}
        title={activity.title}
        description={activity.description}
        zoom={activity.zoom}
        email={props.email}
        givenName={props.givenName}
        familyName={props.familyName}
        phoneNumber={props.phoneNumber}
        groupName={props.groupName}
        currentTime={dateAndTime}
      />
    ));
    setToShow(allActivity);
  }

  //This function return all the courses details that found by the saerch.
  function search(key) {
    var allActivity = [];
    allActivity = allApprovedActivitiess.map((activity) => (
      <RecipeReviewCard
        id={activity.id}
        img={activity.img}
        dates={activity.dates}
        activityCount={activity.activityCount}
        owner={activity.owner}
        title={activity.title}
        description={activity.description}
        email={props.email}
        givenName={props.givenName}
        familyName={props.familyName}
        phoneNumber={props.phoneNumber}
        zoom={activity.zoom}
        currentTime={dateAndTime}
      />
    ));

    //Extention for search function.
    const filterdToShow = allActivity.filter((activity) => {
      if (
        activity.props.title.includes(key) ||
        activity.props.owner.includes(key)
      )
        return activity;
    });
    setToShow(filterdToShow);
  }

  //                 Use Effects                //
  useEffect(() => {
    fetchTimeAndDate();
  }, []);
  useEffect(() => {
    fetchAllApprovedActivities();
  }, [dateAndTime]);
  useEffect(() => {
    fillToShow();
  }, [allApprovedActivitiess]);


  //                 Flow               //

  //React componenet with search bar for activities.
  return (
    <div style={{ width: "100%", padding: "20px" }}>
      <div>
        <SearchBar
          className={classes.searchBar}
          onChange={(value) => search(value)}
          placeholder="חיפוש לפי קורס או מרצה"
          style={{
            maxWidth: 1350,
            marginInline: 85,
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "15px",
          }}
        />
      </div>
      <br></br>
      <br></br>
      <div
        style={{
          display: "flex",
          flexFlow: "row wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {toShow}
      </div>
    </div>
  );
}