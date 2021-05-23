import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { deletePendingUser } from "../../graphql/mutations";
import { API, graphqlOperation } from "aws-amplify";
import PersonAddDisabledIcon from "@material-ui/icons/PersonAddDisabled";
import swal from "sweetalert";

export default function DenyResponsiveDialogUser(props) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const deleteSingleUser = async (id_to_delete) => {
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
    await deleteSingleUser(props.id).then(swal("", "הסרת המשתתף התקבלה בהצלחה", "success"));
    window.location.reload(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        startIcon={
          <PersonAddDisabledIcon
            style={{ fill: "white" }}
          ></PersonAddDisabledIcon>
        }
        variant="outlined"
        style={{ fill: "white", backgroundColor: "red" }}
        onClick={handleClickOpen}
      >
        דחה
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleCancel}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle
          id="responsive-dialog-title"
          style={{ color: "red", backgroundColor: "black" }}
        >
          <b>ביטול הרשמה לפעילות</b>
        </DialogTitle>
        <DialogContent style={{ backgroundColor: "black" }}>
          <DialogContentText style={{ color: "white" }}>
            ?האם את/ה בטוח/ה שברצונך לדחות הרשמה של משתתפ/ת זה
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ backgroundColor: "black" }}>
          <Button
            autoFocus
            onClick={handleCancel}
            style={{ backgroundColor: "red" }}
          >
            חזור
          </Button>
          <Button
            onClick={handleClose}
            style={{ backgroundColor: "green" }}
            autoFocus
          >
            ביטול הרשמה
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
