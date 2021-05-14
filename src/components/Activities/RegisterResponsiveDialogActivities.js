import React from 'react';
import Button from '@material-ui/core/Button';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { createPendingUser } from "../../graphql/mutations";
import { listPendingUsers } from "../../graphql/queries";
import { API, graphqlOperation } from "aws-amplify";
import { useState, useEffect } from "react";

export default function RegisterResponsiveDialog(props) {
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [pendingUsers, setPendingUsers] = useState([]);

    useEffect(() => {
        fetchPendingUsers();
    }, []);

    const fetchPendingUsers = async () => {
        try {
            const usersData = await API.graphql(graphqlOperation(listPendingUsers));
            const usersList = usersData.data.listPendingUsers.items;
            setPendingUsers(usersList);
        } catch (error) {
            console.log("error on fetching pending users", error);
        }
    };


    const registerPendingUser = async () => {
        try {
            var IDs = pendingUsers.map(element => parseInt(element.id));
            IDs.sort(function compareNumbers(a, b) {
                return a - b;
            });
            const user = {
                id: IDs.length == 0 ? 0 : IDs[IDs.length - 1] + 1,
                name: props.givenName + " " + props.familyName,
                email: props.email,
                phone_number: props.phoneNumber,
                activity_id: props.id,
            };
            console.log(user);
            await API.graphql(graphqlOperation(createPendingUser, { input: user }));
            await fetchPendingUsers();
        } catch (error) {
            console.log("error adding user: ", error);
        }
    }
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = async () => {
        setOpen(false);
        await registerPendingUser().then(alert("בקשתך התקבלה בהצלחה, אנא המתן לאישור מנהל"));
        // window.location.reload(false);

    };
    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button startIcon={<EventAvailableIcon></EventAvailableIcon>} variant="outlined" color="primary" onClick={handleClickOpen}>
                הרשם
      </Button>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleCancel}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">{"הרשמה לפעילות"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        ?האם את\ה בטוח את\ה רוצה להרשם
          </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleCancel} color="primary">
                        בטל
          </Button>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        אשר
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
