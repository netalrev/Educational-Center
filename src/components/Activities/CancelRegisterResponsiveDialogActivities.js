import React from "react";
import { deletePendingUser } from "../../graphql/mutations";
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


export default function CancelRegisterResponsiveDialog(props) {

  //               Use State Initialization              //

  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  //                 Functions                //

  const deleteSingleUser = async (id_to_delete) => {
    try {
      const del = { id: id_to_delete };
      await API.graphql(graphqlOperation(deletePendingUser, { input: del }));
    } catch (error) {
      console.log("Error on delete single pending user ", error);
    }
  };

  //            Handlers functions           //

  const handleClickOpen = () => {
    setOpen(true);
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
  const handleCancel = () => {
    setOpen(false);
  };

  //React componenet table for register activities participation.
  return (
    <div>
      <Button
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
          backgroundColor: "red",
          fill: "rgba(60,60,60)",
          maxHeight: "40px",
          border: "3px solid red",
          paddingBottom: "15px"
        }}
        onClick={handleClickOpen}
      >
        ביטול&nbsp;הרשמה
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
          <b style={{ color: "#132c33" }}>ביטול הרשמה לקורס - {props.title}</b>
        </DialogTitle>
        <DialogContent style={{ backgroundColor: "#d8e3e7" }}>
          <DialogContentText
            style={{ backgroundColor: "#d8e3e7", color: "#132c33" }}
          >
            בלחיצה על "הסרה" תבוטל הרשמתך לקורס
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
