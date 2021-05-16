import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { deletePendingActivities, deleteApprovedActivities } from "../../graphql/mutations";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import DeleteIcon from '@material-ui/icons/Delete';

export default function DenyResponsiveDialogActivities(props) {
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const deleteSinglePending = async (id_to_delete) => {
        try {
            const del = { id: id_to_delete };
            await API.graphql(graphqlOperation(deletePendingActivities, { input: del }));
        } catch (error) {
            console.log("Error on delete single pending activity ", error);
        }
    };

    const deleteSingleApproved = async (id_to_delete) => {
        try {
            const del = { id: id_to_delete };
            await API.graphql(graphqlOperation(deleteApprovedActivities, { input: del }));
        } catch (error) {
            console.log("Error on delete single Approved Activity ", error);
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = async () => {
        setOpen(false);
        if (props.type === "pending") {
            await deleteSinglePending(props.id).then(alert("התוכן נמחק בהצלחה"));
        }
        else {
            await deleteSingleApproved(props.id).then(alert("התוכן נמחק בהצלחה"));
        }
        window.location.reload(false);
    };
    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button startIcon={<DeleteIcon style={{ fill: "rgba(60,60,60)" }}></DeleteIcon>} variant="outlined" style={{ fill: "rgba(60,60,60)" }} onClick={handleClickOpen}>
                מחק
      </Button>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title" style={{ color: "red" }}><b>דחיית פעילות</b></DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        ?האם את/ה בטוח/ה שברצונך למחוק את הפעילות
          </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleCancel} style={{ fill: "rgba(60,60,60)" }}>
                        בטל
          </Button>
                    <Button onClick={handleClose} style={{ fill: "rgba(60,60,60)" }} autoFocus>
                        מחק
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
