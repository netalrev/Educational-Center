import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { createPendingActivities } from "../../graphql/mutations";
import { listPendingActivitiess } from "../../graphql/queries";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import { useState, useEffect } from "react";
import UpdateIcon from '@material-ui/icons/Update';

export default function UploadResponsiveDialog(props) {
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [pendingActivities, setPendingActivitiess] = useState([]);

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
    const createActivity = async () => {
        try {
            var IDs = pendingActivities.map(element => parseInt(element.id));
            IDs.sort(function compareNumbers(a, b) {
                return a - b;
            });
            const activity = {
                description: document.getElementById("outlined-multiline-static").value,
                id: IDs.length == 0 ? 0 : IDs[IDs.length - 1] + 1,
                owner: props.givenName + " " + props.familyName,
                title: document.getElementById("standard-basic").value,
                email: props.email,
                activityCount: document.getElementsByName("activityCount")[0].value,
                dates: Array.from(document.getElementsByName("dates")).map(element => element.value),
            };
            console.log(activity);
            await API.graphql(graphqlOperation(createPendingActivities, { input: activity }));
            await fetchPendingActivities();
            document.getElementById("outlined-multiline-static").value = "";
            document.getElementById("standard-basic").value = "";
            document.getElementsByName("activityCount")[0].value = "1";
            // var temp = ":תאריך פעילות מספר" + " " + 1;
            // dates = [<tr><FormElement name="dates" title={temp} type="date" defaultValue={new Date().toLocaleDateString('en-CA')} /></tr>]
            // document.getElementById("dates_tr").innerHTML = [];
            // document.getElementById("dates_tr").append(<tr><FormElement name="dates" title={temp} type="date" defaultValue={new Date().toLocaleDateString('en-CA')} /></tr>)
        } catch (error) {
            console.log("error creating activity: ", error);
        }
    }
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = async () => {
        setOpen(false);
        await createActivity().then(alert("בקשתך התקבלה בהצלחה, אנא המתן לאישור מנהל"));
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
