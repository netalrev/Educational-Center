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
import ManageActivitiesFormEditPending from "./ManageActivitiesFormEditPending";
import ManageActivitiesFormEditApproved from "./ManageActivitiesFormEditApproved";

export default function EditResponsiveDialogActivities(props) {
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
        startIcon={
          <EditIcon style={{//edit button size adjust
            fill: "white",
            maxWidth: "100px",
            marginBottom: "11px"
          }}></EditIcon>
        }
        variant="outlined"
        style={{
          backgroundColor: "#005ccc",
          maxHeight: "40px",
          paddingBottom: "15px",
          border: "3px solid #005ccc",
        }}
        onClick={handleClickOpen}
      >
        עריכה
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
          <b style={{ color: "#132c33" }}>עריכת קורס - {props.title}</b>
        </DialogTitle>
        <DialogContent style={{ backgroundColor: "#d8e3e7" }}>
          <DialogContentText
            style={{ backgroundColor: "#d8e3e7", color: "#132c33" }}
          >
            {props.type === "pending" ? (
              <ManageActivitiesFormEditPending
                type="pending"
                zoom={props.zoom}
                isZoom={props.isZoom}
                groupName={props.groupName}
                dates={props.dates}
                currentTime={props.currentTime}
                activityCount={props.activityCount}
                id={props.id}
                email={props.email}
              />
            ) : (
              <ManageActivitiesFormEditApproved
                type="approved"
                zoom={props.zoom}
                isZoom={props.isZoom}
                groupName={props.groupName}
                dates={props.dates}
                currentTime={props.currentTime}
                activityCount={props.activityCount}
                id={props.id}
                email={props.email}
              />
            )}
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
            חזרה
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
