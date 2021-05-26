import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";
import ManageActivitiesFeedbackFormEdit from "./ManageActivitiesFeedbackFormEdit";

export default function FillResponsiveDialogActivitiesFeedback(props) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button
        startIcon={<EditIcon style={{
          fill: "white",
          maxWidth: "100px",
          marginBottom: "10px"
        }}></EditIcon>}
        variant="outlined"
        style={{
          fill: "rgba(3, 3, 3, 0.5)",
          backgroundColor: "green",
          maxHeight: "40px",
          paddingBottom: "15px"
        }}
        onClick={handleClickOpen}
      >
        השלם
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleCancel}
        aria-labelledby="responsive-dialog-title"
        style={{ backgroundColor: "rgba(3, 3, 3, 0.5)" }}
      >
        <DialogTitle
          id="responsive-dialog-title"
          style={{ color: "red", backgroundColor: "black" }}
        >
          <b>משוב פעילות עבור {props.title}</b>
        </DialogTitle>
        <DialogContent style={{ backgroundColor: "black", color: "white" }}>
          <DialogContentText
            style={{ backgroundColor: "black", color: "white" }}
          >
            משוב עבור מפגש
            <ManageActivitiesFeedbackFormEdit
              groupName={props.groupName}
              date={props.date}
              students={props.students}
              id={props.id}
              email={props.email}
              style={{ backgroundColor: "black" }}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ backgroundColor: "black" }}>
          <Button
            autoFocus
            onClick={handleCancel}
            style={{
              fill: "rgba(60,60,60)", backgroundColor: "red", maxHeight: "40px",
              paddingBottom: "15px"
            }}
          >
            בטל
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
