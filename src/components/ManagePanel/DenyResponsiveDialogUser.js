import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { deletePendingUser } from "../../graphql/mutations";
import { API, graphqlOperation } from "aws-amplify";
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';

export default function DenyResponsiveDialogUser(props) {
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const deleteSingleUser = async (id_to_delete) => {
        try {
            const del = { id: id_to_delete };
            await API.graphql(graphqlOperation(deletePendingUser, { input: del }));
        } catch (error) {
            console.log("Error on delete single pending user ", error);
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = async () => {
        setOpen(false);
        await deleteSingleUser(props.id).then(alert("הסרת המשתתף התקבלה בהצלחה"));
        window.location.reload(false);

    };
    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button startIcon={<PersonAddDisabledIcon></PersonAddDisabledIcon>} variant="outlined" color="primary" onClick={handleClickOpen}>
                דחה
            </Button>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleCancel}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">{"ביטול הרשמה לפעילות"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        ?האם את/ה בטוח את/ה רוצה לדחות הרשמה של משתתפ/ת זה
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
