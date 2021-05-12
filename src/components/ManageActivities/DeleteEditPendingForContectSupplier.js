import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useState, useEffect } from "react";
import { listPendingActivitiess } from "../../graphql/queries";
import { API, graphqlOperation } from "aws-amplify";
import DenyResponsiveDialogActivities from "./DenyResponsiveDialogActivities";
import EditResponsiveDialogActivities from "./EditResponsiveDialogActivities";
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

const columns = [
    { id: 'buttons2', label: '', minWidth: 140, maxWidth: 140, align: 'center' },
    { id: 'buttons', label: '', minWidth: 140, maxWidth: 140, align: 'center' },
    { id: 'dates', label: "תארכי מפגשים", minWidth: 170, maxWidth: 170, align: 'center' },
    { id: 'description', label: 'תיאור הפעילות', minWidth: 170, maxWidth: 170, align: 'center' },
    { id: 'activityName', label: 'שם הפעילות', minWidth: 170, maxWidth: 170, align: 'center' },
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

export default function DeleteEditPendingForContectSupplier(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [pendingActivitiess, setPendingActivitiess] = useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [checked, setChecked] = React.useState(true);
    const rows = pendingActivitiess.map((activity, index) => {
        // console.log("ACTIVITY ZOOM:", activity.zoom, activity.title);
        return (createDataContectSupplier(activity.owner, activity.title, activity.email,
            <Typography>{activity.description}</Typography>,
            activity.dates.map((date, index) => <p>{date} : {(index + 1)} מפגש</p>),
            <DenyResponsiveDialogActivities groupName={props.groupName} type="pending" id={activity.id} email={props.email} givenName={props.givenName} familyName={props.familyName} />,
            <EditResponsiveDialogActivities isZoom={activity.zoom === "" ? false : true} zoom={activity.zoom} groupName={props.groupName} type="pending" description={activity.description} activityCount={activity.activityCount} dates={activity.dates} idx={index} id={activity.id} email={props.email} givenName={props.givenName} familyName={props.familyName} />
        ))
    });


    useEffect(() => { // Fetch for content suppliers
        fetchPendingActivities();
    }, []);

    const fetchPendingActivities = async () => {
        try {
            const PendingActivitiesData = await API.graphql(graphqlOperation(listPendingActivitiess, { filter: { email: { eq: props.email } } }));
            const PendingActivitiesList = PendingActivitiesData.data.listPendingActivitiess.items;
            setPendingActivitiess(PendingActivitiesList);
        } catch (error) {
            console.log("error on fetching Pending Activities", error);
        }
    };

    function createDataContectSupplier(name, activityName, email, description, dates, buttons, buttons2) {
        return { name, activityName, email, description, dates, buttons, buttons2 };
    }

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