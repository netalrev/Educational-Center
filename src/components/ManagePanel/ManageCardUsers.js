import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useState, useEffect } from "react";
import { listApprovedActivitiess, listPendingUsers } from "../../graphql/queries";
import { API, graphqlOperation } from "aws-amplify";
import clsx from "clsx";

import DenyResponsiveDialogUser from "./DenyResponsiveDialogUser";
import ApproveResponsiveDialogUser from "./ApproveResponsiveDialogUser";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

const columns = [
    { id: 'buttons2', label: '', minWidth: 110, maxWidth: 110, align: 'center' },
    { id: 'buttons', label: '', minWidth: 110, maxWidth: 110, align: 'center' },
    { id: 'ActivityName', label: 'שם הפעילות', minWidth: 130, maxWidth: 130, align: 'center' },
    { id: 'email', label: 'אימייל משתתף', minWidth: 120, maxWidth: 170, align: 'center' },
    { id: 'phoneNumber', label: 'פלאפון משתתף', minWidth: 120, maxWidth: 120, align: 'center' },
    { id: 'name', label: 'שם המשתתף', minWidth: 120, maxWidth: 130, align: 'center' }
];

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 1300,
        margin: "10px",
        backgroundColor: "light gray",
        color: "red",
        text: "red",
        borderRadius: "4%",
        right: 0,
        transition: "transform 0.15s ease-in-out"
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
    subColor: {
        color: "red",
    },
}));




export default function ManageCardUsers(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [allApprovedActivitiess, setAllApprovedActivitiess] = useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [users, setPendingUsers] = useState([]);
    const [rows, setRows] = useState([]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    useEffect(() => {
        fetchPendingUsers();
    }, []);
    useEffect(() => {
        fetchAllApprovedActivities();
    }, []);
    useEffect(() => {
        createRow();
    }, [users, allApprovedActivitiess]);

    function createRow() {
        const row = users.map((user, index) => {
            return (createDataUser(user.name, user.phone_number, user.email, allApprovedActivitiess.filter(activity => activity.id === user.activity_id).length === 0 ? null : allApprovedActivitiess.filter(activity => activity.id === user.activity_id)[0].title,
                <ApproveResponsiveDialogUser id={user.id} />,
                <DenyResponsiveDialogUser id={user.id} />,
            ))
        });
        setRows(row);
    }

    function createDataUser(name, phoneNumber, email, ActivityName, buttons, buttons2) {
        return { name, phoneNumber, email, ActivityName, buttons, buttons2 };
    }

    const fetchAllApprovedActivities = async () => {
        try {
            const approvedActivitiesData = await API.graphql(graphqlOperation(listApprovedActivitiess));
            const approvedActivitiesList = approvedActivitiesData.data.listApprovedActivitiess.items;
            setAllApprovedActivitiess(approvedActivitiesList);
        } catch (error) {
            console.log("error on fetching Approved Activities", error);
        }
    }

    const fetchPendingUsers = async () => {
        try {
            const usersData = await API.graphql(graphqlOperation(listPendingUsers));
            const usersList = usersData.data.listPendingUsers.items;
            setPendingUsers(usersList);
        } catch (error) {
            console.log("error on fetching pending users", error);
        }
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
                        <Paper className={classes.root}>
                            <TableContainer className={classes.container}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            {columns.map((column) => (
                                                <TableCell
                                                    key={column.id}
                                                    align={column.align}
                                                    style={{ minWidth: column.minWidth }}
                                                >
                                                    {column.label}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                            return (
                                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                    {columns.map((column) => {
                                                        const value = row[column.id];
                                                        return (
                                                            <TableCell key={column.id} align={column.align}>
                                                                {column.format && typeof value === 'number' ? column.format(value) : value}
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
                            />
                        </Paper>
                    </div>
                </CardContent>
            </Collapse>
        </Card >
    );
}
