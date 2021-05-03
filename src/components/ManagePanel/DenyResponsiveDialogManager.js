import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { deletePendingActivities } from "../../graphql/mutations";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import DeleteIcon from '@material-ui/icons/Delete';

export default function DenyResponsiveDialogManager(props) {
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

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = async () => {
        setOpen(false);
        await deleteSinglePending(props.id).then(alert("התוכן נמחק בהצלחה"))
        window.location.reload(false);
    };
    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button startIcon={<DeleteIcon></DeleteIcon>} variant="outlined" color="primary" onClick={handleClickOpen}>
                דחה
      </Button>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">{"דחיית פעילות"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        האם את\אתה בטוחים שברצונך למחוק את הפעילות.
          </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleCancel} color="primary">
                        בטל
          </Button>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        מחק
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
