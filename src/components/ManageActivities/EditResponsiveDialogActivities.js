import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Amplify, { API, graphqlOperation } from "aws-amplify";
import EditIcon from '@material-ui/icons/Edit';

import ManageActivitiesFormEdit from './ManageActivitiesFormEdit';

export default function EditResponsiveDialogActivities(props) {
    const [open, setOpen] = React.useState(false);



    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    // const deleteSingleApproved = async (id_to_delete) => {
    //     try {
    //         const del = { id: id_to_delete };
    //         await API.graphql(graphqlOperation(deleteApprovedActivities, { input: del }));
    //     } catch (error) {
    //         console.log("Error on delete single Approved Activity ", error);
    //     }
    // };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = async () => {
        setOpen(false);
        // if (props.type === "pending") {
        //     await deleteSinglePending(props.id).then(alert("התוכן נמחק בהצלחה"))
        // }
        // else {
        //     await deleteSingleApproved(props.id).then(alert("התוכן נמחק בהצלחה"))
        // }
        // window.location.reload(false);
    };
    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button startIcon={<EditIcon></EditIcon>} variant="outlined" color="primary" onClick={handleClickOpen}>
                ערוך
      </Button>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">{"עריכת פעילות"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        ?אילו שינויים ברצונך לערוך
                        <ManageActivitiesFormEdit idx={props.idx} email={props.email} />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleCancel} color="primary">
                        בטל
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
