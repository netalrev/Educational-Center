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
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import SaveIcon from '@material-ui/icons/Save';

import { listActivitiess } from "../../graphql/queries";
import Amplify, { Auth, API, graphqlOperation } from "aws-amplify";
import { useState, useEffect } from "react";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 1000,
        margin: "10px",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        color: "white",
        text: "white",
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

export default function ManagePanel(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [activitiess, setActivitiess] = useState([]);
    // var activityName = "maor";

    useEffect(() => {
        fetchActivities();
    }, []);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const fetchActivities = async () => {
        try {
            const activitiesData = await API.graphql(graphqlOperation(listActivitiess));
            const activitiesList = activitiesData.data.listActivitiess.items;
            setActivitiess(activitiesList);
        } catch (error) {
            console.log("error on fetching songs", error);
        }
    };

    var text = props.title;
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
                    {props.id === "1" ?
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <table>
                                <th style={{ minWidth: "70px" }}>?אשר</th>
                                <th style={{ minWidth: "120px", paddingLeft: "10px" }}>תיאור הפעילות</th>
                                <th style={{ minWidth: "120px", paddingLeft: "10px" }}>אימייל ספק התוכן</th>
                                <th style={{ minWidth: "120px", paddingLeft: "10px" }}>שם הפעילות</th>
                                <th style={{ minWidth: "120px", paddingLeft: "10px" }}>שם ספק התוכן</th>
                                {activitiess.map((activity, idx) => {
                                    return (
                                        <tr>
                                            <td minWidth="100px">
                                                <Button
                                                    size="small"
                                                    variant="contained"
                                                    color="primary"
                                                    className={classes.button}
                                                    startIcon={<SaveIcon></SaveIcon>}
                                                >
                                                    אשר
                                                </Button>
                                            </td>
                                            <td>
                                                <div className="ActivityDescription" word-wrap="break-word"
                                                    maxWidth="50px">{activity.description}</div>
                                            </td>
                                            <td>
                                                <div className="ActivityOwner">{activity.owner}</div>
                                            </td>
                                            <td>
                                                <div className="ActivityTitle">{activity.title}</div>
                                            </td>
                                        </tr>
                                    );
                                })}

                            </table>
                        </div>
                        :
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <table>
                                <th style={{ minWidth: "70px" }}>? אשר</th>
                                <th style={{ minWidth: "120px", paddingLeft: "10px" }}>פלאפון</th>
                                <th style={{ minWidth: "120px", paddingLeft: "10px" }}>שם משפחה</th>
                                <th style={{ minWidth: "120px", paddingLeft: "10px" }}>שם פרטי</th>
                            </table>
                        </div>
                    }

                </CardContent>
            </Collapse>
        </Card >
    );
}
