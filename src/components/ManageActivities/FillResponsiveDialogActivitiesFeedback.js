import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import ManageActivitiesFeedbackFormEdit from './ManageActivitiesFeedbackFormEdit';

export default function FillResponsiveDialogActivitiesFeedback(props) {
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleCancel = () => {
        setOpen(false);
    };
    return (
        <div>
            <Button startIcon={<EditIcon style={{ fill: "rgba(60,60,60)" }}></EditIcon>} variant="outlined" style={{ fill: "rgba(60,60,60)" }} onClick={handleClickOpen}>
                השלם
      </Button>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleCancel}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title" style={{ color: "red" }}><b>משוב פעילות עבור {props.title}</b></DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        משוב עבור מפגש
                            <ManageActivitiesFeedbackFormEdit
                            groupName={props.groupName}
                            date={props.date}
                            students={props.students}
                            id={props.id}
                            email={props.email} />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleCancel} style={{ fill: "rgba(60,60,60)" }}>
                        בטל
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
