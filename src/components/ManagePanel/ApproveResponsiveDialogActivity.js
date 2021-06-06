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
  createApprovedActivities,
} from "../../graphql/mutations";
import {
  getPendingActivities,
  listApprovedActivitiess,
  listPendingActivitiess,
} from "../../graphql/queries";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import { useState, useEffect } from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import swal from "sweetalert";

export default function ApproveResponsiveDialogActivity(props) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [approvedActivitiess, setApprovedActivitiess] = useState([]);
  const [activitiess, setActivitiess] = useState([]);

  useEffect(() => {
    fetchApprovedActivities();
  }, []);

  const fetchPendingActivities = async () => {
    try {
      const PendingActivitiesData = await API.graphql(
        graphqlOperation(listPendingActivitiess)
      );
      const PendingActivitiesList =
        PendingActivitiesData.data.listPendingActivitiess.items;
      setActivitiess(PendingActivitiesList);
    } catch (error) {
      console.log("error on fetching Pending Activities", error);
    }
  };

  const fetchApprovedActivities = async () => {
    try {
      const activitiesData = await API.graphql(
        graphqlOperation(listApprovedActivitiess)
      );
      const activitiesList = activitiesData.data.listApprovedActivitiess.items;
      setApprovedActivitiess(activitiesList);
    } catch (error) {
      console.log("error on fetching Approved Activities", error);
    }
  };

  const approveActivity = async (id_to_fetch) => {
    try {
      const fetched = await API.graphql(
        graphqlOperation(getPendingActivities, { id: id_to_fetch })
      );
      var IDs = approvedActivitiess.map((element) => parseInt(element.id));
      IDs.sort(function compareNumbers(a, b) {
        return a - b;
      });
      var newActivity = fetched.data.getPendingActivities;
      newActivity.id = IDs.length == 0 ? 0 : IDs[IDs.length - 1] + 1;
      delete newActivity.createdAt;
      delete newActivity.updatedAt;
      await API.graphql(
        graphqlOperation(createApprovedActivities, { input: newActivity })
      );
    } catch (error) {
      console.log("Error on fetching single approved activity ", error);
    }
  };

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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = async () => {
    setOpen(false);
    await approveActivity(props.id);
    await deleteSinglePending(props.id).then(
      swal("", "הקורס אושר בהצלחה", "success", {
        button: "אישור",
      })
    );
    window.location.reload(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };

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
          <b style={{ color: "#132c33" }}>אישור קורס - {props.title}</b>
        </DialogTitle>
        <DialogContent style={{ backgroundColor: "#d8e3e7" }}>
          <DialogContentText
            style={{ backgroundColor: "#d8e3e7", color: "#132c33" }}
          >
            בלחיצה על "אישור" הקורס יוצג בדף "קורסים" ויפתח להרשמה
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
