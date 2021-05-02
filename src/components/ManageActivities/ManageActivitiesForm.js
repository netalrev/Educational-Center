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
import { useState } from "react";
import ResponsiveDialogActivities from "./ResponsiveDialogActivities";



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

export default function ManageActivitiesForm(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [dates, setDates] = useState([]);
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
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <table>
                            <tr>
                                <FormElement name="name" title=": שם הפעילות" type="text" />
                            </tr>
                            <tr>
                                <FormElement name="activityCount" title=": מספר פעילויות" type="number" onChange={createDateInputs} />
                            </tr>
                            <tr id="dates_tr">
                                {dates}
                            </tr>
                            <tr>
                                <TextField
                                    id="outlined-multiline-static"
                                    label=": תיאור הפעילויות"
                                    multiline
                                    rows={4}
                                    variant="outlined"
                                />

                            </tr>
                            {/* <td minWidth="100px">
                                <Button
                                    size="small"
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    startIcon={<CloudUploadIcon></CloudUploadIcon>}
                                    onClick={createActivity}
                                >
                                    עלה
                                </Button>
                            </td> */}
                            <tr>
                                <ResponsiveDialogActivities email={props.email} givenName={props.givenName} familyName={props.familyName} />
                            </tr>
                        </table>
                    </div>
                </CardContent>
            </Collapse>
        </Card >
    );
}