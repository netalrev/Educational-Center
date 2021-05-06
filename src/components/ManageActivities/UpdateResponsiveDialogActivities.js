import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { createPendingActivities, updatePendingActivities } from "../../graphql/mutations";
import { listPendingActivitiess } from "../../graphql/queries";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import { useState, useEffect } from "react";
import UpdateIcon from '@material-ui/icons/Update';

export default function UploadResponsiveDialog(props) {
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [pendingActivitiess, setPendingActivitiess] = useState([]);

    useEffect(() => {
        fetchPendingActivities();
    }, []);

    const fetchPendingActivities = async () => {
        try {
            const activitiesData = await API.graphql(graphqlOperation(listPendingActivitiess));
            const activitiesList = activitiesData.data.listPendingActivitiess.items;
            setPendingActivitiess(activitiesList);
        } catch (error) {
            console.log("error on fetching songs", error);
        }
    };
    const editPendingActivities = async (idx) => {
        try {
            const to_edit = pendingActivitiess[idx];
            to_edit.title = document.getElementById("standard-basic").value;
            to_edit.description = document.getElementById("outlined-multiline-static").value;
            to_edit.activityCount = document.getElementsByName("activityCount")[0].value;
            to_edit.dates = Array.from(document.getElementsByName("dates")).map(element => element.value);
            delete to_edit.createdAt;
            delete to_edit.updatedAt;
            const activityData = await API.graphql(graphqlOperation(updatePendingActivities, { input: to_edit }));
            console.log(activityData);
            const pendingActivityList = [...pendingActivitiess];
            pendingActivityList[idx] = activityData.data.updatePendingActivities;
            setPendingActivitiess(pendingActivityList);
        } catch (error) {
            console.log("Error in updating pending activity", error);
        }
    };
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = async () => {
        setOpen(false);
        await editPendingActivities(props.idx).then(alert("בקשתך לעריכת התוכן המבוקש התקבלה בהצלחה."));
        window.location.reload(false);

    };
    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button startIcon={<UpdateIcon></UpdateIcon>} variant="outlined" color="primary" onClick={handleClickOpen}>
                עדכן
      </Button>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleCancel}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">{"אישור העלאת תוכן"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        האם את\אתה בטוחים שפרטי הפעילות שהזנתם תואמים את הפעילות.
          </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleCancel} color="primary">
                        בטל העלאה
          </Button>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        אשר העלאה
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
