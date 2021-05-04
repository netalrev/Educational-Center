import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import { red } from "@material-ui/core/colors";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useState, useEffect } from "react";
import { listApprovedActivitiess } from "../../graphql/queries";
import { API, graphqlOperation } from "aws-amplify";
import DenyResponsiveDialogActivities from "./DenyResponsiveDialogActivities";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 1000,
        margin: "10px",
        backgroundColor: "light gray",
        color: "red",
        text: "red",
        borderRadius: "4%",
        right: 0,
        transition: "transform 0.15s ease-in-out",
        "&:hover": { transform: "scale3d(1.05, 1.05, 1)" },
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

export default function DeleteApproved(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [approvedActivitiess, setApprovedActivitiess] = useState([]);
    const [allApprovedActivitiess, setAllApprovedActivitiess] = useState([]);

    useEffect(() => {
        fetchApprovedActivities();
    }, []);

    useEffect(() => {
        fetchAllApprovedActivities();
    }, []);

    const fetchApprovedActivities = async () => {
        try {
            const approvedActivitiesData = await API.graphql(graphqlOperation(listApprovedActivitiess, { filter: { email: { eq: props.email } } }));
            const approvedActivitiesList = approvedActivitiesData.data.listApprovedActivitiess.items;
            setApprovedActivitiess(approvedActivitiesList);
            console.log("succses", approvedActivitiesList);
        } catch (error) {
            console.log("error on fetching Approved Activities", error);
        }
    };

    const fetchAllApprovedActivities = async () => {
        try {
            const approvedActivitiesData = await API.graphql(graphqlOperation(listApprovedActivitiess));
            const approvedActivitiesList = approvedActivitiesData.data.listApprovedActivitiess.items;
            setAllApprovedActivitiess(approvedActivitiesList);
        } catch (error) {
            console.log("error on fetching Approved Activities", error);
        }
    };

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    var text = props.title
    return (
        <Card className={classes.root}>
            <CardHeader
                title={text}
            />
            <CardActions disableSpacing>
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
                    {
                        props.groupName === "admins" ?
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <table>
                                    <th style={{ minWidth: "70px" }}>?אשר</th>
                                    <th style={{ minWidth: "120px", paddingLeft: "10px" }}>תארכי מפגשים</th>
                                    <th style={{ minWidth: "120px", paddingLeft: "10px" }}>מספר מפגשים</th>
                                    <th style={{ minWidth: "120px", paddingLeft: "10px" }}>תיאור הפעילות</th>
                                    <th style={{ minWidth: "120px", paddingLeft: "10px" }}>אימייל ספק התוכן</th>
                                    <th style={{ minWidth: "120px", paddingLeft: "10px" }}>שם הפעילות</th>
                                    <th style={{ minWidth: "120px", paddingLeft: "10px" }}>שם ספק התוכן</th>
                                    {allApprovedActivitiess.map((activity) => {
                                        return (
                                            <tr>
                                                <td minWidth="100px">
                                                    <DenyResponsiveDialogActivities id={activity.id} email={props.email} givenName={props.givenName} familyName={props.familyName} />

                                                </td>
                                                <td>
                                                    <div className="ActivityDates">{activity.dates.map((date, index) => (<tr style={{ display: "flex", justifyContent: "center" }}>{date}  :{index + 1} מפגש</tr>))}</div>
                                                </td>
                                                <td>
                                                    <div className="ActivityCount">{activity.activityCount}</div>
                                                </td>
                                                <td>
                                                    <div className="ActivityDescription">{activity.description}</div>
                                                </td>
                                                <td>
                                                    <div className="ActivityEmail">{activity.email}</div>
                                                </td>
                                                <td>
                                                    <div className="ActivityTitle">{activity.title}</div>
                                                </td>
                                                <td>
                                                    <div className="ActivityOwner">{activity.owner}</div>
                                                </td>
                                            </tr>
                                        );
                                    })}

                                </table>
                            </div>
                            :
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <table>
                                    <th style={{ minWidth: "70px" }}>?אשר</th>
                                    <th style={{ minWidth: "120px", paddingLeft: "10px" }}>תארכי מפגשים</th>
                                    <th style={{ minWidth: "120px", paddingLeft: "10px" }}>מספר מפגשים</th>
                                    <th style={{ minWidth: "120px", paddingLeft: "10px" }}>תיאור הפעילות</th>
                                    <th style={{ minWidth: "120px", paddingLeft: "10px" }}>שם הפעילות</th>
                                    {approvedActivitiess.map((activity) => {
                                        return (
                                            <tr>
                                                <td minWidth="100px">
                                                    <DenyResponsiveDialogActivities id={activity.id} email={props.email} givenName={props.givenName} familyName={props.familyName} />

                                                </td>
                                                <td>
                                                    <div className="ActivityDates">{activity.dates.map((date, index) => (<tr style={{ display: "flex", justifyContent: "center" }}>{date}  :{index + 1} מפגש</tr>))}</div>
                                                </td>
                                                <td>
                                                    <div className="ActivityCount">{activity.activityCount}</div>
                                                </td>
                                                <td>
                                                    <div className="ActivityDescription">{activity.description}</div>
                                                </td>
                                                <td>
                                                    <div className="ActivityTitle">{activity.title}</div>
                                                </td>
                                            </tr>
                                        );
                                    })}

                                </table>
                            </div>
                    }
                </CardContent>
            </Collapse>
        </Card >
    );
}
