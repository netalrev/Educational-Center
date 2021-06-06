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

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 1000,
        minWidth: 400,
        margin: "10px",
        backgroundColor: "light gray",

        borderRadius: "4%",
        right: 0,
        transition: "transform 0.15s ease-in-out",
        //"&:hover": { transform: "scale3d(1.05, 1.05, 1)" },
        "& label": {
            margin: "10px",
            color: "white",
            fontSize: "2000px",
            backgroundColor: "red",
            borderRadius: "20px",
            zIndex: "1222",
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
}));

export default function ActivitySummary(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [activitiesFeedback, setActivitiesFeedback] = useState([]);
    const [allActivitiesFeedback, setAllActivitiesFeedback] = useState([]);
    const [data, setData] = useState([]);
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
            var feedback = allActivitiesFeedback.filter(feedback => props.activity_id === feedback.activity_id);
            if (feedback.length !== 0) {
                var forms = feedback.map(feed => {

                    console.log("FEED", feed)
                    var new_form = feed.form;
                    var new_activityCount = feed.activityCount;
                    return { form: new_form, activityCount: new_activityCount }
                });
                console.log("forms", forms);
                var new_data = forms.map(form => {
                    var toReturn = { activity_id: "", activityCount: "", missing_students: [], attending_students: [] };
                    if (form.form[3] === "0") {
                        toReturn.missing_students.push(form.form[0]);
                    }
                    else {
                        toReturn.attending_students.push(form.form[0]);
                    }
                    toReturn.activity_id = feedback[0].activity_id;
                    toReturn.activityCount = form.activityCount;
                    return toReturn;
                }
                );
            }
            setData(new_data);

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

    var contribution_avg = 0;
    var participation_avg = 0;
    var text = <b>{props.title}</b>;
    var toReturn;
    if (data === undefined) func();
    data === undefined ?
        toReturn = <div>טרם מילאת משוב עבור קורס זה </div>
        :
        toReturn = (
            <Card
                className={classes.root}
                style={{
                    color: "#132c33",
                    backgroundColor: "#d8e3e7",
                }}
            >
                <CardHeader title={text} />
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
                                        {data.map((activity) => (
                                            <div>
                                                <h4>{activity.activityCount} מפגש מספר</h4>
                                                <h4>נוכחות: {activity.attending_students.length} / {activity.attending_students.length + activity.missing_students.length}</h4>
                                                <Scrollbars style={{ width: 130, height: 200, float: "right" }}>

                                                    {activity.attending_students.map((student) => {
                                                        return (
                                                            <div>
                                                                <p>{student[0]}</p>
                                                            </div>
                                                        )
                                                    })}
                                                </Scrollbars>
                                                <br></br>
                                                <Scrollbars style={{ width: 130, height: 200, float: "right" }}>

                                                    {activity.missing_students.map((student) => {
                                                        return (
                                                            <div>
                                                                <p>{student[0]}</p>
                                                            </div>
                                                        )
                                                    })}
                                                </Scrollbars>
                                                <br></br>
                                                {activity.attending_students.forEach(student => {
                                                    participation_avg += ((parseInt(student[4]) / 3)) / (activity.attending_students.length);
                                                    contribution_avg += (parseInt(student[5]) / 3) / (activity.attending_students.length);
                                                })}
                                                <h4>תרומה: 5 / {contribution_avg} </h4>
                                                <h4>השתתפות: 5 / {participation_avg} </h4>

                                            </div>
                                        ))}
                                    </div>
                                </tr>
                            </table>
                        </div>
                    </div>
                    }
                </CardContent>
            </Card>
        );
    return toReturn;
}
