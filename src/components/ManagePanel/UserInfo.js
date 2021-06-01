import React from "react";
import clsx from "clsx";
import { useState, useEffect } from "react";
import { listSubmitedActivityFeedbacks, listUsers } from "../../graphql/queries";
import { API, graphqlOperation } from "aws-amplify";


import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import $ from "jquery";
import LinearDeterminate from "../Profile/LinearDeterminate";
import WatchUserActivityProgress from "./WatchUserActivityProgress";

const columns = [
    {
        id: "button",
        label: "",
        minWidth: 110,
        maxWidth: 110,
        align: "center",
    },
    {
        id: "score",
        label: "נקודות ורמה  ",
        minWidth: 120,
        maxWidth: 130,
        align: "center",
    },
    {
        id: "email",
        label: "אימייל התלמיד",
        minWidth: 130,
        maxWidth: 130,
        align: "center",
        color: "white",
    },
    {
        id: "phoneNumber",
        label: "פלאפון התלמיד",
        minWidth: 120,
        maxWidth: 120,
        align: "center",
    },
    {
        id: "name",
        label: "שם ספק התוכן",
        minWidth: 120,
        maxWidth: 130,
        align: "center",
    },
];

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: "95%",
        minWidth: "95%",
        left: 0,
        margin: "auto",
        marginTop: "20px",
        opacity: 0.85,
        backgroundColor: "rgba(3, 3, 3, 0.5)",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        color: "red",
        text: "red",
        right: 0,
        transition: "transform 0.15s ease-in-out",
    },
    selectDropdown: { color: "white", backgroundColor: "black" },
    menuItem: {
        "&:hover": {
            backgroundColor: "red",
        },
    },
    expand: {
        transform: "rotate(0deg)",
        marginLeft: "auto",
        color: "white", //arrow color

        transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: "rotate(180deg)",
        color: "red",
    },
    subColor: {
        color: "red",
    },
}));
var dates_class = {
    convert: function (d) {
        // Converts the date in d to a date-object. The input can be:
        //   a date object: returned without modification
        //  an array      : Interpreted as [year,month,day]. NOTE: month is 0-11.
        //   a number     : Interpreted as number of milliseconds
        //                  since 1 Jan 1970 (a timestamp)
        //   a string     : Any format supported by the javascript engine, like
        //                  "YYYY/MM/DD", "MM/DD/YYYY", "Jan 31 2009" etc.
        //  an object     : Interpreted as an object with year, month and date
        //                  attributes.  **NOTE** month is 0-11.
        return d.constructor === Date
            ? d
            : d.constructor === Array
                ? new Date(d[0], d[1], d[2])
                : d.constructor === Number
                    ? new Date(d)
                    : d.constructor === String
                        ? new Date(d)
                        : typeof d === "object"
                            ? new Date(d.year, d.month, d.date)
                            : NaN;
    },
    compare: function (a, b) {
        // Compare two dates (could be of any type supported by the convert
        // function above) and returns:
        //  -1 : if a < b
        //   0 : if a = b
        //   1 : if a > b
        // NaN : if a or b is an illegal date
        // NOTE: The code inside isFinite does an assignment (=).
        return isFinite((a = this.convert(a).valueOf())) &&
            isFinite((b = this.convert(b).valueOf()))
            ? (a > b) - (a < b)
            : NaN;
    },
    inRange: function (d, start, end) {
        // Checks if date in d is between dates in start and end.
        // Returns a boolean or NaN:
        //    true  : if d is between start and end (inclusive)
        //    false : if d is before start or after end
        //    NaN   : if one or more of the dates is illegal.
        // NOTE: The code inside isFinite does an assignment (=).
        return isFinite((d = this.convert(d).valueOf())) &&
            isFinite((start = this.convert(start).valueOf())) &&
            isFinite((end = this.convert(end).valueOf()))
            ? start <= d && d <= end
            : NaN;
    },
};
function compare_createdAt(a, b) {
    var a_converted = dates_class.convert(a.createdAt);
    var b_converted = dates_class.convert(b.createdAt);
    if (dates_class.compare(a_converted, b_converted) == 1) return 1;
    else if (dates_class.compare(a_converted, b_converted) == 0) return 0;
    else return -1;
}
export default function UserInfo(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [activitiess, setActivitiess] = useState([]);
    const [users, setUsers] = useState([]);
    const fetchUsers = async () => {
        try {
            const usersData = await API.graphql(graphqlOperation(listUsers));
            const usersList = usersData.data.listUsers.items;
            setUsers(usersList);
        } catch (error) {
            console.log("error on fetching users", error);
        }
    };
    useEffect(() => {
        fetchUsers();
    }, []);
    useEffect(() => {
        fetchActivitiesFeedbacks();
    }, []);
    const rows = users.map((user, index) => {
        const grades = [0, 50, 100, 300, 700, 1500, 3100, 4700];
        var level = 0;
        for (var i = 0; i < grades.length - 1; i++) {
            if (user.score >= grades[i] && user.score < grades[i + 1]) {
                level = i + 1;
            }
        }
        return createDataAdmin(
            user.name,
            user.phone_number,
            user.email,
            <div>
                <p>
                    ניקוד : {grades[level]} / {user.score}
                </p>
                <p>
                    רמה : {level}
                </p>
                <br />
                <LinearDeterminate score={parseInt(user.score / grades[level] * 100)} />
                {parseInt(user.score / grades[level] * 100)}%
            </div>,
            <div>
                <WatchUserActivityProgress
                    idx={index}
                    email={user.email}
                    givenName={user.givenName}
                    familyName={user.familyName}
                    groupName={user.groupName}
                />
            </div>
        );
    });
    function createDataAdmin(name, phoneNumber, email, score, button) {
        return {
            name,
            phoneNumber,
            email,
            score,
            button
        };
    }
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        $("td").each(function () {
            $(this).css("color", "#ffffff");
        });
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    // const handleExpandClick = () => {
    //     setExpanded(!expanded);
    // };

    const fetchActivitiesFeedbacks = async () => {
        try {
            const activitiesFeedbacksData = await API.graphql(graphqlOperation(listSubmitedActivityFeedbacks));
            const activitiesFeedbacksList = activitiesFeedbacksData.data.listSubmitedActivityFeedbacks.items;
            setActivitiess(activitiesFeedbacksList.sort(compare_createdAt));
            console.log(activitiesFeedbacksList)
        } catch (error) {
            console.log("error on fetching Pending Activities", error);
        }
    };

    var text = <b>{props.title}</b>;
    return (
        <Card className={classes.root}>
            <CardHeader title={text} />
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
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            color: "white",
                        }}
                    >
                        <Paper className={classes.root}>
                            <TableContainer className={classes.container}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow key={rows.id}>
                                            {columns.map((column) => (
                                                <TableCell
                                                    key={column.id}
                                                    align={column.align}
                                                    style={{
                                                        minWidth: column.minWidth,
                                                        backgroundColor: "black",
                                                        color: "white",
                                                    }}
                                                >
                                                    {column.label}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows
                                            .slice(
                                                page * rowsPerPage,
                                                page * rowsPerPage + rowsPerPage
                                            )
                                            .map((row) => {
                                                return (
                                                    <TableRow
                                                        hover
                                                        role="checkbox"
                                                        tabIndex={-1}
                                                        key={row.code}
                                                    >
                                                        {columns.map((column) => {
                                                            const value = row[column.id];
                                                            return (
                                                                <TableCell
                                                                    key={column.id}
                                                                    align={column.align}
                                                                    style={{ color: "white" }}
                                                                >
                                                                    {column.format && typeof value === "number"
                                                                        ? column.format(value)
                                                                        : value}
                                                                </TableCell>
                                                            );
                                                        })}
                                                    </TableRow>
                                                );
                                            })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[10, 25, 100]}
                                component="div"
                                count={rows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                                SelectProps={{
                                    MenuProps: { classes: { paper: classes.selectDropdown } },
                                }}
                                classes={{ menuItem: classes.menuItem }}
                            />
                        </Paper>
                    </div>
                </CardContent>
            </Collapse>
        </Card>
    );
}