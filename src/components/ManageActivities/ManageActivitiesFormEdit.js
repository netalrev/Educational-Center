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
import FormElement from "./FormElement";
import TextField from '@material-ui/core/TextField';
import UpdateResponsiveDialogActivities from "./UpdateResponsiveDialogActivities";
import { useState, useEffect } from "react";
import { listPendingActivitiess } from "../../graphql/queries";
import { deletePendingActivities, deleteApprovedActivities } from "../../graphql/mutations";
import Amplify, { API, graphqlOperation, selectInput } from "aws-amplify";
import ActivityTable from "../Activities/ActivityTable";
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
    // textField: {
    //     width: '90%',
    //     marginLeft: 'auto',
    //     marginRight: 'auto',
    //     textAlign: 'right',
    //     theme: "createMuiTheme({ direction: \"rtl\" }",
    //     paddingBottom: 0,
    //     marginTop: "0",
    //     fontWeight: 500
    // },
}));

export default function ManageActivitiesForm(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [dates, setDates] = useState(fillDateInputs, []);
    const [pendingActivitiess, setPendingActivitiess] = useState([]);
    // const [allPendingActivitiess, setAllPendingActivitiess] = useState([]);

    useEffect(() => { // Fetch for content suppliers
        fetchPendingActivities();
    }, []);

    // useEffect(() => { // Fetch for admins
    //     fetchAllPendingActivities();
    // }, []);
    const fetchPendingActivities = async () => {
        try {
            const PendingActivitiesData = await API.graphql(graphqlOperation(listPendingActivitiess, { filter: { email: { eq: props.email } } }));
            const PendingActivitiesList = PendingActivitiesData.data.listPendingActivitiess.items;
            setPendingActivitiess(PendingActivitiesList);


        } catch (error) {
            console.log("error on fetching Pending Activities", error);
        }
    };

    // const fetchAllPendingActivities = async () => {
    //     try {
    //         const PendingActivitiesData = await API.graphql(graphqlOperation(listPendingActivitiess));
    //         const PendingActivitiesList = PendingActivitiesData.data.listPendingActivitiess.items;
    //         setAllPendingActivitiess(PendingActivitiesList);
    //     } catch (error) {
    //         console.log("error on fetching Pending Activities", error);
    //     }
    // };

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    function createDateInputs(event) {
        var toReturn = [];
        if (document.getElementsByName("activityCount")[0].value > 10) {
            document.getElementsByName("activityCount")[0].value = 10
        }
        else if (document.getElementsByName("activityCount")[0].value < 1) {
            document.getElementsByName("activityCount")[0].value = 1
        }
        for (var i = 0; i < document.getElementsByName("activityCount")[0].value; i++) {
            var temp = ":תאריך פעילות מספר" + " " + (i + 1)
            toReturn.push(<tr><FormElement name="dates" title={temp} type="date" defaultValue={new Date().toLocaleDateString('en-CA')} /></tr>);
        }
        setDates(toReturn);

    }
    function fillDateInputs() {
        var toReturn = [];
        // console.log(props.id)
        for (var i = 0; i < 3; i++) {
            var temp = ":תאריך פעילות מספר" + " " + (i + 1)
            toReturn.push(<tr><FormElement name="dates" title={temp} type="date" defaultValue={new Date().toLocaleDateString('en-CA')} /></tr>);
        }
        return toReturn;
    }
    // console.log("hey", pendingActivitiess);
    // console.log("hey2", pendingActivitiess[0], props.idx);
    //const listActivitiess = [...pendingActivitiess]
    var startFlag = true;
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
                    {pendingActivitiess.map((activity, idx) => {
                        if (props.idx === idx) {
                            return (
                                <div style={{ display: "flex", justifyContent: "center" }}>
                                    <table>
                                        <tr>
                                            <FormElement name="name" title=": שם הפעילות" type="text" defaultValue={activity.title} />
                                        </tr>
                                        <tr>
                                            <FormElement name="activityCount" title=": מספר פעילויות" type="number" onChange={createDateInputs} defaultValue={activity.activityCount} />
                                        </tr>
                                        <tr id="dates_tr">
                                            {dates}
                                        </tr>
                                        <tr>
                                            <TextField
                                                id="outlined-multiline-static"
                                                label=": תיאור הפעילויות"
                                                className={classes.textField}
                                                defaultValue={activity.description}
                                                multiline
                                                rows={4}
                                                variant="outlined"
                                            />

                                        </tr>
                                        <tr>
                                            <UpdateResponsiveDialogActivities email={props.email} givenName={props.givenName} familyName={props.familyName} />
                                        </tr>
                                    </table>
                                </div>
                            )
                        }
                    })}
                </CardContent>
            </Collapse>
        </Card >
    );
}