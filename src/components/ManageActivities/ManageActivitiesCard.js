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

export default function ManageActivitiesCard(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

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
                    {props.id === "1" ?
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <table>
                                <th style={{ minWidth: "70px" }}>?אשר</th>
                                <th style={{ minWidth: "120px", paddingLeft: "10px" }}>שם הפעילות</th>
                                <th style={{ minWidth: "120px", paddingLeft: "10px" }}>שם הפעילות</th>
                                <th style={{ minWidth: "120px", paddingLeft: "10px" }}>שם הפעילות</th>
                                <th style={{ minWidth: "120px", paddingLeft: "10px" }}>שם הפעילות</th>
                                <th style={{ minWidth: "120px", paddingLeft: "10px" }}>שם ספק התוכן</th>
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
