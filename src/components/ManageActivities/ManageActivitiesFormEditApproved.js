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
import { listApprovedActivitiess } from "../../graphql/queries";
import { API, graphqlOperation } from "aws-amplify";
import Checkbox from '@material-ui/core/Checkbox';

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

export default function ManageActivitiesFormEditApproved(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [approvedActivitiess, setApprovedActivitiess] = useState([]);
    const [allApprovedActivitiess, setAllApprovedActivitiess] = useState([]);
    const [dates, setDates] = useState(fillDateInputs, []);
    const [checked, setChecked] = React.useState(true);
    const [zoomLink, setZoomLink] = useState(<tr><FormElement name="activity_zoom" title=": קישור לזום" type="text" /></tr>);

    var handleChange = (event) => {
        var toReturn;
        setChecked(event.target.checked);
        if (event.target.checked == true) {
            toReturn = <tr><FormElement name="activity_zoom" title=": קישור לזום" type="text" /></tr>;
        }
        else {
            toReturn = null;
        }
        setZoomLink(toReturn);
    };

    useEffect(() => { // Fetch for content suppliers
        fetchApprovedActivities();
    }, []);

    useEffect(() => { // Fetch for admins
        fetchAllApprovedActivities();
    }, []);
    const fetchApprovedActivities = async () => {
        try {
            const ApprovedActivitiesData = await API.graphql(graphqlOperation(listApprovedActivitiess, { filter: { email: { eq: props.email } } }));
            const ApprovedActivitiesList = ApprovedActivitiesData.data.listApprovedActivitiess.items;
            setApprovedActivitiess(ApprovedActivitiesList);
        } catch (error) {
            console.log("error on fetching Approved Activities", error);
        }
    };

    const fetchAllApprovedActivities = async () => {
        try {
            const ApprovedActivitiesData = await API.graphql(graphqlOperation(listApprovedActivitiess));
            const ApprovedActivitiesList = ApprovedActivitiesData.data.listApprovedActivitiess.items;
            setAllApprovedActivitiess(ApprovedActivitiesList);
        } catch (error) {
            console.log("error on fetching Approved Activities", error);
        }
    };

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
        var tzoffset = (new Date()).getTimezoneOffset() * 60000;
        for (var i = 0; i < document.getElementsByName("activityCount")[0].value; i++) {
            var temp = ":תאריך פעילות מספר" + " " + (i + 1)
            toReturn.push(
                <tr><TextField
                    id="datetime-local"
                    name="dates"
                    label={temp}
                    type="datetime-local"
                    defaultValue={new Date(Date.now() - tzoffset).toISOString().substring(0, 16)}
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                /></tr>
            );
        }
        setDates(toReturn);

    }
    function fillDateInputs() {
        var toReturn = [];
        var tzoffset = (new Date()).getTimezoneOffset() * 60000;
        for (var i = 0; i < props.activityCount; i++) {
            var temp = ":תאריך פעילות מספר" + " " + (i + 1)
            toReturn.push(
                <tr><TextField
                    id="datetime-local"
                    name="dates"
                    label={temp}
                    type="datetime-local"
                    defaultValue={props.dates[i]}
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                /></tr>)
        }
        return toReturn;
    }

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
                    {console.log(props.groupName)};
                    {props.groupName === "admins" ?
                        allApprovedActivitiess.map((activity, idx) => {
                            if (props.idx === idx) {
                                return (
                                    <div style={{ display: "flex", justifyContent: "center" }}>
                                        <table>
                                            <tr>
                                                <FormElement name="name" title=": שם הפעילות" type="text" defaultValue={activity.title} />
                                            </tr>
                                            <tr>
                                                <FormElement name="activity_img" title=": קישור לתמונה" type="text" />
                                            </tr>
                                            <tr>
                                                מפגש בזום
                                                <Checkbox
                                                    id="zoomCheckBox"
                                                    checked={checked}
                                                    onChange={handleChange}
                                                    color="primary"
                                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                                />
                                            </tr>
                                            <tr>
                                                {zoomLink}
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
                                                <UpdateResponsiveDialogActivities groupName={props.groupName} type={props.type} id={activity.id} dates={dates} />
                                            </tr>
                                        </table>
                                    </div>
                                )
                            }
                        })
                        :
                        approvedActivitiess.map((activity, idx) => {
                            if (props.idx === idx) {
                                return (
                                    <div style={{ display: "flex", justifyContent: "center" }}>
                                        <table>
                                            {/* <tr>
                                                <FormElement name="name" title=": שם הפעילות" type="text" defaultValue={activity.title} />
                                            </tr> */}
                                            <tr>
                                                מפגש בזום
                                                <Checkbox
                                                    id="zoomCheckBox"
                                                    checked={checked}
                                                    onChange={handleChange}
                                                    color="primary"
                                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                                />
                                            </tr>
                                            <tr>
                                                {zoomLink}
                                            </tr>
                                            <tr>
                                                <FormElement name="activityCount" title=": מספר פעילויות" type="number" onChange={createDateInputs} defaultValue={activity.activityCount} />
                                            </tr>
                                            <tr id="dates_tr">
                                                {dates}
                                            </tr>
                                            {/* <tr>
                                                <TextField
                                                    id="outlined-multiline-static"
                                                    label=": תיאור הפעילויות"
                                                    className={classes.textField}
                                                    defaultValue={activity.description}
                                                    multiline
                                                    rows={4}
                                                    variant="outlined"
                                                />

                                            </tr> */}
                                            <tr>
                                                <UpdateResponsiveDialogActivities groupName={props.groupName} id={activity.id} type={props.type} idx={props.idx} dates={dates} />
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