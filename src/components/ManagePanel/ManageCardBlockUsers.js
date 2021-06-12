import React from "react";
import clsx from "clsx";
import { useState, useEffect } from "react";
import ApproveResponsiveDialogUnblock from "./ApproveResponsiveDialogUnblock";
import ApproveResponsiveDialogBlock from "./ApproveResponsiveDialogBlock";
import ApproveResponsiveDialogConfirmContentSuppliers from "./ApproveResponsiveDialogConfirmContentSuppliers";
import ApproveResponsiveDialogConfirmAdmins from "./ApproveResponsiveDialogConfirmAdmins";
import ApproveResponsiveDialogConfirmUsers from "./ApproveResponsiveDialogConfirmUsers";
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
import $ from "jquery";
import Amplify, { Auth } from "aws-amplify";
import awsconfig from "../../aws-exports";
import { CognitoIdentityProviderClient, ListUsersCommand } from "@aws-sdk/client-cognito-identity-provider";
var AWS = require('aws-sdk');

Amplify.configure(awsconfig); //AWS CONFIGORE

//The columns values of the table.
const columns = [
  {
    id: "buttons",
    label: "",
    minWidth: 110,
    maxWidth: 110,
    align: "center",
  },
  {
    id: "email",
    label: "דוא\"ל",
    minWidth: 130,
    maxWidth: 130,
    align: "center",
    color: "white",
  },
  {
    id: "phoneNumber",
    label: "טלפון",
    minWidth: 120,
    maxWidth: 120,
    align: "center",
  },
  {
    id: "name",
    label: "שם",
    minWidth: 120,
    maxWidth: 130,
    align: "center",
  },
];

//The style for manage card activity part.
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

export default function ManageCardBlockUsers(props) {

  //               Use State Initialization              //

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [allUsers, setAllUsers] = useState([]);
  const [creds, setCreds] = useState([]);

  // const? [users, setUsers] = useState([]);
  const checkCognitoUserSession = async () => {
    const getAwsCredentials = await Auth.currentCredentials();
    const awsCredentials = await Auth.essentialCredentials(getAwsCredentials);
    setCreds(awsCredentials);

    // accessKeyId, secretAccessKey, sessionToken post login
    if (awsCredentials !== undefined && awsCredentials.length !== 0) {
      getUsers();
    }
  };
  const getUsers = async () => {
    try {
      const getAwsCredentials = await Auth.currentCredentials();
      const awsCredentials = await Auth.essentialCredentials(getAwsCredentials);
      var creds = new AWS.Credentials('akid', 'secret', 'session');
      AWS.config.region = 'us-east-2'; // Region
      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'us-east-2:f7ebd251-3285-45af-8a4e-1d79d22ea590',
      });
      if (awsCredentials !== undefined && awsCredentials.length !== 0) {
        let new_all = [];
        let more = true;
        let paginationToken = '';
        while (more) {
          let params = {
            UserPoolId: "us-east-2_FAO6krzFK",
          };
          if (paginationToken !== '') {
            params.PaginationToken = paginationToken;
          }
          AWS.config.update({
            region: "us-east-2",
            accessKeyId: awsCredentials.accessKeyId,
            secretAccessKey: awsCredentials.secretAccessKey,
            sessionToken: awsCredentials.sessionToken
          });
          const cognito = new AWS.CognitoIdentityServiceProvider();
          const rawUsers = await cognito.listUsers(params).promise();
          new_all = new_all.concat(rawUsers.Users);
          new_all = new_all.filter(user => user.UserStatus === "CONFIRMED" && user.Enabled === false);
          if (rawUsers.PaginationToken) {
            paginationToken = rawUsers.PaginationToken;
          }
          else {
            more = false;
          }
        }
        setAllUsers(new_all);
      }
    }
    catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  //               Functions              //

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

  //Function to compare two dates.return 1 if date a > date b,0 if equals and -1 else.
  function compare_createdAt(a, b) {
    var a_converted = dates_class.convert(a.createdAt);
    var b_converted = dates_class.convert(b.createdAt);
    if (dates_class.compare(a_converted, b_converted) == 1) return 1;
    else if (dates_class.compare(a_converted, b_converted) == 0) return 0;
    else return -1;
  }

  //The rows values of the table.
  const rows = allUsers.map((user, index) => {
    return createDataAdmin(
      user.Attributes[5].Value + " " + user.Attributes[6].Value,
      user.Attributes[4].Value.length === 13 ? "0" + String(user.Attributes[4].Value).substring(4, 6) + "-" + String(user.Attributes[4].Value).substring(6) : String(user.Attributes[4].Value).substring(4, 7) + "-" + String(user.Attributes[4].Value).substring(7),
      user.Attributes[7].Value,
      <div>
        <ApproveResponsiveDialogUnblock
          givenName={user.Attributes[5].Value}
          familyName={user.Attributes[6].Value}
          email={user.Attributes[7].Value}
        />
      </div>
    );
  });

  //async function to fetch pending activities.

  function createDataAdmin(
    name,
    phoneNumber,
    email,
    buttons
  ) {
    return {
      name,
      phoneNumber,
      email,
      buttons,
    };
  }

  //        Handler functions       //  

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

  var text = <b>{props.title}</b>;//Var for title
  //The react component.
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
