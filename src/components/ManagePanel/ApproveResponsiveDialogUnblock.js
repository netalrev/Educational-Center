import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import Amplify, { Auth } from "aws-amplify";
import awsconfig from "../../aws-exports";
import { CognitoIdentityProviderClient, ListUsersCommand } from "@aws-sdk/client-cognito-identity-provider";

import { useState, useEffect } from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import swal from "sweetalert";

var AWS = require('aws-sdk');

export default function ApproveResponsiveDialogUnblock(props) {

  //               Use State Initialization              //

  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  //             Functions            //

  const [creds, setCreds] = useState([]);

  // const? [users, setUsers] = useState([]);
  const checkCognitoUserSession = async () => {
    const getAwsCredentials = await Auth.currentCredentials();
    const awsCredentials = await Auth.essentialCredentials(getAwsCredentials);
    setCreds(awsCredentials);

    // accessKeyId, secretAccessKey, sessionToken post login
    if (awsCredentials !== undefined && awsCredentials.length !== 0) {
      UnblockUser();
    }
  };
  const UnblockUser = async () => {
    try {
      const getAwsCredentials = await Auth.currentCredentials();
      const awsCredentials = await Auth.essentialCredentials(getAwsCredentials);
      var creds = new AWS.Credentials('akid', 'secret', 'session');
      AWS.config.region = 'us-east-2'; // Region
      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'us-east-2:f7ebd251-3285-45af-8a4e-1d79d22ea590',
      });
      let paginationToken = '';
      if (awsCredentials !== undefined && awsCredentials.length !== 0) {
        let new_all = [];
        let more = true;
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
          new_all = new_all.filter(user => user.UserStatus === "CONFIRMED" && props.email === user.Attributes[7].Value);
          // if (props.group !== undefined) {
          //   var group = "";
          //   if (props.group === "מנהל/ת")
          //     group = "admins"
          //   else if (props.group === "מרצה")
          //     group = "contentSuppliers"
          //   else
          //     group = "approvedUsers"
          //   let paramsToRemove = {
          //     UserPoolId: "us-east-2_FAO6krzFK",
          //     GroupName: group,
          //     Username: new_all[0].Attributes[0].Value,
          //   };
          //   cognito.adminRemoveUserFromGroup(paramsToRemove, (err, data) => {
          //     if (err) {
          //       console.log(err)
          //     }
          //   });
          // }
          let paramsToUpdate = {
            UserPoolId: "us-east-2_FAO6krzFK",
            Username: new_all[0].Attributes[0].Value,
          };
          cognito.adminEnableUser(paramsToUpdate, (err, data) => {
            if (err) {
              console.log(err)
            }
          });
          if (rawUsers.PaginationToken) {
            paginationToken = rawUsers.PaginationToken;
          }
          else {
            more = false;
          }
        }
      }
    }
    catch (e) {
      console.log(e);
    }
  };

  //    Handler fucntions   //

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = async () => {
    setOpen(false);
    await UnblockUser().then(
      swal("", "אישור משתמש/ת בוצע בהצלחה", "success", {
        button: "אישור",
      })
    );
    window.location.reload(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  //The react component with style in tags.
  return (
    <div>
      <Button
        startIcon={
          <CheckCircleIcon
            style={{
              fill: "white",
              backgroundColor: "green",
              maxWidth: "100px",
              marginBottom: "11px"
            }}
          ></CheckCircleIcon>
        }
        variant="outlined"
        style={{
          fill: "white",
          backgroundColor: "green",
          maxHeight: "40px",
          paddingBottom: "15px",
          border: "3px solid green",
        }}
        onClick={handleClickOpen}
      >
        ביטול חסימה
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle
          id="responsive-dialog-title"
          style={{ backgroundColor: "#d8e3e7" }}
        >
          <b style={{ color: "#132c33" }}>ביטול חסימת משתמש/ת - {props.givenName} {props.familyName}</b>
        </DialogTitle>
        <DialogContent style={{ backgroundColor: "#d8e3e7" }}>
          <DialogContentText
            style={{ backgroundColor: "#d8e3e7", color: "#132c33" }}
          >
            בלחיצה על "אישור" חסימה תוסר מהמשתמש
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ backgroundColor: "#d8e3e7" }}>
          <Button
            autoFocus
            onClick={handleCancel}
            style={{
              backgroundColor: "#132c33", maxHeight: "40px",
              paddingBottom: "15px", borderRadius: "10px"
            }}
          >
            ביטול
          </Button>
          <Button
            onClick={handleClose}
            style={{
              backgroundColor: "#132c33", maxHeight: "40px",
              paddingBottom: "15px", borderRadius: "10px"
            }}
            autoFocus
          >
            אישור
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
