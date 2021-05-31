import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import { red } from "@material-ui/core/colors";
import TextField from "@material-ui/core/TextField";
// import SubmitResponsiveDialogActivityFeedback from "./SubmitResponsiveDialogActivityFeedback";
import { useState, useEffect } from "react";
import { listSubmitedActivityFeedbacks, listApprovedUsers, listUsers, listApprovedActivitiess } from "../../graphql/queries";

import { API, graphqlOperation } from "aws-amplify";


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

export default function UserProgressCard(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [allActivitiesFeedback, setAllActivitiesFeedback] = useState([]);
    const [approvedActivities, setApprovedActivities] = useState([]);
    const [approvedUsers, setApprovedUsers] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Fetch for admins
        fetchUsers();
    }, [approvedUsers]);

    useEffect(() => {
        // Fetch for admins
        fetchApprovedUsers();
    }, []);

    useEffect(() => {
        // Fetch for admins
        fetchApprovedActivities();
    }, []);
    useEffect(() => {
        // Fetch for admins
        fetchAllActivitiesFeedbacks();
    }, []);

    const fetchUsers = async () => {
        try {
            const usersData = await API.graphql(graphqlOperation(listUsers));
            const userList = usersData.data.listUsers.items;
            setUsers(userList);
            console.log(userList, "NNNN");
        } catch (error) {
            console.log("error on fetching users", error);
        }
    };
    const fetchApprovedUsers = async () => {
        try {
            const approvedUsersData = await API.graphql(graphqlOperation(listApprovedUsers));
            const approvedUserList = approvedUsersData.data.listApprovedUsers.items;
            setApprovedUsers(approvedUserList);
        } catch (error) {
            console.log("error on fetching approved users", error);
        }
    };

    const fetchAllActivitiesFeedbacks = async () => {
        try {
            const activitiesFeedbackData = await API.graphql(graphqlOperation(listSubmitedActivityFeedbacks));
            const activitiesFeedbackList = activitiesFeedbackData.data.listSubmitedActivityFeedbacks.items;
            setAllActivitiesFeedback(activitiesFeedbackList);
        } catch (error) {
            console.log("error on fetching approved feedbacks", error);
        }
    };
    const fetchApprovedActivities = async () => {
        try {
            const approvedActivitiesData = await API.graphql(graphqlOperation(listApprovedActivitiess));
            const approvedActivitiesList = approvedActivitiesData.data.listApprovedActivitiess.items;
            setApprovedActivities(approvedActivitiesList);
        } catch (error) {
            console.log("error on fetching approved activities", error);
        }
    };

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    console.log(users, "ASDASD");
    var personal_activities_ids_for_users = users.map(user => {
        var user_activities = approvedUsers.filter(user2 => user2.email === user.email);
        var email = user.email;
        var name = user.name;
        var activities_ids = user_activities.map(activity => activity.activity_id);
        var toReturn = [];
        // toReturn.push(email);
        // toReturn.push(name);
        // toReturn.push(activities_ids);
        return { email, name, activities_ids }
        // return toReturn;
    });
    var personal_activities_for_users = personal_activities_ids_for_users.map(obj => {
        var activities = [];
        activities = approvedActivities.filter(activity => obj.activities_ids.includes(activity.id));
        var email = obj.email;
        var name = obj.name;
        var toReturn = [];

        // toReturn.push(email);
        // toReturn.push(name);
        // toReturn.push(activities);
        // return toReturn;
        return { email, name, activities }
    });
    var existing_feedbacks = allActivitiesFeedback.map(feed => feed.activity_id);
    console.log("BEFO", allActivitiesFeedback, personal_activities_ids_for_users)
    var student = personal_activities_ids_for_users.filter(user => user.email === props.email);
    console.log("HEY", student, props.email);
    student.forEach(user => {
        for (var i = 0; i < user.activities_ids.length; i++) {
            if (!existing_feedbacks.includes(user.activities_ids[i])) user.activities_ids.splice(i, 1);
            i = 0;
        }
    })
    console.log("STUDENT", student);
    var courses = [];
    student.forEach(user => {
        var feedbacks = allActivitiesFeedback.filter(feedback => user.activities_ids.includes(feedback.activity_id));
        console.log(feedbacks, "feed");
        user.activities_ids.forEach(id => {
            var attendance = 0;
            var contribute = 0;
            var participation = 0;
            var filtered = feedbacks.filter(feedback => feedback.activity_id === id);
            filtered.forEach(feedback => {
                console.log(feedback.form, "FORM", parseInt(feedback.form[0][4]))
                if (feedback.form[0][3] === "10") attendance += 1;
                if (feedback.form[0][4] !== "0") contribute += parseInt(feedback.form[0][4]) / 3;
                if (feedback.form[0][5] !== "0") participation += parseInt(feedback.form[0][5]) / 3;
            })
            courses.push({ id, attendance, contribute, participation })
        })
    })
    // if (idx !== -1) {
    //     if (user.form[0][3] === "10") {
    //         students[idx][3]++;
    //     }
    //     students[idx][4] += parseInt(user.form[0][4]) / 3;
    //     students[idx][5] += parseInt(user.form[0][5]) / 3;
    // }
    // else {
    //     students.push([user.form[0][0], user.form[0][1], user.form[0][2], user.form[0][3] === "10" ? 1 : 0, user.form[0][4] / 3, user.form[0][5] / 3])
    // }
    var text = <b>{props.title}</b>;
    return (
        <Card
            className={classes.root}
            style={{
                color: "white",
                backgroundColor: "black",
            }}
        >
            <CardHeader title={text} />
            <CardContent>
                {courses.map((course) => {
                    var activity = approvedActivities.filter(elm => elm.id === course.id);
                    var toReturn;
                    activity.forEach(elm => {
                        toReturn = (
                            <div>
                                <h4>{elm.title}</h4>
                                {console.log(elm.title)}
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        backgroundColor: "black",
                                        color: "white",
                                    }}
                                >
                                    <table>
                                        <tr>
                                            <div>
                                                <div>
                                                    <div
                                                        style={{
                                                            borderStyle: "solid",
                                                            borderRadius: "15px",
                                                            color: "white",
                                                            backgroundColor: "black",
                                                        }}
                                                    >
                                                        <h4>{elm.title}</h4>
                                                        <br></br>
                                                        <h4>נכח:</h4> {course.attendance} / {elm.dates.length}
                                                        <br></br>
                                                        <h4>ציון עבור השתתפות : {elm.dates.length * 5} / {parseInt(course.participation)}</h4>
                                                        <br></br>
                                                        <h4>ציון עבור תרומה : {elm.dates.length * 5} / {parseInt(course.contribute)}</h4>
                                                        <br></br>
                                                    </div>
                                                    <br></br>
                                                </div>

                                            </div>
                                        </tr>
                                        <tr>

                                        </tr>
                                    </table>
                                </div>
                            </div>
                        );
                    })

                    return toReturn;
                })}
            </CardContent>
        </Card>
    );
}
