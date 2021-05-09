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
import DenyResponsiveDialogActivities from "../ManageActivities/DenyResponsiveDialogActivities";
import EditResponsiveDialogActivities from "../ManageActivities/EditResponsiveDialogActivities";
import ApproveResponsiveDialogManager from "./ApproveResponsiveDialogManager";
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
    { id: 'buttons3', label: '', minWidth: 110, maxWidth: 110, align: 'center' },
    { id: 'buttons2', label: '', minWidth: 110, maxWidth: 110, align: 'center' },
    { id: 'buttons', label: '', minWidth: 110, maxWidth: 110, align: 'center' },
    { id: 'dates', label: "תארכי מפגשים", minWidth: 170, maxWidth: 170, align: 'center' },
    { id: 'description', label: 'תיאור הפעילות', minWidth: 170, maxWidth: 170, align: 'center' },
    { id: 'email', label: 'אימייל ספק התוכן', minWidth: 130, maxWidth: 130, align: 'center' },
    { id: 'activityName', label: 'שם הפעילות', minWidth: 120, maxWidth: 170, align: 'center' },
    { id: 'phoneNumber', label: 'פלאפון ספק התוכן', minWidth: 120, maxWidth: 120, align: 'center' },
    { id: 'name', label: 'שם ספק התוכן', minWidth: 120, maxWidth: 130, align: 'center' }
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




export default function ManageCardActivities(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [allPendingActivitiess, setAllPendingActivitiess] = useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [activitiess, setActivitiess] = useState([]);
    const rows = activitiess.map((activity, index) => {
        return (createDataAdmin(activity.owner, activity.phone_number, activity.title, activity.email,
            <Typography>{activity.description}</Typography>,
            activity.dates.map((date, index) => <p>{date} : {(index + 1)} מפגש</p>),
            <ApproveResponsiveDialogManager id={activity.id} email={props.email} givenName={props.givenName} familyName={props.familyName} />,
            <DenyResponsiveDialogActivities groupName={props.groupName} type="pending" id={activity.id} email={props.email} givenName={props.givenName} familyName={props.familyName} />,
            <EditResponsiveDialogActivities groupName={props.groupName} type="pending" description={activity.description} activityCount={activity.activityCount} dates={activity.dates} idx={index} id={activity.id} email={props.email} givenName={props.givenName} familyName={props.familyName} groupName={props.groupName} />,
        ))
    });
    function createDataAdmin(name, phoneNumber, activityName, email, description, dates, buttons, buttons2, buttons3) {
        return { name, phoneNumber, activityName, email, description, dates, buttons, buttons2, buttons3 };
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
    useEffect(() => {
        fetchPendingActivities();
    }, []);
    // const handleExpandClick = () => {
    //     setExpanded(!expanded);
    // };

    const fetchPendingActivities = async () => {
        try {
            const PendingActivitiesData = await API.graphql(graphqlOperation(listPendingActivitiess));
            const PendingActivitiesList = PendingActivitiesData.data.listPendingActivitiess.items;
            setActivitiess(PendingActivitiesList);
        } catch (error) {
            console.log("error on fetching Pending Activities", error);
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




{/* <div style={{ display: "flex", justifyContent: "center" }}>
<table>
    <th style={{ minWidth: "70px" }}>?אשר</th>
    <th style={{ minWidth: "120px", paddingLeft: "10px" }}>תארכי מפגשים</th>
    <th style={{ minWidth: "120px", paddingLeft: "10px" }}>מספר מפגשים</th>
    <th style={{ minWidth: "120px", paddingLeft: "10px" }}>תיאור הפעילות</th>
    <th style={{ minWidth: "120px", paddingLeft: "10px" }}>אימייל ספק התוכן</th>
    <th style={{ minWidth: "120px", paddingLeft: "10px" }}>שם הפעילות</th>
    <th style={{ minWidth: "120px", paddingLeft: "10px" }}>שם ספק התוכן</th>
    {activitiess.map((activity) => {
        return (
            <tr>
                <td minWidth="100px">
                    {/* <Button
                        size="small"
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        startIcon={<SaveIcon></SaveIcon>}
                    >
                        אשר
                    </Button> */}
//                     <ApproveResponsiveDialogManager id={activity.id} email={props.email} givenName={props.givenName} familyName={props.familyName} />
//                     <DenyResponsiveDialogManager id={activity.id} email={props.email} givenName={props.givenName} familyName={props.familyName} />

//                 </td >
//                 <td>
//                     <div className="ActivityDates">{activity.dates.map((date, index) => (<tr style={{ display: "flex", justifyContent: "center" }}>{date}  :{index + 1} מפגש</tr>))}</div>
//                 </td>
//                 <td>
//                     <div className="ActivityCount">{activity.activityCount}</div>
//                 </td>
//                 <td>
//                     <div className="ActivityDescription">{activity.description}</div>
//                 </td>
//                 <td>
//                     <div className="ActivityEmail">{activity.email}</div>
//                 </td>
//                 <td>
//                     <div className="ActivityTitle">{activity.title}</div>
//                 </td>
//                 <td>
//                     <div className="ActivityOwner">{activity.owner}</div>
//                 </td>
//             </tr >
//         );
//     })}

// </table >
// </div > * /}
