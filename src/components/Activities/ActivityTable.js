import React, { Component } from "react";
import { useState, useEffect } from "react";
import { listApprovedActivitiess } from "../../graphql/queries";
import { API, graphqlOperation } from "aws-amplify";

import RecipeReviewCard from "./RecipeReviewCard";

import SearchBar from "material-ui-search-bar";
import $ from "jquery";

export default function ActivityTable(props) {
  const [allApprovedActivitiess, setAllApprovedActivitiess] = useState([]);
  const [toShow, setToShow] = useState([]);

  useEffect(() => {
    fetchAllApprovedActivities();
  }, [props.currentTime]);
  useEffect(() => {
    fillToShow();
  }, [allApprovedActivitiess]);
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

  function comparing(a, b) {
    var i = 0,
      j = 0;
    while (i < a.activityCount && j < b.activityCount) {
      if (
        dates_class.compare(
          dates_class.convert(a.dates[i]),
          props.currentTime
        ) === -1
      ) {
        i++;
        continue;
      } else if (
        dates_class.compare(
          dates_class.convert(b.dates[j]),
          props.currentTime
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
  const fetchAllApprovedActivities = async () => {
    try {
      const approvedActivitiesData = await API.graphql(
        graphqlOperation(listApprovedActivitiess)
      );
      const approvedActivitiesList =
        approvedActivitiesData.data.listApprovedActivitiess.items;
      approvedActivitiesList.sort(comparing);
      for (var i = 0; i < approvedActivitiesList.length; i++) {
        console.log("i", i)
        // console.log("HEHEYYYYYYYYYYY", dates_class.compare((props.currentTime), dates_class.convert(dates_class.convert(approvedActivitiesList[i].dates[approvedActivitiesList[i].dates.length - 1]).setMinutes(dates_class.convert(approvedActivitiesList[i].dates[approvedActivitiesList[i].dates.length - 1]).getMinutes() + 60))))
        // console.log(dates_class.compare(dates_class.convert(props.currentTime), dates_class.convert(dates_class.convert(approvedActivitiesList[i].dates[approvedActivitiesList[i].dates.length - 1]).setHours(dates_class.convert(approvedActivitiesList[i].dates[approvedActivitiesList[i].dates.length - 1]).getHours() + 1))));
        // console.log("GGGGG", dates_class.convert(
        //   dates_class
        //     .convert(
        //       approvedActivitiesList[i].dates[
        //       approvedActivitiesList[i].dates.length - 1
        //       ]
        //     )
        //     .setMinutes(
        //       dates_class
        //         .convert(
        //           approvedActivitiesList[i].dates[
        //           approvedActivitiesList[i].dates.length - 1
        //           ]
        //         )
        //         .getMinutes() + 60
        //     )), dates_class
        //       .convert(
        //         approvedActivitiesList[i].dates[
        //         approvedActivitiesList[i].dates.length - 1
        //         ]
        //       ));
        console.log(approvedActivitiesList, approvedActivitiesList[i].title, dates_class.compare(
          props.currentTime,
          dates_class.convert(
            dates_class
              .convert(
                approvedActivitiesList[i].dates[
                approvedActivitiesList[i].dates.length - 1
                ]
              )
              .setMinutes(
                dates_class
                  .convert(
                    approvedActivitiesList[i].dates[
                    approvedActivitiesList[i].dates.length - 1
                    ]
                  )
                  .getMinutes() + 60
              )
          )
        ));
        if (
          dates_class.compare(
            props.currentTime,
            dates_class.convert(
              dates_class
                .convert(
                  approvedActivitiesList[i].dates[
                  approvedActivitiesList[i].dates.length - 1
                  ]
                )
                .setMinutes(
                  dates_class
                    .convert(
                      approvedActivitiesList[i].dates[
                      approvedActivitiesList[i].dates.length - 1
                      ]
                    )
                    .getMinutes() + 60
                )
            )
          ) === 1
        ) {
          // console.log(approvedActivitiesList[i].title);
          approvedActivitiesList.splice(i, 1);
          i = 0;
        }
      }
      setAllApprovedActivitiess(approvedActivitiesList);
    } catch (error) {
      console.log("error on fetching Approved Activities", error);
    }
  };

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
        currentTime={props.currentTime}
      />
    ));
    setToShow(allActivity);
  }

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
        currentTime={props.currentTime}
      />
    ));
    const filterdToShow = allActivity.filter((activity) => {
      if (
        activity.props.title.includes(key) ||
        activity.props.owner.includes(key)
      )
        return activity;
    });
    setToShow(filterdToShow);
  }

  return (
    <div style={{ width: "100%" }}>
      <div>
        <SearchBar
          className="searchBar"
          onChange={(value) => search(value)}
          style={{
            maxWidth: 1350,
            marginInline: 85,
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
