import React from "react";
import { deleteApprovedUser } from "../../graphql/mutations";
import { API, graphqlOperation } from "aws-amplify";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import PersonAddDisabledIcon from "@material-ui/icons/PersonAddDisabled";
import swal from "sweetalert";


export default function CancelParticipationResponsiveDialog(props) {

  //               Use State Initialization              //
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  //                 Functions                //

  //async function for delete spesific user participation by user id.
  const deleteSingleUser = async (id_to_delete) => {
    try {
      console.log(id_to_delete);
      const del = { id: id_to_delete };
      await API.graphql(graphqlOperation(deleteApprovedUser, { input: del }));
    } catch (error) {
      console.log("Error on delete single approved user ", error);
    }
  };

  //    Handlers Functions for the table dialog    //
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleClose = async () => {
    setOpen(false);
    await deleteSingleUser(props.id).then(
      swal("", props.title + " הוסרת מקורס", "success", {
        button: "אישור",
      })
    );
    window.location.reload(false);
  };

  //React componenet table for activities participation.
  return (
    <div>
      <Button
        justify="center"
        startIcon={
          <PersonAddDisabledIcon
            style={{
              fill: "white",
              maxWidth: "100px",
              marginBottom: "11px"
            }}
          ></PersonAddDisabledIcon>
        }
        variant="outlined"
        style={{
          fill: "rgba(60,60,60)",
          backgroundColor: "red",
          border: "3px solid red",
          maxHeight: "40px",
          paddingBottom: "15px"
        }}
        onClick={handleClickOpen}
      >
        ביטול&nbsp;השתתפות
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleCancel}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title" style={{ backgroundColor: "#d8e3e7" }}>
          <b style={{ color: "#132c33" }}>ביטול השתתפות בקורס - {props.title}</b>
        </DialogTitle>
        <DialogContent style={{ backgroundColor: "#d8e3e7" }}>
          <DialogContentText style={{ backgroundColor: "#d8e3e7", color: "#132c33" }}>
            אושרת לקורס זה, בלחיצה על "הסרה" אישורך יבטול
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
            בטל
          </Button>
          <Button
            onClick={handleClose}
            style={{
              backgroundColor: "#132c33", maxHeight: "40px",
              paddingBottom: "15px", borderRadius: "10px"
            }}
            autoFocus
          >
            אשר
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
