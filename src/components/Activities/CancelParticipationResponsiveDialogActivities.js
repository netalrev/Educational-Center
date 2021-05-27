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
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const deleteSingleUser = async (id_to_delete) => {
    try {
      console.log(id_to_delete);
      const del = { id: id_to_delete };
      await API.graphql(graphqlOperation(deleteApprovedUser, { input: del }));
    } catch (error) {
      console.log("Error on delete single approved user ", error);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = async () => {
    setOpen(false);
    await deleteSingleUser(props.id).then(
      swal("", "הסרתך התקבלה בהצלחה", "success", {
        button: "אישור",
      })
    );
    // window.location.reload(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };

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
          maxHeight: "40px",
          paddingBottom: "15px"
        }}
        onClick={handleClickOpen}
      >
        בטל&nbsp;השתתפות
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleCancel}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title" style={{ color: "red" }}>
          <b>ביטול השתתפות בפעילות</b>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            ?האם את/ה בטוח/ה שברצונך לבטל השתתפות
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={handleCancel}
            style={{
              fill: "rgba(60,60,60)",
              maxHeight: "40px",
              paddingBottom: "15px"
            }}
          >
            בטל
          </Button>
          <Button
            onClick={handleClose}
            style={{
              fill: "white", backgroundColor: "green", maxHeight: "40px",
              paddingBottom: "15px"
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
