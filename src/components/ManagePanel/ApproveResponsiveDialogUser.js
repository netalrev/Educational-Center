import React from "react";
import { useState, useEffect } from "react";
import { deletePendingUser, createApprovedUser } from "../../graphql/mutations";
import { getPendingUser, listApprovedUsers } from "../../graphql/queries";
import { API, graphqlOperation } from "aws-amplify";

import Button from "@material-ui/core/Button";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import swal from "sweetalert";

export default function ApproveResponsiveDialogActivity(props) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [approvedUsers, setApprovedUsers] = useState([]);

  useEffect(() => {
    fetchApprovedUsers();
  }, []);

  const fetchApprovedUsers = async () => {
    try {
      const usersData = await API.graphql(graphqlOperation(listApprovedUsers));
      const usersList = usersData.data.listApprovedUsers.items;
      setApprovedUsers(usersList);
    } catch (error) {
      console.log("error on fetching approved users", error);
    }
  };

  const approveUser = async (id_to_fetch) => {
    try {
      const fetched = await API.graphql(
        graphqlOperation(getPendingUser, { id: id_to_fetch })
      );
      var IDs = approvedUsers.map((element) => parseInt(element.id));
      IDs.sort(function compareNumbers(a, b) {
        return a - b;
      });
      var newApprovedUser = fetched.data.getPendingUser;
      newApprovedUser.id = IDs.length == 0 ? 0 : IDs[IDs.length - 1] + 1;
      delete newApprovedUser.createdAt;
      delete newApprovedUser.updatedAt;
      await API.graphql(
        graphqlOperation(createApprovedUser, { input: newApprovedUser })
      );
    } catch (error) {
      console.log("Error on fetching single pending user ", error);
    }
  };

  const deleteSinglePendingUser = async (id_to_delete) => {
    try {
      const del = { id: id_to_delete };
      await API.graphql(graphqlOperation(deletePendingUser, { input: del }));
    } catch (error) {
      console.log("Error on delete single pending user ", error);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = async () => {
    setOpen(false);
    await approveUser(props.id);
    await deleteSinglePendingUser(props.id).then(swal("", "השתתפות אושרה", "success", {
      button: "אישור",
    }));
    window.location.reload(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        startIcon={
          <PersonAddIcon style={{
            fill: "white",
            maxWidth: "100px",
            marginBottom: "11px"
          }}></PersonAddIcon>
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
        אישור
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
          <b style={{ color: "#132c33" }}>אישור השתתפות</b>
        </DialogTitle>
        <DialogContent style={{ backgroundColor: "#d8e3e7" }}>
          <DialogContentText style={{ backgroundColor: "#d8e3e7", color: "#132c33" }}>
            בלחיצה על "אישור" קישור הזום יהיה זמין למשתתף או המשתתפת
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
