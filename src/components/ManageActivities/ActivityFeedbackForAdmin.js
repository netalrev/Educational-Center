import React from "react";
import { useState, useEffect } from "react";
import { listActivityFeedbacks } from "../../graphql/queries";
import { API, graphqlOperation } from "aws-amplify";
import clsx from "clsx";
import { Scrollbars } from "rc-scrollbars";

import FillResponsiveDialogActivitiesFeedback from "./FillResponsiveDialogActivitiesFeedback";

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

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "95%",
    minWidth: "95%",
    left: 0,
    margin: "auto",
    marginTop: "20px",
    marginBottom: "20px",
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

export default function ActivityFeedbackForAdmin(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [activitiesFeedbacks, setActivitiesFeedbacks] = useState([]);
  // const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const columns = props.groupName === "admins" ?
    [
      {
        id: "buttons",
        label: "",
        minWidth: 110,
        maxWidth: 110,
        align: "center",
        color: "white",
      },
      {
        id: "email",
        label: "דוא\"ל מרצה",
        minWidth: 130,
        maxWidth: 130,
        align: "center",
      },
      {
        id: "phoneNumber",
        label: "טלפון מרצה",
        minWidth: 120,
        maxWidth: 120,
        align: "center",
      },
      {
        id: "name",
        label: "שם המרצה",
        minWidth: 120,
        maxWidth: 130,
        align: "center",
      },
      {
        id: "students",
        label: "משתתפים",
        minWidth: 120,
        maxWidth: 130,
        align: "center",
      },
      {
        id: "date",
        label: "מועד המפגש",
        minWidth: 170,
        maxWidth: 170,
        align: "center",
      },
      {
        id: "activityName",
        label: "שם הקורס",
        minWidth: 120,
        maxWidth: 170,
        align: "center",
      },
    ]
    :
    [
      {
        id: "buttons",
        label: "",
        minWidth: 110,
        maxWidth: 110,
        align: "center",
        color: "white",
      },
      {
        id: "students",
        label: "משתתפים",
        minWidth: 120,
        maxWidth: 130,
        align: "center",
      },
      {
        id: "date",
        label: "מועד המפגש",
        minWidth: 170,
        maxWidth: 170,
        align: "center",
      },
      {
        id: "activityName",
        label: "שם הקורס",
        minWidth: 120,
        maxWidth: 170,
        align: "center",
      },
    ];

  const rows = (props.groupName === "admins") ? activitiesFeedbacks.map((activity, index) => {
    return createDataAdmin(
      activity.owner,
      activity.phone_number,
      activity.title,
      activity.email,
      <p>
        תאריך - {activity.date.substring(0, 10).split("-").reverse().join("-")}{" "}
        שעה - {activity.date.substring(11)}
      </p>,
      <Scrollbars style={{ width: 130, height: 200, float: "right" }}>
        {activity.form.map((student) => (
          <div>
            <p>{student[0]}</p>
          </div>
        ))}
      </Scrollbars>,
      <div>
        <FillResponsiveDialogActivitiesFeedback
          title={activity.title}
          date={activity.date}
          students={activity.form}
          idx={index}
          id={activity.activity_id}
          email={props.email}
          givenName={props.givenName}
          familyName={props.familyName}
          groupName={props.groupName}
        />
      </div>
    );
  })
    :
    activitiesFeedbacks.map((activity, index) => {
      return createDataContentSuppliers(
        activity.title,
        <p>
          תאריך - {activity.date.substring(0, 10).split("-").reverse().join("-")}{" "}
      שעה - {activity.date.substring(11)}
        </p>,
        <Scrollbars style={{ width: 130, height: 200, float: "right" }}>
          {activity.form.map((student) => (
            <div>
              <p>{student[0]}</p>
            </div>
          ))}
        </Scrollbars>,
        <div>
          <FillResponsiveDialogActivitiesFeedback
            title={activity.title}
            date={activity.date}
            students={activity.form}
            idx={index}
            id={activity.activity_id}
            email={props.email}
            givenName={props.givenName}
            familyName={props.familyName}
            groupName={props.groupName}
          />
        </div>
      );
    })
    ;

  useEffect(() => {
    fetchActivitiesFeedbacks();
  }, []);
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
  const fetchActivitiesFeedbacks = async () => {
    try {
      const activitiesFeedbacksData = await API.graphql(
        graphqlOperation(listActivityFeedbacks)
      );
      const activitiesFeedbacksList =
        activitiesFeedbacksData.data.listActivityFeedbacks.items;
      if (props.groupName === "admins")
        setActivitiesFeedbacks(activitiesFeedbacksList.sort(compare_createdAt));
      else {
        var mappedFeedbacks = activitiesFeedbacksList.filter(feedback => feedback.email === props.email);
        setActivitiesFeedbacks(mappedFeedbacks);
      }
    } catch (error) {
      console.log("error on fetching Approved Activities", error);
    }
  };

  function createDataAdmin(
    name,
    phoneNumber,
    activityName,
    email,
    date,
    students,
    buttons
  ) {
    return { name, phoneNumber, activityName, email, date, students, buttons };
  }

  function createDataContentSuppliers(
    activityName,
    date,
    students,
    buttons
  ) {
    return { activityName, date, students, buttons };
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
                            color: "white",
                            backgroundColor: "black",
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
