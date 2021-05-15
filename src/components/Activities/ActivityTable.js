import React, { Component } from "react";
import { useState, useEffect } from "react";
import { listApprovedActivitiess } from "../../graphql/queries";
import { API, graphqlOperation } from "aws-amplify";
import RecipeReviewCard from "./RecipeReviewCard";

export default function ActivityTable(props) {
    const [allApprovedActivitiess, setAllApprovedActivitiess] = useState([]);

    useEffect(() => {
        fetchAllApprovedActivities();
    }, []);
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
    var tzoffset_end = (new Date()).getTimezoneOffset() * 60000 - 60 * 60000;
    var tzoffset_59 = (new Date()).getTimezoneOffset() * 60000 + 59 * 60000;
    var current_time_2 = dates_class.convert(new Date(Date.now() - tzoffset_59).toISOString().substring(0, 16));

    var current_time = dates_class.convert(new Date(Date.now() - tzoffset_end).toISOString().substring(0, 16));
    function comparing(a, b) {
        var i = 0, j = 0;
        while (i < a.activityCount && j < b.activityCount) {
            if (dates_class.compare(dates_class.convert(a.dates[i]), current_time) === -1) {
                i++;
                continue;
            }
            else if (dates_class.compare(dates_class.convert(b.dates[j]), current_time) === -1) {
                j++;
                continue;
            }
            if (dates_class.compare(dates_class.convert(a.dates[i]), dates_class.convert(b.dates[j])) === 1) return 1;
            else if (dates_class.compare(dates_class.convert(a.dates[i]), dates_class.convert(b.dates[j])) === 0) return 0;
            else return -1;
        }

    }
    const fetchAllApprovedActivities = async () => {
        try {
            const approvedActivitiesData = await API.graphql(graphqlOperation(listApprovedActivitiess));
            const approvedActivitiesList = approvedActivitiesData.data.listApprovedActivitiess.items;
            approvedActivitiesList.sort(comparing);
            console.log("1", approvedActivitiesList);
            for (var i = 0; i < approvedActivitiesList.length; i++) {
                if (dates_class.compare(dates_class.convert(approvedActivitiesList[i].dates[approvedActivitiesList[i].dates.length - 1]), current_time_2) === -1)
                    console.log(approvedActivitiesList.splice(i, 1));
            }
            console.log("2", approvedActivitiesList);

            setAllApprovedActivitiess(approvedActivitiesList);
        } catch (error) {
            console.log("error on fetching Approved Activities", error);
        }
    };

    function createRow(index) {
        var toReturn = [];
        for (var i = 0; i < 4; i++) {
            if (index + i >= allApprovedActivitiess.length) {
                break;
            }
            toReturn.push(<td><RecipeReviewCard
                id={allApprovedActivitiess[index + i].id}
                img={allApprovedActivitiess[index + i].img}
                dates={allApprovedActivitiess[index + i].dates}
                activityCount={allApprovedActivitiess[index + i].activityCount}
                owner={allApprovedActivitiess[index + i].owner}
                title={allApprovedActivitiess[index + i].title}
                description={allApprovedActivitiess[index + i].description}
                email={props.email}
                givenName={props.givenName}
                familyName={props.familyName}
                phoneNumber={props.phoneNumber}
                zoom={allApprovedActivitiess[index + i].zoom} /></td>)
        }
        return toReturn;
    }

    return (
        <tbody>
            {allApprovedActivitiess.map((activity, index) => {
                if (index % 4 === 0) {
                    return (
                        <tr>
                            {createRow(index)}
                        </tr>
                    )
                }
                else {
                    return ("");
                }
            })}
        </tbody>
    );
}
