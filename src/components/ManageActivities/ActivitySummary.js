import React, { isValidElement } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import { common, red } from "@material-ui/core/colors";
import TextField from "@material-ui/core/TextField";
import { useState, useEffect } from "react";
import { listSubmitedActivityFeedbacks } from "../../graphql/queries";
import { Scrollbars } from "rc-scrollbars";
import { CSVLink } from "react-csv";
import Button from "@material-ui/core/Button";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import {
    deletePendingActivities,
    deleteApprovedActivities,
} from "../../graphql/mutations";
import { API, graphqlOperation } from "aws-amplify";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Typography from "@material-ui/core/Typography";
import ConfirmSignUp from "../Register/ConfirmSignUp";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 1000,
        minWidth: 400,
        margin: "10px",
        borderRadius: "10px",
        right: 0,
        transition: "transform 0.15s ease-in-out",
        //"&:hover": { transform: "scale3d(1.05, 1.05, 1)" },
        "& label": {
            margin: "10px",
            color: "#d8e3e7",
            fontSize: "20px",
            backgroundColor: "#126e82",
            borderRadius: "10px",
            //zIndex: "1222",
        },
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
    checkboxLabelA: {
        fontWeight: "800",
        zIndex: "22222222",
        minWidth: "200px",
    },
    checkboxLabelB: {
        color: "blue",
    },
}));


export default function ActivitySummary(props) {
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
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [activitiesFeedback, setActivitiesFeedback] = useState([]); // A list of activity feedbacks filtered by an email.
    const [allActivitiesFeedback, setAllActivitiesFeedback] = useState([]); // A list of all the submitted feedbacks.
    const [data, setData] = useState([]);
    const [headers, setHeaders] = useState([]); // Holds the headers for the .csv
    const [allData, setAllData] = useState([]); // Holds the data for the rows of the .csv
    useEffect(() => {
        // Fetch for content suppliers
        fetchActivitiesFeedbacks();
    }, []);

    useEffect(() => {
        // Fetch for admins
        fetchAllActivitiesFeedbacks();
    }, [activitiesFeedback]);
    // Comparing function to compare forms by their date, to sort the feedbacks list.
    function compare_forms(a, b) {
        var a_converted = dates_class.convert(a.date);
        var b_converted = dates_class.convert(b.date);
        if (dates_class.compare(a_converted, b_converted) == 1) return 1;
        else if (dates_class.compare(a_converted, b_converted) == 0) return 0;
        else return -1;
    }
    // A function to fetch activities feedbacks for content suppliers, will return only feedbacks of activities created by a given email.
    const fetchActivitiesFeedbacks = async () => {
        try {
            const activitiesFeedbackData = await API.graphql(
                graphqlOperation(listSubmitedActivityFeedbacks, { filter: { email: { eq: props.email } }, }));
            const activitiesFeedbackList = activitiesFeedbackData.data.listSubmitedActivityFeedbacks.items;
            setActivitiesFeedback(activitiesFeedbackList);
        } catch (error) {
            console.log("error on fetching submitted feedbacks", error);
        }
    };
    // A function to fetch all the submitted activity feedbacks and process data required for the .csv file.
    const fetchAllActivitiesFeedbacks = async () => {
        try {
            const activitiesFeedbackData = await API.graphql(graphqlOperation(listSubmitedActivityFeedbacks));
            const activitiesFeedbackList = activitiesFeedbackData.data.listSubmitedActivityFeedbacks.items;
            setAllActivitiesFeedback(activitiesFeedbackList);
            var feedback;
            // If props.type is "single", it means we need to display a single meeting, so we filter by both activity_id and date.
            if (props.type === "single")
                feedback = allActivitiesFeedback.filter(feedback => props.activity_id === feedback.activity_id && props.dates === feedback.date);
            // If props type is "multiple", it means we need to display all of the meetings that the course has, so we filter only by activity_id.
            else
                feedback = allActivitiesFeedback.filter(feedback => props.activity_id === feedback.activity_id).sort(compare_forms);
            var feedback2 = allActivitiesFeedback.filter(feedback => props.activity_id === feedback.activity_id).sort(compare_forms);
            if (feedback.length !== 0) { // Check first that feedback is not empty, if it isn't empty then we take the forms from the feedbacks and start processing them into rows object for the .csv
                var forms = feedback.map((feed, idx) => {
                    var new_form = feed.form;
                    var new_activityCount = feed.activityCount;
                    var index = idx + 1;
                    if (props.type === "single") {
                        var y = feedback2.map((activity, idx) =>
                            activity.date === props.dates ? idx + 1 : -1)
                            ;
                        index = y.filter((id) => id !== -1)[0];
                    }
                    return { form: new_form, index: index, activityCount: new_activityCount, date: feed.date }
                });
                forms.sort(compare_forms);
                var new_data = [];
                forms.forEach(form => {
                    var toReturn = { activity_id: "", index: -1, activityCount: "", date: "", missing_students: [], attending_students: [] };
                    toReturn.activity_id = feedback[0].activity_id;
                    toReturn.activityCount = form.activityCount;
                    toReturn.date = form.date;
                    toReturn.index = form.index;
                    form.form.forEach(child => {
                        if (child[3] === "0") {
                            toReturn.missing_students.push(child);
                        }
                        else {

                            toReturn.attending_students.push(child);
                        }

                    });
                    new_data.push(toReturn)
                });
            }
            var new_headers = [
                { label: "שם", key: "name" },
                { label: "דואר אלקטורני", key: "email" },
                { label: "טלפון", key: "phone" },
            ];
            if (forms !== undefined) {
                for (var i = 0; i < forms.length; i++) {
                    new_headers.push({ label: "מפגש " + (forms[i].index) + " " + forms[i].date.substring(0, 10).split("-").reverse().join("-") + " " + forms[i].date.substring(11), key: "meeting" + (forms[i].index) })
                }
                var new_allData = [];
                forms.forEach((data) => data.form.forEach(student => {
                    var toPush;
                    var meeting = [];
                    if (new_allData.filter(student2 => student[1] === student2.email).length === 0) {

                        for (var i = 0; i < forms.length; i++) {
                            meeting.push({ index: forms[i].index, date: forms[i].date, presence: "N/A", contribution: 0, participation: 0, });
                        }
                        toPush = { index: 0, name: student[0], email: student[1], phone: student[2].length === 9 ? "0" + student[2].substring(4, 6) + "-" + student[2].substring(6, student[2].length) : student[2].substring(4, 7) + "-" + student[2].substring(7, student[2].length), meetings: meeting }
                        for (var i = 0; i < toPush.meetings.length; i++) {

                            if (toPush.meetings[i].index === data.index) {
                                toPush.meetings[i].presence = student[3] === "10" ? "V" : "";
                                toPush.meetings[i].participation = student[4];
                                toPush.meetings[i].contribution = student[5];
                                if (props.type === "single")
                                    toPush.index = data.index;
                                break;

                            }
                        }
                        if (new_allData.filter(data2 => data2.email === student[1] && data2.index === toPush.index).length === 0)
                            new_allData.push(toPush);
                    }
                    else {
                        new_allData.forEach(student2 => {
                            if (student[1] === student2.email) {
                                toPush = { index: 0, name: student[0], email: student[1], phone: "0" + student[2].substring(4, 6) + "-" + student[2].substring(6, student[2].length), meetings: meeting }
                                var len = student2.meetings.length;
                                for (var i = 0; i < len; i++) {
                                    if (student2.meetings[i].index === data.index) {

                                        student[3] === "10" ? student2.meetings[i].presence = "V" : student2.meetings[i].presence = "";

                                        student2.meetings[i].participation = student[4];
                                        student2.meetings[i].contribution = student[5];
                                        if (props.type === "single")
                                            new_allData.index = data.index;
                                        break;
                                    }

                                }
                            }


                        })
                    }
                }));
            }
            // new_data.sort(compare_forms);
            setData(new_data);

            setHeaders(new_headers);
            setAllData(new_allData);

        } catch (error) {
            console.log("error on fetching all submitted feedbacks ", error);
        }
    };
    const func = async () => {
        await fetchAllActivitiesFeedbacks();
    }
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    var CSVdata = [];

    var contribution_avg = [];
    var participation_avg = [];
    var total_attended = [];
    var filename = props.title + ".csv";
    var text = <b>{props.title}</b>;
    var toReturn;
    var toInsert = [];
    if (allData !== undefined && allData.length !== 0) { // First check if "allData" is defined, if it is we begin to process the data.
        // Initialize the participation, contribution and attended arrays  //
        // Participation_avg[n] - Avearage participation points for the (n-1)th meeting.
        // Contribution_avg[n] - Avearage contribution points for the (n-1)th meeting.
        // total_attended[n] - Number of total students who attended to the (n-1)th meeting.
        // All of the lists above have the same length, which is determined by how many meetings there were for a course.
        participation_avg = [];
        contribution_avg = [];
        for (var i = 0; i < allData[0].meetings.length; i++) {
            participation_avg.push(0);
            contribution_avg.push(0);
            total_attended.push(0);
        }
        // If props.type is "multiple", it means we need to show details about all of the meetings.
        // If props.type is "single", it means we need to show details about one single meeting of the course.
        //toInsert init, this variable will hold the rows of the .csv file.
        // For every student in the allData array, it'll generate a "meetings" list which will hold 
        // the student's grades for a single meeting.
        toInsert = allData.map(student => {
            toReturn = { name: student.name, email: student.email, phone: student.phone, };
            student.meetings.map(meeting => toReturn["meeting" + meeting.index] = meeting.presence);
            return toReturn;
        });
        var space = { name: "", email: "", phone: "" }; // Space variable for the .csv , equals to "\n".
        var summary = []; // This list is the summary of all grades, each object in this list will represent a student's grades for a single meeting.
        // If [x] students registered to a course, then for each student in the allData list we'll have
        // a line in the Summary list, each line will contain the participation, contrubition and attendance values of every student.
        allData.forEach(student => {
            student.meetings.forEach(meet => {
                toReturn = { index: -1, email: student.email, participated: -1, contributed: -1, attended: -1 }
                toReturn.participated = parseInt(meet.participation);
                toReturn.contributed = parseInt(meet.contribution);
                toReturn.index = meet.index;
                meet.presence === "V" ? toReturn.attended = "10" : toReturn.attended = "0";
                summary.push(toReturn);
            })
        })

        toInsert.push(space);
        toInsert.push(space);
        toInsert.push({ name: " עבור:", email: props.title });
        // Sum up all the grades for a single meeting, since we show an avearage and not every student's grades.
        // Also count how many students has attended to each meeting.
        if (props.type === "multiple") {
            summary.forEach(student => {
                if (student.attended === "10") {
                    contribution_avg[student.index - 1] += (student.contributed);
                    participation_avg[student.index - 1] += (student.participated);
                }

                student.attended === "10" ? total_attended[student.index - 1]++ : total_attended[student.index - 1] = total_attended[student.index - 1];
            });
        }
        else {
            summary.forEach(student => {
                if (student.attended === "10") {
                    contribution_avg[0] += (student.contributed);
                    participation_avg[0] += (student.participated);
                }

                student.attended === "10" ? total_attended[0]++ : total_attended[0] = total_attended[0];
            });
        }
        // For each meeting the course has, we display three lines of summary displaying how many students attended, participation and contribution avg.
        for (var i = 0; i < participation_avg.length; i++) {
            toInsert.push(space);
            toInsert.push(space);
            if (props.type === "multiple")
                toInsert.push({ name: "סיכום נוכחות למפגש " + (i + 1) + ":", phone: total_attended[i], email: "/ " + allData.length });
            else
                toInsert.push({ name: "סיכום נוכחות למפגש " + (allData[0].index) + ":", phone: total_attended[i], email: "/ " + allData.length });
            toInsert.push({ name: "השתתפות כלל התלמידים שנכחו " + ":", phone: total_attended[i] === 0 ? "0" : String((participation_avg[i] / 3) / total_attended[i]).substring(0, 4), email: "/ 5" });
            toInsert.push({ name: "תרומת כלל התלמידים שנכחו " + ":", phone: total_attended[i] === 0 ? "0" : String((contribution_avg[i] / 3) / total_attended[i]).substring(0, 4), email: "/ 5" });
        }
    }
    if (data === undefined) func();
    (data === undefined || data.length === 0) ?
        toReturn = <div>טרם מולא משוב עבור קורס זה </div>
        :
        toReturn = (
            <Card
                className={classes.root}
                style={{
                    color: "#132c33",
                    backgroundColor: "#d8e3e7",
                }}
            >
                <Button
                    startIcon={
                        <CheckCircleIcon
                            style={{
                                fill: "#132c33",
                                maxWidth: "100px",
                                marginBottom: "11px"
                            }}
                        ></CheckCircleIcon>
                    }
                    variant="outlined"
                    style={{
                        fill: "#132c33",
                        backgroundColor: "#51c4d3",
                        maxHeight: "40px",
                        paddingBottom: "15px",
                        border: "3px solid #51c4d3",
                    }}
                >
                    <CSVLink data={toInsert} filename={filename} headers={headers} style={{
                        fill: "#132c33"
                    }}>
                        Download me
                </CSVLink>
                </Button>

                <CardContent s>
                    {<div>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                backgroundColor: "#d8e3e7",
                                color: "#132c33",
                            }}
                        >
                            <table>
                                <tr>
                                    <div>
                                        {data.map(activity => {
                                            participation_avg = 0
                                            contribution_avg = 0

                                            activity.attending_students.forEach(student => {
                                                participation_avg += parseInt(student[4]);
                                                contribution_avg += parseInt(student[5]);
                                            })
                                            return (
                                                <div>
                                                    <h3><b>{activity.date.substring(11).split("-").reverse().join("-")} {activity.date.substring(0, 10).split("-").reverse().join("-")} - {activity.index} מפגש מספר</b></h3>
                                                    <br></br>
                                                    <div
                                                        style={{
                                                            minWidth: "200px",
                                                            borderStyle: "solid",
                                                            borderRadius: "15px",
                                                            color: "#132c33",
                                                            backgroundColor: "#d8e3e7",
                                                        }}
                                                    >
                                                        <br></br>
                                                        <h4>מספר משתתפים: {activity.attending_students.length + activity.missing_students.length} / {activity.attending_students.length}  </h4>
                                                        <h4>השתתפות כלל התלמידים שנכחו: 5 / {activity.attending_students.length === 0 ? "0" : String((participation_avg / 3) / (activity.attending_students.length)).substring(0, 4)} </h4>
                                                        <h4>תרומת כלל התלמידים שנכחו: 5 / {activity.attending_students.length === 0 ? "0" : String((contribution_avg / 3) / (activity.attending_students.length)).substring(0, 4)} </h4>
                                                        <br></br>
                                                        <th>
                                                            לא נכחו
                                                </th>
                                                        <th>
                                                            נכחו
                                                </th>
                                                        <tr>
                                                            <td>
                                                                <Scrollbars style={{ width: 130, height: 200, float: "right" }}>

                                                                    {activity.missing_students.map((student) => {
                                                                        return (
                                                                            <div>
                                                                                <p>{student[0]}</p>
                                                                            </div>
                                                                        )
                                                                    })}
                                                                </Scrollbars>
                                                            </td>
                                                            <td>
                                                                <Scrollbars style={{ width: 130, height: 200, float: "right" }}>

                                                                    {activity.attending_students.map((student) => {
                                                                        return (
                                                                            <div>
                                                                                <p>{student[0]}</p>
                                                                            </div>
                                                                        )
                                                                    })}
                                                                </Scrollbars>
                                                            </td>
                                                        </tr>
                                                    </div>
                                                    <br></br>

                                                </div>
                                            )
                                        })}
                                    </div>
                                </tr>
                            </table>
                        </div>
                    </div>
                    }
                </CardContent>
            </Card >
        );
    return toReturn;
}
