import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { deletePendingActivities, createApprovedActivities } from "../../graphql/mutations";
import { getPendingActivities, listApprovedActivitiess, listPendingActivitiess } from "../../graphql/queries";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import { useState, useEffect } from "react";
import SaveIcon from '@material-ui/icons/Save';

export default function ApproveResponsiveDialogManager(props) {
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [approvedActivitiess, setApprovedActivitiess] = useState([]);
    const [activitiess, setActivitiess] = useState([]);

    useEffect(() => {
        fetchApprovedActivities();
    }, []);

    const fetchPendingActivities = async () => {
        try {
            const PendingActivitiesData = await API.graphql(graphqlOperation(listPendingActivitiess));
            const PendingActivitiesList = PendingActivitiesData.data.listPendingActivitiess.items;
            setActivitiess(PendingActivitiesList);
        } catch (error) {
            console.log("error on fetching Pending Activities", error);
        }
    };

    const fetchApprovedActivities = async () => {
        try {
            const activitiesData = await API.graphql(graphqlOperation(listApprovedActivitiess));
            const activitiesList = activitiesData.data.listApprovedActivitiess.items;
            setApprovedActivitiess(activitiesList);
        } catch (error) {
            console.log("error on fetching songs", error);
        }
    };

    const approveActivity = async (id_to_fetch) => {
        try {
            const fetched = await API.graphql(graphqlOperation(getPendingActivities, { id: id_to_fetch }));
            var IDs = approvedActivitiess.map(element => parseInt(element.id));
            IDs.sort(function compareNumbers(a, b) {
                return a - b;
            });
            var newActivity = fetched.data.getPendingActivities;
            newActivity.id = IDs.length == 0 ? 0 : IDs[IDs.length - 1] + 1;
            delete newActivity.createdAt;
            delete newActivity.updatedAt;
            await API.graphql(graphqlOperation(createApprovedActivities, { input: newActivity }));

        } catch (error) {
            console.log("Error on fetching single pending activity ", error);
        }
    };

    const deleteSinglePending = async (id_to_delete) => {
        try {
            const del = { id: id_to_delete };
            await API.graphql(graphqlOperation(deletePendingActivities, { input: del }));
        } catch (error) {
            console.log("Error on delete single pending activity ", error);
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = async () => {
        setOpen(false);
        await approveActivity(props.id)
        await deleteSinglePending(props.id).then(alert("התוכן אושר בהצלחה"));
        window.location.reload(false);
    };
    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button startIcon={<SaveIcon></SaveIcon>} variant="outlined" color="primary" onClick={handleClickOpen}>
                אשר
      </Button>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
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