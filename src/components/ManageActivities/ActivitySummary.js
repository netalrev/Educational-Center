import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import { common, red } from "@material-ui/core/colors";
import TextField from "@material-ui/core/TextField";
// import SubmitResponsiveDialogActivityFeedback from "./SubmitResponsiveDialogActivityFeedback";
import { useState, useEffect } from "react";
import { listSubmitedActivityFeedbacks } from "../../graphql/queries";
import { Scrollbars } from "rc-scrollbars";
import { CSVLink } from "react-csv";


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
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [activitiesFeedback, setActivitiesFeedback] = useState([]);
    const [allActivitiesFeedback, setAllActivitiesFeedback] = useState([]);
    const [data, setData] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [allData, setAllData] = useState([]);
    useEffect(() => {
        // Fetch for content suppliers
        fetchActivitiesFeedbacks();
    }, []);

    useEffect(() => {
        // Fetch for admins
        fetchAllActivitiesFeedbacks();
    }, [activitiesFeedback]);

    const fetchActivitiesFeedbacks = async () => {
        try {
            const activitiesFeedbackData = await API.graphql(
                graphqlOperation(listSubmitedActivityFeedbacks, { filter: { email: { eq: props.email } }, }));
            const activitiesFeedbackList = activitiesFeedbackData.data.listSubmitedActivityFeedbacks.items;
            setActivitiesFeedback(activitiesFeedbackList);
        } catch (error) {
            console.log("error on fetching Pending Activities", error);
        }
    };
    const fetchAllActivitiesFeedbacks = async () => {
        try {
            const activitiesFeedbackData = await API.graphql(graphqlOperation(listSubmitedActivityFeedbacks));
            const activitiesFeedbackList = activitiesFeedbackData.data.listSubmitedActivityFeedbacks.items;
            setAllActivitiesFeedback(activitiesFeedbackList);
            var feedback;
            if (props.type === "single")
                feedback = allActivitiesFeedback.filter(feedback => props.activity_id === feedback.activity_id && props.dates === feedback.date);
            else
                feedback = allActivitiesFeedback.filter(feedback => props.activity_id === feedback.activity_id);
            var feedback2 = allActivitiesFeedback.filter(feedback => props.activity_id === feedback.activity_id);
            if (feedback.length !== 0) {
                console.log("FEED", feedback)

                var forms = feedback.map((feed, idx) => {

                    var new_form = feed.form;
                    var new_activityCount = feed.activityCount;
                    var index = idx + 1
                    if (props.type === "single") {
                        var y = feedback2.map((activity, idx) =>
                            activity.date === props.dates ? idx + 1 : -1)
                            ;
                        index = y.filter((id) => id !== -1)[0];

                    }

                    return { form: new_form, index: index, activityCount: new_activityCount, date: feed.date }
                });
                console.log("forms", forms);
                var new_data = forms.map(form => {
                    var toReturn = { activity_id: "", index: -1, activityCount: "", date: "", missing_students: [], attending_students: [] };
                    if (form.form[3] === "0") {
                        toReturn.missing_students.push(form.form[0]);
                    }
                    else {
                        toReturn.attending_students.push(form.form[0]);
                    }
                    toReturn.activity_id = feedback[0].activity_id;
                    toReturn.activityCount = form.activityCount;
                    toReturn.date = form.date;
                    toReturn.index = form.index;
                    return toReturn;
                }
                );
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
                    var meeting = [];
                    if (new_allData.filter(student2 => student[1] === student2.email).length === 0) {
                        for (var i = 0; i < forms.length; i++) {
                            meeting.push({ index: forms[i].index, date: forms[i].date, presence: "N/A" });
                        }
                        var toPush = { name: student[0], email: student[1], phone: "0" + student[2].substring(4, 6) + "-" + student[2].substring(6, student[2].length), meetings: meeting }
                        for (var i = 0; i < toPush.meetings.length; i++) {
                            if (toPush.meetings[i].index === data.index)
                                toPush.meetings[i].presence = student[3] === "10" ? "V" : "";
                            break;
                        }
                        new_allData.push(toPush);
                    }
                    else
                        new_allData.forEach(student2 => {
                            if (student[1] === student2.email)
                                for (var i = 0; i < student2.meetings.length; i++) {
                                    if (student2.meetings[i].index === data.index) {
                                        student2.meetings[i].presence = student[3] === "10" ? "V" : "";
                                    }
                                }
                        })
                }));
            }
            console.log(new_allData)
            setData(new_data);
            setHeaders(new_headers);
            setAllData(new_allData);

        } catch (error) {
            console.log("error on fetching Pending Activities", error);
        }
    };
    const func = async () => {
        await fetchAllActivitiesFeedbacks();
    }
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    var CSVdata = [];

    var contribution_avg = 0;
    var participation_avg = 0;
    var text = <b>{props.title}</b>;
    var toReturn;
    var toInsert = [];
    if (allData !== undefined) {
        toInsert = allData.map(student => {
            toReturn = { name: student.name, email: student.email, phone: student.phone };
            student.meetings.map(meeting => toReturn["meeting" + meeting.index] = meeting.presence);
            return toReturn;
        });
        var space = { name: "", email: "", phone: "" };
        toInsert.push(space);
        toInsert.push(space);
        toInsert.push({ name: "מידע עבור:", email: props.title });
        toInsert.push({ name: "נוכחות:", email: "" });
        toInsert.push({ name: "השתתפות כללית:", email: "" });
        toInsert.push({ name: "תרומה כללית:", email: "" });
        console.log(toInsert)
    }
    if (data === undefined) func();
    data === undefined ?
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
                <CSVLink data={toInsert} headers={headers}>
                    Download me
                </CSVLink>
                <CardContent s>
                    {<div>
                        <h4>{text}</h4>
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
                                                participation_avg += ((parseInt(student[4]) / 3)) / (activity.attending_students.length);
                                                contribution_avg += (parseInt(student[5]) / 3) / (activity.attending_students.length);
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
                                                        <h4>מספר משתתפים: {activity.attending_students.length} / {activity.attending_students.length + activity.missing_students.length}</h4>
                                                        <h4>השתתפות כלל התלמידים: 5 / {participation_avg} </h4>
                                                        <h4>תרומת כלל התלמידים: 5 / {contribution_avg} </h4>
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
