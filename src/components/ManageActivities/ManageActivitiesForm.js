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
import { useState } from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';



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
        if (event.target.value > 10) {
            event.target.value = 10
        }
        else if (event.target.value < 1) {
            event.target.value = 1
        }
        for (var i = 0; i < event.target.value; i++) {
            var temp = ":תאריך פעילות מספר" + " " + (i + 1)
            toReturn.push(<tr><FormElement title={temp} type="date" defaultValue={new Date().toLocaleDateString('en-CA')} /></tr>);
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
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <table>
                            <tr>
                                <FormElement title=": שם הפעילות" type="text" />
                            </tr>
                            <tr>
                                <FormElement title=": מספר פעילויות" type="number" id="numActivities" onChange={createDateInputs} />
                            </tr>
                            {dates}
                            <tr>
                                <TextField
                                    id="outlined-multiline-static"
                                    label=": תיאור הפעילויות"
                                    multiline
                                    rows={4}
                                    variant="outlined"
                                />

                            </tr>
                            <td minWidth="100px">
                                <Button
                                    size="small"
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    startIcon={<CloudUploadIcon></CloudUploadIcon>}>
                                    עלה
                                </Button>
                            </td>
                        </table>
                    </div>
                </CardContent>
            </Collapse>
        </Card >
    );
}