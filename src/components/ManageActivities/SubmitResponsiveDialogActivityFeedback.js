import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { listActivityFeedbacks } from "../../graphql/queries";
import { updateActivityFeedback } from "../../graphql/mutations";

import Amplify, { API, graphqlOperation } from "aws-amplify";
import { useState, useEffect } from "react";
import UpdateIcon from '@material-ui/icons/Update';

export default function SubmitResponsiveDialogActivityFeedback(props) {
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [activitiesFeedback, setActivitiesFeedback] = useState([]);
    const [allActivitiesFeedback, setAllActivitiesFeedback] = useState([]);

    // useEffect(() => { // Fetch for content suppliers
    //     fetchActivitiesFeedbacks();
    // }, []);

    useEffect(() => { // Fetch for admins
        fetchAllActivitiesFeedbacks();
    }, []);

    const fetchActivitiesFeedbacks = async () => {
        try {
            const activitiesFeedbackData = await API.graphql(graphqlOperation(listActivityFeedbacks, { filter: { email: { eq: props.email } } }));
            const activitiesFeedbackList = activitiesFeedbackData.data.listActivityFeedbacks.items;
            setActivitiesFeedback(activitiesFeedbackList);
        } catch (error) {
            console.log("error on fetching Pending Activities", error);
        }
    };

    const fetchAllActivitiesFeedbacks = async () => {
        try {
            const activitiesFeedbackData = await API.graphql(graphqlOperation(listActivityFeedbacks));
            const activitiesFeedbackList = activitiesFeedbackData.data.listActivityFeedbacks.items;
            setAllActivitiesFeedback(activitiesFeedbackList);
        } catch (error) {
            console.log("error on fetching Pending Activities", error);
        }
    };

    const editActivityFeedback = async (id) => {
        try {
            var list = allActivitiesFeedback.filter(activity => activity.id === id);
            const to_edit = list[0];
            var form = [];
            to_edit.form.map(student => {
                var studentWithGrade = [];
                studentWithGrade.push(student[0]);
                studentWithGrade.push(student[1]);
                studentWithGrade.push(student[2]);
                studentWithGrade.push(document.getElementsByName(student[0] + " 1")[0].value);
                studentWithGrade.push(document.getElementsByName(student[0] + " 2")[0].value);
                studentWithGrade.push(document.getElementsByName(student[0] + " 3")[0].value);
                form.push(studentWithGrade);
            })
            delete to_edit.createdAt;
            delete to_edit.updatedAt;
            to_edit.form = form;
            console.log(to_edit);
            const activityFeedbackData = await API.graphql(graphqlOperation(updateActivityFeedback, { input: to_edit }));
            const activityFeedbackList = [...allActivitiesFeedback];
            var idx = allActivitiesFeedback.filter((activity, idx) => {
                if (activity.id === id) return idx
            });
            activityFeedbackList[idx[0]] = activityFeedbackData.data.updateActivityFeedback;
            setAllActivitiesFeedback(activityFeedbackList);
        } catch (error) {
            console.log("Error in approved activity", error);
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = async () => {
        setOpen(false);
        await editActivityFeedback(props.id).then(alert("בקשתך לעריכת התוכן המבוקש התקבלה בהצלחה."));
        // window.location.reload(false);
    };
    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button startIcon={<UpdateIcon style={{ fill: "rgba(60,60,60)" }}></UpdateIcon>} variant="outlined" style={{ fill: "rgba(60,60,60)" }} onClick={handleClickOpen}>
                עדכן
      </Button>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleCancel}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title" style={{ color: "red" }}><b>אישור העלאת תוכן</b></DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        ?האם את/ה בטוח/ה שפרטי הפעילות שהזנת תואמים את הפעילות
          </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleCancel} style={{ fill: "rgba(60,60,60)" }}>
                        בטל העלאה
          </Button>
                    <Button onClick={handleClose} style={{ fill: "rgba(60,60,60)" }} autoFocus>
                        אשר העלאה
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
