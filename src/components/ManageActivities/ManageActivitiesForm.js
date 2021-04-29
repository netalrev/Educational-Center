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
import { Input } from '@material-ui/core';
import { useState } from "react";


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
        for (var i = 0; i < event.target.value; i++) {
            var temp = ":תאריך פעילות מספר" + " " + (i + 1)
            toReturn.push(<FormElement title={temp} type="date" defaultValue={new Date().toLocaleDateString('en-CA')} />);
        }
        setDates(toReturn);
    }
    //  console.log(dates);
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
                    <table>
                        <FormElement title=": שם הפעילות" type="text" />
                        <FormElement title=": מספר פעילויות" type="number" id="numActivities" onChange={createDateInputs} />
                        {/* <FormElement title=": תאריך" type="date" defaultValue={new Date().toLocaleDateString('en-CA')}/> */}
                        {dates}
                        <FormElement title=": תיאור הפעילויות" type="text" />
                    </table>
                    <input type="submit" value="Submit" />
                </CardContent>
            </Collapse>
        </Card >
    );
}