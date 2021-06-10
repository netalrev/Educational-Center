import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { createPendingUser } from "../../graphql/mutations";
import { listPendingUsers } from "../../graphql/queries";
import { API, graphqlOperation } from "aws-amplify";
import { useState, useEffect } from "react";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import swal from "sweetalert";

export default function RegisterResponsiveDialog(props) {

  //               Use State Initialization              //

  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [pendingUsers, setPendingUsers] = useState([]);

  //               Use effect Initialization              //

  useEffect(() => {
    fetchPendingUsers();
  }, []);

  //                 Functions                //

  //async function to fetch to pending users.
  const fetchPendingUsers = async () => {
    try {
      const usersData = await API.graphql(graphqlOperation(listPendingUsers));
      const usersList = usersData.data.listPendingUsers.items;
      setPendingUsers(usersList);
    } catch (error) {
      console.log("error on fetching pending users", error);
    }
  };

  //async function that return all register pending user.
  const registerPendingUser = async () => {
    try {
      var IDs = pendingUsers.map((element) => parseInt(element.id));
      IDs.sort(function compareNumbers(a, b) {
        return a - b;
      });
      const user = {
        id: IDs.length == 0 ? 0 : IDs[IDs.length - 1] + 1,
        name: props.givenName + " " + props.familyName,
        email: props.email,
        phone_number: props.phoneNumber,
        activity_id: props.id,
      };
      await API.graphql(graphqlOperation(createPendingUser, { input: user }));
      await fetchPendingUsers();
    } catch (error) {
      console.log("error adding user: ", error);
    }
  };

  //Handler function 
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = async () => {
    setOpen(false);
    await registerPendingUser().then(
      swal("", "נרשמת לקורס, נשתדל לאשר אותך בהקדם", "success", {
        button: "אישור",
      })
    );
    window.location.reload(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  //React componenet table for register activities participation. 
  return (
    <div>
      <Button
        startIcon={
          <PersonAddIcon
            style={{
              fill: "white",
              maxWidth: "100px",
              marginBottom: "11px"
            }}
          ></PersonAddIcon>
        }
        variant="outlined"
        style={{
          backgroundColor: "green",
          maxHeight: "40px",
          paddingBottom: "15px",
          border: "3px solid green",
        }}
        onClick={handleClickOpen}
      >
        הרשמה
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleCancel}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle
          id="responsive-dialog-title"
          style={{ backgroundColor: "#d8e3e7" }}
        >
          <b style={{ color: "#132c33" }}>הרשמה לקורס - {props.title}</b>
        </DialogTitle>
        <DialogContent style={{ backgroundColor: "#d8e3e7" }}>
          <DialogContentText
            style={{ backgroundColor: "#d8e3e7", color: "#132c33" }}
          >
            בלחיצה על "אישור" תשלח בקשה לרישום
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
