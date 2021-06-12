import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import { red } from "@material-ui/core/colors";
import { useState, useEffect } from "react";
import { listSubmitedActivityFeedbacks, listApprovedUsers, listUsers, listApprovedActivitiess } from "../../graphql/queries";
import { API, graphqlOperation } from "aws-amplify";

//The style for manage card activity part.
const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 1000,
        minWidth: 400,
        margin: "10px",
        backgroundColor: "light gray",

        borderRadius: "4%",
        right: 0,
        transition: "transform 0.15s ease-in-out",
        "& label": {
            margin: "10px",
            color: "#d8e3e7",
            fontSize: "2000px",
            backgroundColor: "#d8e3e7",
            borderRadius: "20px",
            zIndex: "1222",
        },
    },
    expand: {
        transform: "rotate(0deg)",
        marginLeft: "auto",
        color: "#d8e3e7", //arrow color
        transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: "rotate(180deg)",
        color: "#132c33",
    },
    avatar: {
        backgroundColor: red[500],
        color: "#d8e3e7",
    },
    subColor: {
        color: "#d8e3e7",
    },
}));

export default function UserProgressCard(props) {

    //               Use State Initialization              //

    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [allActivitiesFeedback, setAllActivitiesFeedback] = useState([]);
    const [approvedActivities, setApprovedActivities] = useState([]);
    const [approvedUsers, setApprovedUsers] = useState([]);
    const [users, setUsers] = useState([]);
    const [userInfo, setUserInfo] = useState([]);

    //               Use Effect Initialization              //

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
    useEffect(() => {
        // Fetch for admins
        fetchPersonalIDs();
    }, [users, approvedUsers, allActivitiesFeedback]);


    //               Functions              //

    //async function to fetch all users.
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

    //async function to fetch all approved users.
    const fetchApprovedUsers = async () => {
        try {
            const approvedUsersData = await API.graphql(graphqlOperation(listApprovedUsers));
            const approvedUserList = approvedUsersData.data.listApprovedUsers.items;
            setApprovedUsers(approvedUserList);
        } catch (error) {
            console.log("error on fetching approved users", error);
        }
    };

    //async function to fetch all activities feedback.
    const fetchAllActivitiesFeedbacks = async () => {
        try {
            const activitiesFeedbackData = await API.graphql(graphqlOperation(listSubmitedActivityFeedbacks));
            const activitiesFeedbackList = activitiesFeedbackData.data.listSubmitedActivityFeedbacks.items;
            setAllActivitiesFeedback(activitiesFeedbackList);
        } catch (error) {
            console.log("error on fetching approved feedbacks", error);
        }
    };

    //async function to fetch all approved activities.
    const fetchApprovedActivities = async () => {
        try {
            const approvedActivitiesData = await API.graphql(graphqlOperation(listApprovedActivitiess));
            const approvedActivitiesList = approvedActivitiesData.data.listApprovedActivitiess.items;
            setApprovedActivities(approvedActivitiesList);
        } catch (error) {
            console.log("error on fetching approved activities", error);
        }
    };

    //async function to fetch all users personal id's.
    const fetchPersonalIDs = async () => {
        try {
            if (users.length !== 0 && approvedUsers.length !== 0 && allActivitiesFeedback.length !== 0) {
                var list = users.map(user => {
                    var user_activities = approvedUsers.filter(user2 => user2.email === user.email);
                    var email = user.email;
                    var name = user.name;
                    var activities_ids = user_activities.map(activity => {
                        console.log(activity.title, activity.activity_id);
                        return activity.activity_id
                    });
                    var toReturn = { email, name, activities_ids };
                    return toReturn
                });
                console.log("LIST",);
                list = list.filter(user => user.email === props.email)[0];
                var existing_feedbacks = allActivitiesFeedback.map(feed => feed.activity_id);
                console.log(list.activities_ids, existing_feedbacks);
                var copy = [];
                for (var i = 0; i < list.activities_ids.length; i++) {
                    if (existing_feedbacks.includes(list.activities_ids[i])) {
                        copy.push(list.activities_ids[i])
                    }

                }
                list.activities_ids = copy;
                var courses = [];
                var feedbacks = allActivitiesFeedback.filter(feedback => list.activities_ids.includes(feedback.activity_id));
                list.activities_ids.forEach(id => {
                    var attendance = 0;
                    var contribute = 0;
                    var participation = 0;
                    var filtered = feedbacks.filter(feedback => feedback.activity_id === id);
                    console.log("FILTERED", filtered)
                    var i = 0;
                    filtered.forEach(meeting => {
                        meeting.form.forEach(feedback => {
                            if (feedback[1] === props.email) {
                                console.log(feedback)
                                if (feedback[3] === "10") attendance += 1;
                                if (feedback[4] !== "0") contribute += parseInt(feedback[4]) / 3;
                                if (feedback[5] !== "0") participation += parseInt(feedback[5]) / 3;
                            }
                            i++;
                        })
                        // console.log("HELLO", feedback.form[i][1])

                    })
                    courses.push({ id, attendance, contribute, participation })
                });
                // console.log("COURSES", props.email);
                setUserInfo(courses);
            }
        }
        catch (error) {
            console.log("error on fetching personal ids", error);
        }
    }


    var text = <b>{props.title}</b>;//Var for title.
    //The react component.
    return (
        <Card
            className={classes.root}
            style={{
                color: "#132c33",
                backgroundColor: "#d8e3e7",
            }}
        >
            <CardHeader title={text} />
            <CardContent>
                {userInfo.map((course) => {
                    var activity = approvedActivities.filter(elm => elm.id === course.id);
                    var toReturn;
                    activity.forEach(elm => {
                        toReturn = (
                            <div>
                                <h4>{elm.title}</h4>
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
                                                <div>
                                                    <div
                                                        style={{
                                                            borderStyle: "solid",
                                                            borderRadius: "15px",
                                                            color: "#132c33",
                                                            backgroundColor: "#d8e3e7",
                                                            minWidth: "200px"
                                                        }}
                                                    >
                                                        <br></br>
                                                        <h4>נוכחות: {elm.dates.length} / {course.attendance}</h4>
                                                        <br></br>
                                                        <h4>השתתפות : 5 / {parseInt(course.participation) / elm.dates.length}</h4>
                                                        <br></br>
                                                        <h4>תרומה : 5 / {parseInt(course.contribute) / elm.dates.length}</h4>
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
