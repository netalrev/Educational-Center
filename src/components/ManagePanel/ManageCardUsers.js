import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useState, useEffect } from "react";
import {
  listApprovedActivitiess,
  listPendingUsers,
} from "../../graphql/queries";
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
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

const columns = [
  { id: "buttons", label: "", minWidth: 110, maxWidth: 110, align: "center" },
  {
    id: "ActivityName",
    label: "שם הפעילות",
    minWidth: 130,
    maxWidth: 130,
    align: "center",
  },
  {
    id: "email",
    label: "אימייל משתתף",
    minWidth: 120,
    maxWidth: 170,
    align: "center",
  },
  {
    id: "phoneNumber",
    label: "פלאפון משתתף",
    minWidth: 120,
    maxWidth: 120,
    align: "center",
  },
  {
    id: "name",
    label: "שם המשתתף",
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
  var tzoffset_start = new Date().getTimezoneOffset() * 60000;
  var tzoffset_end = new Date().getTimezoneOffset() * 60000 - 60 * 60000;
  var current_time = dates_class.convert(
    new Date(Date.now() - tzoffset_start).toISOString().substring(0, 16)
  );
  var current_time_20 = dates_class.convert(
    new Date(Date.now() - tzoffset_end).toISOString().substring(0, 16)
  );
  function compare_createdAt(a, b) {
    var a_converted = dates_class.convert(a.createdAt);
    var b_converted = dates_class.convert(b.createdAt);
    if (dates_class.compare(a_converted, b_converted) == 1) return 1;
    else if (dates_class.compare(a_converted, b_converted) == 0) return 0;
    else return -1;
  }
  function createRow() {
    const row = users.map((user, index) => {
      return createDataUser(
        user.name,
        user.phone_number,
        user.email,
        allApprovedActivitiess.filter(
          (activity) => activity.id === user.activity_id
        ).length === 0
          ? null
          : allApprovedActivitiess.filter(
              (activity) => activity.id === user.activity_id
            )[0].title,
        <div>
          <ApproveResponsiveDialogUser id={user.id} />
          <br></br>
          <DenyResponsiveDialogUser id={user.id} />
        </div>
      );
    });
    setRows(row);
  }

  function createDataUser(name, phoneNumber, email, ActivityName, buttons) {
    return { name, phoneNumber, email, ActivityName, buttons };
  }

  const fetchAllApprovedActivities = async () => {
    try {
      const approvedActivitiesData = await API.graphql(
        graphqlOperation(listApprovedActivitiess)
      );
      const approvedActivitiesList =
        approvedActivitiesData.data.listApprovedActivitiess.items;
      setAllApprovedActivitiess(approvedActivitiesList.sort(compare_createdAt));
    } catch (error) {
      console.log("error on fetching Approved Activities", error);
    }
  };

  const fetchPendingUsers = async () => {
    try {
      const usersData = await API.graphql(graphqlOperation(listPendingUsers));
      const usersList = usersData.data.listPendingUsers.items;
      setPendingUsers(usersList);
    } catch (error) {
      console.log("error on fetching pending users", error);
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
                          style={{
                            minWidth: column.minWidth,
                            backgroundColor: "black",
                            color: "white",
                          }}
                        >
                          <p className="tableTxt">{column.label}</p>
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
              />
            </Paper>
          </div>
        </CardContent>
      </Collapse>
    </Card>
  );
}
