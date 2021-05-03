import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { createPendingActivities } from "../../graphql/mutations";
import { listPendingActivitiess } from "../../graphql/queries";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import { useState, useEffect } from "react";
import FormElement from "./FormElement"

export default function ResponsiveDialog(props) {
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [pendingActivities, setPendingActivitiess] = useState([]);

    useEffect(() => {
        fetchPendingActivities();
    }, []);

    // const [dates, setDates] = useState([]);
    // function createDateInputs(event) {
    //     var toReturn = [];
    //     if (document.getElementsByName("activityCount")[0].value > 10) {
    //         document.getElementsByName("activityCount")[0].value = 10
    //     }
    //     else if (document.getElementsByName("activityCount")[0].value < 1) {
    //         document.getElementsByName("activityCount")[0].value = 1
    //     }
    //     for (var i = 0; i < document.getElementsByName("activityCount")[0].value; i++) {
    //         var temp = ":תאריך פעילות מספר" + " " + (i + 1)
    //         toReturn.push(<tr><FormElement name="dates" title={temp} type="date" defaultValue={new Date().toLocaleDateString('en-CA')} /></tr>);
    //     }
    //     console.log(document.getElementsByName("activityCount")[0].value)
    //     setDates(toReturn);
    // }
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
            // console.log(IDs)
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
        await createActivity();

    };
    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button startIcon={<CloudUploadIcon></CloudUploadIcon>} variant="outlined" color="primary" onClick={handleClickOpen}>
                העלה
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
