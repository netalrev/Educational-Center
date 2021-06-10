import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import {
  deletePendingActivities,
  deleteApprovedActivities,
} from "../../graphql/mutations";
import { API, graphqlOperation } from "aws-amplify";
import DeleteIcon from "@material-ui/icons/Delete";
import swal from "sweetalert";

export default function DenyResponsiveDialogActivities(props) {
  //               Use State Initialization              //
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  //async function to delete activity by id.
  const deleteSinglePending = async (id_to_delete) => {
    try {
      const del = { id: id_to_delete };
      await API.graphql(
        graphqlOperation(deletePendingActivities, { input: del })
      );
    } catch (error) {
      console.log("Error on delete single pending activity ", error);
    }
  };

  //async function to delete approved activity by id.
  const deleteSingleApproved = async (id_to_delete) => {
    try {
      const del = { id: id_to_delete };
      await API.graphql(
        graphqlOperation(deleteApprovedActivities, { input: del })
      );
    } catch (error) {
      console.log("Error on delete single Approved Activity ", error);
    }
  };

  //    Handler function    //

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = async () => {
    setOpen(false);
    if (props.type === "pending") {
      await deleteSinglePending(props.id).then(
        swal("", "התוכן נמחק בהצלחה", "success", {
          button: "אישור",
        })
      );
    } else {
      await deleteSingleApproved(props.id).then(
        swal("", "התוכן נמחק בהצלחה", "success", {
          button: "אישור",
        })
      );
    }
    window.location.reload(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  //react component dialog activities.
  return (
    <div>
      <Button
        startIcon={
          <DeleteIcon
            style={{
              //delete button size adjust
              fill: "white",
              maxWidth: "100px",
              marginBottom: "10px",
            }}
          ></DeleteIcon>
        }
        variant="outlined"
        style={{
          fill: "rgba(60,60,60)",
          backgroundColor: "red",
          maxHeight: "40px",
          paddingBottom: "15px",
          border: "3px solid red",
        }}
        onClick={handleClickOpen}
      >
        הסרה
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
          <b style={{ color: "#132c33" }}>הסרת קורס - {props.title}</b>
        </DialogTitle>
        <DialogContent style={{ backgroundColor: "#d8e3e7" }}>
          <DialogContentText
            style={{ backgroundColor: "#d8e3e7", color: "#132c33" }}
          >
            בלחיצה על "הסרה" הקורס יוסר לצמיתות מהאתר
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
            הסרה
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
